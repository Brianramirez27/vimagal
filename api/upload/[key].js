import busboy from 'busboy'
import { put, list, del } from '@vercel/blob'

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
          if (mimeType !== 'application/pdf') {
            res.status(400).json({ error: 'Solo se permiten archivos PDF' })
            return resolve()
          }

          const { blobs } = await list({ prefix: `${key}.pdf` })
          const existing = blobs.filter((b) => b.pathname === `${key}.pdf`)
          if (existing.length > 0) await del(existing.map((b) => b.url))

          const blob = await put(`${key}.pdf`, fileBuffer, {
            access: 'private',
            contentType: 'application/pdf',
          })

          res.json({ ok: true, url: `/api/pdf/${key}`, name: filename })
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
      const { blobs } = await list({ prefix: `${key}.pdf` })
      const existing = blobs.filter((b) => b.pathname === `${key}.pdf`)
      if (existing.length > 0) await del(existing.map((b) => b.url))
      res.json({ ok: true })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
