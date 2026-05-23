const fs = require('fs')
const path = require('path')

module.exports = function handler(req, res) {
  const { key } = req.query
  const filepath = path.join('/tmp', `${key}.pdf`)
  const exists = fs.existsSync(filepath)
  res.json({ exists, url: exists ? `/api/download/${key}` : null })
}
