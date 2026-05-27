import { handleUpload } from '@vercel/blob/client'
import { list, del } from '@vercel/blob'

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.ms-word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/octet-stream',
]

export default async function handler(req, res) {
  const { key } = req.query

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let body
  try {
    body = await parseBody(req)
  } catch (err) {
    return res.status(400).json({ error: 'Cuerpo de solicitud inválido: ' + err.message })
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => ({
        allowedContentTypes: ALLOWED_TYPES,
        maximumSizeInBytes: 100 * 1024 * 1024, // 100 MB
        addRandomSuffix: false,
        tokenPayload: key,
      }),
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const blobKey = tokenPayload || key
        try {
          // Eliminar blobs anteriores con el mismo prefijo (excepto el recién subido)
          const { blobs } = await list({ prefix: `${blobKey}__` })
          const toDelete = blobs.filter((b) => b.url !== blob.url)
          if (toDelete.length > 0) {
            await del(toDelete.map((b) => b.url))
          }
        } catch (err) {
          // No interrumpir la respuesta si la limpieza falla
          console.error('[upload-client] cleanup error:', err.message)
        }
      },
    })

    return res.json(jsonResponse)
  } catch (err) {
    console.error('[upload-client] error:', err.message)
    return res.status(400).json({ error: err.message })
  }
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => { data += chunk })
    req.on('end', () => {
      try { resolve(JSON.parse(data)) }
      catch (e) { reject(e) }
    })
    req.on('error', reject)
  })
}
