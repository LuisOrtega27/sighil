import client from "./client";

/* El cliente `client` apunta a /api y envia la cookie de sesion. */
export const getProfile = async () => {
    const { data } = await client.get("/profile");
    return data;
};

export const updateProfile = async (profile) => {
    const { data } = await client.put("/profile", profile);
    return data;
};
