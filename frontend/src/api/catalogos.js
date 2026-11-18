import client from "./client";

export const getCuencas = async () => {
    const { data } = await client.get("/catalogos/cuencas");
    return data;
};

export const getSubcuencas = async (cuencaId) => {
    const { data } = await client.get("/catalogos/subcuencas", {
        params: { cuenca_id: cuencaId },
    });
    return data;
};

export const getParroquias = async () => {
    const { data } = await client.get("/catalogos/parroquias");
    return data;
};
