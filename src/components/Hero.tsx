import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import hero1 from '../assets/hero1.jpeg'
import hero2 from '../assets/hero2.jpeg'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Red glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#dc2626] blur-[130px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* ── Left: Text ── */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#dc2626]/40 bg-[#dc2626]/10 text-[#dc2626] text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
            Industria automotriz &amp; construcción
          </motion.div>

          {/* Company name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl md:text-7xl font-black tracking-tight text-white leading-none mb-2"
          >
            Vimagal
          </motion.h1>

          {/* Team name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex items-center gap-3 mb-7"
          >
            <div className="h-px w-8 bg-[#dc2626]" />
            <span className="text-[#dc2626] text-sm font-bold tracking-widest uppercase">
              Equipo Pyme Número 2
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mb-10"
          >
            <p className="text-white text-xl font-bold leading-snug mb-3 max-w-xl">
              Metalmecánica, autopartes y construcción en un solo lugar.
            </p>
            <p className="text-[#9ca3af] text-base max-w-xl leading-relaxed">
              <span className="text-[#dc2626] font-semibold">VIMAGAL</span> fabrica sistemas de escape,
              estructuras metálicas y mobiliario híbrido; e instala ventanería, ornamentación,
              cubiertas de policarbonato e impermeabilización con más de{' '}
              <span className="text-white font-semibold">35 años</span> de experiencia en Colombia.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => document.querySelector('#nosotros')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-[#dc2626] text-white font-bold rounded-xl hover:bg-[#ef4444] transition-all duration-300 shadow-xl shadow-red-900/40 hover:shadow-red-900/60 hover:scale-105 active:scale-95"
            >
              Conócenos
            </button>
            <Link
              to="/vincular"
              className="px-8 py-4 border border-[#2a2a2a] text-white font-bold rounded-xl hover:border-[#dc2626] hover:text-[#dc2626] transition-all duration-300 hover:scale-105 active:scale-95 text-center"
            >
              Ver Evaluación →
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex gap-8 mt-12 pt-8 border-t border-[#1f1f1f]"
          >
            {[
              { value: '+35', label: 'Años exp.' },
              { value: '2012', label: 'En construcción' },
              { value: '100%', label: 'Compromiso' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-[#6b7280] text-xs font-medium uppercase tracking-wide mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: 2 Images ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative h-[480px] hidden lg:block"
        >
          {/* Decorative glow behind images */}
          <div className="absolute inset-0 bg-[#dc2626]/8 blur-[80px] rounded-full pointer-events-none" />

          {/* Image 1 — top-left, larger */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-[68%] h-[58%] rounded-2xl overflow-hidden shadow-2xl shadow-black/70 border border-white/10 ring-1 ring-[#dc2626]/20"
          >
            <img
              src={hero1}
              alt="Vimagal — Sistema de Seguridad y Salud en el Trabajo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>

          {/* Image 2 — bottom-right, slightly smaller */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            className="absolute bottom-0 right-0 w-[62%] h-[54%] rounded-2xl overflow-hidden shadow-2xl shadow-black/70 border border-[#dc2626]/25 ring-1 ring-[#dc2626]/15"
          >
            <img
              src={hero2}
              alt="Vimagal — Equipo Pyme Número 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>

          {/* Floating label on Image 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="absolute top-4 left-4 z-10 bg-[#0d0d0d]/90 backdrop-blur-sm border border-[#2a2a2a] rounded-xl px-3 py-2 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-white text-xs font-semibold">+35 años de experiencia</span>
          </motion.div>

          {/* Floating badge on Image 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
            className="absolute bottom-4 right-4 z-10 bg-[#dc2626] rounded-xl px-3 py-2 flex items-center gap-2"
          >
            <span className="text-lg">🔩</span>
            <span className="text-white text-xs font-bold">Metalmecánica & Construcción</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#9ca3af] text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-8 bg-gradient-to-b from-[#dc2626] to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
