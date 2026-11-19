import client from "./client";

export const getVulnParroquias = async () => {
  const { data } = await client.get("/prmau/catalogos/parroquias");
  return data;
};

export const getVulnSectores = async (parroquiaId) => {
  const params = parroquiaId ? { parroquia_id: parroquiaId } : undefined;
  const { data } = await client.get("/prmau/catalogos/sectores", { params });
  return data;
};

export const getVulnManzanas = async (sectorId) => {
  const params = sectorId ? { sector_id: sectorId } : undefined;
  const { data } = await client.get("/prmau/catalogos/manzanas", { params });
  return data;
};

export const getVulnOrganizaciones = async (parroquiaId) => {
  const params = parroquiaId ? { parroquia_id: parroquiaId } : undefined;
  const { data } = await client.get("/prmau/catalogos/organizaciones", { params });
  return data;
};

export const submitVulnerabilidad = async (payload) => {
  const { data } = await client.post("/prmau/vulnerabilidad", payload);
  return data;
};

export const submitSocioeconomico = async (payload) => {
  const { data } = await client.post("/prmau/socioeconomico", payload);
  return data;
};
