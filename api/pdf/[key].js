import { list } from '@vercel/blob'

export default async function handler(req, res) {
  const { key } = req.query
  try {
    const { blobs } = await list({ prefix: `${key}.pdf` })
    const blob = blobs.find((b) => b.pathname === `${key}.pdf`)
    if (!blob) return res.status(404).send('Archivo no encontrado')

    const response = await fetch(blob.url, {
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
    })

    if (!response.ok) return res.status(response.status).send('Error al obtener el archivo')

    const buffer = await response.arrayBuffer()
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename="${key}.pdf"`)
    res.send(Buffer.from(buffer))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
