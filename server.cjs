const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = 3001
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads')

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

app.use('/uploads', express.static(UPLOADS_DIR))

const MIME_TO_EXT = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.ms-word': 'doc',
}

const EXT_TO_EXT = { '.pdf': 'pdf', '.doc': 'doc', '.docx': 'docx' }

const ALL_EXTS = ['pdf', 'doc', 'docx']

function resolveExt(file) {
  if (MIME_TO_EXT[file.mimetype]) return MIME_TO_EXT[file.mimetype]
  const dotExt = path.extname(file.originalname).toLowerCase()
  return EXT_TO_EXT[dotExt] || null
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = resolveExt(file) || 'pdf'
    cb(null, `${req.params.key}.${ext}`)
  },
})

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (resolveExt(file)) cb(null, true)
    else cb(new Error('Solo se permiten archivos PDF o Word (.doc, .docx)'))
  },
})

app.post('/api/upload/:key', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!req.file) return res.status(400).json({ error: 'No se recibió archivo' })
    const ext = resolveExt(req.file) || 'pdf'
    res.json({ ok: true, url: `/uploads/${req.params.key}.${ext}`, name: req.file.originalname, ext })
  })
})

app.delete('/api/upload/:key', (req, res) => {
  for (const ext of ALL_EXTS) {
    const filepath = path.join(UPLOADS_DIR, `${req.params.key}.${ext}`)
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
  }
  res.json({ ok: true })
})

app.get('/api/file/:key', (req, res) => {
  for (const ext of ALL_EXTS) {
    const filepath = path.join(UPLOADS_DIR, `${req.params.key}.${ext}`)
    if (fs.existsSync(filepath)) {
      return res.json({ exists: true, url: `/uploads/${req.params.key}.${ext}`, ext })
    }
  }
  res.json({ exists: false, url: null })
})

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' })
})

app.listen(PORT, () => console.log(`API lista en http://localhost:${PORT}`))
