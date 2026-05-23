import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

import galeria1 from '../assets/galeria1.jpg'
import galeria2 from '../assets/galeria2.jpg'
import galeria3 from '../assets/galeria3.jpeg'
import galeria4 from '../assets/galeria4.png'
import galeria5 from '../assets/galeria5.jpg'
import galeria6 from '../assets/galeria6.jpg'

const images = [
  { id: 1, src: galeria1, label: 'Nuestras Instalaciones' },
  { id: 2, src: galeria2, label: 'Sala de Reuniones' },
  { id: 3, src: galeria3, label: 'Equipo en Acción' },
  { id: 4, src: galeria4, label: 'Área de Trabajo' },
  { id: 5, src: galeria5, label: 'Eventos Corporativos' },
  { id: 6, src: galeria6, label: 'Capacitaciones' },
]

// Triplicar para que el loop sea completamente suave
const row1 = [...images, ...images, ...images]
const row2 = [...images, ...images, ...images]

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [selected, setSelected] = useState<{ src: string; label: string } | null>(null)
  const [paused, setPaused] = useState(false)

  return (
    <section id="galeria" className="py-24 bg-[#111111] overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-0.5 bg-[#dc2626]" />
          <span className="text-[#dc2626] text-sm font-semibold uppercase tracking-widest">Galería</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-white leading-tight mb-4"
        >
          Nuestra <span className="text-[#dc2626]">empresa</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#9ca3af] text-lg mb-14 max-w-2xl"
        >
          Un vistazo a nuestras instalaciones y cómo trabajamos día a día.
        </motion.p>
      </div>

      {/* Carrusel – dos filas moviéndose en sentidos opuestos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col gap-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fila 1 → izquierda */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4"
            style={{ width: 'max-content' }}
            animate={paused ? {} : { x: ['0%', '-33.333%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
          >
            {row1.map((img, i) => (
              <GalleryCard
                key={`r1-${i}`}
                img={img}
                onClick={() => setSelected(img)}
              />
            ))}
          </motion.div>
        </div>

        {/* Fila 2 → derecha */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4"
            style={{ width: 'max-content' }}
            animate={paused ? {} : { x: ['-33.333%', '0%'] }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
          >
            {row2.map((img, i) => (
              <GalleryCard
                key={`r2-${i}`}
                img={img}
                onClick={() => setSelected(img)}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-center text-brand-muted/50 text-sm mt-8 italic px-4"
      >
        Pasa el cursor para pausar • Haz clic en una imagen para ampliarla
      </motion.p>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-brand-red/40 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.src}
                alt={selected.label}
                className="w-full object-contain max-h-[80vh]"
              />
              <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/80 to-transparent p-5">
                <p className="text-white font-bold text-lg">{selected.label}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-[#dc2626] transition-colors text-lg font-bold"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function GalleryCard({
  img,
  onClick,
}: {
  img: { src: string; label: string }
  onClick: () => void
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden cursor-pointer border border-brand-border hover:border-brand-red transition-colors duration-300 shrink-0"
      style={{ width: 320, height: 220 }}
    >
      <img
        src={img.src}
        alt={img.label}
        className="w-full h-full object-cover"
        draggable={false}
      />
      {/* Overlay al hacer hover */}
      <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition-all duration-300 flex items-end">
        <div className="p-4 translate-y-4 opacity-0 hover:opacity-100 hover:translate-y-0 transition-all duration-300">
          <p className="text-white font-semibold text-sm drop-shadow">{img.label}</p>
        </div>
      </div>
      {/* Ícono de zoom */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-white text-sm">
        ⊕
      </div>
    </motion.div>
  )
}
