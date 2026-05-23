import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

import galeria1 from '../assets/galeria1.jpg'
import galeria2 from '../assets/galeria2.jpg'
import galeria3 from '../assets/galeria3.jpeg'
import galeria4 from '../assets/galeria4.png'
import galeria5 from '../assets/galeria5.jpg'
import galeria6 from '../assets/galeria6.jpg'

const categories = [
  {
    num: '01',
    icon: '🔩',
    name: 'Metalmecánica',
    tagline: 'Fabricación y estructuras metálicas de alta precisión',
    desc: 'Ofrecemos mobiliario híbrido de metal y madera, ductería de gas, shuts de basura, cajas metálicas, escaleras, cubiertas y mantenimiento de estructuras metálicas para proyectos de cualquier escala.',
    images: [galeria1, galeria4],
    services: [
      { name: 'Mobiliario híbrido metal y madera', icon: '🪑' },
      { name: 'Ductería de gas', icon: '🔧' },
      { name: 'Shuts de basura', icon: '🗑️' },
      { name: 'Cajas metálicas', icon: '📦' },
      { name: 'Escaleras metálicas', icon: '🪜' },
      { name: 'Cubiertas metálicas', icon: '🏠' },
      { name: 'Mantenimiento de estructuras', icon: '🛠️' },
    ],
  },
  {
    num: '02',
    icon: '🚗',
    name: 'Automotriz',
    tagline: 'Innovación y precisión para el sector automotriz',
    desc: 'Llevamos la innovación y precisión al sector automotriz con productos y servicios diseñados para mejorar el desempeño, la durabilidad y la eficiencia de los vehículos. Fabricamos autopartes con los más altos estándares de calidad.',
    images: [galeria2, galeria5],
    services: [
      { name: 'Sistemas de escape', icon: '💨' },
      { name: 'Soldadura de precisión', icon: '⚡' },
      { name: 'Doblado de tubería', icon: '🔄' },
      { name: 'Oxicorte', icon: '🔥' },
      { name: 'Fabricación de autopartes', icon: '⚙️' },
    ],
  },
  {
    num: '03',
    icon: '🏗️',
    name: 'Construcción',
    tagline: 'Soluciones integrales para obras de alto nivel',
    desc: 'Impermeabilización de cubiertas con manto foil y poliéster, instalación de cubiertas de policarbonato y mantenimiento de fachadas en altura, garantizando durabilidad y protección en cada proyecto.',
    images: [galeria3, galeria6],
    services: [
      { name: 'Impermeabilización manto foil', icon: '🛡️' },
      { name: 'Impermeabilización manto poliéster', icon: '🧱' },
      { name: 'Cubiertas de policarbonato', icon: '☀️' },
      { name: 'Mantenimiento de fachadas en altura', icon: '🏢' },
      { name: 'Ventanería y ornamentación', icon: '🪟' },
    ],
  },
]

// ── Imagen con ciclo automático ──────────────────────────────────────────────

function CyclingImage({ images, categoryKey }: { images: string[]; categoryKey: number }) {
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => { setImgIdx(0) }, [categoryKey])

  useEffect(() => {
    const t = setInterval(() => setImgIdx((p) => (p + 1) % images.length), 3000)
    return () => clearInterval(t)
  }, [images.length])

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={`${categoryKey}-${imgIdx}`}
          src={images[imgIdx]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setImgIdx(i)}
            className={`rounded-full transition-all duration-300 ${imgIdx === i ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  )
}

// ── Componente principal ─────────────────────────────────────────────────────

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  function switchTab(idx: number) {
    setDirection(idx > active ? 1 : -1)
    setActive(idx)
  }

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -30 }),
  }

  const cat = categories[active]

  return (
    <section id="servicios" className="py-24 px-4 bg-[#111111]" ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-0.5 bg-brand-red" />
          <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">Servicios</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-white leading-tight mb-4"
        >
          Lo que <span className="text-brand-red">ofrecemos</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-brand-muted text-lg mb-14 max-w-2xl"
        >
          Tres líneas de servicio especializadas para proyectos industriales, automotrices y de construcción.
        </motion.p>

        {/* Tarjetas de categoría */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          {categories.map((c, i) => (
            <motion.button
              key={c.num}
              onClick={() => switchTab(i)}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`relative text-left rounded-2xl p-6 border transition-all duration-300 overflow-hidden ${
                active === i
                  ? 'bg-brand-dark border-brand-red shadow-[0_0_30px_#dc262622]'
                  : 'bg-[#161616] border-brand-border hover:border-brand-red/50'
              }`}
            >
              {active === i && (
                <motion.div layoutId="cat-glow" className="absolute inset-0 bg-brand-red/5 rounded-2xl pointer-events-none" />
              )}
              <span className={`text-6xl font-black leading-none absolute right-4 top-3 select-none transition-colors duration-300 ${active === i ? 'text-brand-red/15' : 'text-white/5'}`}>
                {c.num}
              </span>
              <div className="relative">
                <div className="text-3xl mb-3">{c.icon}</div>
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 transition-colors duration-300 ${active === i ? 'text-brand-red' : 'text-[#6b7280]'}`}>{c.num}</p>
                <h3 className="text-white font-black text-xl mb-1">{c.name}</h3>
                <p className="text-[#6b7280] text-sm leading-snug">{c.tagline}</p>
              </div>
              {active === i && (
                <motion.div layoutId="cat-bar" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Panel de detalle con imágenes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="bg-[#161616] border border-brand-border rounded-3xl overflow-hidden"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="grid lg:grid-cols-[420px,1fr]"
            >
              {/* Imagen ciclante */}
              <div className="relative h-64 lg:h-auto min-h-75">
                <CyclingImage images={cat.images} categoryKey={active} />
                <div className="absolute top-4 left-4 z-10 bg-brand-black/80 backdrop-blur-sm border border-brand-red/40 rounded-xl px-3 py-2 flex items-center gap-2">
                  <span className="text-lg">{cat.icon}</span>
                  <div>
                    <p className="text-brand-red text-xs font-bold uppercase tracking-widest leading-none">{cat.num}</p>
                    <p className="text-white text-sm font-bold">{cat.name}</p>
                  </div>
                </div>
                <div className="absolute bottom-8 left-4 z-10">
                  <span className="bg-brand-red text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {cat.services.length} servicios
                  </span>
                </div>
              </div>

              {/* Descripción + servicios */}
              <div className="p-8 lg:p-10">
                <p className="text-brand-muted text-sm leading-relaxed mb-8">{cat.desc}</p>
                <p className="text-[#6b7280] text-xs uppercase tracking-widest font-bold mb-4">Servicios incluidos</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {cat.services.map((svc, i) => (
                    <motion.div
                      key={svc.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.07 }}
                      className="flex items-center gap-3 bg-brand-dark hover:bg-[#1e1e1e] border border-brand-border hover:border-brand-red/50 rounded-xl px-4 py-3 transition-all duration-200 group cursor-default"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform duration-200 shrink-0">{svc.icon}</span>
                      <span className="text-[#d1d5db] text-sm font-medium group-hover:text-white transition-colors duration-200">{svc.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-6">
          {categories.map((_, i) => (
            <button
              key={i}
              onClick={() => switchTab(i)}
              className={`rounded-full transition-all duration-300 ${active === i ? 'w-8 h-2 bg-brand-red' : 'w-2 h-2 bg-brand-border hover:bg-brand-red/50'}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
