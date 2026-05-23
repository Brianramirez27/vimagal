import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

export default function ActionButtons() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            ¿Listo para <span className="text-[#dc2626]">comenzar</span>?
          </h2>
          <p className="text-[#9ca3af] text-lg max-w-xl mx-auto">
            Explora nuestras herramientas de evaluación e integración empresarial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Vincular card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link to="/vincular" className="block group">
              <div className="relative overflow-hidden bg-gradient-to-br from-[#dc2626]/20 to-[#1a1a1a] border border-[#dc2626]/40 rounded-2xl p-8 hover:border-[#dc2626] transition-all duration-300 hover:shadow-xl hover:shadow-red-900/30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#dc2626]/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="text-5xl mb-4">🔗</div>
                <h3 className="text-white font-black text-2xl mb-3 group-hover:text-[#dc2626] transition-colors duration-300">
                  Vincular
                </h3>
                <p className="text-[#9ca3af] mb-6 leading-relaxed">
                  Accede al sistema de evaluación de desempeño, flujo de procesos y políticas organizacionales.
                </p>
                <span className="inline-flex items-center gap-2 text-[#dc2626] font-semibold group-hover:gap-4 transition-all duration-300">
                  Ir a Vincular →
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Integrar card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/integrar" className="block group">
              <div className="relative overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 hover:border-[#9ca3af]/40 transition-all duration-300 hover:shadow-xl hover:shadow-black/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-white font-black text-2xl mb-3 group-hover:text-[#9ca3af] transition-colors duration-300">
                  Integrar
                </h3>
                <p className="text-[#9ca3af] mb-6 leading-relaxed">
                  Próximamente: herramientas de integración avanzada para conectar todos los sistemas de tu empresa.
                </p>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2a2a2a] text-[#9ca3af] text-sm font-semibold">
                  Próximamente
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
