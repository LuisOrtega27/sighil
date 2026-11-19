// import { NavLink } from "react-router"

export const FormTabs = ({tabList}) => {
    
  return (
    <nav className="w-full flex gap-2 border-b-2 border-b-tabs-border pb-1 mb-4 ">
        
        { tabList.map(item=> 
            <a
                className="bg-light-main text-xs text-tabs font-medium rounded-t-md py-2 px-4 " 
                key={item.name} 
                // to={item.path}
                href={item.path}
            > 
                
                {item.name} 

            </a>
        )}
        
    </nav>
  )
}
