import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth"
import { canAccess, ROUTE_ACCESS } from "../auth/permissions"
import { INSTITUTION } from "../config/institution"

const menu = [
  {
    to: "/siroh",
    titulo: "SIROH",
    descripcion: "Módulo principal del SIROH.",
    icono: "📋",
  },
  {
    to: "/prmau",
    titulo: "PRMAU",
    descripcion: "Programa de Microzonificación y Asentamientos Urbanos.",
    icono: "🏘️",
  },
]

export const Home = () => {
  const { role, signOut } = useAuth()
  const navigate = useNavigate()
  const visibleMenu = menu.filter(({ to }) => canAccess(ROUTE_ACCESS[to], role))

  const handleLogout = async () => {
    await signOut()
    navigate("/login", { replace: true })
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* ============ BANNER ============ */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0 rounded-2xl bg-white/10 p-4">
            <img
              src={INSTITUTION.logo}
              alt={`Logo ${INSTITUTION.alcaldia}`}
              className="h-20 w-auto md:h-28"
            />
          </div>

          {/* Información institucional (fuente: config/institution.js) */}
          <div className="text-center md:text-left">
            <p className="text-xs md:text-sm uppercase tracking-widest text-sub">
              {INSTITUTION.alcaldia}
            </p>
            <h1 className="mt-1 text-3xl md:text-4xl font-extrabold">
              {INSTITUTION.nombre}
            </h1>
            <p className="mt-2 text-sm md:text-base text-slate-300">
              {INSTITUTION.sigla} • {INSTITUTION.tagline}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {INSTITUTION.coordinacion}
            </p>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
              {INSTITUTION.descripcion}
            </p>

            <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-3">
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-alert px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ============ MENÚ CENTRAL ============ */}
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-900">
            Menú principal
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Selecciona una opción para navegar entre las páginas del sistema.
          </p>

          <nav className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleMenu.map(({ to, titulo, descripcion, icono }) => (
              <Link
                key={to}
                to={to}
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-sub hover:shadow-lg"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl transition group-hover:bg-sub/10">
                  {icono}
                </span>
                <h3 className="mt-4 font-bold text-slate-900 group-hover:text-sub">
                  {titulo}
                </h3>
                <p className="mt-2 text-sm text-slate-500">{descripcion}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-sub">
                  Entrar →
                </span>
              </Link>
            ))}
          </nav>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Institución */}
          <div>
            <h4 className="text-white font-bold text-lg">{INSTITUTION.sigla}</h4>
            <p className="mt-2 text-sm text-slate-400">{INSTITUTION.nombre}</p>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed">
              {INSTITUTION.descripcion}
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-white font-bold text-lg">Enlaces rápidos</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {visibleMenu.map(({ to, titulo }) => (
                <li key={to}>
                  <Link to={to} className="transition hover:text-sub">
                    {titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Acceso */}
          <div>
            <h4 className="text-white font-bold text-lg">Acceso</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>{INSTITUTION.alcaldiaMunicipio}</li>
              <li>{INSTITUTION.gestion}</li>
              <li>{INSTITUTION.version}</li>
              <li>{INSTITUTION.acceso}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800">
          <div className="mx-auto max-w-6xl px-6 py-4 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} {INSTITUTION.alcaldia} — {INSTITUTION.sigla}
          </div>
        </div>
      </footer>
    </div>
  )
}
