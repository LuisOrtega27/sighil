/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/CoordinateMapModal.jsx
   Modal con mapa Leaflet (OpenStreetMap) para georreferenciar la ficha SIROH.
   Al hacer clic en el mapa se calculan E/N en UTM (huso 19) y se entregan
   al formulario mediante onSelect({ e, n }). Incluye control de pantalla completa.
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

import { useEffect, useMemo, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FaCompress, FaExpand } from "react-icons/fa6";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  formatUtmFields,
  latLngToUtm,
  parseUtmFields,
  utmToLatLng,
} from "./utm";

/* Centro aproximado del Municipio Libertador (Caracas). */
const MAP_CENTER = [10.4806, -66.9036];
const MAP_ZOOM = 12;
const MARKER_STYLE = {
  radius: 8,
  color: "#0f2c59",
  weight: 2,
  fillColor: "#1d70b8",
  fillOpacity: 0.85,
};

/* El control de Leaflet se crea fuera de React, por eso se serializa el
   icono de react-icons a SVG para inyectarlo en el boton. */
const fullscreenIcon = (activo) =>
  renderToStaticMarkup(activo ? <FaCompress /> : <FaExpand />);

const CoordinateMapModal = ({ onClose, onSelect, initialE = "", initialN = "" }) => {
  const containerRef = useRef(null);
  const markerRef = useRef(null);

  const initialPoint = useMemo(() => {
    const parsed = parseUtmFields(initialE, initialN);
    if (!parsed) return null;
    const [lat, lng] = utmToLatLng(parsed);
    return { e: String(initialE).trim(), n: String(initialN).trim(), lat, lng };
  }, [initialE, initialN]);

  const [selected, setSelected] = useState(initialPoint);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const map = L.map(container, {
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    /* Control de pantalla completa implementado con la Fullscreen API;
       no requiere otro plugin de Leaflet. El icono viene de react-icons. */
    let fullscreenButton = null;
    let fullscreenResizeTimer;

    const toggleFullscreen = () => {
      if (document.fullscreenElement) {
        const salida = document.exitFullscreen?.();
        salida?.catch(() => {});
        return;
      }

      const entrada = container.requestFullscreen?.();
      entrada?.catch(() => {});
    };

    const syncFullscreenButton = () => {
      if (!fullscreenButton) return;

      const activo = document.fullscreenElement === container;
      const titulo = activo
        ? "Salir de pantalla completa"
        : "Pantalla completa";
      fullscreenButton.innerHTML = fullscreenIcon(activo);
      fullscreenButton.title = titulo;
      fullscreenButton.setAttribute("aria-label", titulo);

      clearTimeout(fullscreenResizeTimer);
      fullscreenResizeTimer = setTimeout(() => map.invalidateSize(), 50);
    };

    const fullscreenControl = L.control({ position: "topright" });
    fullscreenControl.onAdd = () => {
      fullscreenButton = L.DomUtil.create(
        "button",
        "leaflet-control flex h-8 w-8 items-center justify-center rounded bg-white text-base text-ink shadow-md"
      );
      fullscreenButton.type = "button";
      fullscreenButton.title = "Pantalla completa";
      fullscreenButton.setAttribute("aria-label", "Pantalla completa");
      fullscreenButton.innerHTML = fullscreenIcon(false);
      L.DomEvent.disableClickPropagation(fullscreenButton);
      L.DomEvent.disableScrollPropagation(fullscreenButton);
      L.DomEvent.on(fullscreenButton, "click", toggleFullscreen);
      return fullscreenButton;
    };

    fullscreenControl.addTo(map);
    document.addEventListener("fullscreenchange", syncFullscreenButton);

    const placeMarker = (lat, lng) => {
      if (markerRef.current) map.removeLayer(markerRef.current);
      markerRef.current = L.circleMarker([lat, lng], MARKER_STYLE).addTo(map);
    };

    /* Si la ficha ya tenia E/N, se convierte a lat/lng y se marca el punto
       automaticamente (y el mapa se centra en el). */
    if (initialPoint) {
      map.setView([initialPoint.lat, initialPoint.lng], MAP_ZOOM);
      placeMarker(initialPoint.lat, initialPoint.lng);
    }

    const handleMapClick = ({ latlng }) => {
      const fields = formatUtmFields(latLngToUtm(latlng.lat, latlng.lng));
      setSelected({ ...fields, lat: latlng.lat, lng: latlng.lng });
      onSelect(fields);
      placeMarker(latlng.lat, latlng.lng);
    };

    map.on("click", handleMapClick);

    /* El modal se monta con el contenedor oculto: Leaflet necesita recalcular
       su tamano una vez que ya tiene dimensiones reales. */
    const resizeTimer = setTimeout(() => map.invalidateSize(), 50);

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      /* En pantalla completa, Escape debe salir del fullscreen primero. */
      if (document.fullscreenElement) return;
      onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(resizeTimer);
      clearTimeout(fullscreenResizeTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", syncFullscreenButton);

      if (fullscreenButton) {
        L.DomEvent.off(fullscreenButton, "click", toggleFullscreen);
      }
      if (document.fullscreenElement === container) {
        const salida = document.exitFullscreen?.();
        salida?.catch(() => {});
      }

      map.off("click", handleMapClick);
      map.remove();
      markerRef.current = null;
    };
  }, [onClose, onSelect, initialPoint]);

  const handleBackdrop = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-950/70 p-4"
      onMouseDown={handleBackdrop}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="utm-map-modal-title"
        className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line bg-primary px-5 py-3 text-white">
          <div>
            <h2 id="utm-map-modal-title" className="text-sm font-bold">
              Seleccionar coordenadas UTM
            </h2>
            <p className="text-[11px] text-slate-300">
              {selected
                ? "Punto actual marcado. Haz clic en el mapa para moverlo."
                : "Haz clic en el mapa para obtener Este (E) y Norte (N) — Huso 19."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar mapa"
            className="rounded-lg px-3 py-1.5 text-lg leading-none text-white transition hover:bg-white/10"
          >
            ×
          </button>
        </div>

        <div ref={containerRef} className="h-[60vh] min-h-80 w-full" />

        <div className="flex flex-col gap-3 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          {selected ? (
            <div className="text-xs text-ink">
              <span className="font-mono font-bold">E: {selected.e}</span>
              <span className="mx-3 text-line">|</span>
              <span className="font-mono font-bold">N: {selected.n}</span>
              <p className="mt-1 text-[11px] text-slate-500">
                Lat {selected.lat.toFixed(6)} · Lng {selected.lng.toFixed(6)}
              </p>
            </div>
          ) : (
            <p className="text-xs text-slate-500">Aún no has seleccionado un punto.</p>
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-secondary px-5 py-2 text-xs font-bold text-white transition hover:opacity-90"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoordinateMapModal;
