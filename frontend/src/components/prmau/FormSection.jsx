export const FormSection = ({sectionName, id, children}) => {
  return (
    <section className={` ${sectionName} shrink-0 w-full snap-mandatory snap-center`} id={id}>
        {children}
    </section>
  )
}
