import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import PdfUploader from '../components/PdfUploader'
import Footer from '../components/Footer'

// ── Data ──────────────────────────────────────────────────────────────────────

const introItems = [
  {
    icon: '🎯',
    title: 'Objetivo',
    desc: 'Fortalecer el proceso de vinculación del talento humano de la empresa VIMAGAL mediante el diseño e implementación de herramientas, formatos y material de apoyo que permitan optimizar la gestión documental, orientar los procesos de contratación y garantizar un ingreso organizado del personal, contribuyendo al cumplimiento de la normatividad laboral y al mejoramiento de la gestión del talento humano dentro de la organización.',
  },
  {
    icon: '🔭',
    title: 'Alcance',
    desc: 'Fortalecer los procesos relacionados con la vinculación del talento humano, promoviendo una gestión más organizada, eficiente y alineada con los lineamientos laborales, que facilite el adecuado ingreso del personal y contribuya al mejoramiento organizacional de VIMAGAL.',
  },
  {
    icon: '🏆',
    title: 'Importancia',
    desc: 'La importancia de este proceso radica en que permite que la empresa Vimagal cuente con personal idóneo y correctamente vinculado, garantizando el cumplimiento de las normas laborales y el buen ambiente de trabajo. Además, ayuda a mantener el orden en la documentación, prevenir situaciones de acoso laboral o sexual y asegurar que tanto la empresa como los trabajadores conozcan sus derechos y deberes desde el inicio de la relación laboral.',
  },
]

const aperturaItems = [
  { title: 'Lista de chequeo de documentos',   storageKey: 'vincular_lista_chequeo' },
  { title: 'Manual organización de carpeta',   storageKey: 'vincular_manual_carpeta' },
  { title: 'Elección de contratos / Formatos', storageKey: 'vincular_eleccion_contratos' },
  { title: 'Manual de afiliaciones',           storageKey: 'vincular_manual_afiliaciones' },
  { title: 'Apertura cuenta de nómina',        storageKey: 'vincular_apertura_nomina' },
  { title: 'Formato de gestión carné y carnet', storageKey: 'vincular_formato_gestion' },
  { title: 'Carta entrega de dotación',        storageKey: 'vincular_carta_dotacion' },
]

const normativaItems = [
  { title: 'Tipos de contrato',                          storageKey: 'vincular_tipos_contrato' },
  { title: 'Vacaciones — Cartilla y formatos',           storageKey: 'vincular_cartilla_vacaciones' },
  { title: 'Dotación y EPP — Cartilla',                  storageKey: 'vincular_dotacion_epp' },
  { title: 'Maternidad — Cartilla y formatos',           storageKey: 'vincular_maternidad' },
  { title: 'Acoso laboral — Cartilla y formatos',        storageKey: 'vincular_acoso_laboral' },
]

// ── Components ─────────────────────────────────────────────────────────────────

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#dc2626] shadow-lg shadow-red-900/50 shrink-0">
          <span className="text-white font-black text-lg leading-none">{number}</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-white leading-none">{title}</h2>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-[#dc2626] via-[#dc2626]/25 to-transparent" />
    </div>
  )
}

function SubsectionPanel({
  title,
  icon,
  children,
}: {
  title: string
  icon: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl border border-[#2e2e2e] overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 bg-[#1e1e1e] hover:bg-[#252525] transition-colors text-left gap-4"
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl shrink-0">{icon}</span>
          <span className="text-white text-xl font-bold">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="w-8 h-8 rounded-full bg-[#dc2626]/15 border border-[#dc2626]/30 flex items-center justify-center text-[#dc2626] text-sm shrink-0"
        >
          ▾
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 py-5 bg-[#141414] border-t border-[#2e2e2e] space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TextAccordion({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#282828] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-[#1a1a1a] hover:bg-[#202020] transition-colors text-left gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-base shrink-0">{icon}</span>
          <span className="text-[#d1d5db] font-semibold text-sm">{title}</span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#dc2626] shrink-0 text-xs"
        >
          ▾
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 py-4 bg-[#111] border-t border-[#282828]">
              <p className="text-[#9ca3af] text-sm leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function PdfAccordion({ title, storageKey }: { title: string; storageKey: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#282828] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-[#1a1a1a] hover:bg-[#202020] transition-colors text-left gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-base shrink-0">📄</span>
          <span className="text-[#d1d5db] font-semibold text-sm">{title}</span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#dc2626] shrink-0 text-xs"
        >
          ▾
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-[#111] border-t border-[#282828]">
              <PdfUploader storageKey={storageKey} title={title} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function Vincular() {
  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />

      {/* Hero banner */}
      <div className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.04)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-[#dc2626] rounded-full blur-[100px] pointer-events-none"
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#9ca3af] hover:text-white text-sm mb-8 transition-colors"
          >
            ← Volver al inicio
          </Link>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-0.5 bg-[#dc2626]" />
            <span className="text-[#dc2626] text-sm font-semibold uppercase tracking-widest">Módulo</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-white mb-4"
          >
            Sistema <span className="text-[#dc2626]">Vincular</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#9ca3af] text-xl max-w-2xl leading-relaxed"
          >
            Evaluación de desempeño, gestión de procesos y políticas organizacionales de Pyme Número 2.
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-28 space-y-24">

        {/* ════════════════════ INICIO ════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader number="01" title="Inicio" />

          <div className="space-y-4">
            {/* Introducción */}
            <SubsectionPanel title="Introducción" icon="📖">
              {introItems.map((item) => (
                <TextAccordion key={item.title} icon={item.icon} title={item.title} desc={item.desc} />
              ))}
            </SubsectionPanel>

            {/* Flujograma */}
            <SubsectionPanel title="Flujograma" icon="📊">
              <PdfUploader storageKey="vincular_flujograma" title="Flujograma y Matriz Detallada" />
            </SubsectionPanel>

            {/* Políticas */}
            <SubsectionPanel title="Políticas organizacionales" icon="📜">
              <PdfUploader storageKey="vincular_politicas" title="Políticas Organizacionales" />
            </SubsectionPanel>
          </div>
        </motion.section>

        {/* ════════════════════ DESARROLLO ════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader number="02" title="Desarrollo" />

          <div className="space-y-4">
            {/* Apertura historial de trabajadores */}
            <SubsectionPanel title="Apertura historial de trabajadores" icon="👥">
              {aperturaItems.map((item) => (
                <PdfAccordion key={item.storageKey} title={item.title} storageKey={item.storageKey} />
              ))}
            </SubsectionPanel>

            {/* Normativa */}
            <SubsectionPanel title="Normatividad" icon="⚖️">
              {normativaItems.map((item) => (
                <PdfAccordion key={item.storageKey} title={item.title} storageKey={item.storageKey} />
              ))}
            </SubsectionPanel>
          </div>
        </motion.section>

      </div>

      <Footer />
    </div>
  )
}
