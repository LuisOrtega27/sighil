/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/Meteorologia.jsx
   Seccion Meteorologia Municipal con sus 5 subvistas (antes:
   #page-meteorologia de siroh.html).
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Notas de migracion:
   - En el original TODAS las subvistas arrancaban con display:none y el
     JS (inexistente) mostraba "estaciones" al entrar; aqui el subestado
     vive en el orquestador (Siroh.jsx) con "estaciones" por defecto.
   - Tablas vacias: sus filas las generaban js/base.js +
     js/services/* (inexistentes en el repo). Se dejan con fila
     "sin datos" y TODO por cada una.
   - Los formularios ocultos (edicion de estacion) se conservan en el
     marcado listos para cuando exista ese backend. */

import {
  BTN_SMALL_GRAY,
  BTN_SMALL_SUCCESS,
  BTN_SUCCESS,
  CARD,
  CARD_SUB,
  CARD_TITLE,
  DARK_PANEL,
  EDIT_BOX,
  FICHA_MODAL,
  INPUT,
  KPI_CARD,
  KPI_CARD_GREEN,
  KPI_CARD_H3,
  KPI_CARD_ORANGE,
  KPI_CARD_P,
  KPI_GRID,
  SELECT,
  TABLE,
  TH,
} from "./styles";
import { EmptyRow, Field, FormRow } from "./helpers";

const ESTACION_ESTATUS = [
  "ACTIVO",
  "INACTIVO",
  "EQUIPO RETIRADO Y BAJO RESGUARDO",
  "RETIRO DE EQUIPO",
  "ENTREGADO A MINEC - UTEC CARACAS",
];

const Meteorologia = ({ sub }) => {
  const subCls = (key) => (sub === key ? "" : "hidden");

  const handleCargaSubmit = (e) => {
    e.preventDefault();
    // TODO(backend): procesarCargaLecturas() del original (js/ ausente).
    alert("Ingesta de lecturas pendiente de conexión con el backend.");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // TODO(backend): guardarEdicionEstacion() del original (js/ ausente).
    alert("Estación actualizada (pendiente de conexión con el backend).");
  };

  return (
    <>
      {/* ===================== ESTACIONES ===================== */}
      <div id="met-subview-estaciones" className={subCls("estaciones")}>
        <div className={CARD}>
          <h2 className={CARD_TITLE}>Catálogo e Inventario de la Red Pluviométrica</h2>
          <div className={CARD_SUB}>
            Estaciones Meteorológicas de Monitoreo Comunitario e Institucional
          </div>

          <div className="overflow-x-auto">
            <table className={TABLE}>
              <thead>
                <tr>
                  <th className={TH}>Cód. Equipo</th>
                  <th className={TH}>Asignado</th>
                  <th className={TH}>Parroquia</th>
                  <th className={TH}>Responsable</th>
                  <th className={TH}>Estatus</th>
                  <th className={TH}>Acciones</th>
                </tr>
              </thead>
              <tbody id="tabla-estaciones-met">
                {/* TODO(backend): poblar estaciones (js/base.js, services/… inexistente). */}
                <EmptyRow colSpan={6}>
                  Sin datos registrados — pendiente de conexión con el backend.
                </EmptyRow>
              </tbody>
            </table>
          </div>

          <div id="ficha-estacion-detalle" className={FICHA_MODAL} />

          <div id="form-edicion-estacion-box" className={EDIT_BOX}>
            <h3 className="mb-[15px] text-[14px] font-bold uppercase text-primary">
              Editar Parámetros de Estación
            </h3>
            <form id="form-editar-estacion" onSubmit={handleEditSubmit}>
              <input type="hidden" id="edit-est-id" />
              <FormRow>
                <Field label="Sector">
                  <input type="text" id="edit-est-sector" className={INPUT} />
                </Field>
                <Field label="Dirección del Equipo">
                  <input type="text" id="edit-est-direccion" className={INPUT} />
                </Field>
                <Field label="Estatus del Equipo">
                  <select id="edit-est-estatus" defaultValue="ACTIVO" className={SELECT}>
                    {ESTACION_ESTATUS.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </Field>
              </FormRow>
              <Field label="Observación del Equipo" className="mb-[15px]">
                <input type="text" id="edit-est-observacion" className={INPUT} />
              </Field>
              <button type="submit" className={BTN_SMALL_SUCCESS}>
                Actualizar Estación
              </button>
              {/* El original ocultaba este bloque desde el boton Cancelar;
                  mientras la tabla no tenga datos, la caja permanece oculta. */}
              <button type="button" className={BTN_SMALL_GRAY}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ===================== CARGA ===================== */}
      <div id="met-subview-carga" className={subCls("carga")}>
        <div className={CARD}>
          <h2 className={CARD_TITLE}>Ingesta y Carga de Valores Pluviométricos</h2>
          <div className={CARD_SUB}>
            Captura simultánea para la red de monitoreo en tiempo real
          </div>

          <form onSubmit={handleCargaSubmit}>
            <FormRow className="mb-5 max-w-[300px]">
              <Field label="Fecha de Captura de Datos">
                <input type="date" id="carga-lectura-fecha" required className={INPUT} />
              </Field>
            </FormRow>

            <div className="mb-[15px] max-h-[400px] overflow-y-auto rounded-md border border-line">
              <table className={TABLE}>
                <thead>
                  <tr>
                    <th className={TH}>Código Equipo</th>
                    <th className={TH}>Parroquia / Sector / Responsable</th>
                    <th className={`${TH} w-[180px]`}>
                      Precipitación Acumulada (mm)
                    </th>
                  </tr>
                </thead>
                <tbody id="tabla-carga-lecturas-cuerpo">
                  {/* TODO(backend): generar filas por estacion (JS original ausente). */}
                  <EmptyRow colSpan={3}>
                    Sin lecturas para cargar — pendiente de conexión con el backend.
                  </EmptyRow>
                </tbody>
              </table>
            </div>

            <button type="submit" className={BTN_SUCCESS}>
              💾 Inyectar Lecturas al Dashboard
            </button>
          </form>
        </div>
      </div>

      {/* ===================== HISTORICO ===================== */}
      <div id="met-subview-historico" className={subCls("historico")}>
        <div className={CARD}>
          <h2 className={CARD_TITLE}>Historial y Registro Cronológico de Ingestas</h2>
          <div className={CARD_SUB}>
            Base de datos de lecturas registradas en la plataforma
          </div>
          <table className={TABLE}>
            <thead>
              <tr>
                <th className={TH}>Fecha de Lectura</th>
                <th className={TH}>Código Equipo</th>
                <th className={TH}>Parroquia</th>
                <th className={TH}>Precipitación (mm)</th>
              </tr>
            </thead>
            <tbody id="tabla-historico-lecturas">
              {/* Texto estatico del propio original (no requeria JS). */}
              <EmptyRow colSpan={4}>
                No se han inyectado lecturas en la sesión actual.
              </EmptyRow>
            </tbody>
          </table>
        </div>
      </div>

      {/* ===================== ANUAL ===================== */}
      <div id="met-subview-anual" className={subCls("anual")}>
        <div className={CARD}>
          <h2 className={CARD_TITLE}>
            Matriz Pluviométrica Histórica Anual Consolidadas
          </h2>
          <div className={CARD_SUB}>
            Acumulado mensual del Municipio Libertador (mm) registrado desde el 2019
          </div>
          <div className="overflow-x-auto">
            <table className={`${TABLE} text-center`}>
              <thead>
                <tr>
                  <th className={TH}>AÑO</th>
                  <th className={TH}>ENE</th>
                  <th className={TH}>FEB</th>
                  <th className={TH}>MAR</th>
                  <th className={TH}>ABR</th>
                  <th className={TH}>MAY</th>
                  <th className={TH}>JUN</th>
                  <th className={TH}>JUL</th>
                  <th className={TH}>AGO</th>
                  <th className={TH}>SEP</th>
                  <th className={TH}>OCT</th>
                  <th className={TH}>NOV</th>
                  <th className={TH}>DIC</th>
                </tr>
              </thead>
              <tbody id="tabla-matriz-anual-cuerpo">
                {/* TODO(backend): matriz anual desde 2019 (JS original ausente). */}
                <EmptyRow colSpan={13}>
                  Sin datos registrados — pendiente de conexión con el backend.
                </EmptyRow>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===================== DASHBOARD ===================== */}
      <div id="met-subview-dashboard" className={subCls("dashboard")}>
        <div className={CARD}>
          <h2 className={CARD_TITLE}>Panel Integral Meteorológico</h2>
          <div className={CARD_SUB}>
            Dashboard Interactivo de Alerta Temprana - IMGRAD
          </div>

          <div className={KPI_GRID}>
            <div className={KPI_CARD}>
              <p className={KPI_CARD_P}>Red Total de Equipos</p>
              <h3 id="dash-kpi-total" className={KPI_CARD_H3}>
                27 Estaciones
              </h3>
            </div>
            <div className={KPI_CARD_GREEN}>
              <p className={KPI_CARD_P}>Equipos Operativos Activos</p>
              <h3 id="dash-kpi-activos" className={KPI_CARD_H3}>
                19 Activos
              </h3>
            </div>
            <div className={KPI_CARD_ORANGE}>
              <p className={KPI_CARD_P}>Pico de Lluvia en Sesión</p>
              <h3 id="dash-kpi-pico" className={KPI_CARD_H3}>
                0.0 mm
              </h3>
            </div>
          </div>

          <div className={DARK_PANEL}>
            <span className="font-bold text-[#10b981]">
              // MAPA DE CALOR Y ALERTAS POR PARROQUIAS URBANO/RURALES
            </span>
            <br />
            <div id="dash-grafico-simulado">
              Cargue lecturas diarias en la sección &quot;Carga&quot; para calcular la
              distribución espacial de las lluvias de hoy.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Meteorologia;
