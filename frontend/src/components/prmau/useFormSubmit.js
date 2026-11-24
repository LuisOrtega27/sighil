import { useState } from "react"
import { formToPayload } from "./formUtils"

/* Logica de envio compartida por los formularios PRMAU.
   - submit: funcion de la API que recibe el payload.
   - buildPayload: opcional; permite anadir campos calculados al payload.
   - successMessage: string o funcion que recibe la respuesta de la API.
   - errorMessage: mensaje de respaldo cuando la API no entrega detalle. */
export const useFormSubmit = ({ submit, buildPayload, successMessage, errorMessage }) => {
    const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" })
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitStatus({ type: "", message: "" })
        setSubmitting(true)
        try {
            const payload = formToPayload(event.currentTarget)
            // TODO(backend): cada formulario define su endpoint y mapeo de campos.
            const res = await submit(buildPayload ? buildPayload(payload) : payload)
            setSubmitStatus({
                type: "success",
                message: typeof successMessage === "function" ? successMessage(res) : successMessage,
            })
        } catch (error) {
            setSubmitStatus({
                type: "error",
                message: error?.response?.data?.message || errorMessage,
            })
        } finally {
            setSubmitting(false)
        }
    }

    return { submitStatus, submitting, handleSubmit }
}
