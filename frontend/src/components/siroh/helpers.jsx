/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/helpers.jsx
   Componentes helper del formulario/tabs SIROH (migrados del marcado
   repetitivo de siroh.html, al estilo de SirohRawForm.jsx).
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Nota: las etiquetas con * (clase .required en el original) no tenian
   estilos definidos en siroh.html, por lo que se dejan como texto simple. */

import {
  CB_GRID,
  CB_IMG,
  CB_ITEM,
  CB_CONTROL,
  CB_LABEL,
  FORM_GROUP,
  FORM_ROW,
  LABEL,
  SECTION_TITLE,
  SUBTITLE,
  TD_EMPTY,
  TAB_BTN,
  TAB_BTN_ACTIVE,
} from "./styles";

/* Titulo de bloque (antes: .checkbox-section-title) */
export const SectionTitle = ({ children }) => (
  <div className={SECTION_TITLE}>{children}</div>
);

/* Subtitulo naranja entre secciones (antes: .section-subTitle / h6) */
export const SubTitle = ({ children, className = "" }) => (
  <h6 className={`${SUBTITLE} ${className}`}>{children}</h6>
);

/* Fila de campos con grid auto-fit (antes: .form-row) */
export const FormRow = ({ children, className = "" }) => (
  <div className={`${FORM_ROW} ${className}`}>{children}</div>
);

/* Campo con label opcional (antes: .form-group) */
export const Field = ({ label, htmlFor, children, className = "" }) => (
  <div className={`${FORM_GROUP} ${className}`}>
    {label !== undefined && (
      <label htmlFor={htmlFor} className={LABEL}>
        {label}
      </label>
    )}
    {children}
  </div>
);

/* Grid de checkboxes/radios (antes: .checkbox-grid) */
export const CbGrid = ({ children, className = "" }) => (
  <div className={`${CB_GRID} ${className}`}>{children}</div>
);

/* Checkbox simple (antes: .checkbox-item input + label) */
export const CheckItem = ({ id, name, value, label, required = false }) => (
  <div className={CB_ITEM}>
    <input
      type="checkbox"
      id={id}
      name={name}
      value={value}
      required={required}
      className={CB_CONTROL}
    />
    <label htmlFor={id} className={CB_LABEL}>
      {label}
    </label>
  </div>
);

/* Radio simple; labelFirst conserva el orden original de VERTEDEROS "SIMPLE"
   (que en el HTML tenia el label antes del input) */
export const RadioItem = ({
  id,
  name,
  value,
  label,
  required = false,
  defaultChecked = false,
  labelFirst = false,
}) => (
  <div className={CB_ITEM}>
    {labelFirst ? (
      <>
        <label htmlFor={id} className={CB_LABEL}>
          {label}
        </label>
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          required={required}
          defaultChecked={defaultChecked}
          className={CB_CONTROL}
        />
      </>
    ) : (
      <>
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          required={required}
          defaultChecked={defaultChecked}
          className={CB_CONTROL}
        />
        <label htmlFor={id} className={CB_LABEL}>
          {label}
        </label>
      </>
    )}
  </div>
);

/* Opcion con imagen + nombre (canales / diques cerrados / abiertos) */
export const ImgCheckItem = ({ id, name, value, src, alt, label }) => (
  <div className={CB_IMG}>
    <input type="checkbox" id={id} name={name} value={value} className={CB_CONTROL} />
    <label htmlFor={id} className={CB_LABEL}>
      <img src={src} alt={alt} />
      <h3 className="text-sm font-bold">{label}</h3>
    </label>
  </div>
);

/* Opcion con imagen (radios de prueba de mortero): en el original estos
   radios NO se ocultaban (solo se ocultaban los checkbox con imagen) */
export const ImgRadioItem = ({ id, name, value, src, alt }) => (
  <div className={CB_ITEM}>
    <input type="radio" id={id} name={name} value={value} className={CB_CONTROL} />
    <label htmlFor={id} className={CB_LABEL}>
      <img src={src} alt={alt} />
    </label>
  </div>
);

/* Boton de sub-pestanas (antes: a.tab-btn / button.tab-btn) */
export const TabBtn = ({ id, active = false, onClick, children }) => (
  <button
    type="button"
    id={id}
    onClick={onClick}
    className={`${TAB_BTN} ${active ? TAB_BTN_ACTIVE : ""}`}
  >
    {children}
  </button>
);

/* Fila de tabla "sin datos" (los originales se poblaban desde JS inexistente) */
export const EmptyRow = ({ colSpan, children }) => (
  <tr>
    <td colSpan={colSpan} className={TD_EMPTY}>
      {children}
    </td>
  </tr>
);
