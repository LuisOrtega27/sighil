import { Link } from "react-router-dom"
import { useAuth } from "../context/auth"
import { ROLE_LABELS } from "../auth/permissions"
import { INSTITUTION } from "../config/institution"

export const AccessDenied = () => {
  const { role } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl">
        <div className="flex items-center justify-center gap-3 border-b border-slate-800 pb-5">
          <img
            src={INSTITUTION.logo}
            alt={`Logo ${INSTITUTION.alcaldia}`}
            className="h-10 w-auto"
          />
          <div className="text-left">
            <p className="text-sm font-bold text-white">{INSTITUTION.sigla}</p>
            <p className="text-[10px] text-slate-400">{INSTITUTION.alcaldia}</p>
          </div>
        </div>

        <p className="mt-5 font-mono text-5xl font-black text-alert">403</p>
        <h1 className="mt-4 text-xl font-bold tracking-wide">Acceso denegado</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Tu rol ({ROLE_LABELS[role] ?? "sin rol"}) no tiene permiso para ver esta sección.
          Si necesitas acceso, solicítalo al administrador del sistema.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-blue-500"
        >
          Volver al inicio
        </Link>

        <p className="mt-6 border-t border-slate-800 pt-4 text-[10px] text-slate-500">
          {INSTITUTION.nombre} • {INSTITUTION.version} • {INSTITUTION.acceso}
        </p>
      </div>
    </div>
  )
}
