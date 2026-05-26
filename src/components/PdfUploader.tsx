import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ACCEPTED_MIME = [
  'application/pdf',
  'application/msword',
  'application/vnd.ms-word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/octet-stream',
]

const ACCEPTED_EXTS = ['.pdf', '.doc', '.docx']

function isAccepted(file: File) {
  if (ACCEPTED_MIME.includes(file.type)) return true
  const dotExt = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
  return ACCEPTED_EXTS.includes(dotExt)
}

interface SlotProps {
  slotKey: string
  slotLabel: string
}

function DocSlot({ slotKey, slotLabel }: SlotProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [fileExt, setFileExt] = useState<string>('pdf')
  const [fileName, setFileName] = useState<string>('')
  const [exists, setExists] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [drag, setDrag] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    fetch(`/api/file/${slotKey}`)
      .then((r) => r.json())
      .then((data) => {
        setExists(data.exists)
        if (data.exists) {
          setFileUrl(data.url)
          setFileExt(data.ext ?? 'pdf')
          setFileName(slotKey)
        }
      })
      .catch(() => setExists(false))
  }, [slotKey])

  const uploadFile = useCallback(async (file: File) => {
    if (!isAccepted(file)) {
      setError('Solo se permiten archivos PDF o Word (.doc, .docx).')
      return
    }
    setError(null)
    setLoading(true)
    const form = new FormData()
    form.append('file', file)
    try {
      const res = await fetch(`/api/upload/${slotKey}`, { method: 'POST', body: form })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Error al subir el archivo')
      }
      const data = await res.json()
      setFileUrl(data.url)
      setFileExt(data.ext ?? 'pdf')
      setFileName(data.name ?? file.name)
      setExists(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'No se pudo guardar el archivo.')
    } finally {
      setLoading(false)
    }
  }, [slotKey])

  const handleRemove = async () => {
    await fetch(`/api/upload/${slotKey}`, { method: 'DELETE' })
    setConfirmDelete(false)
    setExists(false)
    setFileUrl(null)
    setFileName('')
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
    if (!fileUrl) return
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = `${slotKey}.${fileExt}`
    link.click()
  }

  const isPdf = fileExt === 'pdf'

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 flex flex-col gap-3">
      <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wider">{slotLabel}</p>

      {exists === null && (
        <div className="flex items-center justify-center py-8 gap-3">
          <div className="w-5 h-5 border-2 border-[#dc2626] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#9ca3af] text-xs">Verificando...</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {exists === true && (
          <motion.div
            key="stored"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-3"
          >
            {isPdf ? (
              <div
                className="rounded-lg overflow-hidden border border-[#2a2a2a] bg-[#222]"
                style={{ height: '300px' }}
              >
                <iframe src={fileUrl ?? ''} className="w-full h-full" title={slotLabel} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-8 bg-[#222] rounded-lg border border-[#2a2a2a]">
                <span className="text-5xl">📝</span>
                <p className="text-[#9ca3af] text-xs text-center px-4 truncate max-w-full">{fileName}</p>
              </div>
            )}

            <div className="flex items-center justify-between gap-2 bg-[#222] rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 min-w-0">
                <span>{isPdf ? '📄' : '📝'}</span>
                <p className="text-[#22c55e] text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] inline-block" />
                  Guardado
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 bg-[#dc2626] text-white text-xs font-semibold rounded-lg hover:bg-[#ef4444] transition-colors flex items-center gap-1.5"
                >
                  ⬇ Descargar
                </button>
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="px-2 py-1.5 border border-red-900/40 text-red-500 text-xs rounded-lg hover:bg-red-900/20 transition-colors"
                  title="Eliminar"
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <label
              className={`block rounded-lg border-2 border-dashed p-6 text-center cursor-pointer transition-colors duration-300 ${
                drag
                  ? 'border-[#dc2626] bg-[#dc2626]/10'
                  : 'border-[#2a2a2a] hover:border-[#dc2626]/60 hover:bg-[#dc2626]/5'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
              onDragLeave={() => setDrag(false)}
              onDrop={onDrop}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={onInputChange}
                disabled={loading}
              />
              {loading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-[#dc2626] border-t-transparent rounded-full animate-spin" />
                  <p className="text-[#9ca3af] text-xs">Subiendo...</p>
                </div>
              ) : (
                <>
                  <div className="text-3xl mb-2">📂</div>
                  <p className="text-white text-sm font-semibold mb-1">Arrastra aquí</p>
                  <p className="text-[#9ca3af] text-xs mb-3">o haz clic para seleccionar</p>
                  <span className="px-3 py-1.5 bg-[#dc2626] text-white text-xs font-semibold rounded-lg">
                    Seleccionar archivo
                  </span>
                  <p className="text-[#9ca3af]/60 text-xs mt-3">PDF · Word (.doc · .docx)</p>
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
          className="text-red-400 text-xs flex items-center gap-1.5"
        >
          ⚠ {error}
        </motion.p>
      )}

      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.3, bounce: 0.2 }}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="text-3xl mb-3">🗑️</div>
              <h4 className="text-white font-bold text-lg mb-2">¿Eliminar archivo?</h4>
              <p className="text-[#9ca3af] text-sm mb-6 leading-relaxed">
                Esta acción no se puede deshacer. El archivo{' '}
                <span className="text-white font-medium">{fileName || slotLabel}</span> será eliminado
                permanentemente.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="flex-1 px-4 py-2.5 border border-[#2a2a2a] text-[#9ca3af] text-sm font-semibold rounded-xl hover:border-[#444] hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleRemove}
                  className="flex-1 px-4 py-2.5 bg-red-700 text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition-colors"
                >
                  Sí, eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface PdfUploaderProps {
  storageKey: string
  title: string
}

export default function PdfUploader({ storageKey, title }: PdfUploaderProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
      <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-[#dc2626] rounded-full" />
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DocSlot slotKey={storageKey} slotLabel="Documento 1" />
        <DocSlot slotKey={`${storageKey}_2`} slotLabel="Documento 2" />
      </div>
    </div>
  )
}
