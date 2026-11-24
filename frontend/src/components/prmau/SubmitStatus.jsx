/* Mensaje de resultado del envio, compartido por FormVulne y FormSocio. */

export const SubmitStatus = ({ status }) => {
    if (!status?.message) return null

    return (
        <div
            className={`mt-4 rounded-md px-4 py-3 text-sm font-semibold ${status.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
            {status.message}
        </div>
    )
}
