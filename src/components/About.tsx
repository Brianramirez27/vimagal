import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// ── Datos ───────────────────────────────────────────────────────────────────

const stats = [
  { value: 35, suffix: '+', label: 'Años de experiencia' },
  { value: 2012, suffix: '', label: 'Inicio en construcción' },
  { value: 2, suffix: '', label: 'Sectores especializados' },
  { value: 100, suffix: '%', label: 'Soluciones integrales' },
]

const timeline = [
  {
    year: '1989',
    title: 'Fundación',
    desc: 'Nacemos en la industria metalmecánica con foco en autopartes y sistemas de escape para el sector automotriz colombiano.',
    icon: '🏭',
  },
  {
    year: '2005',
    title: 'Crecimiento',
    desc: 'Expandimos capacidad productiva y consolidamos alianzas estratégicas con los principales fabricantes del sector.',
    icon: '📈',
  },
  {
    year: '2012',
    title: 'Nueva rama',
    desc: 'Diversificamos hacia ventanería y ornamentación, abriendo un nuevo frente en el sector de la construcción.',
    icon: '🏗️',
  },
  {
    year: 'Hoy',
    title: 'Líderes nacionales',
    desc: 'Empresa de referencia en Colombia con dos líneas de negocio consolidadas y presencia en proyectos de gran escala.',
    icon: '🏆',
  },
]

const misionVision = [
  {
    tag: 'Misión',
    title: 'Impulsar el desarrollo de la infraestructura y el transporte en Colombia',
    body: 'Transformar la industria metalmecánica y de construcción con soluciones confiables que generen empleo y aporten valor real a cada proyecto, desde autopartes hasta grandes obras de infraestructura.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    tag: 'Visión',
    title: 'Ser una marca nacional de primer nivel',
    body: 'Liderar en tecnología, calidad, diseño e innovación tanto en sistemas de escape como en construcción, siendo referente indiscutible en Colombia e iniciando expansión regional hacia 2030.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

const values = [
  {
    icon: '🏢',
    title: 'Creamos valor para Constructoras',
    description: 'Soluciones integrales en ornamentación, ventanería, ductería e impermeabilización con alta calidad, eficiencia en costos y tiempos óptimos.',
    detail: 'Trabajamos con las principales constructoras del país ofreciendo un portafolio completo que reduce la necesidad de múltiples proveedores.',
  },
  {
    icon: '👷',
    title: 'Mejoramos la calidad de vida',
    description: 'Condiciones laborales seguras y saludables para nuestros trabajadores, priorizando el bienestar de nuestra gente en todas las operaciones.',
    detail: 'Nuestro programa de bienestar laboral incluye capacitación continua, seguridad industrial y beneficios extrasalariales para todo el equipo.',
  },
  {
    icon: '⚡',
    title: 'Diversificación para mejores soluciones',
    description: 'Nuestra diversificación garantiza una solución integral que ofrece confianza y tranquilidad en cada proyecto.',
    detail: 'Al operar en autopartes y construcción simultáneamente, transferimos tecnología y buenas prácticas entre sectores para innovar constantemente.',
  },
]

const TABS = ['Historia', 'Misión & Visión', 'Compromiso'] as const

// ── Sub-componentes ─────────────────────────────────────────────────────────

function AnimatedStat({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => Math.round(v))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, value, { duration: 1.8, ease: 'easeOut' })
    const unsub = rounded.on('change', setDisplay)
    return () => { controls.stop(); unsub() }
  }, [inView, value, mv, rounded])

  return (
    <div className="text-4xl font-black text-[#dc2626] mb-1 tabular-nums">
      {display}{suffix}
    </div>
  )
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-5 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200 ${
        active ? 'text-white' : 'text-[#6b7280] hover:text-[#9ca3af]'
      }`}
    >
      {active && (
        <motion.span
          layoutId="tab-pill"
          className="absolute inset-0 bg-[#dc2626] rounded-full"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  )
}

function ValueCard({ item }: { item: typeof values[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      layout
      onClick={() => setOpen((o) => !o)}
      whileHover={{ y: -3 }}
      className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#dc2626]/60 rounded-2xl p-6 cursor-pointer transition-colors duration-300 select-none"
    >
      <div className="text-3xl mb-3">{item.icon}</div>
      <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
      <p className="text-[#6b7280] text-sm leading-relaxed">{item.description}</p>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-3 border-t border-[#2a2a2a]">
              <p className="text-[#9ca3af] text-sm leading-relaxed">{item.detail}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-3 flex items-center gap-1 text-[#dc2626] text-xs font-semibold">
        <span>{open ? 'Ver menos' : 'Leer más'}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          ↓
        </motion.span>
      </div>
    </motion.div>
  )
}

// ── Componente principal ────────────────────────────────────────────────────

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState(0)
  const [direction, setDirection] = useState(1)

  function handleTab(idx: number) {
    setDirection(idx > activeTab ? 1 : -1)
    setActiveTab(idx)
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  }

  return (
    <section id="nosotros" className="py-24 px-4 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-0.5 bg-[#dc2626]" />
          <span className="text-[#dc2626] text-sm font-semibold uppercase tracking-widest">Nosotros</span>
        </motion.div>

        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 max-w-3xl"
        >
          Experiencia y diversificación{' '}
          <span className="text-[#dc2626]">en un solo lugar</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#9ca3af] text-lg leading-relaxed mb-14 max-w-3xl"
        >
          Con más de <span className="text-white font-semibold">35 años en la industria metalmecánica</span>,
          nos especializamos en autopartes y, desde{' '}
          <span className="text-white font-semibold">2012</span>, en ventanería y ornamentación.
        </motion.p>

        {/* Stats con contadores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: '#dc2626' }}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 text-center transition-colors duration-300"
            >
              <AnimatedStat value={stat.value} suffix={stat.suffix} inView={inView} />
              <div className="text-[#9ca3af] text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="bg-[#161616] border border-[#2a2a2a] rounded-3xl p-8"
        >
          {/* Barra de pestañas */}
          <div className="flex gap-1 bg-[#0d0d0d] rounded-full p-1 w-fit mb-10">
            {TABS.map((tab, i) => (
              <TabButton key={tab} label={tab} active={activeTab === i} onClick={() => handleTab(i)} />
            ))}
          </div>

          {/* Contenido de la pestaña activa */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeTab}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* ── Pestaña 0: Historia ── */}
                {activeTab === 0 && (
                  <div className="relative pl-6">
                    {/* Línea vertical */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-[#2a2a2a]" />

                    <div className="flex flex-col gap-10">
                      {timeline.map((item, i) => (
                        <motion.div
                          key={item.year}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          className="relative"
                        >
                          {/* Punto en la línea */}
                          <div className="absolute -left-[1.85rem] top-1 w-4 h-4 rounded-full bg-[#dc2626] border-2 border-[#161616] shadow-[0_0_8px_#dc2626aa]" />

                          <div className="flex items-start gap-4">
                            <span className="text-2xl mt-0.5">{item.icon}</span>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="text-[#dc2626] font-black text-lg">{item.year}</span>
                                <span className="text-white font-bold">{item.title}</span>
                              </div>
                              <p className="text-[#6b7280] text-sm leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Pestaña 1: Misión & Visión ── */}
                {activeTab === 1 && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {misionVision.map((item, i) => (
                      <motion.div
                        key={item.tag}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.12 }}
                        className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#dc2626]/60 rounded-2xl p-7 relative overflow-hidden transition-colors duration-300"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#dc2626] rounded-l-2xl" />
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-[#dc2626]/15 border border-[#dc2626]/30 flex items-center justify-center text-[#dc2626]">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-[#dc2626] text-xs font-bold uppercase tracking-widest">{item.tag}</p>
                            <p className="text-white font-bold text-sm leading-snug">{item.title}</p>
                          </div>
                        </div>
                        <p className="text-[#9ca3af] text-sm leading-relaxed">{item.body}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* ── Pestaña 2: Compromiso ── */}
                {activeTab === 2 && (
                  <div>
                    <p className="text-[#6b7280] text-sm mb-6">Haz clic en cada tarjeta para leer más.</p>
                    <div className="grid md:grid-cols-3 gap-5">
                      {values.map((item) => (
                        <ValueCard key={item.title} item={item} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
