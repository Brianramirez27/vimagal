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

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, _file, cb) => cb(null, `${req.params.key}.pdf`),
})

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true)
    else cb(new Error('Solo se permiten archivos PDF'))
  },
})

app.post('/api/upload/:key', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!req.file) return res.status(400).json({ error: 'No se recibió archivo' })
    res.json({ ok: true, url: `/uploads/${req.params.key}.pdf`, name: req.file.originalname })
  })
})

app.delete('/api/upload/:key', (req, res) => {
  const filepath = path.join(UPLOADS_DIR, `${req.params.key}.pdf`)
  if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
  res.json({ ok: true })
})

app.get('/api/file/:key', (req, res) => {
  const filepath = path.join(UPLOADS_DIR, `${req.params.key}.pdf`)
  const exists = fs.existsSync(filepath)
  res.json({ exists, url: exists ? `/uploads/${req.params.key}.pdf` : null })
})

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' })
})

app.listen(PORT, () => console.log(`API lista en http://localhost:${PORT}`))
