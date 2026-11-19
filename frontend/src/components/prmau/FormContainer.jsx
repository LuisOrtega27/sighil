export const FormContainer = ({children}) => {
  return (
    <div className="form-background w-full">
        <div className="form-wrapper w-full bg-white p-4 rounded-2xl shadow-md">
            {children}
        </div>
    </div>
  )
}
