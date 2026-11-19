export const FormActions = ({ disabled = false }) => {
  return (
    <footer className="flex justify-between px-40 mt-20">
        <input className="bg-siroh-border-muted py-2 px-20 font-bold rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-50" type="reset" disabled={disabled} />
        <input className="bg-siroh-success-green py-2 px-20 text-white font-bold rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={disabled} />
    </footer>
  )
}
