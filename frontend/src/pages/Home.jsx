import { Link } from "react-router-dom"

const institucion = {
  nombre: "Nombre de la Institución",
  eslogan: "Eslogan o lema institucional (placeholder)",
  descripcion:
    "Espacio reservado para la información de la institución: misión, objeto social o breve descripción del organismo. Reemplaza este texto con el contenido oficial.",
  direccion: "Dirección de la institución (placeholder)",
  telefono: "(000) 000-0000",
  correo: "contacto@institucion.gob",
}

const menu = [
  {
    to: "/",
    titulo: "Inicio",
    descripcion: "Página principal del sistema.",
    icono: "🏠",
  },
  {
    to: "/login",
    titulo: "Iniciar sesión",
    descripcion: "Acceso al panel con usuario y contraseña.",
    icono: "🔐",
  },
  {
    to: "/siroh",
    titulo: "SIROH",
    descripcion: "Módulo principal del SIROH.",
    icono: "📋",
  },
  {
    to: "/siroh-raw-Form",
    titulo: "SIROH (Formato original)",
    descripcion: "Formulario SIROH en su formato original.",
    icono: "📝",
  },
]

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* ============ BANNER ============ */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center gap-8">
          {/* Placeholder del logo / imagen institucional */}
          <div className="shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-2xl border-2 border-dashed border-white/40 bg-white/10 flex flex-col items-center justify-center text-center text-white/70 text-xs md:text-sm p-3">
            <span className="text-3xl md:text-4xl mb-1">🏛️</span>
            <span>Logo / imagen de la institución (placeholder)</span>
          </div>

          {/* Información de la institución */}
          <div className="text-center md:text-left">
            <p className="text-xs md:text-sm uppercase tracking-widest text-sub">
              Información de la institución (placeholder)
            </p>
            <h1 className="mt-1 text-3xl md:text-4xl font-extrabold">
              {institucion.nombre}
            </h1>
            <p className="mt-2 text-sm md:text-base text-slate-300">
              {institucion.eslogan}
            </p>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
              {institucion.descripcion}
            </p>

            <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-3">
              <Link
                to="/login"
                className="rounded-lg bg-sub px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/siroh"
                className="rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ir a SIROH
              </Link>
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
            {menu.map(({ to, titulo, descripcion, icono }) => (
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
            <h4 className="text-white font-bold text-lg">{institucion.nombre}</h4>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              {institucion.descripcion}
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-white font-bold text-lg">Enlaces rápidos</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {menu.map(({ to, titulo }) => (
                <li key={to}>
                  <Link to={to} className="transition hover:text-sub">
                    {titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto (placeholder) */}
          <div>
            <h4 className="text-white font-bold text-lg">Contacto</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>📍 {institucion.direccion}</li>
              <li>📞 {institucion.telefono}</li>
              <li>✉️ {institucion.correo}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800">
          <div className="mx-auto max-w-6xl px-6 py-4 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} {institucion.nombre} — Todos los
            derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
