import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { toast } from "react-toastify"

import { changePassword, getProfile, updateProfile } from "../api/profile"
import { ROLE_LABELS } from "../auth/permissions"
import TopNavbar from "../components/TopNavbar"
import { PROFILE_AREAS } from "../config/profile"
import { useAuth } from "../context/auth"

const inputCls = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-sub focus:ring-1 focus:ring-sub"
const readonlyCls = "mt-1 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-500"

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
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    getValues: getPasswordValues,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isChangingPassword },
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
      /* El servidor solo acepta el correo: nunca enviamos el formulario completo. */
      const updated = await updateProfile({ email: values.email })
      setProfile(updated)
      reset(updated)
      await refreshUser()
      toast.success("Tu correo se actualizó correctamente")
    } catch (error) {
      toast.error(error.response?.data?.message ?? "No se pudo actualizar el correo")
    }
  })

  const onChangePassword = handlePasswordSubmit(async (values) => {
    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      })
      resetPassword()
      toast.success("Tu clave se actualizó correctamente")
    } catch (error) {
      toast.error(error.response?.data?.message ?? "No se pudo actualizar la clave")
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
          <>
            <div className="grid gap-6 md:grid-cols-[1fr_280px]">

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Datos personales</h2>
              <p className="mt-1 text-xs text-slate-500">
                Solo puedes cambiar tu correo electrónico y tu clave. Los demás datos, el rol y el estatus los administra el administrador del sistema.
              </p>

              <form className="mt-6 space-y-5" onSubmit={onSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <ProfileField label="Nombre">
                    <input
                      type="text"
                      className={readonlyCls}
                      disabled
                      {...register("fname")}
                    />
                  </ProfileField>

                  <ProfileField label="Apellido">
                    <input
                      type="text"
                      className={readonlyCls}
                      disabled
                      {...register("lname")}
                    />
                  </ProfileField>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <ProfileField label="Cédula de Identidad">
                    <input
                      type="text"
                      placeholder="00.000.000"
                      maxLength={10}
                      className={readonlyCls}
                      disabled
                      {...register("ci")}
                    />
                  </ProfileField>

                  <ProfileField label="Número de teléfono">
                    <input
                      type="text"
                      placeholder="0000-0000000"
                      maxLength={12}
                      className={readonlyCls}
                      disabled
                      {...register("phone")}
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

                <ProfileField label="Área o Departamento">
                  <select
                    className={readonlyCls}
                    disabled
                    {...register("direccion_id")}
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
                    {isSubmitting ? "Guardando…" : "Guardar correo"}
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
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">ID de usuario</dt>
                  <dd className="mt-0.5 font-mono font-extrabold text-slate-600">#{profile.id}</dd>
                </div>

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

              </dl>

              <p className="mt-6 border-t border-slate-100 pt-4 text-[11px] leading-relaxed text-slate-400">
                Estos datos, el rol y el estatus son asignados por el administrador del sistema y no se pueden modificar desde aquí.
              </p>
            </aside>

            </div>

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Cambiar clave</h2>
              <p className="mt-1 text-xs text-slate-500">
                Necesitas tu clave actual para establecer una nueva.
              </p>

              <form className="mt-6 grid gap-4 sm:grid-cols-3" onSubmit={onChangePassword} noValidate>
                <ProfileField label="Clave actual" error={passwordErrors.currentPassword?.message}>
                  <input
                    type="password"
                    autoComplete="current-password"
                    className={inputCls}
                    {...registerPassword("currentPassword", {
                      required: { value: true, message: "Introduce tu clave actual" },
                    })}
                  />
                </ProfileField>

                <ProfileField label="Nueva clave" error={passwordErrors.newPassword?.message}>
                  <input
                    type="password"
                    autoComplete="new-password"
                    className={inputCls}
                    {...registerPassword("newPassword", {
                      required: { value: true, message: "Introduce la nueva clave" },
                      minLength: { value: 6, message: "Mínimo 6 caracteres" },
                    })}
                  />
                </ProfileField>

                <ProfileField label="Confirmar nueva clave" error={passwordErrors.confirmPassword?.message}>
                  <input
                    type="password"
                    autoComplete="new-password"
                    className={inputCls}
                    {...registerPassword("confirmPassword", {
                      required: { value: true, message: "Confirma la nueva clave" },
                      validate: (value) => value === getPasswordValues("newPassword") || "Las claves no coinciden",
                    })}
                  />
                </ProfileField>

                <div className="flex flex-wrap gap-3 pt-2 sm:col-span-3">
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    {isChangingPassword ? "Guardando…" : "Cambiar clave"}
                  </button>
                  <button
                    type="button"
                    onClick={() => resetPassword()}
                    disabled={isChangingPassword}
                    className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-60"
                  >
                    Descartar cambios
                  </button>
                </div>
              </form>
            </section>
          </>
        ) : null}
      </div>
    </div>
  )
}
