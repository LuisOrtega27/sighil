import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logoAlcaldia from "../assets/imgs/logos/LOGO ALCALDIA NUEVO.fw.png"

export const Login = () => {
  const [view, setView] = useState("login")
  const navigate = useNavigate()

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    alert("Accediendo al Panel Principal de SIGHIL...")
    navigate("/")
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    alert("Solicitud de registro enviada. El administrador del sistema validará tus credenciales.")
    setView("login")
  }

  return (
    <div className="bg-slate-950 text-slate-100 font-sans min-h-screen flex items-center justify-center p-4 md:p-8">

      <div className="w-full max-w-5xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col md:flex-row min-h-[600px]">

        {/* ============ PANEL CORPORATIVO ============ */}
        <div className="md:w-1/2 animated-grad p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            {/* Icono: fa-water (text-[300px]) — pendiente de agregar */}
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <img src={logoAlcaldia} alt="Logo Alcaldía" className="h-12 w-auto" />
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-red-400 block font-bold">Alcaldía de Caracas</span>
              <span className="text-xs text-slate-300 tracking-wider">Coordinación de Monitoreo de Quebradas y Obras Hidraulicas</span>
            </div>
          </div>

          <div className="relative z-10 my-8 md:my-0">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              SIGHIL
            </h1>
            <div className="h-1 w-16 bg-blue-500 rounded mb-6"></div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              <strong>Sistema de Información Geográfica e Hidrológica de Libertador</strong>.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Una plataforma analítica geoespacial diseñada para la gestión, control y monitoreo en tiempo real de la infraestructura hídrica, redes de drenaje urbano, variables meteorológicas y parámetros morfométricos de las cuencas del municipio. Optimizado para la mitigación de riesgos y soporte en la toma de decisiones ingenieriles.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Versión v0.1 (2026)</span>
            <span className="flex items-center gap-1.5">
              {/* Icono: fa-shield-halved text-blue-400 — pendiente de agregar */}
              Acceso Restringido
            </span>
          </div>
        </div>

        {/* ============ PANEL DE AUTENTICACIÓN ============ */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-slate-900/40">

          {view === "login" ? (
            <div className="space-y-6 block">
              <div>
                <h2 className="text-xl font-bold text-slate-100 tracking-wide">Ingreso al Sistema</h2>
                <p className="text-xs text-slate-400">Introduce tus credenciales autorizadas para acceder a los módulos.</p>
              </div>

              <form className="space-y-4" onSubmit={handleLoginSubmit}>
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Usuario Institucional</label>
                  <div className="relative">
                    <input type="text" placeholder="ej. jgomez" required className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-colors font-mono" />
                    {/* Icono: fa-user-tie (absolute left-3.5 top-3.5) — pendiente de agregar */}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Contraseña de Seguridad</label>
                    <a href="#" className="text-[10px] text-blue-400 hover:underline">¿La olvidaste?</a>
                  </div>
                  <div className="relative">
                    <input type="password" placeholder="••••••••••••" required className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-colors font-mono" />
                    {/* Icono: fa-lock (absolute left-3.5 top-3.5) — pendiente de agregar */}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input type="checkbox" id="remember" className="accent-blue-600 rounded" />
                  <label htmlFor="remember" className="text-[11px] text-slate-400 cursor-pointer select-none">Mantener sesión iniciada en este terminal</label>
                </div>

                <button type="submit" className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500 transition-all shadow-md shadow-blue-950/50 flex items-center justify-center gap-2">
                  {/* Icono: fa-right-to-bracket — pendiente de agregar */}
                  Autenticar Entrada
                </button>
              </form>

              <div className="text-center pt-4 border-t border-slate-800/80">
                <p className="text-xs text-slate-400">
                  ¿Es tu primera vez ingresando?
                  <button onClick={() => setView("register")} className="text-blue-400 font-bold hover:underline ml-1">Crea tu usuario aquí</button>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 block">
              <div>
                <h2 className="text-xl font-bold text-slate-100 tracking-wide flex items-center gap-2">
                  {/* Icono: fa-user-plus text-emerald-400 — pendiente de agregar */}
                  Solicitud de Registro
                </h2>
                <p className="text-xs text-slate-400">Crea una cuenta técnica. La cuenta requerirá aprobación del administrador.</p>
              </div>

              <form className="space-y-3" onSubmit={handleRegisterSubmit}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Nombre</label>
                    <input type="text" name="fname" placeholder="Ej. Juan" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Apellido</label>
                    <input type="text" name="lname" placeholder="Ej. Pérez" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Cedula de Identidad</label>
                  <input type="text" name="ci" placeholder="00.000.000" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors font-mono" />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Correo Institucional</label>
                  <input type="email" name="email" placeholder="jperez@alcaldia.gob" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors font-mono" />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Numero de Telefono</label>
                  <input type="text" name="phone" placeholder="0000-0000000" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors font-mono" />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Área o Departamento</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 transition-colors">
                    <option>Coordinación de Quebradas</option>
                    <option>Direción de Riesgos</option>
                    <option>Protección Civil</option>
                    <option>Sala de Riesgo</option>
                    <option>Presidencia</option>
                    <option>Visitante</option>
                    <option>Informatica</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Contraseña</label>
                    <input type="password" placeholder="••••••••" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors font-mono" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Confirmar</label>
                    <input type="password" placeholder="••••••••" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors font-mono" />
                  </div>
                </div>

                <button type="submit" className="w-full mt-2 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 transition-all shadow-md shadow-emerald-950/50">
                  Enviar Solicitud de Alta
                </button>
              </form>

              <div className="text-center pt-2">
                <button onClick={() => setView("login")} className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 mx-auto">
                  {/* Icono: fa-arrow-left — pendiente de agregar */}
                  Volver al inicio de sesión
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
