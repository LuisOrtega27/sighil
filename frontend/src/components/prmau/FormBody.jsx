export const FormBody = ({children}) => {
  return (
    <div className="
      form-body 
      bg-light-main border 
      border-tabs-border 
      rounded-xl 
      p-6 
      flex gap-6 
      overflow-x-scroll
      scrollbar-none
      scroll-smooth
      snap-x
    ">
        {children}
    </div>
  )
}
