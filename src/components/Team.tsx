import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import g1 from '../assets/grupo1.jpeg'
import g2 from '../assets/grupo2.jpeg'
import g3 from '../assets/grupo3.jpeg'
import g4 from '../assets/grupo4.jpeg'

interface Member {
  name: string
  role: string
  photo: string
  description: string
  tags: string[]
}

const sharedDescription =
  'Aprendiz en Gestión del Talento Humano con formación en los procesos de selección, capacitación, bienestar y desarrollo del personal. Aplica los conocimientos adquiridos en su etapa productiva para contribuir al fortalecimiento del equipo y la cultura organizacional de Vimagal.'

const sharedTags = ['Talento Humano', 'Capacitación', 'Bienestar']

const team: Member[] = [
  {
    name: 'Nicoll Delgado',
    role: 'Aprendiz',
    photo: g1,
    description: sharedDescription,
    tags: sharedTags,
  },
  {
    name: 'Jeimy Palacios',
    role: 'Aprendiz',
    photo: g2,
    description: sharedDescription,
    tags: sharedTags,
  },
  {
    name: 'Samira Garzón',
    role: 'Aprendiz',
    photo: g3,
    description: sharedDescription,
    tags: sharedTags,
  },
  {
    name: 'Nataly Mendoza',
    role: 'Aprendiz',
    photo: g4,
    description: sharedDescription,
    tags: sharedTags,
  },
]

export default function Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [selected, setSelected] = useState<Member | null>(null)

  return (
    <section id="equipo" className="py-24 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-0.5 bg-[#dc2626]" />
          <span className="text-[#dc2626] text-sm font-semibold uppercase tracking-widest">Equipo</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-white leading-tight mb-4"
        >
          Nuestro <span className="text-[#dc2626]">equipo</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#9ca3af] text-lg mb-14 max-w-2xl"
        >
          Aprendices del <span className="text-white font-semibold">Equipo Pyme Número 2</span> que aplican los procesos y conocimientos adquiridos en su formación para impulsar el crecimiento de Vimagal.
          <span className="text-[#6b7280] text-sm block mt-1">Haz clic en cualquier miembro para conocerlo mejor.</span>
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.button
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(member)}
              className="group text-center bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#dc2626]/50 rounded-2xl p-6 transition-colors duration-300 cursor-pointer w-full"
            >
              {/* Photo */}
              <div className="relative mx-auto mb-4 w-28 h-28">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#2a2a2a] group-hover:border-[#dc2626] transition-all duration-300 shadow-lg">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-[#dc2626]/25" />
                <div className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-[#22c55e] border-2 border-[#1a1a1a]" />
              </div>

              <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#dc2626] transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-[#9ca3af] text-sm mb-3">{member.role}</p>

              {/* Click hint */}
              <span className="inline-flex items-center gap-1 text-[#6b7280] text-xs group-hover:text-[#dc2626] transition-colors duration-300">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ver perfil
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Modal / Popup ── */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            {/* Modal card */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            >
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl p-8 mx-4 shadow-2xl shadow-black/80 relative overflow-hidden">
                {/* Red glow top-right */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#dc2626]/15 blur-2xl pointer-events-none" />

                {/* Close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#2a2a2a] hover:bg-[#dc2626] text-[#9ca3af] hover:text-white transition-all duration-200 flex items-center justify-center text-sm"
                >
                  ✕
                </button>

                {/* Photo */}
                <div className="flex justify-center mb-5">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#dc2626]/50 shadow-xl shadow-[#dc2626]/20">
                    <img
                      src={selected.photo}
                      alt={selected.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Name + role */}
                <div className="text-center mb-5">
                  <h3 className="text-white font-black text-xl mb-1">{selected.name}</h3>
                  <p className="text-[#dc2626] text-sm font-semibold">{selected.role}</p>
                </div>

                {/* Divider */}
                <div className="w-12 h-0.5 bg-[#dc2626] mx-auto mb-5" />

                {/* Description */}
                <p className="text-[#9ca3af] text-sm leading-relaxed text-center mb-5">
                  {selected.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-semibold border border-[#dc2626]/30 text-[#dc2626] bg-[#dc2626]/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
