/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/Territorial.jsx
   Seccion "Gestion de Inventario de Cuerpos de Agua" (antes:
   #page-territorial de siroh.html, con su form #form-hidro).
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Notas de migracion:
   - La validacion de cotas (#alerta-cotas) la ejecutaba el JS original
     (js/components/mainForm.js — inexistente en el repo); aqui se
     implementa en React: cota_minima >= cota_maxima => alerta y no envia.
   - El select "sub_cuenca" se habilitaba/llenaba desde ese mismo JS:
     aqui se habilita al elegir cuenca, pero queda SIN datos y SIN
     "required" (TODO) para no bloquear el envio del formulario.
   - El original no declaraba onsubmit en #form-hidro (se resolvia en el JS
     ausente); aqui se preventDefault + alert, como en Login.jsx. */

import { useState } from "react";
import {
  CbGrid,
  Field,
  FormRow,
  RadioItem,
  SectionTitle,
} from "../formPrimitives";

const Territorial = () => {
  const [cotaError, setCotaError] = useState(false);
  const [cuenca, setCuenca] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const cotaMax = parseFloat(form.cota_maxima.value);
    const cotaMin = parseFloat(form.cota_minima.value);

    if (!Number.isNaN(cotaMax) && !Number.isNaN(cotaMin) && cotaMin >= cotaMax) {
      setCotaError(true);
      return;
    }
    setCotaError(false);

    // TODO(backend): persistir el inventario; de momento solo alert.
    alert("Inventario de Cuerpos de Agua guardado (pendiente de conexión con el backend).");
  };

  return (
    <div className="mb-6 rounded-lg border-t-4 border-secondary bg-white p-[30px] shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
      <h2 className="mb-1 text-xl font-bold uppercase text-primary">Gestion de Inventario de Cuerpos de Agua</h2>
      <div className="mb-6 text-[12.5px] font-semibold uppercase tracking-[0.5px] text-[#64748b]">
        Formulario Tecnico de Gestion de Cuerpos de Agua
      </div>

      <form id="form-hidro" onSubmit={handleSubmit}>
        {/* ---- 1 Identificación y Clasificación Básica ---- */}
        <div className="form-seccion">
          <SectionTitle>1 Identificación y Clasificación Básica</SectionTitle>

          <FormRow>
            <Field
              label={<>Tipo de Cuerpo de Agua <span>*</span></>}
              htmlFor="hidro__tipo_cuerpo_agua"
            >
              <select
                name="hidro__tipo_cuerpo_agua"
                id="hidro__tipo_cuerpo_agua"
                required
                defaultValue=""
                className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none"
              >
                <option value="" disabled>
                  Seleccione una opción...
                </option>
                <option value="Rio">Río</option>
                <option value="Quebrada">Quebrada</option>
                <option value="Torrentera">Torrentera</option>
              </select>
            </Field>

            <Field
              label={<>Nombre del Cuerpo de Agua <span>*</span></>}
              htmlFor="hidro__nombre"
            >
              <input
                type="text"
                name="hidro__nombre"
                id="hidro__nombre"
                placeholder="Ej. Catuche"
                required
                className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none"
              />
            </Field>
          </FormRow>

          <h5 className="text-sm font-bold">
            Jerarquía del Flujo <span>*</span>
          </h5>
          <CbGrid>
            <RadioItem
              id="hidro__jerarquia_flujo__principal"
              name="hidro__jerarquia_flujo"
              value="Principal"
              label="Curso Principal"
              defaultChecked
            />
            <RadioItem
              id="hidro__jerarquia_flujo__secundario"
              name="hidro__jerarquia_flujo"
              value="Secundario"
              label="Curso Secundario / Afluente"
            />
          </CbGrid>
        </div>

        {/* ---- 2 Zonificación Hidrográfica ---- */}
        <div className="form-seccion">
          <SectionTitle>2 Zonificación Hidrográfica</SectionTitle>

          <FormRow>
            <Field label={<>Cuenca Principal <span>*</span></>} htmlFor="cuenca_principal">
              <select
                id="cuenca_principal"
                name="cuenca_principal"
                required
                defaultValue=""
                onChange={(e) => setCuenca(e.target.value)}
                className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none"
              >
                <option value="" disabled>
                  Seleccione...
                </option>
                <option value="Guaire">Guaire</option>
                <option value="Tacagua">Tacagua</option>
              </select>
            </Field>

            {/* TODO(backend): poblar subcuencas segun la cuenca elegida
                (lo hacia js/components/mainForm.js — inexistente en el repo).
                Se omitio "required" mientras no haya datos para no bloquear
                el envio del formulario. */}
            <Field label={<>Sub-cuenca <span>*</span></>} htmlFor="sub_cuenca">
              <select
                id="sub_cuenca"
                name="sub_cuenca"
                disabled={!cuenca}
                className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none"
              >
                <option value="">
                  {cuenca
                    ? "Sin subcuencas registradas (pendiente de backend)"
                    : "Seleccione una sub-cuenca..."}
                </option>
              </select>
            </Field>

            <Field label="Micro-cuenca">
              <input
                type="text"
                name="micro_cuenca"
                placeholder="Ej. Tramo Alto"
                className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none"
              />
            </Field>
          </FormRow>
        </div>

        {/* ---- 3 Parámetros Técnicos y Georreferenciación ---- */}
        <div className="form-seccion">
          <SectionTitle>3 Parámetros Técnicos y Georreferenciación</SectionTitle>

          {cotaError && (
            <div id="alerta-cotas" className="mb-3 border-l-4 border-alert bg-[#fde8e6] px-3 py-2.5 text-xs font-semibold text-alert">
              Inconsistencia Hidráulica: La cota mínima de desembocadura no
              puede ser mayor o igual a la cota de nacimiento.
            </div>
          )}

          <FormRow>
            <Field
              label={<>Cota Máxima (msnm) <span>*</span></>}
              htmlFor="hidro__cota_maxima"
            >
              <input
                type="number"
                id="hidro__cota_maxima"
                name="cota_maxima"
                placeholder="Naciente"
                required
                className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none"
              />
            </Field>

            <Field
              label={<>Cota Mínima (msnm) <span>*</span></>}
              htmlFor="hidro__cota_minima"
            >
              <input
                type="number"
                id="hidro__cota_minima"
                name="cota_minima"
                placeholder="Desembocadura"
                required
                className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none"
              />
            </Field>

            <Field
              label={<>Coordenada Este (X) <span>*</span></>}
              htmlFor="hidro__utm_este"
            >
              <input
                type="number"
                name="hidro__utm_este"
                placeholder="Ej. 727639"
                required
                className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none"
              />
            </Field>

            <Field
              label={<>Coordenada Norte (Y) <span>*</span></>}
              htmlFor="hidro__utm_norte"
            >
              <input
                type="number"
                name="hidro__utm_norte"
                placeholder="Ej. 1164731"
                required
                className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none"
              />
            </Field>
          </FormRow>

          <FormRow>
            <Field label="Tipo de Lecho / Cauce" htmlFor="hidro__tipo_lecho">
              <select name="hidro__tipo_lecho" id="hidro__tipo_lecho" className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none">
                <option value="Rocoso">Rocoso (Natural)</option>
                <option value="Sedimentario">Sedimentario / Tierra</option>
                <option value="Canalizado">Canalizado en Concreto</option>
                <option value="Mixto">Mixto</option>
              </select>
            </Field>

            <Field label="Estatus de Riesgo de Torrencialidad" htmlFor="hidro__nivel_riesgo">
              <select
                name="hidro__nivel_riesgo"
                id="hidro__nivel_riesgo"
                defaultValue="Moderado"
                className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none"
              >
                <option value="Bajo">Bajo</option>
                <option value="Moderado">Moderado</option>
                <option value="Alto">Alto (Respuesta de crecida rápida crítica)</option>
              </select>
            </Field>
          </FormRow>

          <Field label="Observaciones Hidráulicas Generales">
            <textarea
              name="hidro__observaciones"
              rows="3"
              placeholder="Indicar presencia de obras..."
              className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none min-h-[200px] resize-y"
            />
          </Field>
        </div>

        <div className="mb-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
          <button
            type="reset"
            id="hidro__btn-limpiar"
            className="cursor-pointer rounded border-none text-xs font-bold uppercase text-white transition-colors bg-secondary px-5 py-2.5 hover:bg-primary"
            onClick={() => setCotaError(false)}
          >
            Limpiar
          </button>
          <button type="submit" id="hidro__btn-guardar" className="cursor-pointer rounded border-none text-xs font-bold uppercase text-white transition-colors bg-secondary px-5 py-2.5 hover:bg-primary">
            Guardar en Inventario Central
          </button>
        </div>
      </form>
    </div>
  );
};

export default Territorial;
