import { trimDeep } from "../lib/trim.js";

/* Entradas: todo lo que llega en el body, la query y los params de la URL.
   req.query es solo-lectura en Express 5, por eso se muta con Object.assign. */
const trimRequest = (req, _res, next) => {
    if (req.body && typeof req.body === "object") {
        req.body = trimDeep(req.body);
    }
    if (req.query && typeof req.query === "object") {
        Object.assign(req.query, trimDeep(req.query));
    }
    if (req.params && typeof req.params === "object") {
        Object.assign(req.params, trimDeep(req.params));
    }
    next();
};

/* Salidas: normaliza todo lo que los controladores envian con res.json,
   incluidas las filas que vienen directamente de MySQL. */
const trimResponse = (_req, res, next) => {
    const sendJson = res.json.bind(res);
    res.json = (payload) => sendJson(trimDeep(payload));
    next();
};

export { trimRequest, trimResponse };
