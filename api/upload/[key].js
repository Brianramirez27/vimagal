const multer = require('multer')
const { put, list, del } = require('@vercel/blob')

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true)
    else cb(new Error('Solo se permiten archivos PDF'))
  },
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (err) => (err ? reject(err) : resolve()))
  })
}

module.exports = async function handler(req, res) {
  const { key } = req.query

  if (req.method === 'POST') {
    try {
      await runMiddleware(req, res, upload.single('file'))
      if (!req.file) return res.status(400).json({ error: 'No se recibió archivo' })

      const { blobs } = await list({ prefix: `${key}.pdf` })
      const existing = blobs.filter((b) => b.pathname === `${key}.pdf`)
      if (existing.length > 0) await del(existing.map((b) => b.url))

      const blob = await put(`${key}.pdf`, req.file.buffer, {
        access: 'public',
        contentType: 'application/pdf',
      })

      res.json({ ok: true, url: blob.url, name: req.file.originalname })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
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
