import { list } from '@vercel/blob'

const ALL_EXTS = ['pdf', 'doc', 'docx']

export default async function handler(req, res) {
  const { key } = req.query
  try {
    const { blobs } = await list({ prefix: `${key}.` })
    const blob = blobs.find((b) => ALL_EXTS.some((e) => b.pathname === `${key}.${e}`))
    if (blob) {
      const ext = blob.pathname.split('.').pop()
      res.json({ exists: true, url: `/api/pdf/${key}`, ext })
    } else {
      res.json({ exists: false, url: null })
    }
  } catch {
    res.json({ exists: false, url: null })
  }
}
