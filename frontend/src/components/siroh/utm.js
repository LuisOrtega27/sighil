/* Conversion WGS84 (lat/lng) -> UTM y formato de los campos del formulario.
   Se usa el huso 19 (el que trae por defecto el campo "Huso SIG" de la ficha).
   La formula es la proyeccion transversa de Mercator estandar (Snyder). */

const A = 6378137.0; // semieje mayor WGS84 (m)
const F = 1 / 298.257223563; // aplanamiento WGS84
const ECC_SQUARED = F * (2 - F);
const ECC_PRIME_SQUARED = ECC_SQUARED / (1 - ECC_SQUARED);
const K0 = 0.9996; // factor de escala central
const FALSE_EASTING = 500000;
const HUSO = 19;

export const latLngToUtm = (lat, lng, zone = HUSO) => {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  const centralMeridian = ((zone - 1) * 6 - 180 + 3) * (Math.PI / 180);
  const deltaLng = lngRad - centralMeridian;

  const sinLat = Math.sin(latRad);
  const cosLat = Math.cos(latRad);
  const tanLat = Math.tan(latRad);
  const N = A / Math.sqrt(1 - ECC_SQUARED * sinLat * sinLat);
  const T = tanLat * tanLat;
  const C = ECC_PRIME_SQUARED * cosLat * cosLat;
  const Aaux = cosLat * deltaLng;

  const M = A * (
    (1 - ECC_SQUARED / 4 - (3 * ECC_SQUARED ** 2) / 64 - (5 * ECC_SQUARED ** 3) / 256) * latRad
    - ((3 * ECC_SQUARED) / 8 + (3 * ECC_SQUARED ** 2) / 32 + (45 * ECC_SQUARED ** 3) / 1024) * Math.sin(2 * latRad)
    + ((15 * ECC_SQUARED ** 2) / 256 + (45 * ECC_SQUARED ** 3) / 1024) * Math.sin(4 * latRad)
    - ((35 * ECC_SQUARED ** 3) / 3072) * Math.sin(6 * latRad)
  );

  const easting = K0 * N * (
    Aaux
    + ((1 - T + C) * Aaux ** 3) / 6
    + ((5 - 18 * T + T ** 2 + 72 * C - 58 * ECC_PRIME_SQUARED) * Aaux ** 5) / 120
  ) + FALSE_EASTING;

  const northing = K0 * (
    M + N * tanLat * (
      Aaux ** 2 / 2
      + ((5 - T + 9 * C + 4 * C ** 2) * Aaux ** 4) / 24
      + ((61 - 58 * T + T ** 2 + 600 * C - 330 * ECC_PRIME_SQUARED) * Aaux ** 6) / 720
    )
  );

  return { easting, northing };
};

/* Los inputs del formulario exigen 6 enteros + 2 decimales (E) y
   7 enteros + 2 decimales (N), con punto como separador. */
const formatMeters = (value, integerDigits) => {
  const digits = String(Math.round(Math.abs(value) * 100)).padStart(integerDigits + 2, "0");
  return `${digits.slice(0, -2)}.${digits.slice(-2)}`;
};

export const formatUtmFields = ({ easting, northing }) => ({
  e: formatMeters(easting, 6),
  n: formatMeters(northing, 7),
});

/* Solo se marca automaticamente si ambos campos tienen el formato esperado. */
export const parseUtmFields = (east, north) => {
  const eText = String(east ?? "").trim();
  const nText = String(north ?? "").trim();

  if (!/^\d{6}.\d{1,2}$/.test(eText) || !/^\d{7}.\d{1,2}$/.test(nText)) return null;

  const easting = Number(eText);
  const northing = Number(nText);
  if (!Number.isFinite(easting) || !Number.isFinite(northing)) return null;

  return { easting, northing };
};

/* UTM (huso 19) -> WGS84, inversa de la proyeccion de Snyder. */
export const utmToLatLng = ({ easting, northing }, zone = HUSO) => {
  const centralMeridian = ((zone - 1) * 6 - 180 + 3) * (Math.PI / 180);
  const x = easting - FALSE_EASTING;
  const m = northing / K0;

  const sqrtE = Math.sqrt(1 - ECC_SQUARED);
  const e1 = (1 - sqrtE) / (1 + sqrtE);
  const mu = m / (A * (
    1 - ECC_SQUARED / 4 - (3 * ECC_SQUARED ** 2) / 64 - (5 * ECC_SQUARED ** 3) / 256
  ));

  const phi1 = mu
    + ((3 * e1) / 2 - (27 * e1 ** 3) / 32) * Math.sin(2 * mu)
    + ((21 * e1 ** 2) / 16 - (55 * e1 ** 4) / 32) * Math.sin(4 * mu)
    + ((151 * e1 ** 3) / 96) * Math.sin(6 * mu)
    + ((1097 * e1 ** 4) / 512) * Math.sin(8 * mu);

  const sinPhi1 = Math.sin(phi1);
  const cosPhi1 = Math.cos(phi1);
  const tanPhi1 = Math.tan(phi1);
  const C1 = ECC_PRIME_SQUARED * cosPhi1 * cosPhi1;
  const T1 = tanPhi1 * tanPhi1;
  const N1 = A / Math.sqrt(1 - ECC_SQUARED * sinPhi1 * sinPhi1);
  const R1 = (A * (1 - ECC_SQUARED)) / (1 - ECC_SQUARED * sinPhi1 * sinPhi1) ** 1.5;
  const D = x / (N1 * K0);

  const latRad = phi1 - (N1 * tanPhi1 / R1) * (
    D ** 2 / 2
    - ((5 + 3 * T1 + 10 * C1 - 4 * C1 ** 2 - 9 * ECC_PRIME_SQUARED) * D ** 4) / 24
    + ((61 + 90 * T1 + 298 * C1 + 45 * T1 ** 2 - 252 * ECC_PRIME_SQUARED - 3 * C1 ** 2) * D ** 6) / 720
  );

  const lngRad = centralMeridian + (
    D
    - ((1 + 2 * T1 + C1) * D ** 3) / 6
    + ((5 - 2 * C1 + 28 * T1 - 3 * C1 ** 2 + 8 * ECC_PRIME_SQUARED + 24 * T1 ** 2) * D ** 5) / 120
  ) / cosPhi1;

  return [(latRad * 180) / Math.PI, (lngRad * 180) / Math.PI];
};
