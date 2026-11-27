import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import {
    changeAdminUserPassword,
    changeAdminUserRole,
    deleteAdminUser,
    getAdminStats,
    getAdminUsers,
    updateAdminUser,
} from "../api/admin"
import { ROLE_LABELS } from "../auth/permissions"
import TopNavbar from "../components/TopNavbar"
import { PROFILE_AREAS } from "../config/profile"
import { useAuth } from "../context/auth"

const STATUSES = ["pendiente", "activado", "desactivado"]
const RANGES = [
    { value: 7, label: "7 días" },
    { value: 30, label: "30 días" },
    { value: 0, label: "Todo" },
]

const inputCls = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none transition focus:border-sub focus:ring-1 focus:ring-sub"
const thCls = "px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wide text-slate-500"
const tdCls = "px-3 py-2 text-xs text-slate-700"

const AdminField = ({ label, error, children }) => (
    <label className="flex flex-col text-[11px] font-semibold text-slate-600">
        {label}
        {children}
        {error && <span className="mt-1 text-[10px] font-normal text-red-600">{error}</span>}
    </label>
)

const formatDay = (key) => {
    if (!key) return "Sin fecha"
    const [year, month, day] = key.split("-")
    return `${day}/${month}/${year}`
}

const statusCls = (status) =>
    status === "activado"
        ? "bg-emerald-100 text-emerald-700"
        : status === "pendiente"
            ? "bg-amber-100 text-amber-700"
            : "bg-slate-200 text-slate-600"

export const Admin = () => {
    const { user } = useAuth()
    const [users, setUsers] = useState([])
    const [stats, setStats] = useState(null)
    const [days, setDays] = useState(7)
    const [loadingUsers, setLoadingUsers] = useState(true)
    const [loadingStats, setLoadingStats] = useState(true)
    const [editingId, setEditingId] = useState(null)
    const [passwordId, setPasswordId] = useState(null)
    const [busyId, setBusyId] = useState(null)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        getValues: getPasswordValues,
        reset: resetPasswordForm,
        formState: { errors: passwordErrors },
    } = useForm()

    useEffect(() => {
        let active = true
        const load = async () => {
            try {
                const data = await getAdminUsers()
                if (active) setUsers(data)
            } catch (error) {
                if (active) toast.error(error.response?.data?.message ?? "No se pudieron cargar los usuarios")
            } finally {
                if (active) setLoadingUsers(false)
            }
        }
        load()
        return () => { active = false }
    }, [])

    useEffect(() => {
        let active = true
        const load = async () => {
            try {
                const data = await getAdminStats(days)
                if (active) setStats(data)
            } catch (error) {
                if (active) toast.error(error.response?.data?.message ?? "No se pudieron cargar las estadísticas")
            } finally {
                if (active) setLoadingStats(false)
            }
        }
        load()
        return () => { active = false }
    }, [days])

    const startEdit = (target) => {
        setPasswordId(null)
        setEditingId(target.id)
        reset({
            fname: target.fname ?? "",
            lname: target.lname ?? "",
            ci: target.ci ?? "",
            phone: target.phone ?? "",
            email: target.email ?? "",
            direccion_id: target.direccion_id ?? "",
            status: target.status ?? "pendiente",
        })
    }

    const cancelEdit = () => {
        setEditingId(null)
        reset({})
    }

    const startPassword = (target) => {
        setEditingId(null)
        setPasswordId(target.id)
        resetPasswordForm()
    }

    const cancelPassword = () => {
        setPasswordId(null)
        resetPasswordForm()
    }

    const onUpdate = handleSubmit(async (values) => {
        if (!editingId) return
        setBusyId(editingId)
        try {
            const updated = await updateAdminUser(editingId, values)
            setUsers((current) => current.map((row) => (row.id === editingId ? updated : row)))
            setEditingId(null)
            toast.success("Usuario actualizado correctamente")
        } catch (error) {
            toast.error(error.response?.data?.message ?? "No se pudo actualizar el usuario")
        } finally {
            setBusyId(null)
        }
    })

    const onPasswordSubmit = handlePasswordSubmit(async (values) => {
        if (!passwordId) return
        setBusyId(passwordId)
        try {
            await changeAdminUserPassword(passwordId, {
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
            })
            setPasswordId(null)
            resetPasswordForm()
            toast.success("Clave del usuario actualizada correctamente")
        } catch (error) {
            toast.error(error.response?.data?.message ?? "No se pudo actualizar la clave")
        } finally {
            setBusyId(null)
        }
    })

    const handleRoleChange = async (target, rolId) => {
        if (Number(target.rol_id) === Number(rolId)) return
        setBusyId(target.id)
        try {
            const updated = await changeAdminUserRole(target.id, rolId)
            setUsers((current) => current.map((row) => (row.id === target.id ? updated : row)))
            toast.success("Rol actualizado correctamente")
        } catch (error) {
            toast.error(error.response?.data?.message ?? "No se pudo cambiar el rol")
        } finally {
            setBusyId(null)
        }
    }

    const handleDelete = async (target) => {
        if (!window.confirm(`¿Eliminar al usuario ${target.fname} ${target.lname}?`)) return
        setBusyId(target.id)
        try {
            await deleteAdminUser(target.id)
            setUsers((current) => current.filter((row) => row.id !== target.id))
            toast.success("Usuario eliminado correctamente")
        } catch (error) {
            toast.error(error.response?.data?.message ?? "No se pudo eliminar el usuario")
        } finally {
            setBusyId(null)
        }
    }

    const changeRange = (range) => {
        setLoadingStats(true)
        setDays(range)
    }

    const dailyRows = (stats?.dates ?? []).map((date) => ({
        date,
        counts: (stats?.forms ?? []).map(
            (form) => form.byDay.find((day) => day.date === date)?.count ?? 0
        ),
    }))
    const maxCount = Math.max(1, ...dailyRows.flatMap((row) => row.counts))

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <div className="mx-auto max-w-6xl px-6 py-8">
                <TopNavbar section="administracion" />

                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Usuarios registrados</h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Edita datos, cambia roles, asigna claves o elimina cuentas. El rol y el estatus también se validan en el servidor.
                            </p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">
                            {users.length} usuarios
                        </span>
                    </div>

                    {loadingUsers ? (
                        <p className="mt-6 text-center text-sm text-slate-500">Cargando usuarios…</p>
                    ) : users.length === 0 ? (
                        <p className="mt-6 rounded-lg bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                            No hay usuarios registrados.
                        </p>
                    ) : (
                        <div className="mt-5 overflow-x-auto">
                            <table className="w-full min-w-[960px] border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50">
                                        <th className={thCls}>Nombre</th>
                                        <th className={thCls}>Correo</th>
                                        <th className={thCls}>Cédula</th>
                                        <th className={thCls}>Rol</th>
                                        <th className={thCls}>Área</th>
                                        <th className={thCls}>Estatus</th>
                                        <th className={thCls}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((row) => (
                                        <tr key={row.id} className="border-b border-slate-100">
                                            {editingId === row.id ? (
                                                <td colSpan={7} className="bg-slate-50 px-3 py-4">
                                                    <form onSubmit={onUpdate} noValidate className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                                        <AdminField label="Nombre" error={errors.fname?.message}>
                                                            <input type="text" className={inputCls} {...register("fname", { required: "Obligatorio", pattern: { value: /.{4,}/, message: "Mínimo 4 caracteres" } })} />
                                                        </AdminField>
                                                        <AdminField label="Apellido" error={errors.lname?.message}>
                                                            <input type="text" className={inputCls} {...register("lname", { required: "Obligatorio", pattern: { value: /.{4,}/, message: "Mínimo 4 caracteres" } })} />
                                                        </AdminField>
                                                        <AdminField label="Cédula" error={errors.ci?.message}>
                                                            <input type="text" maxLength={10} className={inputCls} {...register("ci", { required: "Obligatoria", pattern: { value: /^\d{1,2}\.\d{3}\.\d{3}$/, message: "Formato 00.000.000" } })} />
                                                        </AdminField>
                                                        <AdminField label="Teléfono" error={errors.phone?.message}>
                                                            <input type="text" maxLength={12} className={inputCls} {...register("phone", { required: "Obligatorio", pattern: { value: /^\d{4}-\d{7}$/, message: "Formato 0000-0000000" } })} />
                                                        </AdminField>
                                                        <AdminField label="Correo" error={errors.email?.message}>
                                                            <input type="email" className={inputCls} {...register("email", { required: "Obligatorio", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Correo inválido" } })} />
                                                        </AdminField>
                                                        <AdminField label="Área" error={errors.direccion_id?.message}>
                                                            <select className={inputCls} {...register("direccion_id", { required: "Obligatoria" })}>
                                                                {PROFILE_AREAS.map(({ id, label }) => (
                                                                    <option key={id} value={id}>{label}</option>
                                                                ))}
                                                            </select>
                                                        </AdminField>
                                                        <AdminField label="Estatus" error={errors.status?.message}>
                                                            <select className={inputCls} {...register("status", { required: "Obligatorio" })}>
                                                                {STATUSES.map((status) => (
                                                                    <option key={status} value={status}>{status}</option>
                                                                ))}
                                                            </select>
                                                        </AdminField>
                                                        <div className="flex items-end gap-2">
                                                            <button
                                                                type="submit"
                                                                disabled={busyId === row.id}
                                                                className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                                                            >
                                                                Guardar
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={cancelEdit}
                                                                className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                                                            >
                                                                Cancelar
                                                            </button>
                                                        </div>
                                                    </form>
                                                </td>
                                            ) : passwordId === row.id ? (
                                                <td colSpan={7} className="bg-slate-50 px-3 py-4">
                                                    <form onSubmit={onPasswordSubmit} noValidate className="grid gap-3 sm:grid-cols-2">
                                                        <AdminField label="Nueva clave" error={passwordErrors.newPassword?.message}>
                                                            <input type="password" autoComplete="new-password" className={inputCls} {...registerPassword("newPassword", { required: "Obligatoria", minLength: { value: 6, message: "Mínimo 6 caracteres" } })} />
                                                        </AdminField>
                                                        <AdminField label="Confirmar clave" error={passwordErrors.confirmPassword?.message}>
                                                            <input type="password" autoComplete="new-password" className={inputCls} {...registerPassword("confirmPassword", { required: "Obligatoria", validate: (value) => value === getPasswordValues("newPassword") || "Las claves no coinciden" })} />
                                                        </AdminField>
                                                        <div className="flex items-end gap-2 sm:col-span-2">
                                                            <button
                                                                type="submit"
                                                                disabled={busyId === row.id}
                                                                className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                                                            >
                                                                {busyId === row.id ? "Guardando…" : "Guardar"}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={cancelPassword}
                                                                className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                                                            >
                                                                Cancelar
                                                            </button>
                                                        </div>
                                                    </form>
                                                </td>
                                            ) : (
                                                <>
                                                    <td className={`${tdCls} font-semibold text-slate-900`}>
                                                        {row.fname} {row.lname}
                                                    </td>
                                                    <td className={tdCls}>{row.email}</td>
                                                    <td className={`${tdCls} font-mono`}>{row.ci ?? "—"}</td>
                                                    <td className={tdCls}>
                                                        <select
                                                            aria-label={`Rol de ${row.fname} ${row.lname}`}
                                                            value={row.rol_id}
                                                            disabled={busyId === row.id || Number(row.id) === Number(user?.id)}
                                                            onChange={(event) => handleRoleChange(row, event.target.value)}
                                                            className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-700 outline-none transition focus:border-sub disabled:opacity-60"
                                                        >
                                                            {Object.entries(ROLE_LABELS).map(([id, label]) => (
                                                                <option key={id} value={id}>{label}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td className={tdCls}>{row.direccion ?? "—"}</td>
                                                    <td className={tdCls}>
                                                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusCls(row.status)}`}>
                                                            {row.status ?? "—"}
                                                        </span>
                                                    </td>
                                                    <td className={tdCls}>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => startEdit(row)}
                                                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-100"
                                                            >
                                                                Editar
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => startPassword(row)}
                                                                disabled={busyId === row.id || Number(row.id) === Number(user?.id)}
                                                                title={Number(row.id) === Number(user?.id) ? "Cambia tu clave en Mi perfil" : undefined}
                                                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
                                                            >
                                                                Clave
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(row)}
                                                                disabled={busyId === row.id || Number(row.id) === Number(user?.id)}
                                                                className="rounded-lg bg-alert px-3 py-1.5 text-[11px] font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </div>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Estadísticas de formularios</h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Totales acumulados y registros por día según la fecha de carga de cada formulario.
                            </p>
                        </div>
                        <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
                            {RANGES.map(({ value, label }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => changeRange(value)}
                                    className={`rounded-md px-3 py-1.5 text-[11px] font-semibold transition ${days === value ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loadingStats ? (
                        <p className="mt-6 text-center text-sm text-slate-500">Cargando estadísticas…</p>
                    ) : stats ? (
                        <>
                            <div className="mt-5 grid gap-3 sm:grid-cols-3">
                                {(stats.forms ?? []).map((form) => (
                                    <div key={form.key} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                            {form.label}
                                        </p>
                                        <p className="mt-2 text-3xl font-black text-slate-900">
                                            {form.available ? form.total : "—"}
                                        </p>
                                        <p className="mt-1 text-[11px] text-slate-500">
                                            {form.available
                                                ? `${form.sinFecha} sin fecha`
                                                : form.message}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 overflow-x-auto">
                                <table className="w-full min-w-[720px] border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50">
                                            <th className={thCls}>Día</th>
                                            {(stats.forms ?? []).map((form) => (
                                                <th key={form.key} className={thCls}>{form.label}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dailyRows.length === 0 ? (
                                            <tr>
                                                <td colSpan={(stats.forms?.length ?? 0) + 1} className="px-3 py-6 text-center text-xs text-slate-500">
                                                    No hay registros con fecha en el rango seleccionado.
                                                </td>
                                            </tr>
                                        ) : (
                                            dailyRows.map((row) => (
                                                <tr key={row.date} className="border-b border-slate-100">
                                                    <td className={`${tdCls} font-semibold text-slate-600`}>{formatDay(row.date)}</td>
                                                    {row.counts.map((count, index) => (
                                                        <td key={stats.forms[index].key} className={tdCls}>
                                                            <div className="flex items-center gap-2">
                                                                <span className="w-6 text-right font-mono text-slate-600">{count}</span>
                                                                <div className="h-2 flex-1 rounded bg-slate-100">
                                                                    <div
                                                                        className="h-2 rounded bg-secondary"
                                                                        style={{ width: `${(count / maxCount) * 100}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <p className="mt-4 text-[11px] text-slate-400">
                                Rango: {stats.range?.from ? formatDay(stats.range.from) : "inicio"} — {formatDay(stats.range?.to)}
                            </p>
                        </>
                    ) : (
                        <p className="mt-6 text-center text-sm text-slate-500">No se pudieron cargar las estadísticas.</p>
                    )}
                </section>
            </div>
        </div>
    )
}
