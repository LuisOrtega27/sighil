/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/options.js
   Listas de opciones/etiquetas migradas desde siroh.html.
   Esto es ESTRUCTURA de formulario (markup), no datos de backend.
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Nota: la validacion original "sub_cuenca" se llenaba desde
   js/components/mainForm.js (archivo inexistente en el repo), por lo que
   las subcuencas quedan vacias hasta contar con backend. */

/* ---- Vista 1: datalists ---- */
export const SHORT_CODES = [
  "CAT", "ANA", "MAR", "FLO", "CHA", "VAL", "JUA", "HAC", "GUA", "MAC",
  "ADE", "SAB", "PEO", "MAM", "PED", "TOR", "ALG", "SAN", "CAR", "TRI",
  "LIM", "ASN", "TAC", "TOP",
];

export const PARROQUIAS = [
  "Altagracia", "Antímano", "Caricuao", "Catedral", "Coche", "El Junquito",
  "El Paraíso", "El Recreo", "El Valle", "La Candelaria", "La Pastora",
  "La Vega", "Macarao", "San Agustín", "San Bernardino", "San José",
  "San Juan", "San Pedro", "Santa Rosalía", "Santa Teresa", "Sucre",
  "23 de Enero",
];

/* ---- Vista 2: Entorno fisico ---- */
export const COBERTURA_VEGETAL = [
  { id: "ent_fisi__arboreo", name: "ent_fisi__arboreo", value: "arboreo", label: "ARBOREO" },
  { id: "ent_fisi__arbustivos", name: "ent_fisi__arbustivos", value: "arbustivos", label: "ARBUSTIVOS" },
  { id: "ent_fisi__herbaceos", name: "ent_fisi__herbaceos", value: "herbaceos", label: "HERBACEOS" },
  { id: "ent_fisi__area_cult", name: "ent_fisi__area_cult", value: "area de cultivo", label: "AREA DE CULTIVO" },
  { id: "ent_fisi__sue_des", name: "ent_fisi__sue_des", value: "suelos desnudos", label: "SUELOS DESNUDOS" },
  { id: "ent_fisi__area_ocu", name: "ent_fisi__area_ocu", value: "area ocupada", label: "AREA OCUPADA" },
];

export const FACTORES_CONTAMINANTES = [
  { id: "ent_fisi__agu_neg", name: "ent_fisi__agu_neg", value: "aguas negras", label: "AGUAS NEGRAS" },
  { id: "ent_fisi__escom", name: "ent_fisi__escom", value: "escombros", label: "ESCOMBROS" },
  { id: "ent_fisi__basura", name: "ent_fisi__basura", value: "basura", label: "BASURA" },
  { id: "ent_fisi__resi_fore", name: "ent_fisi__resi_fore", value: "residuos forestales", label: "RESIDUOS FORESTALES" },
  { id: "ent_fisi__prese_arbol_caido", name: "ent_fisi__prese_arbol_caido", value: "presencia de arboles caidos", label: "PRESENCIA DE ARBOLES CAIDOS" },
];

export const USOS_SUELO = [
  { id: "ent_fisi__agri", name: "ent_fisi__agri", value: "agricola", label: "Agrícola / Cultivos" },
  { id: "ent_fisi__indus", name: "ent_fisi__indus", value: "industrias", label: "Industrias" },
  { id: "ent_fisi__comer", name: "ent_fisi__comer", value: "comercios", label: "Comercios" },
  { id: "ent_fisi__urban", name: "ent_fisi__urban", value: "urbana", label: "Urbana / Viviendas" },
];

export const VARIACION = [
  { id: "ent_fisi__r_perma", name: "ent_fisi__variacion", value: "permanente", label: "R. Permanente" },
  { id: "ent_fisi__r_inter", name: "ent_fisi__variacion", value: "intermitente", label: "R. Intermitente" },
  { id: "ent_fisi__r_efi", name: "ent_fisi__variacion", value: "efimero", label: "R. Efimero" },
];

export const RETIRO_CUERPO_AGUA = [
  { id: "ent_fisi__a_prote_ocu", name: "ent_fisi__retiro_cuerpo_agua", value: "proteccion ocupada", label: "A. PROTECCION OCUPADA" },
  { id: "ent_fisi__a_prote_15", name: "ent_fisi__retiro_cuerpo_agua", value: "proteccion 15M", label: "A. PROTECCION 15 M" },
  { id: "ent_fisi__a_prote_80", name: "ent_fisi__retiro_cuerpo_agua", value: "proteccion 80M", label: "A. PROTECCION 80 M" },
  { id: "ent_fisi__a_prote_100", name: "ent_fisi__retiro_cuerpo_agua", value: "proteccion 100M", label: "A. PROTECCION 100 M" },
];

export const ALTERACIONES_CAUSE = [
  { id: "ent_fisi__soca_marge", name: "ent_fisi__soca_marge", value: "socavacion de los margenes", label: "SOCAVACION DE LOS MARGENES" },
  { id: "ent_fisi__flujo_turbu", name: "ent_fisi__flujo_turbu", value: "flujos turbulentos", label: "FLUJOS TURBULENTOS" },
  { id: "ent_fisi__sedim", name: "ent_fisi__sedim", value: "sedimentos", label: "SEDIMENTOS" },
  { id: "ent_fisi__rocas", name: "ent_fisi__rocas", value: "rocas", label: "ROCAS" },
];

export const VIVIENDAS = [
  { id: "ent_fisi__a_la_mar", name: "ent_fisi__a_la_mar", value: "a las margenes", label: "A LAS MARGENES" },
  { id: "ent_fisi__dentro_cause", name: "ent_fisi__dentro_cause", value: "dentro del cause", label: "DENTRO DEL CAUSE" },
];

/* ---- Vista 3: Tipologia de la obra ---- */
export const CONDICION_ACTUAL = [
  { id: "tipo_obra__opera", name: "tipo_obra", value: "operativa", label: "OPERATIVA", required: true },
  { id: "tipo_obra__inopera", name: "tipo_obra", value: "inoperativa", label: "INOPERATIVA" },
  { id: "tipo_obra__limit", name: "tipo_obra", value: "con limitaciones", label: "CON LIMITACIONES" },
];

export const ELEMENTOS_CONSTRUCCION = [
  { id: "tipo_obra__con_arm", name: "tipo_obra__con_arm", value: "concreto armado", label: "CONCRETO ARMADO" },
  { id: "tipo_obra__con_prefab", name: "tipo_obra__con_prefab", value: "concreto prefabricado", label: "CONCRETO PREFABRICADO" },
  { id: "tipo_obra__con_cicl", name: "tipo_obra__con_cicl", value: "contreto ciclopeo", label: "CONCRETO CICLOPEO" },
  { id: "tipo_obra__ace_estruc", name: "tipo_obra__ace_estruc", value: "acero estructural", label: "ACERO ESTRUCTURAL" },
  { id: "tipo_obra__mampos", name: "tipo_obra__mampos", value: "mamposteria", label: "MAMPOSTERIA" },
  { id: "tipo_obra__madera", name: "tipo_obra__madera", value: "madera", label: "MADERA" },
  { id: "tipo_obra__piedra", name: "tipo_obra__piedra", value: "piedra", label: "PIEDRA" },
  { id: "tipo_obra__gavion", name: "tipo_obra__gavion", value: "gavion", label: "GAVION" },
  { id: "tipo_obra__tierra", name: "tipo_obra__tierra", value: "tierra", label: "TIERRA" },
];

export const CLASIFICACION = [
  { id: "tipo_obra__capta", name: "tipo_obra__capta", value: "captacion", label: "CAPTACION" },
  { id: "tipo_obra__transp", name: "tipo_obra__transp", value: "transporte", label: "TRANSPORTE" },
  { id: "tipo_obra__con_regu", name: "tipo_obra__con_regu", value: "control y regulacion", label: "CONTROL Y REGULACION" },
  { id: "tipo_obra__distri", name: "tipo_obra__distri", value: "distribucion", label: "DISTRIBUCION" },
  { id: "tipo_obra__reco", name: "tipo_obra__reco", value: "recoleccion", label: "RECOLECCION" },
  { id: "tipo_obra__trata", name: "tipo_obra__trata", value: "tratamiento", label: "TRATAMIENTO" },
  { id: "tipo_obra__pro_mejo", name: "tipo_obra__pro_mejo", value: "proteccion y mejoras", label: "PROTECCION Y MEJORAS" },
  { id: "tipo_obra__trans_ene", name: "tipo_obra__trans_ene", value: "transformacion de energia", label: "TRANSFORMACION DE ENERGIA" },
];

export const FUNCION = [
  { id: "tipo_obra__conten", name: "tipo_obra__conten", value: "contencion", label: "CONTENCION" },
  { id: "tipo_obra__conduc", name: "tipo_obra__conduc", value: "conduccion", label: "CONDUCCION" },
  { id: "tipo_obra__toma", name: "tipo_obra__toma", value: "toma", label: "TOMA" },
  { id: "tipo_obra__con_flu", name: "tipo_obra__con_flu", value: "control fluvial", label: "CONTROL FLUVIAL" },
  { id: "tipo_obra__evacu", name: "tipo_obra__evacu", value: "evacuacion", label: "EVACUACION" },
  { id: "tipo_obra__espe", name: "tipo_obra__espe", value: "especiales", label: "ESPECIALES" },
];

/* ---- Vista 4: Caracteristicas de la obra ---- */
export const DISENO_DIQUE = [
  { id: "carac_obra__gravedad1", name: "carac_obra__diseno_obra", value: "gravedad", label: "GRAVEDAD" },
  { id: "carac_obra__arco", name: "carac_obra__diseno_obra", value: "arco", label: "ARCO" },
  { id: "carac_obra__contrafu", name: "carac_obra__diseno_obra", value: "contrafuente", label: "CONTRAFUERTE" },
  { id: "carac_obra__mate_suel", name: "carac_obra__diseno_obra", value: "materiales sueltos", label: "MATERIALES SUELTOS" },
];

export const TIPO_DIQUE = [
  { id: "carac_obra__vent", name: "carac_obra__tipo_dique", value: "ventana", label: "VENTANA" },
  { id: "carac_obra__ranu", name: "carac_obra__tipo_dique", value: "ranura", label: "RANURA" },
  { id: "carac_obra__enrej", name: "carac_obra__tipo_dique", value: "enrejado", label: "ENREJADO" },
  { id: "carac_obra__rastri", name: "carac_obra__tipo_dique", value: "rastrillo", label: "RASTRILLO" },
];

export const TIPO_MURO = [
  { id: "carac_obra__hinca", name: "carac_obra__tipo_muro", value: "hincado", label: "HINCADO" },
  { id: "carac_obra__anclado", name: "carac_obra__tipo_muro", value: "anclado", label: "ANCLADO" },
  { id: "carac_obra__cont_fuer", name: "carac_obra__tipo_muro", value: "contra fuerte", label: "CONTRA FUERTE" },
  { id: "carac_obra__grave_arma", name: "carac_obra__tipo_muro", value: "gravedad armado", label: "GRAVEDAD ARMADO" },
  { id: "carac_obra__gravedad2", name: "carac_obra__tipo_muro", value: "gravedad", label: "GRAVEDAD" },
];

export const TIPO_DESCANSO = [
  { id: "carac_obra__pie", name: "carac_obra__tipo_descanso", value: "pie", label: "PIE" },
  { id: "carac_obra__corte_relle", name: "carac_obra__tipo_descanso", value: "corte y relleno", label: "CORTE Y RELLENO" },
  { id: "carac_obra__corte_vanq", name: "carac_obra__tipo_descanso", value: "corte vanqueta", label: "CORTE BANQUETA" },
];

export const VERTEDEROS = [
  { id: "carac_obra__simple", name: "carac_obra__vertederos", value: "simple", label: "SIMPLE" },
  { id: "carac_obra__multi", name: "carac_obra__vertederos", value: "multiple", label: "MULTIPLE" },
  { id: "carac_obra__canti", name: "carac_obra__vertederos", value: "cantidad", label: "CANTIDAD" },
];

/* Campos de estructuras auxiliares (solo numericos, maxlength 2) */
export const ESTRUCTURAS_AUXILIARES = [
  { id: "carac_obra__mechi", name: "carac_obra__mechi", label: "MECHINALES" },
  { id: "carac_obra__disp_ener", name: "carac_obra__disp_ener", label: "DISPARADOR DE ENERGIA" },
  { id: "carac_obra__malla_cont", name: "carac_obra__malla_cont", label: "MALLA DE CONTENCION" },
  { id: "carac_obra__alivi", name: "carac_obra__alivi", label: "ALIVIADEROS" },
  { id: "carac_obra__peine_debas", name: "carac_obra__peine_debas", label: "PEINE DE DESBASTE" },
  { id: "carac_obra__contradic", name: "carac_obra__contradic", label: "CONTRADIQUE" },
  { id: "carac_obra__espigo", name: "carac_obra__espigo", label: "ESPIGONES" },
  { id: "carac_obra__enroca", name: "carac_obra__enroca", label: "ENROCADO" },
];

/* Disenos con imagen (canales / diques) */
export const CANALES = [
  { id: "carac_obra__disenos__canales__rectangular", name: "carac_obra__disenos__canales__rectangular", value: "rectangular", label: "Rectangular", img: "canales-rectangular", alt: "Canal Rectangular" },
  { id: "carac_obra__disenos__canales__trapezoidal", name: "carac_obra__disenos__canales__trapezoidal", value: "trapezoidal", label: "Trapezoidal", img: "canales-trapezoidal", alt: "Canal Trapezoidal" },
  { id: "carac_obra__disenos__canales__triangular", name: "carac_obra__disenos__canales__triangular", value: "triangular", label: "Triangular", img: "canales-triangular", alt: "Canal Triangular" },
];

export const DIQUES_CERRADOS = [
  { id: "carac_obra__disenos__diques_cerrados__rectangular", name: "carac_obra__disenos__diques_cerrados__rectangular", value: "rectangular", label: "Rectangular", img: "diques_cerrados-rectangular", alt: "Dique cerrado Rectangular" },
  { id: "carac_obra__disenos__diques_cerrados__trapezoidal", name: "carac_obra__disenos__diques_cerrados__trapezoidal", value: "trapezoidal", label: "Trapezoidal", img: "diques_cerrados-trapezoidal", alt: "Dique cerrado Trapezoidal" },
  { id: "carac_obra__disenos__diques_cerrados__circular", name: "carac_obra__disenos__diques_cerrados__circular", value: "circular", label: "Triangular", img: "diques_cerrados-circular", alt: "Dique cerrado Circular" },
];

export const DIQUES_ABIERTOS = [
  { id: "carac_obra__disenos__diques_abiertos__ranura", name: "carac_obra__disenos__diques_abiertos__ranura", value: "ranura", label: "Ranura", img: "diques_abiertos-ranura", alt: "Diques abiertos Ranura" },
  { id: "carac_obra__disenos__diques_abiertos__rastrillo", name: "carac_obra__disenos__diques_abiertos__rastrillo", value: "rastrillo", label: "Rastrillo", img: "diques_abiertos-rastrillo", alt: "Diques abiertos Rastrillo" },
  { id: "carac_obra__disenos__diques_abiertos__enrejado", name: "carac_obra__disenos__diques_abiertos__enrejado", value: "enrejado", label: "Enrejado", img: "diques_abiertos-enrejado", alt: "Diques abiertos Enrejado" },
];

/* Medidas */
export const MEDIDAS = [
  { id: "carac_obra__altura", name: "carac_obra__altura", label: "ALTURA:", pattern: "\\d{1,3}(,\\d{2})?", maxLength: 6, placeholder: "000,00" },
  { id: "carac_obra__base", name: "carac_obra__base", label: "BASE:", pattern: "\\d{1,5}(,\\d{2})?", maxLength: 8, placeholder: "00000,00" },
  { id: "carac_obra__ancho", name: "carac_obra__ancho", label: "ANCHO:", pattern: "\\d{1,5}(,\\d{2})?", maxLength: 8, placeholder: "00000,00" },
  { id: "carac_obra__longitud", name: "carac_obra__longitud", label: "LONGITUD:", pattern: "\\d{1,5}(,\\d{2})?", maxLength: 8, placeholder: "00000,00" },
  { id: "carac_obra__diametro", name: "carac_obra__diametro", label: "DIAMETRO:", pattern: "\\d{1,4}(,\\d{2})?", maxLength: 7, placeholder: "0000,00" },
  { id: "carac_obra__area", name: "carac_obra__area", label: "AREA:", pattern: "\\d{1,5}(,\\d{2})?", maxLength: 8, placeholder: "00000,00" },
  { id: "carac_obra__volumen", name: "carac_obra__volumen", label: "VOLUMEN:", pattern: "\\d{1,5}(,\\d{2})?", maxLength: 8, placeholder: "00000,00" },
];

/* ---- Vista 5: Danos ---- */
export const DANOS_ESTRUCTURALES = [
  { id: "danos_estruc__ex_ace_su", name: "danos_estruc__ex_ace_su", value: "exposicion del acero superficial", label: "EXPOSICION DEL ACERO SUPERFICIAL" },
  { id: "danos_estruc__ero_estruc_inter", name: "danos_estruc__ero_estruc_inter", value: "erocion de estructura interna", label: "EROSION DE ESTRUCTURA INTERNA" },
  { id: "danos_estruc__ero_cober_inter", name: "danos_estruc__ero_cober_inter", value: "erocion de cobertura interno", label: "EROSION DE COBERTURA INTERNO" },
  { id: "danos_estruc__def_exce_alza", name: "danos_estruc__def_exce_alza", value: "deformacion excesiva del alzado", label: "DEFORMACION EXCESIVA DEL ALZADO" },
  { id: "danos_estruc__efec_sismi", name: "danos_estruc__efec_sismi", value: "efecto sismico", label: "EFECTO SISMICO" },
  { id: "danos_estruc__desli_exter", name: "danos_estruc__desli_exter", value: "deslizamiento externo", label: "DESLIZAMIENTO EXTERNO" },
  { id: "danos_estruc__ruptu_fricc", name: "danos_estruc__ruptu_fricc", value: "ruptura por friccion", label: "RUPTURA POR FRICCION" },
  { id: "danos_estruc__despla_profu", name: "danos_estruc__despla_profu", value: "desplazamiento profundo", label: "DESPLAZAMIENTO PROFUNDO" },
  { id: "danos_estruc__desliza", name: "danos_estruc__desliza", value: "deslizamiento", label: "DESLIZAMIENTO" },
  { id: "danos_estruc__desplaza", name: "danos_estruc__desplaza", value: "desplazamiento", label: "DESPLAZAMIENTO" },
  { id: "danos_estruc__sobre_paso", name: "danos_estruc__sobre_paso", value: "sobre paso", label: "SOBRE PASO" },
  { id: "danos_estruc__vuelco", name: "danos_estruc__vuelco", value: "vuelco", label: "VUELCO" },
];

export const DANOS_VISIBLES = [
  { id: "danos_visivles__rup_es_cort", name: "danos_visivles__rup_es_cort", value: "ruptura por esfuerzo cortante", label: "RUPTURA POR ESFUERZO CORTANTE" },
  { id: "danos_visivles__rup_falla_cort", name: "danos_visivles__rup_falla_cort", value: "ruptura por falla de solape", label: "RUPTURA POR FALLA DE SOLAPE" },
  { id: "danos_visivles__rup_esfu_raspan", name: "danos_visivles__rup_esfu_raspan", value: "ruptura por esfuerzo raspante", label: "RUPTURA POR ESFUERZO RASPANTE" },
  { id: "danos_visivles__fisu_capa_concre", name: "danos_visivles__fisu_capa_concre", value: "fisura en la capa de concreto", label: "FISURA EN LA CAPA DE CONCRETO" },
  { id: "danos_visivles__super_giro_exce", name: "danos_visivles__super_giro_exce", value: "superficial giro excesivo", label: "SUPERFICIAL GIRO EXCESIVO" },
  { id: "danos_visivles__eroci_superfi", name: "danos_visivles__eroci_superfi", value: "erocion de superficie", label: "EROCION DE SUPERFICIE" },
  { id: "danos_visivles__socava_base", name: "danos_visivles__socava_base", value: "socavacion de la base", label: "SOCAVACION DE LA BASE" },
  { id: "danos_visivles__discon_concre", name: "danos_visivles__discon_concre", value: "discontinuidad del concreto", label: "DISCONTINUIDAD DEL CONCRETO" },
  { id: "danos_visivles__figu_exce", name: "danos_visivles__figu_exce", value: "figuracion excesiva", label: "FIGURACION EXCESIVA" },
  { id: "danos_visivles__colma", name: "danos_visivles__colma", value: "colmatada", label: "COLMATADA" },
  { id: "danos_visivles__carca", name: "danos_visivles__carca", value: "carcavas", label: "CARCAVAS" },
  { id: "danos_visivles__asenta", name: "danos_visivles__asenta", value: "asentamiento", label: "ASENTAMIENTO" },
];

export const DANOS_FUNCIONALES = [
  { id: "danos_funci__gene_duct", name: "danos_funci__gene_duct", value: "generacion de ductos", label: "GENERACION DE DUCTOS" },
  { id: "danos_funci__frac_comp", name: "danos_funci__frac_comp", value: "fracturas de compuertas", label: "FRACTURAS DE COMPUERTAS" },
  { id: "danos_funci__obst_alivi", name: "danos_funci__obst_alivi", value: "obstruccion de aliviaderos", label: "OBSTRUCCION DE ALIVIADEROS" },
  { id: "danos_funci__perme_cober_inter", name: "danos_funci__perme_cober_inter", value: "permeabilidad de cobertura interna", label: "PERMEABILIDAD DE COBERTURA INTERNA" },
  { id: "danos_funci__sedi_alt_max_obra", name: "danos_funci__sedi_alt_max_obra", value: "sedimiento a la altura maxima de la obra", label: "SEDIMIENTO A LA ALTURA MAXIMA DE LA OBRA" },
  { id: "danos_funci__infil", name: "danos_funci__infil", value: "infiltracion", label: "INFILTRACION" },
];

export const DANOS_CONCRETO = [
  { id: "danos_concr__desag", name: "danos_concr__desag", value: "desagregacion", label: "DESAGREGACIÓN" },
  { id: "danos_concr__disgr", name: "danos_concr__disgr", value: "disgregacion", label: "DISGREGACIÓN" },
  { id: "danos_concr__cavit", name: "danos_concr__cavit", value: "cavitacion", label: "CAVITACIÓN" },
];

export const DANOS_ACERO = [
  { id: "danos_acero__oxida", name: "danos_acero__oxida", value: "oxidación", label: "OXIDACIÓN" },
  { id: "danos_acero__corro", name: "danos_acero__corro", value: "corroción", label: "CORROCIÓN" },
  { id: "danos_acero__defor", name: "danos_acero__defor", value: "deformación", label: "DEFORMACIÓN" },
];

/* ---- Vista 6: Metodologia ---- */
export const NIVELES_COLMATAcion = [
  { id: "nivel_contaminacion__alto", name: "nivel_contaminacion", value: "alto", label: "A: ALTO" },
  { id: "nivel_contaminacion__medio", name: "nivel_contaminacion", value: "medio", label: "M: MEDIO " },
  { id: "nivel_contaminacion__bajo", name: "nivel_contaminacion", value: "bajo", label: "B: BAJO " },
];

/* ---- Sidebar: opciones de submenus ---- */
export const SIROH_SUB_LINKS = ["Nuevo", "Ver", "Otro"];

export const MET_SUB_LINKS = [
  { key: "estaciones", label: "Estaciones" },
  { key: "carga", label: "Carga" },
  { key: "historico", label: "Histórico" },
  { key: "anual", label: "Anual" },
  { key: "dashboard", label: "Dashboard" },
];

/* ---- Hidrologia ---- */
export const CUENCAS = [
  { id: "macarao", nombre: "Subcuenca Alta Quebrada Macarao" },
  { id: "caruata", nombre: "Subcuenca Quebrada Caroata" },
  { id: "valle", nombre: "Subcuenca Río El Valle Poniente" },
];
