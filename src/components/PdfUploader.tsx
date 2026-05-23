import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PdfUploaderProps {
  storageKey: string
  title: string
}

export default function PdfUploader({ storageKey, title }: PdfUploaderProps) {
  const fileUrl = `/uploads/${storageKey}.pdf`
  const [exists, setExists] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [drag, setDrag] = useState(false)
  const [uploadedName, setUploadedName] = useState('')

  // Check if a file already exists on the server
  useEffect(() => {
    fetch(`/api/file/${storageKey}`)
      .then((r) => r.json())
      .then((data) => {
        setExists(data.exists)
        if (data.exists) setUploadedName(storageKey)
      })
      .catch(() => setExists(false))
  }, [storageKey])

  const uploadFile = useCallback(async (file: File) => {
    if (file.type !== 'application/pdf') {
      setError('Solo se permiten archivos PDF.')
      return
    }
    setError(null)
    setLoading(true)
    const form = new FormData()
    form.append('file', file)
    try {
      const res = await fetch(`/api/upload/${storageKey}`, { method: 'POST', body: form })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Error al subir el archivo')
      }
      const data = await res.json()
      setUploadedName(data.name ?? file.name)
      setExists(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudo guardar el archivo.')
    } finally {
      setLoading(false)
    }
  }, [storageKey])

  const handleRemove = async () => {
    await fetch(`/api/upload/${storageKey}`, { method: 'DELETE' })
    setExists(false)
    setUploadedName('')
    setError(null)
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
    e.target.value = ''
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDrag(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadFile(file)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = `${storageKey}.pdf`
    link.click()
  }

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
      <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-[#dc2626] rounded-full" />
        {title}
      </h3>

      {/* Checking state */}
      {exists === null && (
        <div className="flex items-center justify-center py-16 gap-3">
          <div className="w-6 h-6 border-2 border-[#dc2626] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#9ca3af] text-sm">Verificando archivo...</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {exists === true && (
          <motion.div
            key="stored"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* PDF embed */}
            <div className="rounded-xl overflow-hidden border border-[#2a2a2a] bg-[#222]" style={{ height: '440px' }}>
              <iframe
                src={`${fileUrl}?t=${Date.now()}`}
                className="w-full h-full"
                title={title}
              />
            </div>

            {/* File info + actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#222] rounded-xl px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl">📄</span>
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{uploadedName || title}</p>
                  <p className="text-[#22c55e] text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] inline-block" />
                    Guardado en el proyecto
                  </p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-[#dc2626] text-white text-sm font-semibold rounded-lg hover:bg-[#ef4444] transition-colors flex items-center gap-2"
                >
                  ⬇ Descargar
                </button>
                <label className="px-4 py-2 border border-[#2a2a2a] text-[#9ca3af] text-sm font-semibold rounded-lg hover:border-[#dc2626] hover:text-white transition-colors cursor-pointer">
                  {loading ? 'Subiendo...' : 'Reemplazar'}
                  <input type="file" accept=".pdf" className="hidden" onChange={onInputChange} disabled={loading} />
                </label>
                <button
                  onClick={handleRemove}
                  className="px-3 py-2 border border-red-900/40 text-red-500 text-sm rounded-lg hover:bg-red-900/20 transition-colors"
                  title="Eliminar archivo"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {exists === false && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <label
              className={`block rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors duration-300 ${
                drag
                  ? 'border-[#dc2626] bg-[#dc2626]/10'
                  : 'border-[#2a2a2a] hover:border-[#dc2626]/60 hover:bg-[#dc2626]/5'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
              onDragLeave={() => setDrag(false)}
              onDrop={onDrop}
            >
              <input type="file" accept=".pdf" className="hidden" onChange={onInputChange} disabled={loading} />
              {loading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-2 border-[#dc2626] border-t-transparent rounded-full animate-spin" />
                  <p className="text-[#9ca3af] text-sm">Subiendo archivo al proyecto...</p>
                </div>
              ) : (
                <>
                  <div className="text-5xl mb-4">📂</div>
                  <p className="text-white font-semibold mb-1">Arrastra tu PDF aquí</p>
                  <p className="text-[#9ca3af] text-sm mb-4">o haz clic para seleccionar</p>
                  <span className="px-4 py-2 bg-[#dc2626] text-white text-sm font-semibold rounded-lg">
                    Seleccionar PDF
                  </span>
                  <p className="text-[#9ca3af]/60 text-xs mt-4">Sin límite de tamaño · Solo PDF · Se guarda en el proyecto</p>
                </>
              )}
            </label>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-red-400 text-sm flex items-center gap-2"
        >
          ⚠ {error}
        </motion.p>
      )}
    </div>
  )
}
