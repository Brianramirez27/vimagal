const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, '/tmp'),
  filename: (req, _file, cb) => cb(null, `${req.query.key}.pdf`),
})

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true)
    else cb(new Error('Solo se permiten archivos PDF'))
  },
  limits: { fileSize: 50 * 1024 * 1024 },
})

function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('file')(req, res, (err) => {
      if (err) return res.status(400).json({ error: err.message })
      if (!req.file) return res.status(400).json({ error: 'No se recibió archivo' })
      res.json({ ok: true, name: req.file.originalname })
    })
  } else if (req.method === 'DELETE') {
    const filepath = path.join('/tmp', `${req.query.key}.pdf`)
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
    res.json({ ok: true })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

handler.config = {
  api: { bodyParser: false },
}

module.exports = handler
