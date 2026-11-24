/* Mensaje de guardado de los formularios SIROH.
   Cada llamador conserva sus clases de posicionamiento/tamano; el color lo
   define este componente segun el tipo de mensaje. */

export const SaveMessage = ({ message, className = "" }) => {
  if (!message) return null;

  return (
    <p className={`${className} ${message.tipo === "error" ? "text-red-600" : "text-green-700"}`}>
      {message.texto}
    </p>
  );
};
