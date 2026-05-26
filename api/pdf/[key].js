import { list } from '@vercel/blob'

const EXT_TO_MIME = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

export default async function handler(req, res) {
  const { key } = req.query
  try {
    const { blobs } = await list({ prefix: `${key}__` })
    const blob = blobs.find((b) => b.pathname.startsWith(`${key}__`))
    if (!blob) return res.status(404).send('Archivo no encontrado')

    const originalName = blob.pathname.slice(`${key}__`.length)
    const ext = originalName.slice(originalName.lastIndexOf('.') + 1) || 'pdf'
    const contentType = EXT_TO_MIME[ext] || 'application/octet-stream'
    const disposition = ext === 'pdf' ? 'inline' : 'attachment'

    const response = await fetch(blob.url, {
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
    })

    if (!response.ok) return res.status(response.status).send('Error al obtener el archivo')

    const buffer = await response.arrayBuffer()
    res.setHeader('Content-Type', contentType)
    res.setHeader('Content-Disposition', `${disposition}; filename="${originalName}"`)
    res.send(Buffer.from(buffer))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
