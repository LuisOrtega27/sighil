export const FormGroup = ({inputType="text", inputName, inputPlaceholder, label, isDisabled=false, isRequired=false, isReadOnly=false }) => {
  return (
    <div className="flex flex-col">

        { label 
            ?
            <label className="
                text-xs 
                font-medium 
                mb-1 
                text-vul-label 
                uppercase
            " htmlFor={inputName}> {label} </label> 
            :
            null
        }



        {   inputType === "textarea" ?

            <textarea className="
                h-60
                py-2 px-3 
                border-2 rounded-xs border-siroh-border-muted 
                text-xs
                bg-white
                resize-none
            " name={inputName} id={inputName} placeholder={inputPlaceholder}/>

            :

            <input 
                className="
                    py-2 px-3 
                    border-2 rounded-xs border-siroh-border-muted 
                    text-xs
                    bg-white
                " 
                type={inputType} 
                name={inputName} 
                id={inputName} 
                placeholder={inputPlaceholder} 
                disabled={isDisabled} 
                readOnly={isReadOnly} 
                required={isRequired}
            />

        }

    </div>
  )
}
   