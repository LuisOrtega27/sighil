export const FormCheckboxGrid = ({children}) => {
  return (
    <fieldset className="
            grid
            grid-cols-[repeat(auto-fill,minmax(220px,1fr))]
            gap-4
            p-1
    ">
        {children}
    </fieldset>
  )
}
