import busboy from 'busboy'
import { put, list, del } from '@vercel/blob'

const MIME_TO_EXT = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.ms-word': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
}

const EXT_TO_EXT = { '.pdf': 'pdf', '.doc': 'doc', '.docx': 'docx' }

const ALL_EXTS = ['pdf', 'doc', 'docx']

function resolveExt(mimeType, filename) {
  if (MIME_TO_EXT[mimeType]) return MIME_TO_EXT[mimeType]
  if (filename) {
    const dotExt = filename.slice(filename.lastIndexOf('.')).toLowerCase()
    return EXT_TO_EXT[dotExt] || null
  }
  return null
}

export default async function handler(req, res) {
  const { key } = req.query

  if (req.method === 'POST') {
    return new Promise((resolve) => {
      let bb

      try {
        bb = busboy({ headers: req.headers })
      } catch (err) {
        res.status(400).json({ error: 'Solicitud inválida: ' + err.message })
        return resolve()
      }

      let fileBuffer = null
      let mimeType = null
      let filename = null

      bb.on('file', (_field, file, info) => {
        mimeType = info.mimeType
        filename = info.filename
        const chunks = []
        file.on('data', (chunk) => chunks.push(chunk))
        file.on('end', () => { fileBuffer = Buffer.concat(chunks) })
      })

      bb.on('finish', async () => {
        try {
          if (!fileBuffer) {
            res.status(400).json({ error: 'No se recibió archivo' })
            return resolve()
          }

          const ext = resolveExt(mimeType, filename)
          if (!ext) {
            res.status(400).json({ error: 'Solo se permiten archivos PDF o Word (.doc, .docx)' })
            return resolve()
          }

          // Delete any existing file for this key (any extension)
          const { blobs } = await list({ prefix: `${key}.` })
          const existing = blobs.filter((b) => ALL_EXTS.some((e) => b.pathname === `${key}.${e}`))
          if (existing.length > 0) await del(existing.map((b) => b.url))

          await put(`${key}.${ext}`, fileBuffer, {
            access: 'private',
            contentType: mimeType,
          })

          res.json({ ok: true, url: `/api/pdf/${key}`, name: filename, ext })
          resolve()
        } catch (err) {
          console.error('[upload] error:', err.message)
          res.status(500).json({ error: err.message })
          resolve()
        }
      })

      bb.on('error', (err) => {
        res.status(500).json({ error: err.message })
        resolve()
      })

      req.pipe(bb)
    })
  } else if (req.method === 'DELETE') {
    try {
      const { blobs } = await list({ prefix: `${key}.` })
      const existing = blobs.filter((b) => ALL_EXTS.some((e) => b.pathname === `${key}.${e}`))
      if (existing.length > 0) await del(existing.map((b) => b.url))
      res.json({ ok: true })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
