import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Integrar() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#2a2a2a] pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#dc2626]/20 pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#dc2626] blur-[80px] pointer-events-none"
        />

        <div className="relative z-10 text-center max-w-2xl">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.8, bounce: 0.4 }}
            className="text-7xl mb-8 inline-block"
          >
            ⚡
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#9ca3af]/20 bg-[#9ca3af]/5 text-[#9ca3af] text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            En desarrollo
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight mb-4"
          >
            Módulo{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9ca3af] to-white">
              Integrar
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#9ca3af] text-xl mb-4 leading-relaxed"
          >
            Próximamente
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[#9ca3af]/70 text-base mb-10 leading-relaxed"
          >
            Estamos desarrollando herramientas avanzadas de integración para conectar todos los sistemas
            de tu empresa en un solo lugar. Regresa pronto.
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-10"
          >
            <div className="flex justify-between text-xs text-[#9ca3af] mb-2">
              <span>Progreso del módulo</span>
              <span>35%</span>
            </div>
            <div className="h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '35%' }}
                transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-white font-bold rounded-xl hover:border-[#dc2626] hover:text-[#dc2626] transition-all duration-300"
            >
              ← Volver al inicio
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
