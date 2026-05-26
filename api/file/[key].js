import { list } from '@vercel/blob'

export default async function handler(req, res) {
  const { key } = req.query
  try {
    const { blobs } = await list({ prefix: `${key}__` })
    const blob = blobs.find((b) => b.pathname.startsWith(`${key}__`))
    if (blob) {
      const originalName = blob.pathname.slice(`${key}__`.length)
      const ext = originalName.slice(originalName.lastIndexOf('.') + 1) || 'pdf'
      res.json({ exists: true, url: `/api/pdf/${key}`, ext, name: originalName })
    } else {
      res.json({ exists: false, url: null })
    }
  } catch {
    res.json({ exists: false, url: null })
  }
}
