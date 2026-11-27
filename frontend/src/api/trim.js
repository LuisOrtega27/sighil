/* Equivalente de la utilidad trim del backend: recorta strings en peticiones
   y respuestas JSON. Las contraseñas se excluyen para no alterar credenciales. */

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

export const trimDeep = (value, key = "") => {
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
  /* Blob, FormData, File, Date, numeros, booleanos, null: se dejan intactos. */
  return value;
};
