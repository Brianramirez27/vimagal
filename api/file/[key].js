const { list } = require('@vercel/blob')

module.exports = async function handler(req, res) {
  const { key } = req.query
  try {
    const { blobs } = await list({ prefix: `${key}.pdf` })
    const blob = blobs.find((b) => b.pathname === `${key}.pdf`)
    if (blob) {
      res.json({ exists: true, url: blob.url })
    } else {
      res.json({ exists: false, url: null })
    }
  } catch {
    res.json({ exists: false, url: null })
  }
}
