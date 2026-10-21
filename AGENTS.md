# AGENTS.md

Guía para agentes de código (OpenCode, Claude Code, Cursor, etc.) que
trabajen en este repositorio.

## Visión general

SIGHIL — Sistema de gestión hidrológica municipal (Alcaldía del Municipio
Libertador / IMGRAD). Monorepo con dos proyectos independientes:

- `frontend/` — SPA en React (Vite + Tailwind).
- `backend/` — API REST en Express (MySQL + JWT).

## Comandos

Siempre ejecutarse desde el directorio correspondiente:

| Comando | Dónde | Qué hace |
|---|---|---|
| `npm run dev` | `frontend/` | Servidor de desarrollo Vite |
| `npm run lint` | `frontend/` | ESLint (debe pasar en 0 errores) |
| `npm run build` | `frontend/` | Build de producción (debe pasar) |
| `npm run dev` | `backend/` | Servidor Express con nodemon |

**Regla:** toda tarea que toque frontend se da por terminada solo después de
`npm run lint` **y** `npm run build` sin errores.

## Stack

**Frontend:** Vite 8 · React 19 · react-router-dom 7 · Tailwind CSS v4
(`@import "tailwindcss"` + tokens en `@theme` de `src/index.css`) · ESLint
(preset de Vite: react-hooks + react-refresh, `allowConstantExport: true`).

**Backend:** Express 5 · MySQL2 · JWT en cookies (`jsonwebtoken` +
`cookie-parser`) · `bcryptjs` · `dotenv` · `pino` · nodemon.

## Rutas del frontend (`src/App.jsx`)

- `/` → `Home`
- `/login` → `Login`
- `/siroh` → `Siroh` (dashboard SIROH: territorial, geoportal, form de 7
  pestañas, meteorología, hidrología, morfometría)
- `/siroh-raw-Form` → `SirohRawForm` (versión plana del formulario)

## Backend (`backend/src/`)

Estructura: `routes/ → controllers/ → middlewares/ → lib/`, más `database.js`.

- Puerto: `PORT` de `.env` o `4001`; CORS solo permite `http://localhost:5173`.
- Endpoints: `/api/auth`, `/api/users`, `/api/profile` (protegido con
  `authRequired`).
- `usersRequest.http` en la raíz de `backend/` para probar requests.
- El `.env` existe y **no debe subirse** al repo (ver `.gitignore`).

## Convenciones del frontend (reglas duras)

1. **No eliminar los HTML originales** (`frontend/src/pages/*.html`):
   son la fuente de verdad de las migraciones a React y se conservan como
   referencia.
2. **Migración HTML → React** (patrón ya aplicado en `Login.jsx` y
   `Siroh.jsx` + `siroh/`):
   - Estilos → constantes Tailwind en `styles.js`; CSS propio solo para lo
     que Tailwind no cubre (animaciones, `:has()`, scroll-snap), en un
     `*.css` mínimo importado por el componente.
   - Marcado repetitivo → arrays en `options.js` + componentes helper en
     `helpers.jsx` (`Field`, `CheckItem`, `RadioItem`, `TabBtn`, ...).
   - Conservar **verbatim** ids, names, patterns, placeholders y textos del
     original (incluidos sus errores de tipeo).
3. **Nunca combinar utilidades Tailwind del mismo atributo** en una misma
   clase (ej. `bg-secondary` + `bg-success`): crear una constante aparte
   con color/padding propios; el orden en el CSS generado no es garantizable.
4. **Sin backend disponible:** los submits usan `e.preventDefault()` +
   `alert(...)` + comentario `// TODO(backend)`; las tablas vacías muestran
   una fila "Sin datos — pendiente de conexión con el backend."
5. **Iconos:** dejar el espacio vacío con un comentario marcador; el
   usuario los agrega después (no agregar CDN de Font Awesome).
6. El estado de las secciones SPA se alterna con `hidden` (sin desmontar)
   para conservar el estado de los formularios.
7. Tras cualquier cambio, verificar con `npm run lint` y `npm run build`.

## Trabajo pendiente / TODOs conocidos

- **Sin migrar:** `morfometria.html`, `inventario-hidrografico.html` (y
  cualquier HTML restante de `frontend/src/pages/`).
- **Google Maps** (`siroh/Geoportal.jsx`): el loader de la API está
  adaptado, pero falta `initMap` y el mapa real (el JS original
  `js/services/google_maps_api/map.js` no existe); `model-viewer` y
  `extended-component-library` no se incluyen porque nada los usa.
- **Backend:** todas las tablas y submits del frontend están esperando
  endpoints (marcados `TODO(backend)` en el código).
- Búsqueda de TODOs: `grep -r "TODO(" frontend/src`.
