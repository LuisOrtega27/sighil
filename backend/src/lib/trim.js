/* Recorta espacios al inicio/final de todos los strings de un payload,
   incluidos objetos y arrays anidados (por ejemplo el payload JSON de PRMAU).
   Las contraseñas se excluyen: un espacio puede ser intencional y recortarlo
   cambiaria la credencial. */

const PASSWORD_KEYS = new Set([
    "password",
    "currentpassword",
    "newpassword",
    "confirmpassword",
]);

const isPlainObject = (value) => {
    if (value === null || typeof value !== "object") return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
};

const trimDeep = (value, key = "") => {
    if (typeof value === "string") {
        return PASSWORD_KEYS.has(String(key).toLowerCase()) ? value : value.trim();
    }
    if (Array.isArray(value)) {
        return value.map((item) => trimDeep(item));
    }
    if (isPlainObject(value)) {
        return Object.fromEntries(
            Object.entries(value).map(([field, fieldValue]) => [
                field,
                trimDeep(fieldValue, field),
            ])
        );
    }
    /* Date, Buffer, numeros, booleanos, null: se devuelven tal cual. */
    return value;
};

export { trimDeep };
