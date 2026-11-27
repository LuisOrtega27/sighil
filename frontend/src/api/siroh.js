import client from "./client";

export const getInspeccion = async (id) => {
    const { data } = await client.get(`/siroh/inspecciones/${id}`);
    return data;
};

/* Filtros: { cod_n, ficha_n, fecha }. El backend los combina con OR. */
export const searchInspecciones = async (filters) => {
    const { data } = await client.get("/siroh/inspecciones", { params: filters });
    return data;
};

export const createInspeccion = async () => {
    const { data } = await client.post("/siroh/inspecciones");
    return data;
};

export const updateInspeccion = async (id, payload) => {
    const { data } = await client.patch(`/siroh/inspecciones/${id}`, payload);
    return data;
};
