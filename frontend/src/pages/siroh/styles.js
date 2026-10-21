/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/styles.js
   Constantes de estilo Tailwind (migracion del CSS propio de siroh.html
   al estilo usado por SirohRawForm.jsx).
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/* ---------- SIDEBAR ---------- */
export const SIDEBAR =
  "fixed left-0 top-0 z-[100] flex h-screen w-[290px] flex-col justify-between bg-primary px-5 py-[25px] text-white shadow-[4px_0_10px_rgba(0,0,0,0.1)]";
export const BRAND_LOGO_BOX =
  "mb-3 flex max-h-[90px] w-full items-center justify-center rounded-lg bg-white/5 p-2.5";
export const BRAND_LOGO = "max-h-[65px] max-w-full object-contain";
export const BRAND_TITLE =
  "mb-3 border-b-2 border-secondary pb-2 text-[22px] font-extrabold tracking-[1px]";
export const BRAND_SUB =
  "text-[10px] font-bold uppercase leading-[1.3] text-[#94a3b8]";
export const NAV_MENU = "mt-5 list-none text-left";
export const NAV_LINK_BASE =
  "mb-1 block cursor-pointer rounded-md px-3.5 py-[11px] text-[12.5px] text-[#cbd5e1] transition-all duration-300";
export const NAV_LINK_HOVER =
  "hover:bg-secondary hover:pl-[18px] hover:font-semibold hover:text-white";
export const NAV_LINK_ACTIVE =
  "bg-secondary pl-[18px] font-semibold text-white";
export const SUBMENU_SIROH = "nav-submenu list-none pl-[15px]";
export const SUBMENU_SIROH_ITEM =
  "mb-0.5 block cursor-pointer rounded-r border-l-2 border-white/20 py-1.5 pl-2.5 pr-2.5 text-[11.5px] text-white transition-colors hover:border-l-[#f8fafc]";
export const SUBMENU_MET = "mb-2.5 list-none pl-[15px]";
export const SUBMENU_MET_ITEM =
  "mb-0.5 block cursor-pointer rounded-r border-l-2 border-white/20 py-1.5 pl-2.5 pr-2.5 text-[11.5px] text-[#94a3b8] transition-colors";
export const SUBMENU_MET_HOVER =
  "hover:border-l-secondary hover:bg-white/10 hover:text-white";
export const SIDEBAR_FOOTER =
  "border-t border-[#1e293b] pt-3 text-center text-[10.5px] leading-[1.3] text-[#64748b]";

/* ---------- LAYOUT PRINCIPAL ---------- */
export const MAIN = "ml-[290px] w-[calc(100%-290px)] p-[35px]";
export const TOP_NAVBAR =
  "mb-6 flex items-center justify-between border-b border-line pb-4";
export const TOP_TITLE = "text-2xl font-bold";
export const TOP_DESC = "mt-0.5 text-[12.5px] text-[#64748b]";
export const LOGOUT_BTN =
  "rounded-[20px] border border-[#adadad] bg-[#f0f0f0] px-4 py-2.5 text-xs text-black transition-colors hover:bg-[#e4e4e4]";
export const USER_BADGE =
  "rounded bg-[#e2e8f0] px-3 py-1.5 text-[11px] font-bold text-primary";

/* ---------- TARJETAS ---------- */
export const CARD =
  "mb-6 rounded-lg border-t-4 border-secondary bg-white p-[30px] shadow-[0_4px_6px_rgba(0,0,0,0.05)]";
export const CARD_TITLE = "mb-1 text-xl font-bold uppercase text-primary";
export const CARD_SUB =
  "mb-6 text-[12.5px] font-semibold uppercase tracking-[0.5px] text-[#64748b]";

/* ---------- FORMULARIOS ---------- */
export const FORM_ROW =
  "mb-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3";
export const FORM_GROUP = "flex flex-col";
export const LABEL = "mb-1 text-[10.5px] font-bold uppercase text-[#475569]";
export const INPUT =
  "rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none";
export const TEXTAREA = `${INPUT} min-h-[200px] resize-y`;
export const SELECT = INPUT;
export const SECTION_TITLE =
  "mb-2.5 ml-0 mr-0 mt-[15px] border-l-[3px] border-secondary bg-lightblue px-2.5 py-1.5 text-xs font-bold uppercase text-primary";
export const SUBTITLE =
  "border-l-[3px] border-orange-2 bg-lightorange px-[11px] py-1.5 text-[10px] font-bold uppercase text-orange";

/* ---------- CHECKBOXES / RADIOS ---------- */
export const CB_GRID =
  "grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2 p-[5px]";
export const CB_ITEM =
  "cb-item flex items-center gap-2 text-xs text-[#334155]";
export const CB_IMG = `${CB_ITEM} cb-img`;
export const CB_CONTROL = "cursor-pointer";
export const CB_LABEL = "cursor-pointer";

/* ---------- BOTONES ----------
   (nunca se combinan utilidades del mismo atributo: cada variante
   define sus propios colores/paddings para evitar conflictos) */
const BTN_CORE =
  "cursor-pointer rounded border-none text-xs font-bold uppercase text-white transition-colors";
export const BTN = `${BTN_CORE} bg-secondary px-5 py-2.5 hover:bg-primary`;
export const BTN_DANGER = `${BTN_CORE} bg-alert px-5 py-2.5 hover:bg-[#b91c1c]`;
export const BTN_SUCCESS = `${BTN_CORE} bg-success px-5 py-2.5 hover:bg-[#047857]`;
export const BTN_SUCCESS_BLOCK = `${BTN_CORE} w-full bg-success px-5 py-2.5 text-[13px] hover:bg-[#047857]`;
export const BTN_PRIMARY = `${BTN_CORE} bg-primary px-5 py-2.5`;
export const BTN_SMALL = `${BTN_CORE} mr-0.5 bg-secondary px-2 py-1 text-[11px] hover:bg-primary`;
export const BTN_SMALL_SUCCESS = `${BTN_CORE} mr-0.5 bg-success px-2 py-1 text-[11px] hover:bg-[#047857]`;
export const BTN_SMALL_GRAY = `${BTN_CORE} mr-0.5 bg-[#64748b] px-2 py-1 text-[11px] hover:bg-[#475569]`;

/* ---------- SUB-PESTANAS ---------- */
export const TAB_CONTAINER =
  "mb-5 flex gap-[5px] overflow-x-auto rounded-t-md border-b-2 border-line bg-[#e2e8f0] px-[5px] pt-[5px]";
export const TAB_BTN =
  "cursor-pointer whitespace-nowrap rounded-t-[5px] border-none bg-[#cbd5e1] px-3.5 py-2.5 text-[11px] font-bold uppercase text-[#475569]";
export const TAB_BTN_ACTIVE = "border-b-2 border-white bg-white text-primary";

/* ---------- TABLAS ---------- */
export const TABLE = "mb-[15px] mt-2.5 w-full border-collapse";
export const TH =
  "border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary";
export const TD =
  "border-b border-[#e2e8f0] px-3 py-2.5 text-left text-xs";
export const TD_EMPTY = `${TD} text-center text-[#64748b]`;

/* ---------- KPI / DASHBOARD ---------- */
export const KPI_GRID =
  "mb-6 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4";
export const KPI_CARD =
  "rounded-md border-l-4 border-secondary bg-lightblue p-4 text-center";
export const KPI_CARD_GREEN =
  "rounded-md border-l-4 border-success bg-lightblue p-4 text-center";
export const KPI_CARD_ORANGE =
  "rounded-md border-l-4 border-warning bg-lightblue p-4 text-center";
export const KPI_CARD_P =
  "text-[11px] font-bold uppercase text-[#64748b]";
export const KPI_CARD_H3 = "mt-1.5 text-[22px] font-bold text-primary";

/* ---------- GEOPORTAL ---------- */
export const MOCK_MAP =
  "relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-line bg-[#e2e8f0]";
export const MAP_LAYER_BOX =
  "absolute right-[15px] top-[15px] w-[180px] rounded-md bg-white p-3 text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)]";
export const MAP_LAYER_LABEL = "mb-1 block";

/* ---------- HIDROLOGIA ---------- */
export const CUENCAS_GRID = "grid grid-cols-[1fr_2fr] gap-5";
export const CUENCAS_LIST = "border-r border-line pr-[15px]";
export const CUENCAS_TITLE =
  "mb-2.5 text-xs font-bold uppercase text-primary";
export const CUENCA_BTN =
  "mb-1.5 w-full cursor-pointer rounded px-2.5 py-2.5 text-left text-[13px] font-bold transition-colors";
export const CUENCA_BTN_IDLE = "bg-[#f1f5f9] hover:bg-lightblue";
export const CUENCA_BTN_ACTIVE = "bg-lightblue";
export const CUENCA_DETAIL =
  "rounded-md border border-line bg-[#fafafa] p-5";
export const CUENCA_DETAIL_TITLE = "text-base font-bold text-primary";
export const CUENCA_DETAIL_BODY =
  "mt-3.5 text-[13px] leading-[1.5] text-[#475569]";

/* ---------- MISC ---------- */
export const FICHA_HEADER =
  "mb-5 rounded-md border border-line bg-[#f1f5f9] px-3 py-3 text-center text-[11px] font-bold leading-[1.4] text-[#334155]";
export const ALERT_ERROR =
  "mb-3 border-l-4 border-alert bg-[#fde8e6] px-3 py-2.5 text-xs font-semibold text-alert";
export const PRINT_PREVIEW =
  "hidden border-2 border-black bg-white p-[30px] mt-5 font-['Courier_New',monospace]";
export const FICHA_MODAL =
  "hidden mt-[15px] rounded-md border border-line border-l-[5px] border-l-primary bg-[#fafafa] p-5";
export const EDIT_BOX =
  "hidden mt-[15px] rounded-md border border-line bg-white p-5";
export const DARK_PANEL =
  "rounded-md bg-[#1e293b] p-[25px] font-mono text-[12.5px] leading-[1.6] text-white";
