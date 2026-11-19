export const FormSelect = ({inputName, inputPlaceholder, label, optionList = [], actionHandler, filter=0 }) => {

    const items = Array.isArray(optionList) ? optionList : []

    return (
    <div className="flex flex-col">
        
        <label className="
            text-xs 
            font-medium 
            mb-1 
            text-vul-label 
            uppercase            
            " htmlFor={inputName}> {label} </label> 
    
        <select className="
            py-2 px-3 
            border-2 rounded-xs border-siroh-border-muted 
            text-xs
            bg-white
        " name={inputName} id={inputName} placeholder={inputPlaceholder} onChange={actionHandler}>

            <option>--{label}--</option>

            { filter > 0 ?

                items
                .filter( item=> (item.parroquia_id || item.sector_id) === filter )
                .map(item=> <option key={`${item.id}-${item.nom}`} value={`${item.id},${item.cod}`}>{item.nombre}</option>)
                
                : 

                items.map(item=> <option key={`${item.id}-${item.nom}`} value={`${item.id},${item.cod}`}>{item.nombre}</option>)
                
            }
            
        </select>

    </div>
  )
}
