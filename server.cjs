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
  'application/vnd.ms-word': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
}

const EXT_TO_EXT = { '.pdf': 'pdf', '.doc': 'doc', '.docx': 'docx' }

function resolveExt(file) {
  if (MIME_TO_EXT[file.mimetype]) return MIME_TO_EXT[file.mimetype]
  const dotExt = path.extname(file.originalname).toLowerCase()
  return EXT_TO_EXT[dotExt] || null
}

function sanitizeFilename(name) {
  return name.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').replace(/_{2,}/g, '_').trim() || 'documento'
}

function findFile(key) {
  const files = fs.readdirSync(UPLOADS_DIR)
  return files.find((f) => f.startsWith(`${key}__`)) || null
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = resolveExt(file) || 'pdf'
    let safe = sanitizeFilename(file.originalname)
    if (!safe.toLowerCase().endsWith(`.${ext}`)) safe = `${safe}.${ext}`
    cb(null, `${req.params.key}__${safe}`)
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
  // Delete any existing file for this key before saving new one
  const existing = findFile(req.params.key)
  if (existing) fs.unlinkSync(path.join(UPLOADS_DIR, existing))

  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!req.file) return res.status(400).json({ error: 'No se recibió archivo' })
    const ext = resolveExt(req.file) || 'pdf'
    const originalName = req.file.filename.replace(`${req.params.key}__`, '')
    res.json({ ok: true, url: `/uploads/${req.file.filename}`, name: originalName, ext })
  })
})

app.delete('/api/upload/:key', (req, res) => {
  const files = fs.readdirSync(UPLOADS_DIR)
  files.filter((f) => f.startsWith(`${req.params.key}__`))
    .forEach((f) => fs.unlinkSync(path.join(UPLOADS_DIR, f)))
  res.json({ ok: true })
})

app.get('/api/file/:key', (req, res) => {
  const match = findFile(req.params.key)
  if (match) {
    const originalName = match.replace(`${req.params.key}__`, '')
    const ext = path.extname(originalName).slice(1) || 'pdf'
    return res.json({ exists: true, url: `/uploads/${match}`, ext, name: originalName })
  }
  res.json({ exists: false, url: null })
})

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' })
})

app.listen(PORT, () => console.log(`API lista en http://localhost:${PORT}`))
