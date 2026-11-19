export const CheckboxItem = ({ inputType = "checkbox", inputName, label, value, id }) => {
  const inputId = id ?? (inputName && label ? `${inputName}-${label}`.replace(/\s+/g, "-") : inputName)
  const inputValue = value ?? label

  return (
    <div className='
        flex
        items-center
        gap-2
        text-xs
        uppercase
        text-checkboxItem
    '>
        <input type={inputType} name={inputName} id={inputId} value={inputValue}/>
        <label htmlFor={inputId}>{label}</label>
    </div>
  )
}
