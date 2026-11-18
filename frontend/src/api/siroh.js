import client from "./client";

export const createInspeccion = async () => {
    const { data } = await client.post("/siroh/inspecciones");
    return data;
};

export const updateInspeccion = async (id, payload) => {
    const { data } = await client.patch(`/siroh/inspecciones/${id}`, payload);
    return data;
};
