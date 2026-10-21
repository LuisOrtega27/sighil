/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/Geoportal.jsx
   Seccion "Consulta y Cruce de Datos Territoriales" (antes:
   #page-geoportal de siroh.html).
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Notas sobre Google Maps (adaptado a React):
   - El original cargaba la Google Maps API con callback "initMap", definido
     en js/services/google_maps_api/map.js, archivo INEXISTENTE en el repo.
     Aqui se inyecta el <script> de la API una sola vez desde un useEffect,
     sin callback, y se deja este TODO para conectar initMap / el mapa real
     cuando exista ese modulo.
   - model-viewer (ajax.googleapis.com) y @googlemaps/extended-component-library
     (unpkg) NO se incluyen: ningun elemento del marcado los utiliza y sus
     scripts tampoco existen en el repo. TODO: agregarlos solo si el mapa
     real los necesita.
   - El contenedor es "mock" (mapa representativo), igual que el original. */

import { useEffect } from "react";
import {
  BTN_SMALL,
  CARD,
  CARD_SUB,
  CARD_TITLE,
  MAP_LAYER_BOX,
  MAP_LAYER_LABEL,
  MOCK_MAP,
} from "./styles";

// TODO: mover a variables de entorno (VITE_GMAPS_KEY) cuando exista .env.
const GMAPS_KEY =
  import.meta.env.VITE_GMAPS_KEY || "AIzaSyAPA21v1E06YuptbIYOjUp9Fd2VtOZ9BIA";

const Geoportal = () => {
  useEffect(() => {
    if (document.getElementById("gmaps-api")) return;
    const script = document.createElement("script");
    script.id = "gmaps-api";
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?v=beta&key=${GMAPS_KEY}&libraries=places,marker&loading=async`;
    document.head.appendChild(script);
    // TODO(initMap): el callback "initMap" del original no existe aun (map.js ausente).
  }, []);

  return (
    <div className={CARD}>
      <h2 className={CARD_TITLE}>Consulta y Cruce de Datos Territoriales</h2>
      <div className={CARD_SUB}>
        Análisis espacial en tiempo real de la poligonal del Municipio Libertador
      </div>

      <div className={MOCK_MAP}>
        <div className="relative z-[5] text-center text-[#475569]">
          <span className="text-[40px]">🗺️</span>
          <h3 className="mt-2.5 text-lg font-bold">
            PROYECCIÓN DE CAPAS SIG INTERACTIVAS
          </h3>
          <p className="mx-auto mt-[5px] max-w-[400px] text-xs">
            Representación cartográfica de quebradas, ejes fluviales principales y
            áreas vulnerables a inundaciones.
          </p>
          <button
            type="button"
            className={`${BTN_SMALL} mt-[15px]`}
            onClick={() => alert("Cargando API de Mapas...")}
          >
            Centrar en Poligonal Metropolitana
          </button>
        </div>

        <div className={MAP_LAYER_BOX}>
          <b className="mb-1.5 block text-[10px] uppercase text-primary">
            Control de Capas SIG
          </b>
          <label className={MAP_LAYER_LABEL}>
            <input type="checkbox" defaultChecked /> Red de Drenaje e Hilos
          </label>
          <label className={MAP_LAYER_LABEL}>
            <input type="checkbox" defaultChecked /> Inventario de Obras SIROH
          </label>
          <label className={MAP_LAYER_LABEL}>
            <input type="checkbox" /> Áreas de Inundación (Crecidas)
          </label>
          <label className="block">
            <input type="checkbox" /> Estaciones Red Pluviométrica
          </label>
        </div>
      </div>
    </div>
  );
};

export default Geoportal;
