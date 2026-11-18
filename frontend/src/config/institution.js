/* Fuente unica de la informacion institucional del sistema.
   Los textos y logos se toman de Login.jsx y del entorno SIROH (Sidebar/TopNavbar)
   como paginas de referencia; cualquier pagina nueva debe consumir este modulo. */

import logoAlcaldia from "../assets/icons/redStar_icon.png"
import logoImgrad from "../assets/imgs/logos/IMGRAD_logo.png"

export const INSTITUTION = Object.freeze({
  sigla: "SIGHIL",
  nombre: "Sistema de Información Geográfica e Hidrológica de Libertador",
  tagline: "Infraestructura Geográfica e Hidrológica",

  alcaldia: "Alcaldía de Caracas",
  alcaldiaMunicipio: "Alcaldía del Municipio Libertador",
  municipio: "Libertador",
  coordinacion: "Coordinación de Monitoreo de Quebradas y Obras Hidraulicas",

  organismo: "Instituto Municipal de Gestión de Riesgos y Administración de Desastres",
  organismoSigla: "IMGRAD",
  gestion: "IMGRAD • Gestión de Riesgos",
  sala: "IMGRAD: Sala Técnica de Control",

  descripcion:
    "Una plataforma analítica geoespacial diseñada para la gestión, control y monitoreo en tiempo real de la infraestructura hídrica, redes de drenaje urbano, variables meteorológicas y parámetros morfométricos de las cuencas del municipio. Optimizado para la mitigación de riesgos y soporte en la toma de decisiones ingenieriles.",

  version: "Versión v2.0 (2026)",
  entorno: "Entorno Operativo v2.6",
  acceso: "Acceso Restringido",

  logo: logoAlcaldia,
  logoImgrad,
})
