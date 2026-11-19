export const FormRow = ({children}) => {
  return (
    <fieldset className='
        grid 
        gap-3 
        [fieldset>fieldset]:gap-0
        grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
        mb-3 
        [fieldset>fieldset]:mb-0
        [fieldset>fieldset]:pl-8
    '>
        {children}
    </fieldset>
  )
}
