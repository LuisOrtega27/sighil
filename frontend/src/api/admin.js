import client from "./client";

/* Modulo de administracion. El backend valida sesion y rol admin. */
export const getAdminUsers = async () => {
    const { data } = await client.get("/admin/users");
    return data;
};

export const updateAdminUser = async (id, payload) => {
    const { data } = await client.put(`/admin/users/${id}`, payload);
    return data;
};

export const changeAdminUserRole = async (id, rol_id) => {
    const { data } = await client.patch(`/admin/users/${id}/role`, { rol_id });
    return data;
};

export const changeAdminUserPassword = async (id, passwords) => {
    const { data } = await client.patch(`/admin/users/${id}/password`, passwords);
    return data;
};

export const deleteAdminUser = async (id) => {
    const { data } = await client.delete(`/admin/users/${id}`);
    return data;
};

export const getAdminStats = async (days = 7) => {
    const { data } = await client.get("/admin/stats", { params: { days } });
    return data;
};
