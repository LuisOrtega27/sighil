/* Utilidades compartidas por los formularios PRMAU. */

/* FormData -> objeto; los campos repetidos (checkboxes con el mismo name)
   se agrupan en arrays. */
export const formToPayload = (form) => {
    const fd = new FormData(form)
    const out = {}
    for (const [key, value] of fd.entries()) {
        if (!key) continue
        if (out[key] === undefined) out[key] = value
        else if (Array.isArray(out[key])) out[key].push(value)
        else out[key] = [out[key], value]
    }
    return out
}
