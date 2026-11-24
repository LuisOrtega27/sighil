/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   formStyles.js
   Constantes Tailwind de las variantes PRMAU de las primitivas compartidas.
   Las variantes SIROH se reutilizan desde siroh/styles.js.
   Cada constante es autocontenida: nunca se combinan utilidades del mismo
   atributo (color/padding/borde) desde dos constantes distintas.
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/* ---------- TITULOS ---------- */
export const PRMAU_SECTION_TITLE =
  "uppercase text-md font-bold text-vul-primary border-vul-accent border-b-2 mb-5";
export const PRMAU_SECTION_SUBTITLE =
  "text-xs font-bold text-siroh-primary-blue bg-siroh-light-blue py-1.5 px-2.5 mt-3.5 mb-2.5 uppercase border-l-4 border-siroh-secondary-blue";
export const PRMAU_SECTION_MINI_SUBTITLE =
  "text-[10px] font-bold text-siroh-primary-orange bg-siroh-light-orange py-1.5 px-2.5 mt-3.5 mb-2.5 uppercase border-l-4 border-siroh-secondary-orange ml-4";

/* ---------- FILAS Y CAMPOS ---------- */
export const PRMAU_FORM_ROW =
  "grid gap-3 [fieldset>fieldset]:gap-0 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] mb-3 [fieldset>fieldset]:mb-0 [fieldset>fieldset]:pl-8";
export const PRMAU_FORM_GROUP = "flex flex-col";
export const PRMAU_LABEL =
  "text-xs font-medium mb-1 text-vul-label uppercase";
export const PRMAU_INPUT =
  "py-2 px-3 border-2 rounded-xs border-siroh-border-muted text-xs bg-white";
export const PRMAU_TEXTAREA = `${PRMAU_INPUT} h-60 resize-none`;

/* ---------- CHECKBOXES / RADIOS ---------- */
export const PRMAU_CB_ITEM =
  "flex items-center gap-2 text-xs uppercase text-checkboxItem";
export const PRMAU_CB_GRID =
  "grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 p-1";
