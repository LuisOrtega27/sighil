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
import { INSTITUTION } from "../../config/institution";

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
    <div className="mb-6 rounded-lg border-t-4 border-secondary bg-white p-[30px] shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
      <h2 className="mb-1 text-xl font-bold uppercase text-primary">Consulta y Cruce de Datos Territoriales</h2>
      <div className="mb-6 text-[12.5px] font-semibold uppercase tracking-[0.5px] text-[#64748b]">
        Análisis espacial en tiempo real de la poligonal del Municipio {INSTITUTION.municipio}
      </div>

      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-line bg-[#e2e8f0]">
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
            className={`cursor-pointer rounded border-none text-xs font-bold uppercase text-white transition-colors mr-0.5 bg-secondary px-2 py-1 text-[11px] hover:bg-primary mt-[15px]`}
            onClick={() => alert("Cargando API de Mapas...")}
          >
            Centrar en Poligonal Metropolitana
          </button>
        </div>

        <div className="absolute right-[15px] top-[15px] w-[180px] rounded-md bg-white p-3 text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
          <b className="mb-1.5 block text-[10px] uppercase text-primary">
            Control de Capas SIG
          </b>
          <label className="mb-1 block">
            <input type="checkbox" defaultChecked /> Red de Drenaje e Hilos
          </label>
          <label className="mb-1 block">
            <input type="checkbox" defaultChecked /> Inventario de Obras SIROH
          </label>
          <label className="mb-1 block">
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
