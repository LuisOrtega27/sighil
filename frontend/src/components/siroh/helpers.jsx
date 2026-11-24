/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/helpers.jsx
   Componentes helper del formulario/tabs SIROH (migrados del marcado
   repetitivo de siroh.html, al estilo de SirohRawForm.jsx).
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Nota: las etiquetas con * (clase .required en el original) no tenian
   estilos definidos en siroh.html, por lo que se dejan como texto simple. */


/* Titulo de bloque (antes: .checkbox-section-title) */
export const SectionTitle = ({ children }) => (
  <div className="mb-2.5 ml-0 mr-0 mt-[15px] border-l-[3px] border-secondary bg-lightblue px-2.5 py-1.5 text-xs font-bold uppercase text-primary">{children}</div>
);

/* Subtitulo naranja entre secciones (antes: .section-subTitle / h6) */
export const SubTitle = ({ children, className = "" }) => (
  <h6 className={`border-l-[3px] border-orange-2 bg-lightorange px-[11px] py-1.5 text-[10px] font-bold uppercase text-orange ${className}`}>{children}</h6>
);

/* Fila de campos con grid auto-fit (antes: .form-row) */
export const FormRow = ({ children, className = "" }) => (
  <div className={`mb-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 ${className}`}>{children}</div>
);

/* Campo con label opcional (antes: .form-group) */
export const Field = ({ label, htmlFor, children, className = "" }) => (
  <div className={`flex flex-col ${className}`}>
    {label !== undefined && (
      <label htmlFor={htmlFor} className="mb-1 text-[10.5px] font-bold uppercase text-[#475569]">
        {label}
      </label>
    )}
    {children}
  </div>
);

/* Grid de checkboxes/radios (antes: .checkbox-grid) */
export const CbGrid = ({ children, className = "" }) => (
  <div className={`grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2 p-[5px] ${className}`}>{children}</div>
);

/* Checkbox simple (antes: .checkbox-item input + label) */
export const CheckItem = ({ id, name, value, label, required = false }) => (
  <div className="cb-item flex items-center gap-2 text-xs text-[#334155]">
    <input
      type="checkbox"
      id={id}
      name={name}
      value={value}
      required={required}
      className="cursor-pointer"
    />
    <label htmlFor={id} className="cursor-pointer">
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
  <div className="cb-item flex items-center gap-2 text-xs text-[#334155]">
    {labelFirst ? (
      <>
        <label htmlFor={id} className="cursor-pointer">
          {label}
        </label>
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          required={required}
          defaultChecked={defaultChecked}
          className="cursor-pointer"
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
          className="cursor-pointer"
        />
        <label htmlFor={id} className="cursor-pointer">
          {label}
        </label>
      </>
    )}
  </div>
);

/* Opcion con imagen + nombre (canales / diques cerrados / abiertos) */
export const ImgCheckItem = ({ id, name, value, src, alt, label }) => (
  <div className="cb-item flex items-center gap-2 text-xs text-[#334155] cb-img">
    <input type="checkbox" id={id} name={name} value={value} className="cursor-pointer" />
    <label htmlFor={id} className="cursor-pointer">
      <img src={src} alt={alt} />
      <h3 className="text-sm font-bold">{label}</h3>
    </label>
  </div>
);

/* Opcion con imagen (radios de prueba de mortero): en el original estos
   radios NO se ocultaban (solo se ocultaban los checkbox con imagen) */
export const ImgRadioItem = ({ id, name, value, src, alt }) => (
  <div className="cb-item flex items-center gap-2 text-xs text-[#334155]">
    <input type="radio" id={id} name={name} value={value} className="cursor-pointer" />
    <label htmlFor={id} className="cursor-pointer">
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
    className={`cursor-pointer whitespace-nowrap rounded-t-[5px] border-none bg-[#cbd5e1] px-3.5 py-2.5 text-[11px] font-bold uppercase text-[#475569] ${active ? "border-b-2 border-white bg-white text-primary" : ""}`}
  >
    {children}
  </button>
);

/* Fila de tabla "sin datos" (los originales se poblaban desde JS inexistente) */
export const EmptyRow = ({ colSpan, children }) => (
  <tr>
    <td colSpan={colSpan} className="border-b border-[#e2e8f0] px-3 py-2.5 text-left text-xs text-center text-[#64748b]">
      {children}
    </td>
  </tr>
);
