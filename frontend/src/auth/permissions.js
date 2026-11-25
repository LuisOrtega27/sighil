/* Matriz unica de permisos del sistema.
   Roles: 1 = administrador, 2 = editor, 3 = lector, 4 = visitante. */

export const ROLES = Object.freeze({
  ADMIN: 1,
  EDITOR: 2,
  LECTOR: 3,
  VISITANTE: 4,
})

export const ROLE_LABELS = Object.freeze({
  [ROLES.ADMIN]: "Administrador",
  [ROLES.EDITOR]: "Editor",
  [ROLES.LECTOR]: "Lector",
  [ROLES.VISITANTE]: "Visitante",
})

const TODOS = [ROLES.ADMIN, ROLES.EDITOR, ROLES.LECTOR, ROLES.VISITANTE]
const GESTION = [ROLES.ADMIN, ROLES.EDITOR]
const CONSULTA = [ROLES.ADMIN, ROLES.EDITOR, ROLES.LECTOR]
const SOLO_ADMIN = [ROLES.ADMIN]

/* Rutas de React Router. /siroh se permite a todos porque adentro se filtran
   los modulos: el visitante solo ve el Geoportal. */
export const ROUTE_ACCESS = Object.freeze({
  "/": TODOS,
  "/login": TODOS,
  "/siroh": TODOS,
  "/siroh-raw-Form": GESTION,
  "/prmau": GESTION,
  "/perfil": TODOS,
  "/administracion": SOLO_ADMIN,
  "/acceso-denegado": TODOS,
})

/* Secciones internas de la pagina /siroh (ids del sidebar original). */
export const SIROH_SECTION_ACCESS = Object.freeze({
  territorial: CONSULTA,
  geoportal: TODOS,
  siroh: GESTION,
  meteorologia: CONSULTA,
  hidrologia: CONSULTA,
  morfometria: CONSULTA,
})

export const canAccess = (allowedRoles, role) => {
  if (!allowedRoles) return true
  return allowedRoles.includes(Number(role))
}
