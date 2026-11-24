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

import { INSTITUTION } from "../../config/institution";
import { EmptyRow } from "./helpers";
import { Field, FormRow } from "../formPrimitives";

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
        <div className="mb-6 rounded-lg border-t-4 border-secondary bg-white p-[30px] shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
          <h2 className="mb-1 text-xl font-bold uppercase text-primary">Catálogo e Inventario de la Red Pluviométrica</h2>
          <div className="mb-6 text-[12.5px] font-semibold uppercase tracking-[0.5px] text-[#64748b]">
            Estaciones Meteorológicas de Monitoreo Comunitario e Institucional
          </div>

          <div className="overflow-x-auto">
            <table className="mb-[15px] mt-2.5 w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Cód. Equipo</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Asignado</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Parroquia</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Responsable</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Estatus</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Acciones</th>
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

          <div id="ficha-estacion-detalle" className="hidden mt-[15px] rounded-md border border-line border-l-[5px] border-l-primary bg-[#fafafa] p-5" />

          <div id="form-edicion-estacion-box" className="hidden mt-[15px] rounded-md border border-line bg-white p-5">
            <h3 className="mb-[15px] text-[14px] font-bold uppercase text-primary">
              Editar Parámetros de Estación
            </h3>
            <form id="form-editar-estacion" onSubmit={handleEditSubmit}>
              <input type="hidden" id="edit-est-id" />
              <FormRow>
                <Field label="Sector">
                  <input type="text" id="edit-est-sector" className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none" />
                </Field>
                <Field label="Dirección del Equipo">
                  <input type="text" id="edit-est-direccion" className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none" />
                </Field>
                <Field label="Estatus del Equipo">
                  <select id="edit-est-estatus" defaultValue="ACTIVO" className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none">
                    {ESTACION_ESTATUS.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </Field>
              </FormRow>
              <Field label="Observación del Equipo" className="mb-[15px]">
                <input type="text" id="edit-est-observacion" className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none" />
              </Field>
              <button type="submit" className="cursor-pointer rounded border-none text-xs font-bold uppercase text-white transition-colors mr-0.5 bg-success px-2 py-1 text-[11px] hover:bg-[#047857]">
                Actualizar Estación
              </button>
              {/* El original ocultaba este bloque desde el boton Cancelar;
                  mientras la tabla no tenga datos, la caja permanece oculta. */}
              <button type="button" className="cursor-pointer rounded border-none text-xs font-bold uppercase text-white transition-colors mr-0.5 bg-[#64748b] px-2 py-1 text-[11px] hover:bg-[#475569]">
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ===================== CARGA ===================== */}
      <div id="met-subview-carga" className={subCls("carga")}>
        <div className="mb-6 rounded-lg border-t-4 border-secondary bg-white p-[30px] shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
          <h2 className="mb-1 text-xl font-bold uppercase text-primary">Ingesta y Carga de Valores Pluviométricos</h2>
          <div className="mb-6 text-[12.5px] font-semibold uppercase tracking-[0.5px] text-[#64748b]">
            Captura simultánea para la red de monitoreo en tiempo real
          </div>

          <form onSubmit={handleCargaSubmit}>
            <FormRow className="mb-5 max-w-[300px]">
              <Field label="Fecha de Captura de Datos">
                <input type="date" id="carga-lectura-fecha" required className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none" />
              </Field>
            </FormRow>

            <div className="mb-[15px] max-h-[400px] overflow-y-auto rounded-md border border-line">
              <table className="mb-[15px] mt-2.5 w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Código Equipo</th>
                    <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Parroquia / Sector / Responsable</th>
                    <th className={`border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary w-[180px]`}>
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

            <button type="submit" className="cursor-pointer rounded border-none text-xs font-bold uppercase text-white transition-colors bg-success px-5 py-2.5 hover:bg-[#047857]">
              💾 Inyectar Lecturas al Dashboard
            </button>
          </form>
        </div>
      </div>

      {/* ===================== HISTORICO ===================== */}
      <div id="met-subview-historico" className={subCls("historico")}>
        <div className="mb-6 rounded-lg border-t-4 border-secondary bg-white p-[30px] shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
          <h2 className="mb-1 text-xl font-bold uppercase text-primary">Historial y Registro Cronológico de Ingestas</h2>
          <div className="mb-6 text-[12.5px] font-semibold uppercase tracking-[0.5px] text-[#64748b]">
            Base de datos de lecturas registradas en la plataforma
          </div>
          <table className="mb-[15px] mt-2.5 w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Fecha de Lectura</th>
                <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Código Equipo</th>
                <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Parroquia</th>
                <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Precipitación (mm)</th>
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
        <div className="mb-6 rounded-lg border-t-4 border-secondary bg-white p-[30px] shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
          <h2 className="mb-1 text-xl font-bold uppercase text-primary">
            Matriz Pluviométrica Histórica Anual Consolidadas
          </h2>
          <div className="mb-6 text-[12.5px] font-semibold uppercase tracking-[0.5px] text-[#64748b]">
            Acumulado mensual del Municipio {INSTITUTION.municipio} (mm) registrado desde el 2019
          </div>
          <div className="overflow-x-auto">
            <table className={`mb-[15px] mt-2.5 w-full border-collapse text-center`}>
              <thead>
                <tr>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">AÑO</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">ENE</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">FEB</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">MAR</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">ABR</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">MAY</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">JUN</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">JUL</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">AGO</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">SEP</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">OCT</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">NOV</th>
                  <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">DIC</th>
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
        <div className="mb-6 rounded-lg border-t-4 border-secondary bg-white p-[30px] shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
          <h2 className="mb-1 text-xl font-bold uppercase text-primary">Panel Integral Meteorológico</h2>
          <div className="mb-6 text-[12.5px] font-semibold uppercase tracking-[0.5px] text-[#64748b]">
            Dashboard Interactivo de Alerta Temprana - {INSTITUTION.organismoSigla}
          </div>

          <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
            <div className="rounded-md border-l-4 border-secondary bg-lightblue p-4 text-center">
              <p className="text-[11px] font-bold uppercase text-[#64748b]">Red Total de Equipos</p>
              <h3 id="dash-kpi-total" className="mt-1.5 text-[22px] font-bold text-primary">
                27 Estaciones
              </h3>
            </div>
            <div className="rounded-md border-l-4 border-success bg-lightblue p-4 text-center">
              <p className="text-[11px] font-bold uppercase text-[#64748b]">Equipos Operativos Activos</p>
              <h3 id="dash-kpi-activos" className="mt-1.5 text-[22px] font-bold text-primary">
                19 Activos
              </h3>
            </div>
            <div className="rounded-md border-l-4 border-warning bg-lightblue p-4 text-center">
              <p className="text-[11px] font-bold uppercase text-[#64748b]">Pico de Lluvia en Sesión</p>
              <h3 id="dash-kpi-pico" className="mt-1.5 text-[22px] font-bold text-primary">
                0.0 mm
              </h3>
            </div>
          </div>

          <div className="rounded-md bg-[#1e293b] p-[25px] font-mono text-[12.5px] leading-[1.6] text-white">
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
