import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo-vimagal.jpeg'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'Galería', href: '#galeria' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchor = (href: string) => {
    setMenuOpen(false)
    if (!isHome) return
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0d0d0d]/95 backdrop-blur-md shadow-lg shadow-black/50' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src={logo}
              alt="Vimagal"
              className="w-10 h-10 rounded-xl object-cover group-hover:scale-110 transition-transform shadow-lg shadow-red-900/40"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#22c55e] border-2 border-[#0d0d0d] animate-pulse" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-black text-xl tracking-tight">Vimagal</span>
            <span className="text-[#dc2626] text-[11px] font-semibold tracking-widest uppercase">Pyme Número 2</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {isHome && navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleAnchor(link.href)}
              className="text-[#9ca3af] hover:text-[#dc2626] text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
          {!isHome && (
            <Link to="/" className="text-[#9ca3af] hover:text-white text-sm font-medium transition-colors">
              ← Inicio
            </Link>
          )}
          <Link
            to="/vincular"
            className="px-4 py-2 bg-[#dc2626] text-white text-sm font-semibold rounded-lg hover:bg-[#ef4444] transition-colors duration-200 shadow-lg shadow-red-900/30"
          >
            Vincular
          </Link>
          <Link
            to="/integrar"
            className="px-4 py-2 border border-[#dc2626] text-[#dc2626] text-sm font-semibold rounded-lg hover:bg-[#dc2626] hover:text-white transition-colors duration-200"
          >
            Integrar
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#1a1a1a] border-t border-[#2a2a2a]"
          >
            <div className="flex flex-col px-4 py-4 gap-3">
              {isHome && navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleAnchor(link.href)}
                  className="text-left text-[#9ca3af] hover:text-[#dc2626] text-sm py-2 border-b border-[#2a2a2a] last:border-none transition-colors"
                >
                  {link.label}
                </button>
              ))}
              {!isHome && (
                <Link to="/" onClick={() => setMenuOpen(false)} className="text-[#9ca3af] text-sm py-2">
                  ← Inicio
                </Link>
              )}
              <Link to="/vincular" onClick={() => setMenuOpen(false)} className="px-4 py-2 bg-[#dc2626] text-white text-sm font-semibold rounded-lg text-center">
                Vincular
              </Link>
              <Link to="/integrar" onClick={() => setMenuOpen(false)} className="px-4 py-2 border border-[#dc2626] text-[#dc2626] text-sm font-semibold rounded-lg text-center">
                Integrar
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
