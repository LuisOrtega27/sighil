import { INSTITUTION } from "../../config/institution"

/* Cabecera institucional comun de los formularios PRMAU.
   El texto del titulo se pasa verbatim desde cada formulario y los campos
   de control/fechas se entregan como children. */
export const FormHeader = ({ title, children }) => {
    return (
        <header className="flex border-b-3 border-b-vul-primary mb-5">

            <div className="text-center flex-1 pb-4 font-segoe">
                <h1 className="text-vul-primary text-2xl font-bold">{INSTITUTION.alcaldia}</h1>
                <h2 className="text-vul-secondary font-bold">{INSTITUTION.organismo}</h2>
                <h3>{title}</h3>
            </div>

            <div className="meta-info">
                {children}
            </div>

        </header>
    )
}
