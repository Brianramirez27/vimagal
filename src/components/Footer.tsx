import { Link } from 'react-router-dom'
import logo from '../assets/logo-vimagal.jpeg'

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-[#2a2a2a] pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Top grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Vimagal"
                className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-[#dc2626]/30"
              />
              <span className="text-white font-black text-xl tracking-tight">
                Vima<span className="text-[#dc2626]">gal</span>
              </span>
            </div>
            <p className="text-[#6b7280] text-sm leading-relaxed mb-5">
              Especialistas en ventanería, ornamentación y construcción. Calidad y precisión en cada proyecto.
            </p>
            {/* Social / WhatsApp CTA */}
            <a
              href="https://wa.me/573142436928"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25d366]/10 border border-[#25d366]/30 text-[#25d366] text-sm font-semibold hover:bg-[#25d366]/20 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.057 23.215a.75.75 0 00.921.921l5.356-1.476A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.698 9.698 0 01-4.95-1.356l-.355-.212-3.683 1.015 1.015-3.683-.212-.355A9.698 9.698 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-widest">Navegación</h4>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', anchor: 'inicio' },
                { label: 'Nosotros', anchor: 'nosotros' },
                { label: 'Servicios', anchor: 'servicios' },
                { label: 'Equipo', anchor: 'equipo' },
                { label: 'Galería', anchor: 'galeria' },
              ].map(({ label, anchor }) => (
                <li key={label}>
                  <button
                    onClick={() => document.querySelector(`#${anchor}`)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-[#6b7280] hover:text-[#dc2626] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#dc2626] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Modules */}
          <div>
            <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-widest">Módulos</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/vincular"
                  className="text-[#6b7280] hover:text-[#dc2626] text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#dc2626] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Vincular
                </Link>
              </li>
              <li>
                <Link
                  to="/integrar"
                  className="text-[#6b7280] hover:text-[#dc2626] text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#dc2626] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Integrar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-widest">Contáctanos</h4>
            <ul className="space-y-4">

              {/* Address */}
              <li className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-[#dc2626]/10 border border-[#dc2626]/20 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#dc2626]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#9ca3af] text-sm leading-snug">Carrera 26 n. 17 – 26 sur</p>
                  <p className="text-[#6b7280] text-xs">Bogotá, Colombia</p>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-[#dc2626]/10 border border-[#dc2626]/20 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#dc2626]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <a
                    href="mailto:ventas@vimagal.com"
                    className="text-[#9ca3af] hover:text-[#dc2626] text-sm transition-colors duration-200"
                  >
                    ventas@vimagal.com
                  </a>
                  <p className="text-[#6b7280] text-xs">Correo de ventas</p>
                </div>
              </li>

              {/* Phone */}
              <li className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-[#dc2626]/10 border border-[#dc2626]/20 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#dc2626]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.338c0-1.242.907-2.338 2.144-2.338h1.172c.904 0 1.676.628 1.89 1.51l.812 3.25a1.875 1.875 0 01-.52 1.835l-.617.617a16.532 16.532 0 006.653 6.653l.617-.617a1.875 1.875 0 011.835-.52l3.25.812A1.875 1.875 0 0121.75 18.39v1.172c0 1.237-1.096 2.144-2.338 2.144C8.53 21.706 2.25 15.424 2.25 6.338z" />
                  </svg>
                </div>
                <div>
                  <a href="tel:6015633196" className="text-[#9ca3af] hover:text-[#dc2626] text-sm transition-colors duration-200 block">
                    601 563 3196
                  </a>
                  <p className="text-[#6b7280] text-xs">Línea fija</p>
                </div>
              </li>

              {/* WhatsApp */}
              <li className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-[#25d366]/10 border border-[#25d366]/20 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#25d366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.057 23.215a.75.75 0 00.921.921l5.356-1.476A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.698 9.698 0 01-4.95-1.356l-.355-.212-3.683 1.015 1.015-3.683-.212-.355A9.698 9.698 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                </div>
                <div>
                  <a
                    href="https://wa.me/573142436928"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9ca3af] hover:text-[#25d366] text-sm transition-colors duration-200 block"
                  >
                    314 243 6928
                  </a>
                  <p className="text-[#6b7280] text-xs">Línea WhatsApp</p>
                </div>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1f1f1f] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#4b5563] text-xs">
            © {new Date().getFullYear()} <span className="text-[#6b7280]">Vimagal</span>. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-[#4b5563] text-xs">Sistema activo</span>
            </div>
            <span className="text-[#2a2a2a]">|</span>
            <span className="text-[#4b5563] text-xs">Bogotá, Colombia</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
