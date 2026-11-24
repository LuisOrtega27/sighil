/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   formPrimitives.jsx
   Primitivas de formulario compartidas por SIROH y PRMAU.
   Una sola implementacion por patron; la prop `variant` selecciona el
   elemento y las clases de cada modulo. Se conservan verbatim los ids, names,
   values, textos y clases del marcado original.
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

import {
  PRMAU_CB_GRID,
  PRMAU_CB_ITEM,
  PRMAU_FORM_GROUP,
  PRMAU_FORM_ROW,
  PRMAU_INPUT,
  PRMAU_LABEL,
  PRMAU_SECTION_MINI_SUBTITLE,
  PRMAU_SECTION_SUBTITLE,
  PRMAU_SECTION_TITLE,
  PRMAU_TEXTAREA,
} from "./formStyles";

const contentOf = (children, text) => (children !== undefined ? children : text);

/* ---------- TITULOS ---------- */
export const SectionTitle = ({ children, text, variant = "siroh" }) =>
  variant === "prmau" ? (
    <h2 className={PRMAU_SECTION_TITLE}>{contentOf(children, text)}</h2>
  ) : (
    <div className="mb-2.5 ml-0 mr-0 mt-[15px] border-l-[3px] border-secondary bg-lightblue px-2.5 py-1.5 text-xs font-bold uppercase text-primary">{children}</div>
  );

export const SubTitle = ({
  children,
  text,
  className = "",
  variant = "siroh",
}) => {
  if (variant === "prmauMini") {
    return <h3 className={PRMAU_SECTION_MINI_SUBTITLE}>{contentOf(children, text)}</h3>;
  }
  if (variant === "prmau") {
    return <h3 className={PRMAU_SECTION_SUBTITLE}>{contentOf(children, text)}</h3>;
  }
  return (
    <h6 className={`border-l-[3px] border-orange-2 bg-lightorange px-[11px] py-1.5 text-[10px] font-bold uppercase text-orange ${className}`}>{children}</h6>
  );
};

/* ---------- FILAS ---------- */
export const FormRow = ({ children, className = "", variant = "siroh" }) =>
  variant === "prmau" ? (
    <fieldset className={`${PRMAU_FORM_ROW} ${className}`}>{children}</fieldset>
  ) : (
    <div className={`mb-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 ${className}`}>{children}</div>
  );

export const FormSectionTitle = (props) => <SectionTitle variant="prmau" {...props} />;
export const FormSectionSubTitle = (props) => <SubTitle variant="prmau" {...props} />;
export const FormSectionMiniSubTitle = (props) => (
  <SubTitle variant="prmauMini" {...props} />
);

export const PrmauFormRow = (props) => <FormRow variant="prmau" {...props} />;

/* ---------- CAMPOS ---------- */
export const Field = ({
  label,
  htmlFor,
  children,
  className = "",
  variant = "siroh",
  inputType = "text",
  inputName,
  inputPlaceholder,
  isDisabled = false,
  isRequired = false,
  isReadOnly = false,
}) => {
  if (variant === "prmau") {
    return (
      <div className={`${PRMAU_FORM_GROUP} ${className}`}>
        {label ? (
          <label className={PRMAU_LABEL} htmlFor={inputName}>
            {" "}
            {label}{" "}
          </label>
        ) : null}

        {inputType === "textarea" ? (
          <textarea
            className={PRMAU_TEXTAREA}
            name={inputName}
            id={inputName}
            placeholder={inputPlaceholder}
          />
        ) : (
          <input
            className={PRMAU_INPUT}
            type={inputType}
            name={inputName}
            id={inputName}
            placeholder={inputPlaceholder}
            disabled={isDisabled}
            readOnly={isReadOnly}
            required={isRequired}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {label !== undefined && (
        <label htmlFor={htmlFor} className="mb-1 text-[10.5px] font-bold uppercase text-[#475569]">
          {label}
        </label>
      )}
      {children}
    </div>
  );
};

export const FormGroup = (props) => <Field variant="prmau" {...props} />;

/* ---------- GRIDS DE OPCIONES ---------- */
export const CbGrid = ({ children, className = "", variant = "siroh" }) =>
  variant === "prmau" ? (
    <fieldset className={`${PRMAU_CB_GRID} ${className}`}>{children}</fieldset>
  ) : (
    <div className={`grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2 p-[5px] ${className}`}>{children}</div>
  );

export const FormCheckboxGrid = (props) => <CbGrid variant="prmau" {...props} />;

/* ---------- CHECKBOX / RADIO ---------- */
export const CheckItem = ({
  id,
  name,
  value,
  label,
  required = false,
  defaultChecked = false,
  labelFirst = false,
  variant = "siroh",
  inputType,
  type,
  inputName,
}) => {
  const inputKind = inputType ?? type ?? "checkbox";
  const controlName = name ?? inputName;
  const controlId = id ?? deriveId(controlName, label);
  const controlValue = value ?? label;

  if (variant === "prmau") {
    return (
      <div className={PRMAU_CB_ITEM}>
        <input
          type={inputKind}
          name={controlName}
          id={controlId}
          value={controlValue}
        />
        <label htmlFor={controlId}>{label}</label>
      </div>
    );
  }

  const input = (
    <input
      type={inputKind}
      id={controlId}
      name={controlName}
      value={controlValue}
      required={required}
      defaultChecked={defaultChecked}
      className="cursor-pointer"
    />
  );
  const text = (
    <label htmlFor={controlId} className="cursor-pointer">
      {label}
    </label>
  );

  return (
    <div className="cb-item flex items-center gap-2 text-xs text-[#334155]">
      {labelFirst ? (
        <>
          {text}
          {input}
        </>
      ) : (
        <>
          {input}
          {text}
        </>
      )}
    </div>
  );
};

/* Helper local de normalizacion (no se exporta). */
function deriveId(name, label) {
  return name && label ? `${name}-${label}`.replace(/\s+/g, "-") : name;
}

export const CheckboxItem = (props) => <CheckItem variant="prmau" {...props} />;
export const RadioItem = (props) => <CheckItem type="radio" {...props} />;
