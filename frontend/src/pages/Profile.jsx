import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { toast } from "react-toastify"

import { getProfile, updateProfile } from "../api/profile"
import { ROLE_LABELS } from "../auth/permissions"
import TopNavbar from "../components/TopNavbar"
import { PROFILE_AREAS } from "../config/profile"
import { useAuth } from "../context/auth"

const inputCls = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-sub focus:ring-1 focus:ring-sub"

const ProfileField = ({ label, error, children }) => (
  <label className="flex flex-col text-xs font-semibold text-slate-600">
    {label}
    {children}
    {error && <span className="mt-1 text-[11px] font-normal text-red-600">{error}</span>}
  </label>
)

export const Profile = () => {
  const { signOut, refreshUser } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loadError, setLoadError] = useState("")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  useEffect(() => {
    let active = true

    const loadProfile = async () => {
      try {
        const data = await getProfile()
        if (!active) return
        setProfile(data)
        reset(data)
      } catch (error) {
        if (!active) return
        setLoadError(error.response?.data?.message ?? "No se pudo cargar el perfil")
      }
    }

    loadProfile()
    return () => { active = false }
  }, [reset])

  const handleLogout = async () => {
    await signOut()
    navigate("/login", { replace: true })
  }

  const onSubmit = handleSubmit(async (values) => {
    try {
      const updated = await updateProfile(values)
      setProfile(updated)
      reset(updated)
      await refreshUser()
      toast.success("Tus datos se actualizaron correctamente")
    } catch (error) {
      toast.error(error.response?.data?.message ?? "No se pudo guardar el perfil")
    }
  })

  const areaLabel = PROFILE_AREAS.find(
    ({ id }) => Number(id) === Number(profile?.direccion_id)
  )?.label ?? "—"

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-5xl px-6 py-8">

        <TopNavbar section="perfil" onLogout={handleLogout} />

        {loadError && (
          <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-800">
            {loadError}
          </div>
        )}

        {!profile && !loadError ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            Cargando perfil…
          </div>
        ) : profile ? (
          <div className="grid gap-6 md:grid-cols-[1fr_280px]">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Datos personales</h2>
              <p className="mt-1 text-xs text-slate-500">
                Actualiza tu información. El rol y el estatus los administra el administrador del sistema.
              </p>

              <form className="mt-6 space-y-5" onSubmit={onSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <ProfileField label="Nombre" error={errors.fname?.message}>
                    <input
                      type="text"
                      className={inputCls}
                      {...register("fname", {
                        required: { value: true, message: "El nombre es obligatorio" },
                        pattern: { value: /.{4,}/, message: "Debe tener al menos 4 caracteres" },
                      })}
                    />
                  </ProfileField>

                  <ProfileField label="Apellido" error={errors.lname?.message}>
                    <input
                      type="text"
                      className={inputCls}
                      {...register("lname", {
                        required: { value: true, message: "El apellido es obligatorio" },
                        pattern: { value: /.{4,}/, message: "Debe tener al menos 4 caracteres" },
                      })}
                    />
                  </ProfileField>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <ProfileField label="Cédula de Identidad" error={errors.ci?.message}>
                    <input
                      type="text"
                      placeholder="00.000.000"
                      maxLength={10}
                      className={inputCls}
                      {...register("ci", {
                        required: { value: true, message: "La cédula es obligatoria" },
                        maxLength: { value: 10, message: "10 caracteres máximo" },
                        pattern: { value: /^\d{1,2}\.\d{3}\.\d{3}$/, message: "Formato: 00.000.000" },
                      })}
                    />
                  </ProfileField>

                  <ProfileField label="Número de teléfono" error={errors.phone?.message}>
                    <input
                      type="text"
                      placeholder="0000-0000000"
                      maxLength={12}
                      className={inputCls}
                      {...register("phone", {
                        required: { value: true, message: "El teléfono es obligatorio" },
                        maxLength: { value: 12, message: "12 caracteres máximo" },
                        pattern: { value: /^\d{4}-\d{7}$/, message: "Formato: 0000-0000000" },
                      })}
                    />
                  </ProfileField>
                </div>

                <ProfileField label="Correo institucional" error={errors.email?.message}>
                  <input
                    type="email"
                    className={inputCls}
                    {...register("email", {
                      required: { value: true, message: "El correo es obligatorio" },
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Introduce un correo válido" },
                    })}
                  />
                </ProfileField>

                <ProfileField label="Área o Departamento" error={errors.direccion_id?.message}>
                  <select
                    className={inputCls}
                    {...register("direccion_id", {
                      required: { value: true, message: "Selecciona un área o departamento" },
                    })}
                  >
                    {PROFILE_AREAS.map(({ id, label }) => (
                      <option key={id} value={id}>{label}</option>
                    ))}
                  </select>
                </ProfileField>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    {isSubmitting ? "Guardando…" : "Guardar cambios"}
                  </button>
                  <button
                    type="button"
                    onClick={() => reset(profile)}
                    disabled={isSubmitting}
                    className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-60"
                  >
                    Descartar cambios
                  </button>
                </div>
              </form>
            </section>

            <aside className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-900">Información de la cuenta</h2>

              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Usuario</dt>
                  <dd className="mt-0.5 font-semibold text-slate-800">
                    {profile.fname} {profile.lname}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Rol</dt>
                  <dd className="mt-0.5 font-semibold text-slate-800">
                    {ROLE_LABELS[profile.rol_id] ?? "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Área</dt>
                  <dd className="mt-0.5 font-semibold text-slate-800">{areaLabel}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Estatus</dt>
                  <dd className="mt-1">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${profile.status === "activado" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {profile.status ?? "—"}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">ID de usuario</dt>
                  <dd className="mt-0.5 font-mono text-xs text-slate-600">#{profile.id}</dd>
                </div>
              </dl>

              <p className="mt-6 border-t border-slate-100 pt-4 text-[11px] leading-relaxed text-slate-400">
                El rol y el estatus son asignados por el administrador del sistema y no se pueden modificar desde aquí.
              </p>
            </aside>
          </div>
        ) : null}
      </div>
    </div>
  )
}
