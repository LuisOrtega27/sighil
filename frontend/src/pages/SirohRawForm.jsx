import redStarIcon from "../assets/icons/redStar_icon.png";
import IMGRADLogo from "../assets/imgs/logos/IMGRAD_logo.png";
import canalRectangular from "../assets/imgs/canales/canales-rectangular.png";
import canalTrapezoidal from "../assets/imgs/canales/canales-trapezoidal.png";
import canalTriangular from "../assets/imgs/canales/canales-triangular.png";
import diqueCerrRectangular from "../assets/imgs/diques-cerrados/diques_cerrados-rectangular.png";
import diqueCerrTrapezoidal from "../assets/imgs/diques-cerrados/diques_cerrados-trapezoidal.png";
import diqueCerrCircular from "../assets/imgs/diques-cerrados/diques_cerrados-circular.png";
import diqueAbrRanura from "../assets/imgs/diques_abiertos/diques_abiertos-ranura.png";
import diqueAbrRastrillo from "../assets/imgs/diques_abiertos/diques_abiertos-rastrillo.png";
import diqueAbrEnrejado from "../assets/imgs/diques_abiertos/diques_abiertos-enrejado.png";
import morteroGrandes from "../assets/imgs/morteros/mortero-grandes.png";
import morteroMedianos from "../assets/imgs/morteros/mortero-medianos.png";
import morteroBoronilla from "../assets/imgs/morteros/mortero-boronilla.png";
import morteroPolvo from "../assets/imgs/morteros/mortero-polvo.png";

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   Constantes de estilo (migracion de SirohRawForm.css a Tailwind v4)
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

const FORM_SECTION = "mb-1 border border-black p-1";
const FORM_SUB_SECTION = "border border-black p-1";
const DIV_2COL_ROW = "flex items-center justify-between mb-1";
const LABEL_NOWRAP = "whitespace-nowrap";
const DIV_3COL = "grid grid-cols-3 items-stretch gap-x-[30px] px-[30px]";
const DIV_ROWS = "grid items-stretch gap-1";
const SUB_TITLE = "text-sub mb-2.5 w-full text-center";
const TEXTAREA_OBS = "h-[80%] w-full resize-none border-0";

const INPUT_BASE = "border border-black px-2.5 py-0.5 invalid:border-[#f00] invalid:bg-error";
const INPUT_NO_BORDER = "border-0 bg-transparent px-2.5 py-0.5 invalid:border invalid:border-[#f00] invalid:bg-error";
const INPUT_UNDERLINE = "border-0 border-b border-black px-2.5 py-0.5 invalid:border invalid:border-[#f00] invalid:bg-error";
const INPUT_UNDERLINE_2 = "border-0 border-b-2 border-black px-2.5 py-0.5 invalid:border invalid:border-[#f00] invalid:bg-error";
const INPUT_DISABLED = "pointer-events-none border border-[#ccc] bg-[#ccc] px-2.5 py-0.5 text-[#434343] invalid:border-[#f00] invalid:bg-error";
const INPUT_CARD_SMALL = "w-10 border border-black p-1 invalid:border-[#f00] invalid:bg-error";
const RADIO_BASE = `${INPUT_BASE} [&:invalid]:shadow-[0_0_10px_#f00] [&:invalid]:accent-[#f00]`;

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   Componentes helper
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

const SubTitle = ({ children, className = "" }) => (
  <h2 className={`${SUB_TITLE} ${className}`}>{children}</h2>
);

const CheckOption = ({ id, name, value, label }) => (
  <div className={DIV_2COL_ROW}>
    <label htmlFor={id} className={LABEL_NOWRAP}>{label}</label>
    <input type="hidden" name={name} value="" />
    <input type="checkbox" name={name} id={id} value={value} className={INPUT_BASE} />
  </div>
);

const RadioOption = ({ id, name, value, label, first = false, required = false }) => (
  <div className={DIV_2COL_ROW}>
    <label htmlFor={id} className={LABEL_NOWRAP}>{label}</label>
    {first && <input type="hidden" name={name} value="" />}
    <input type="radio" name={name} id={id} value={value} required={required} className={RADIO_BASE} />
  </div>
);

const NAV_BUTTON = "rounded bg-[#2288ee] px-4 py-2 font-bold text-white transition hover:bg-[#1a6cb8] active:scale-95";

export const SirohRawForm = () => {
  return (
    <>
        <nav className="main_nav sticky top-0 z-50 flex items-center justify-between gap-4 bg-[#0f2c59] px-6 py-3 shadow-md">
            <img src={redStarIcon} alt="Alcaldia de Caracas - Instituto Municipal de Gestion de Riesgos y Administracion de desastres" title="Alcaldia de Caracas - Instituto Municipal de Gestion de Riesgos y Administracion de desastres" className="h-14 w-auto"/>

            <ul className="main_menu flex items-center gap-2">
                <li> <button type="button" id="main_menu__createRegistry" className={NAV_BUTTON}>Nuevo</button> </li>
                <li> <button type="button" id="main_menu__updateRegistry" className={NAV_BUTTON}>Actualizacion</button> </li>
                <li> <button type="button" id="main_menu__showHistory" className={NAV_BUTTON}>Historico</button> </li>
            </ul>

            <nav className="nav_history hidden max-h-48 overflow-y-auto rounded bg-white p-2 shadow-lg md:block">
                <ul className="menu_history flex flex-col gap-1">
                    <li className="flex items-center gap-2 rounded bg-[#f0f7ff] px-2 py-1 text-[#1e293b]">
                        <button type="button" className="text-[#2288ee] underline">ver</button>
                        <span className="menu_history__code font-bold">000007</span>
                        <span className="menu_history__coords flex gap-1 text-xs text-[#64748b]">
                            <span className="menu_history__coord__n">1234567,12</span>
                            <span className="menu_history__coord__e">123456,12</span>
                        </span>
                        <span className="menu_history__place">La Candelaria</span>
                    </li>
                </ul>
            </nav>

        </nav>


        <form  className="main_form flex flex-col gap-10 p-5" id="main_form">

            {/* <!--  ++++++++++++++++++++++++++++++++++++++++ PAGINA 1 ++++++++++++++++++++++++++++++++++++++++  --> */}

            <section className="letter mx-auto min-h-[1300px] w-[1200px] p-5 shadow-[0_0_10px_#000] pg1">

                {/* <!--  ========================================== HEADER ==================================  --> */}

                <header className={`${FORM_SECTION} header_secction grid grid-cols-3 items-center`}>

                    <div className="header_logo flex">
                        <img src={IMGRADLogo} alt="Logo del Instituto Municipal de Gestion de Riesgos y Administracion de Desastres" className="m-auto w-full"/>
                    </div>

                    <div className="header_title text-center">
                        <h1>COORDINACION DE MONITOREO DE QUEBRADAS Y OBRAS HIDRAULICAS</h1>
                        <SubTitle>FICHA DE EVALUCACION DE OBRAS HIDRAULICAS</SubTitle>
                    </div>

                    <div className="header_fecha grid grid-cols-2 items-center gap-1">
                        <div>
                            <label htmlFor="header_fecha__fecha" className="inline-block w-full">FECHA</label>
                            <input type="date"  name="header_fecha__fecha" id="header_fecha__fecha" required className={INPUT_BASE}/>
                        </div>
                        <div>
                            <label htmlFor="tiem_ins" className="inline-block w-full">TIEMPO DE INSPECCION</label>
                            <input type="text" name="tiem_ins" id="tiem_ins" placeholder="HH:MM" pattern="^\d{1,3}:\d{2}$"  title="el patron es: 'Horas:Minutos'" maxLength="6" required className={INPUT_BASE}/>
                        </div>
                        <div className="col-span-2 text-center">
                            <span>COORDENADAS UTM</span>
                            <div className="coor_utm_container relative grid grid-cols-[auto_1fr_auto_1fr] items-center border border-black p-0.5">
                                <label htmlFor="coor_utm__e">E:</label>
                                <input type="text" name="coor_utm__e" id="coor_utm__e" pattern="^\d{6}.\d{1,2}$" placeholder="000006.12" title="Patron esperado: 123456.12" maxLength="9" required className={`${INPUT_NO_BORDER} w-4/5`}/>
                                <label htmlFor="coor_utm__n">N:</label>
                                <input type="text" name="coor_utm__n" id="coor_utm__n" pattern="^\d{7}.\d{1,2}$" placeholder="0000007.12" title="Patron esperado: 1234567.12" maxLength="10" required className={`${INPUT_NO_BORDER} w-4/5`}/>

                                <button type="button" id="modal-map-btn" className="absolute right-0 top-1/2 inline-block cursor-pointer p-1 translate-x-20 -translate-y-1/2 transition active:scale-[0.8] hover:fill-[#2288ee]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="aspect-square h-5">
                                        {/* <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--> */}
                                        <path d="M576 112C576 100.9 570.3 90.6 560.8 84.8C551.3 79 539.6 78.4 529.7 83.4L413.5 141.5L234.1 81.6C226 78.9 217.3 79.5 209.7 83.3L81.7 147.3C70.8 152.8 64 163.9 64 176L64 528C64 539.1 69.7 549.4 79.2 555.2C88.7 561 100.4 561.6 110.3 556.6L226.4 498.5L399.7 556.3C395.4 549.9 391.2 543.2 387.1 536.4C376.1 518.1 365.2 497.1 357.1 474.6L255.9 440.9L255.9 156.4L383.9 199.1L383.9 298.4C414.9 262.6 460.9 240 511.9 240C534.5 240 556.1 244.4 575.9 252.5L576 112zM512 288C445.7 288 392 340.8 392 405.9C392 474.8 456.1 556.3 490.6 595.2C502.2 608.2 521.9 608.2 533.5 595.2C568 556.3 632.1 474.8 632.1 405.9C632.1 340.8 578.4 288 512.1 288zM472 408C472 385.9 489.9 368 512 368C534.1 368 552 385.9 552 408C552 430.1 534.1 448 512 448C489.9 448 472 430.1 472 408z"/>
                                    </svg>
                                </button>

                            </div>
                        </div>
                    </div>

                    <div className="header_codigo col-span-3 flex items-center gap-5">
                        <label htmlFor="ficha_n" className={`${LABEL_NOWRAP} header_codigo-ficha_n`}>FICHA Nº:</label>
                        <input
                            type="text"
                            name="ficha_n"
                            id="ficha_n"
                            pattern="\d{2}-\d{2}-\d{2}-\w{3}-\d{2}"
                            placeholder="00-00-00-ABC-00"
                            title="Patron esperado: '00-00-00-ABC-00'"
                            required
                            autoFocus
                            maxLength="15"
                            autoComplete="off"
                            list=""
                            className={INPUT_BASE}
                        />
                        <datalist id="short-code">
                            <option value="CAT"></option>
                            <option value="ANA"></option>
                            <option value="MAR"></option>
                            <option value="FLO"></option>
                            <option value="CHA"></option>
                            <option value="VAL"></option>
                            <option value="JUA"></option>
                            <option value="HAC"></option>
                            <option value="GUA"></option>
                            <option value="MAC"></option>
                            <option value="ADE"></option>
                            <option value="SAB"></option>
                            <option value="PEO"></option>
                            <option value="MAM"></option>
                            <option value="PED"></option>
                            <option value="TOR"></option>
                            <option value="ALG"></option>
                            <option value="SAN"></option>
                            <option value="CAR"></option>
                            <option value="TRI"></option>
                            <option value="LIM"></option>
                            <option value="ASN"></option>
                            <option value="TAC"></option>
                            <option value="TOP"></option>
                        </datalist>

                        <input type="hidden" name="modification" id="modification" value="00"/>
                        <label htmlFor="cod_n" className={`${LABEL_NOWRAP} header_codigo-cod_n`}>CODIGO Nº:</label>
                        <input type="text" className={INPUT_DISABLED} name="cod_n" id="cod_n" tabIndex="-1" pattern="\d{6}" required/>

                        <div className="flex items-center gap-1 border border-black p-0.5">
                            <label htmlFor="header_codigo__huso">HUSO:</label>
                            <input type="number" name="header_codigo__huso" id="header_codigo__huso" value="19" className={`${INPUT_DISABLED} w-[30%]`}  tabIndex="-1" readOnly required/>
                            <span>N</span>

                            <label htmlFor="header_codigo__altura">ALTURA:</label>
                            <input type="text" name="header_codigo__altura" id="header_codigo__altura" pattern="\d{1,4}(,\d{2})?" maxLength="7" required className={`${INPUT_BASE} w-[30%]`}/>
                            <span>M.S.N.M</span>
                        </div>
                    </div>

                </header>

                {/* <!--  ========================================== ID_TEC ==================================  --> */}

                <article className={`${FORM_SECTION} id_tec`}>
                    <SubTitle> IDENTIFICACION DE LOS TECNICOS</SubTitle>
                    <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-2.5">
                        <label htmlFor="id_tec__nom_ape_1">NOMBRE Y APELLIDO:</label>
                        <input type="text" name="id_tec__nom_ape_1" id="id_tec__nom_ape_1" required className={INPUT_BASE}/>
                        <label htmlFor="id_tec__tlf_1">TLF:</label>
                        <input type="tel" name="id_tec__tlf_1" id="id_tec__tlf_1" placeholder="0000-0000000" pattern="^\d{4}-\d{7}$" maxLength="12" required className={INPUT_BASE}/>
                    </div>
                    <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-2.5">
                        <label htmlFor="id_tec__nom_ape_2">NOMBRE Y APELLIDO:</label>
                        <input type="text" name="id_tec__nom_ape_2" id="id_tec__nom_ape_2" className={INPUT_BASE}/>
                        <label htmlFor="id_tec__tlf_2">TLF:</label>
                        <input type="tel" name="id_tec__tlf_2" id="id_tec__tlf_2" placeholder="0000-0000000" pattern="^\d{4}-\d{7}$" maxLength="12" className={INPUT_BASE}/>
                    </div>
                </article>

                {/* <!--  ========================================== DATOS_CUENTA ==================================  --> */}

                <article className={`${FORM_SECTION} datos_cuenta`}>

                    <SubTitle>DATOS DE LA CUENCA</SubTitle>

                    <div className="grid grid-cols-[repeat(3,auto_1fr)] items-center gap-1">
                        <label htmlFor="datos_cuenta__nombre">NOMBRE:</label>
                        <input type="text" name="datos_cuenta__nombre" id="datos_cuenta__nombre" className={`${INPUT_BASE} col-[2/7]`} required/>

                        <label htmlFor="datos_cuenta__estado">ESTADO:</label>
                        <input type="text" className={INPUT_DISABLED} name="datos_cuenta__estado" id="datos_cuenta__estado" value="Distrito_Capital" tabIndex="-1" readOnly/>

                        <label htmlFor="datos_cuenta__municipio">MUNICIPIO:</label>
                        <input type="text" className={INPUT_DISABLED} name="datos_cuenta__municipio" id="datos_cuenta__municipio" value="Libertador" tabIndex="-1" readOnly/>

                        <label htmlFor="datos_cuenta__parroquia">PARROQUIA:</label>
                        <input type="text" name="datos_cuenta__parroquia" id="datos_cuenta__parroquia" list="parroquias" required className={INPUT_BASE}/>
                        <datalist id="parroquias">
                            <option value="Altagracia"/>
                            <option value="Antímano"/>
                            <option value="Caricuao"/>
                            <option value="Catedral"/>
                            <option value="Coche"/>
                            <option value="El Junquito"/>
                            <option value="El Paraíso"/>
                            <option value="El Recreo"/>
                            <option value="El Valle"/>
                            <option value="La Candelaria"/>
                            <option value="La Pastora"/>
                            <option value="La Vega"/>
                            <option value="Macarao"/>
                            <option value="San Agustín"/>
                            <option value="San Bernardino"/>
                            <option value="San José"/>
                            <option value="San Juan"/>
                            <option value="San Pedro"/>
                            <option value="Santa Rosalía"/>
                            <option value="Santa Teresa"/>
                            <option value="Sucre"/>
                            <option value="23 de Enero"/>
                        </datalist>

                        <label htmlFor="datos_cuenta__cent_pobl">CENTRO POBLADO:</label>
                        <input type="text" name="datos_cuenta__cent_pobl" id="datos_cuenta__cent_pobl" className={`${INPUT_BASE} col-[2/7]`} required/>
                    </div>

                </article>

                {/* <!--  ========================================== ENT_FISI ==================================  --> */}

                <article className={`${FORM_SECTION} ent_fisi`}>

                    <SubTitle>ENTORNO FISICO</SubTitle>

                    <div className="grid grid-cols-4 items-stretch gap-2.5">
                        <div className={`${FORM_SUB_SECTION} relative`}>

                            <SubTitle>COBERTURA VEGETAL</SubTitle>

                            <CheckOption id="ent_fisi__arboreo" name="ent_fisi__arboreo" value="arboreo" label="ARBOREO"/>
                            <CheckOption id="ent_fisi__arbustivos" name="ent_fisi__arbustivos" value="arbustivos" label="ARBUSTIVOS"/>
                            <CheckOption id="ent_fisi__herbaceos" name="ent_fisi__herbaceos" value="herbaceos" label="HERBACEOS"/>
                            <CheckOption id="ent_fisi__area_cult" name="ent_fisi__area_cult" value="area de cultivo" label="AREA DE CULTIVO"/>
                            <CheckOption id="ent_fisi__sue_des" name="ent_fisi__sue_des" value="suelos desnudos" label="SUELOS DESNUDOS"/>
                            <CheckOption id="ent_fisi__area_ocu" name="ent_fisi__area_ocu" value="area ocupada" label="AREA OCUPADA"/>

                            <div className={DIV_2COL_ROW}>
                                <label htmlFor="ent_fisi__alt_pro" className={LABEL_NOWRAP}>ALTURA PROMEDIO</label>
                                <input type="text" name="ent_fisi__alt_pro" id="ent_fisi__alt_pro" maxLength="2" pattern="[0-9]{1,2}" inputMode="numeric" className={`${INPUT_UNDERLINE} w-[30%]`}/>
                                <span className="absolute right-2.5 text-[#0008]">M</span>
                            </div>
                        </div>

                        <div className={`${FORM_SUB_SECTION} relative`}>

                            <SubTitle>FACTORES CONTAMINANTES</SubTitle>

                            <CheckOption id="ent_fisi__agu_neg" name="ent_fisi__agu_neg" value="aguas negras" label="AGUAS NEGRAS"/>
                            <CheckOption id="ent_fisi__escom" name="ent_fisi__escom" value="escombros" label="ESCOMBROS"/>
                            <CheckOption id="ent_fisi__basura" name="ent_fisi__basura" value="basura" label="BASURA"/>
                            <CheckOption id="ent_fisi__resi_fore" name="ent_fisi__resi_fore" value="residuos forestales" label="RESIDUOS FORESTALES"/>
                            <CheckOption id="ent_fisi__prese_arbol_caido" name="ent_fisi__prese_arbol_caido" value="presencia de arboles caidos" label="PRESENCIA DE ARBOLES CAIDOS"/>

                        </div>

                        <div className={`${FORM_SUB_SECTION} relative`}>

                            <SubTitle>USOS DEL SUELO EN CERCANIAS DE LA OBRA</SubTitle>

                            <CheckOption id="ent_fisi__agri" name="ent_fisi__agri" value="agricola" label="AGRICOLA"/>
                            <CheckOption id="ent_fisi__indus" name="ent_fisi__indus" value="industrias" label="INDUSTRIAS"/>
                            <CheckOption id="ent_fisi__comer" name="ent_fisi__comer" value="comercios" label="COMERCIOS"/>
                            <CheckOption id="ent_fisi__urban" name="ent_fisi__urban" value="urbana" label="URBANA"/>

                        </div>

                        <div className={`${FORM_SUB_SECTION} relative`}>

                            <SubTitle>VARIACION</SubTitle>

                            <RadioOption first id="ent_fisi__r_perma" name="ent_fisi__variacion" value="permanente" label="R. PERMANENTE"/>
                            <RadioOption id="ent_fisi__r_inter" name="ent_fisi__variacion" value="intermitente" label="R. INTERMITENTE"/>
                            <RadioOption id="ent_fisi__r_efi" name="ent_fisi__variacion" value="efimero" label="R. EFIMERO"/>

                        </div>

                        <div className={`${FORM_SUB_SECTION} relative`}>
                            <SubTitle>RETIRO DEL CUERPO DE AGUA</SubTitle>

                            <RadioOption first id="ent_fisi__a_prote_ocu" name="ent_fisi__retiro_cuerpo_agua" value="proteccion ocupada" label="A. PROTECCION OCUPADA"/>
                            <RadioOption id="ent_fisi__a_prote_15" name="ent_fisi__retiro_cuerpo_agua" value="proteccion 15M" label="A. PROTECCION 15 M"/>
                            <RadioOption id="ent_fisi__a_prote_80" name="ent_fisi__retiro_cuerpo_agua" value="proteccion 80M" label="A. PROTECCION 80 M"/>
                            <RadioOption id="ent_fisi__a_prote_100" name="ent_fisi__retiro_cuerpo_agua" value="proteccion 100M" label="A. PROTECCION 100 M"/>

                        </div>

                        <div className={DIV_ROWS}>

                            <div className={`${FORM_SUB_SECTION} relative`}>
                                <SubTitle>ALTERACIONES EN EL CAUSE</SubTitle>

                                <CheckOption id="ent_fisi__soca_marge" name="ent_fisi__soca_marge" value="socavacion de los margenes" label="SOCAVACION DE LOS MARGENES"/>
                                <CheckOption id="ent_fisi__flujo_turbu" name="ent_fisi__flujo_turbu" value="flujos turbulentos" label="FLUJOS TURBULENTOS"/>
                                <CheckOption id="ent_fisi__sedim" name="ent_fisi__sedim" value="sedimentos" label="SEDIMENTOS"/>
                                <CheckOption id="ent_fisi__rocas" name="ent_fisi__rocas" value="rocas" label="ROCAS"/>

                            </div>

                            <div className={`${FORM_SUB_SECTION} relative`}>
                                <SubTitle>PRESENCIA DE VIVIENDAS</SubTitle>

                                <CheckOption id="ent_fisi__a_la_mar" name="ent_fisi__a_la_mar" value="a las margenes" label="A LAS MARGENES"/>
                                <CheckOption id="ent_fisi__dentro_cause" name="ent_fisi__dentro_cause" value="dentro del cause" label="DENTRO DEL CAUSE"/>
                            </div>

                        </div>

                        <div className={`${FORM_SUB_SECTION} col-[3/5]`} >
                            <SubTitle>OBSERVACIONES</SubTitle>
                            <textarea className={TEXTAREA_OBS} name="ent_fisi__obsevaciones" id="ent_fisi__obsevaciones" wrap="soft"></textarea>
                        </div>

                    </div>

                </article>

                {/* <!--  ========================================== TIPO_OBRA ==================================  --> */}

                <article className={`${FORM_SECTION} tipo_obra grid grid-cols-3 items-stretch gap-2.5`}>
                    <SubTitle className="col-span-3">TIPOLOGIA DE LA OBRA</SubTitle>

                    <div className="tipo_obra-nombre_tiempo col-span-3 grid grid-cols-[auto_1fr_auto_auto] items-center gap-2.5">

                        <label htmlFor="tipo_obra__nombre">NOMBRE:</label>
                        <input type="text" name="tipo_obra__nombre" id="tipo_obra__nombre" className={INPUT_BASE}/>

                        <div className="tipo_obra__sub_div">
                            <label htmlFor="tipo_obra__tiempo">TIEMPO DE CONTRUCCION:</label>
                            <input type="text" name="tipo_obra__tiempo" id="tipo_obra__tiempo" maxLength="2" className={INPUT_BASE}/>

                            <select name="tipo_obra__tiempo_formato" id="tipo_obra__tiempo_formato" defaultValue="NULL">
                                <option value="NULL">Formato</option>
                                <option value="Años">Años</option>
                                <option value="Meses">Meses</option>
                            </select>
                        </div>

                    </div>

                    <div className={`${FORM_SUB_SECTION} tipo_obra-cad col-span-3 grid grid-cols-6 items-center text-center`}>

                        <SubTitle className="col-span-6">CONDICION ACTUAL DE LA ESTRUCTURA</SubTitle>

                        <label htmlFor="tipo_obra__opera">OPERATIVA</label>
                        <input type="hidden" name="tipo_obra" value=""/>
                        <input type="radio" name="tipo_obra" id="tipo_obra__opera" value="operativa" required className={RADIO_BASE}/>

                        <label htmlFor="tipo_obra__inopera">INOPERATIVA</label>
                        <input type="radio" name="tipo_obra" id="tipo_obra__inopera" value="inoperativa" className={RADIO_BASE}/>

                        <label htmlFor="tipo_obra__limit">CON LIMITACIONES</label>
                        <input type="radio" name="tipo_obra" id="tipo_obra__limit" value="con limitaciones" className={RADIO_BASE}/>

                    </div>

                    <div className={`${FORM_SUB_SECTION} relative`}>
                        <SubTitle>ELEMENTOS DE CONTRUCCION</SubTitle>

                        <CheckOption id="tipo_obra__con_arm" name="tipo_obra__con_arm" value="concreto armado" label="CONCRETO ARMADO"/>
                        <CheckOption id="tipo_obra__con_prefab" name="tipo_obra__con_prefab" value="concreto prefabricado" label="CONCRETO PREFABRICADO"/>
                        <CheckOption id="tipo_obra__con_cicl" name="tipo_obra__con_cicl" value="contreto ciclopeo" label="CONCRETO CICLOPEO"/>
                        <CheckOption id="tipo_obra__ace_estruc" name="tipo_obra__ace_estruc" value="acero estructural" label="ACERO ESTRUCTURAL"/>
                        <CheckOption id="tipo_obra__mampos" name="tipo_obra__mampos" value="mamposteria" label="MAMPOSTERIA"/>
                        <CheckOption id="tipo_obra__madera" name="tipo_obra__madera" value="madera" label="MADERA"/>
                        <CheckOption id="tipo_obra__piedra" name="tipo_obra__piedra" value="piedra" label="PIEDRA"/>
                        <CheckOption id="tipo_obra__gavion" name="tipo_obra__gavion" value="gavion" label="GAVION"/>
                        <CheckOption id="tipo_obra__tierra" name="tipo_obra__tierra" value="tierra" label="TIERRA"/>

                    </div>

                    <div className={`${FORM_SUB_SECTION} relative`}>
                        <SubTitle>CLASIFICACION</SubTitle>

                        <CheckOption id="tipo_obra__capta" name="tipo_obra__capta" value="captacion" label="CAPTACION"/>
                        <CheckOption id="tipo_obra__transp" name="tipo_obra__transp" value="transporte" label="TRANSPORTE"/>
                        <CheckOption id="tipo_obra__con_regu" name="tipo_obra__con_regu" value="control y regulacion" label="CONTROL Y REGULACION"/>
                        <CheckOption id="tipo_obra__distri" name="tipo_obra__distri" value="distribucion" label="DISTRIBUCION"/>
                        <CheckOption id="tipo_obra__reco" name="tipo_obra__reco" value="recoleccion" label="RECOLECCION"/>
                        <CheckOption id="tipo_obra__trata" name="tipo_obra__trata" value="tratamiento" label="TRATAMIENTO"/>
                        <CheckOption id="tipo_obra__pro_mejo" name="tipo_obra__pro_mejo" value="proteccion y mejoras" label="PROTECCION Y MEJORAS"/>
                        <CheckOption id="tipo_obra__trans_ene" name="tipo_obra__trans_ene" value="transformacion de energia" label="TRANSFORMACION DE ENERGIA"/>
                    </div>

                    <div className={DIV_ROWS}>

                        <div className={`${FORM_SUB_SECTION} grid grid-cols-2 items-center gap-3.75`}>

                            <SubTitle className="col-span-2">FUNCION</SubTitle>

                            <div>
                                <CheckOption id="tipo_obra__conten" name="tipo_obra__conten" value="contencion" label="CONTENCION"/>
                                <CheckOption id="tipo_obra__conduc" name="tipo_obra__conduc" value="conduccion" label="CONDUCCION"/>
                                <CheckOption id="tipo_obra__toma" name="tipo_obra__toma" value="toma" label="TOMA"/>
                            </div>

                            <div>
                                <CheckOption id="tipo_obra__con_flu" name="tipo_obra__con_flu" value="control fluvial" label="CONTROL FLUVIAL"/>
                                <CheckOption id="tipo_obra__evacu" name="tipo_obra__evacu" value="evacuacion" label="EVACUACION"/>
                                <CheckOption id="tipo_obra__espe" name="tipo_obra__espe" value="especiales" label="ESPECIALES"/>
                            </div>

                        </div>

                        <div className={FORM_SUB_SECTION}>
                            <SubTitle>DIMENCIONES DE ROCAS DE PRESTAMO</SubTitle>
                            <input type="text" className={`${INPUT_BASE} w-full`} name="tipo_obra__drp" id="tipo_obra__drp" maxLength="5" placeholder="00,00"/>
                        </div>

                        <div className={FORM_SUB_SECTION}>
                            <SubTitle>OTROS MATERIALES CONTRUCTIVOS</SubTitle>
                            <input type="text" className={`${INPUT_BASE} w-full`} name="tipo_obra__omc" id="tipo_obra__omc"/>
                        </div>

                    </div>

                    <div className={`${FORM_SUB_SECTION} tipo_obra-observaciones col-span-3 h-40`}>
                        <SubTitle>OBSERVACIONES</SubTitle>

                        <textarea className={TEXTAREA_OBS} name="tipo_obra__observaciones" id="tipo_obra__observaciones" wrap="soft"></textarea>

                    </div>

                </article>

            </section>

            {/* <!--  ++++++++++++++++++++++++++++++++++++++++ PAGINA 2 ++++++++++++++++++++++++++++++++++++++++  --> */}

            <section className="letter mx-auto min-h-[1300px] w-[1200px] p-5 shadow-[0_0_10px_#000] pg2">

                {/* <!--  ========================================== CARAC_OBRA ==================================  --> */}

                <article className={`${FORM_SECTION} carac_obra grid grid-cols-5 grid-rows-[repeat(5,auto)] items-stretch gap-2.5`}>

                    <SubTitle className="col-span-full">CARACTERISTICAS DE LA OBRA</SubTitle>

                    <div className={`${FORM_SUB_SECTION} relative`}>

                        <SubTitle>DISEÑO DE DIQUE</SubTitle>

                        <RadioOption first id="carac_obra__gravedad1" name="carac_obra__diseno_obra" value="gravedad" label="GRAVEDAD"/>
                        <RadioOption id="carac_obra__arco" name="carac_obra__diseno_obra" value="arco" label="ARCO"/>
                        <RadioOption id="carac_obra__contrafu" name="carac_obra__diseno_obra" value="contrafuente" label="CONTRAFUERTE"/>
                        <RadioOption id="carac_obra__mate_suel" name="carac_obra__diseno_obra" value="materiales sueltos" label="MATERIALES SUELTOS"/>

                    </div>

                    <div className={`${FORM_SUB_SECTION} relative`}>
                        <SubTitle>TIPO DE DIQUE</SubTitle>

                        <RadioOption first id="carac_obra__vent" name="carac_obra__tipo_dique" value="ventana" label="VENTANA"/>
                        <RadioOption id="carac_obra__ranu" name="carac_obra__tipo_dique" value="ranura" label="RANURA"/>
                        <RadioOption id="carac_obra__enrej" name="carac_obra__tipo_dique" value="enrejado" label="ENREJADO"/>
                        <RadioOption id="carac_obra__rastri" name="carac_obra__tipo_dique" value="rastrillo" label="RASTRILLO"/>

                    </div>

                    <div className={`${FORM_SUB_SECTION} relative`}>
                        <SubTitle>TIPO DE MURO</SubTitle>

                        <RadioOption first id="carac_obra__hinca" name="carac_obra__tipo_muro" value="hincado" label="HINCADO"/>
                        <RadioOption id="carac_obra__anclado" name="carac_obra__tipo_muro" value="anclado" label="ANCLADO"/>
                        <RadioOption id="carac_obra__cont_fuer" name="carac_obra__tipo_muro" value="contra fuerte" label="CONTRA FUERTE"/>
                        <RadioOption id="carac_obra__grave_arma" name="carac_obra__tipo_muro" value="gravedad armado" label="GRAVEDAD ARMADO"/>
                        <RadioOption id="carac_obra__gravedad2" name="carac_obra__tipo_muro" value="gravedad" label="GRAVEDAD"/>

                    </div>

                    <div className={`${FORM_SUB_SECTION} col-[4/6] row-[2/5]`}>
                        <SubTitle>OBSERVACIONES</SubTitle>
                        <textarea className={TEXTAREA_OBS} name="carac_obra__observaciones" id="carac_obra__observaciones" wrap="soft"></textarea>
                    </div>

                    <div className={`${FORM_SUB_SECTION} relative`}>
                        <SubTitle>TIPO DE DESCANSO</SubTitle>

                        <RadioOption first id="carac_obra__pie" name="carac_obra__tipo_descanso" value="pie" label="PIE"/>
                        <RadioOption id="carac_obra__corte_relle" name="carac_obra__tipo_descanso" value="corte y relleno" label="CORTE Y RELLENO"/>
                        <RadioOption id="carac_obra__corte_vanq" name="carac_obra__tipo_descanso" value="corte vanqueta" label="CORTE BANQUETA"/>

                    </div>

                    <div className={`${FORM_SUB_SECTION} col-[2/4] flex flex-wrap items-center justify-evenly`}>
                        <SubTitle className="w-full">VERTEDEROS</SubTitle>

                        <label htmlFor="carac_obra__simple" className={LABEL_NOWRAP}>SIMPLE</label>
                        <input type="hidden" name="carac_obra__vertederos" value=""/>
                        <input type="radio" name="carac_obra__vertederos" value="simple" id="carac_obra__simple" className={RADIO_BASE}/>

                        <label htmlFor="carac_obra__multi" className={LABEL_NOWRAP}>MULTIPLE</label>
                        <input type="radio" name="carac_obra__vertederos" value="multiple" id="carac_obra__multi" className={RADIO_BASE}/>

                        <label htmlFor="carac_obra__canti" className={LABEL_NOWRAP}>CANTIDAD</label>
                        <input type="radio" name="carac_obra__vertederos" value="cantidad" id="carac_obra__canti" className={RADIO_BASE}/>
                    </div>

                    <div className={`${FORM_SUB_SECTION} relative row-[4/6]`}>
                        <SubTitle>ESTRUCTURAS AUXILIARES</SubTitle>

                        <div className={DIV_2COL_ROW}>
                            <label htmlFor="carac_obra__mechi" className={LABEL_NOWRAP}>MECHINALES</label>
                            <input type="text" name="carac_obra__mechi" id="carac_obra__mechi" maxLength="2" pattern="[0-9]*" inputMode="numeric" className={INPUT_CARD_SMALL}/>
                        </div>

                        <div className={DIV_2COL_ROW}>
                            <label htmlFor="carac_obra__disp_ener" className={LABEL_NOWRAP}>DISPARADOR DE ENERGIA</label>
                            <input type="text" name="carac_obra__disp_ener" id="carac_obra__disp_ener" maxLength="2" pattern="[0-9]*" inputMode="numeric" className={INPUT_CARD_SMALL}/>
                        </div>

                        <div className={DIV_2COL_ROW}>
                            <label htmlFor="carac_obra__malla_cont" className={LABEL_NOWRAP}>MALLA DE CONTENCION</label>
                            <input type="text" name="carac_obra__malla_cont" id="carac_obra__malla_cont" maxLength="2" pattern="[0-9]*" inputMode="numeric" className={INPUT_CARD_SMALL}/>
                        </div>

                        <div className={DIV_2COL_ROW}>
                            <label htmlFor="carac_obra__alivi" className={LABEL_NOWRAP}>ALIVIADEROS</label>
                            <input type="text" name="carac_obra__alivi" id="carac_obra__alivi" maxLength="2" pattern="[0-9]*" inputMode="numeric" className={INPUT_CARD_SMALL}/>
                        </div>

                        <div className={DIV_2COL_ROW}>
                            <label htmlFor="carac_obra__peine_debas" className={LABEL_NOWRAP}>PEINE DE DESBASTE</label>
                            <input type="text" name="carac_obra__peine_debas" id="carac_obra__peine_debas" maxLength="2" pattern="[0-9]*" inputMode="numeric" className={INPUT_CARD_SMALL}/>
                        </div>

                        <div className={DIV_2COL_ROW}>
                            <label htmlFor="carac_obra__contradic" className={LABEL_NOWRAP}>CONTRADIQUE</label>
                            <input type="text" name="carac_obra__contradic" id="carac_obra__contradic" maxLength="2" pattern="[0-9]*" inputMode="numeric" className={INPUT_CARD_SMALL}/>
                        </div>

                        <div className={DIV_2COL_ROW}>
                            <label htmlFor="carac_obra__espigo" className={LABEL_NOWRAP}>ESPIGONES</label>
                            <input type="text" name="carac_obra__espigo" id="carac_obra__espigo" maxLength="2" pattern="[0-9]*" inputMode="numeric" className={INPUT_CARD_SMALL}/>
                        </div>

                        <div className={DIV_2COL_ROW}>
                            <label htmlFor="carac_obra__enroca" className={LABEL_NOWRAP}>ENROCADO</label>
                            <input type="text" name="carac_obra__enroca" id="carac_obra__enroca" maxLength="2" pattern="[0-9]*" inputMode="numeric" className={INPUT_CARD_SMALL}/>
                        </div>

                    </div>

                    <div className={`${FORM_SUB_SECTION} carac_obra-disenos col-[2/4] row-[4/6] grid items-center gap-1`}>

                        <div className={`${DIV_3COL} max-w-full`}>
                            <h2 className="col-span-3 text-center">Canales</h2>

                            <input type="hidden" name="carac_obra__disenos__canales__rectangular" value=""/>
                            <input type="checkbox" name="carac_obra__disenos__canales__rectangular" id="carac_obra__disenos__canales__rectangular" value="rectangular" className="peer hidden"/>
                            <label htmlFor="carac_obra__disenos__canales__rectangular" className="cursor-pointer border-2 border-gray-300 text-center peer-checked:border-[#2288ee]">
                                <img src={canalRectangular} alt="Canal Rectangular" className="max-w-full"/>
                                <h3>Rectangular</h3>
                            </label>

                            <input type="hidden" name="carac_obra__disenos__canales__trapezoidal" value=""/>
                            <input type="checkbox" name="carac_obra__disenos__canales__trapezoidal" id="carac_obra__disenos__canales__trapezoidal" value="trapezoidal" className="peer hidden"/>
                            <label htmlFor="carac_obra__disenos__canales__trapezoidal" className="cursor-pointer border-2 border-gray-300 text-center peer-checked:border-[#2288ee]">
                                <img src={canalTrapezoidal} alt="Canal Trapezoidal" className="max-w-full"/>
                                <h3>Trapezoidal</h3>
                            </label>

                            <input type="hidden" name="carac_obra__disenos__canales__triangular" value=""/>
                            <input type="checkbox" name="carac_obra__disenos__canales__triangular" id="carac_obra__disenos__canales__triangular" value="triangular" className="peer hidden"/>
                            <label htmlFor="carac_obra__disenos__canales__triangular" className="cursor-pointer border-2 border-gray-300 text-center peer-checked:border-[#2288ee]">
                                <img src={canalTriangular} alt="Canal Triangular" className="max-w-full"/>
                                <h3>Triangular</h3>
                            </label>

                        </div>

                        <div className="carac_obra-otros_canales grid max-w-full grid-cols-2">
                            <label htmlFor="carac_obra__otros_canales" className="cursor-pointer whitespace-pre border-0 text-center uppercase">Otros diseños de canales:</label>
                            <input type="text" name="carac_obra__otros_canales" id="carac_obra__otros_canales" className={`${INPUT_UNDERLINE} w-[90%]`}/>
                        </div>

                        <div className={`${DIV_3COL} max-w-full`}>
                            <h2 className="col-span-3 text-center">Diques Cerrados</h2>


                            <input type="hidden" name="carac_obra__disenos__diques_cerrados__rectangular" value=""/>
                            <input type="checkbox" name="carac_obra__disenos__diques_cerrados__rectangular" id="carac_obra__disenos__diques_cerrados__rectangular" value="rectangular" className="peer hidden"/>
                            <label htmlFor="carac_obra__disenos__diques_cerrados__rectangular" className="cursor-pointer border-2 border-gray-300 text-center peer-checked:border-[#2288ee]">
                                <img src={diqueCerrRectangular} alt="Dique cerrado Rectangular" className="max-w-full"/>
                                <h3>Rectangular</h3>
                            </label>

                            <input type="hidden" name="carac_obra__disenos__diques_cerrados__trapezoidal" value=""/>
                            <input type="checkbox" name="carac_obra__disenos__diques_cerrados__trapezoidal" id="carac_obra__disenos__diques_cerrados__trapezoidal" value="trapezoidal" className="peer hidden"/>
                            <label htmlFor="carac_obra__disenos__diques_cerrados__trapezoidal" className="cursor-pointer border-2 border-gray-300 text-center peer-checked:border-[#2288ee]">
                                <img src={diqueCerrTrapezoidal} alt="Dique cerrado Trapezoidal" className="max-w-full"/>
                                <h3>Trapezoidal</h3>
                            </label>

                            <input type="hidden" name="carac_obra__disenos__diques_cerrados__circular" value=""/>
                            <input type="checkbox" name="carac_obra__disenos__diques_cerrados__circular" id="carac_obra__disenos__diques_cerrados__circular" value="circular" className="peer hidden"/>
                            <label htmlFor="carac_obra__disenos__diques_cerrados__circular" className="cursor-pointer border-2 border-gray-300 text-center peer-checked:border-[#2288ee]">
                                <img src={diqueCerrCircular} alt="Dique cerrado Circular" className="max-w-full"/>
                                <h3>Triangular</h3>
                            </label>

                        </div>


                        <div className={`${DIV_3COL} max-w-full`}>
                            <h2 className="col-span-3 text-center">Diques Abiertos</h2>

                            <input type="hidden" name="carac_obra__disenos__diques_abiertos__ranura" value=""/>
                            <input type="checkbox" name="carac_obra__disenos__diques_abiertos__ranura" id="carac_obra__disenos__diques_abiertos__ranura" value="ranura" className="peer hidden"/>
                            <label htmlFor="carac_obra__disenos__diques_abiertos__ranura" className="cursor-pointer border-2 border-gray-300 text-center peer-checked:border-[#2288ee]">
                                <img src={diqueAbrRanura} alt="Diques abiertos Ranura" className="max-w-full"/>
                                <h3>Ranura</h3>
                            </label>

                            <input type="hidden" name="carac_obra__disenos__diques_abiertos__rastrillo" value=""/>
                            <input type="checkbox" name="carac_obra__disenos__diques_abiertos__rastrillo" id="carac_obra__disenos__diques_abiertos__rastrillo" value="rastrillo" className="peer hidden"/>
                            <label htmlFor="carac_obra__disenos__diques_abiertos__rastrillo" className="cursor-pointer border-2 border-gray-300 text-center peer-checked:border-[#2288ee]">
                                <img src={diqueAbrRastrillo} alt="Diques abiertos Rastrillo" className="max-w-full"/>
                                <h3>Rastrillo</h3>
                            </label>

                            <input type="hidden" name="carac_obra__disenos__diques_abiertos__enrejado" value=""/>
                            <input type="checkbox" name="carac_obra__disenos__diques_abiertos__enrejado" id="carac_obra__disenos__diques_abiertos__enrejado" value="enrejado" className="peer hidden"/>
                            <label htmlFor="carac_obra__disenos__diques_abiertos__enrejado" className="cursor-pointer border-2 border-gray-300 text-center peer-checked:border-[#2288ee]">
                                <img src={diqueAbrEnrejado} alt="Diques abiertos Enrejado" className="max-w-full"/>
                                <h3>Enrejado</h3>
                            </label>

                        </div>

                    </div>

                    <div className={`${FORM_SUB_SECTION} col-[4/6] row-[5/6] grid grid-cols-[auto_1fr] items-center`}>
                        <SubTitle className="col-span-2">MEDIDAS</SubTitle>

                            <label htmlFor="carac_obra__altura">ALTURA:</label>
                            <input type="text" name="carac_obra__altura" id="carac_obra__altura" inputMode="numeric" pattern="\d{1,3}(,\d{2})?" maxLength="6" placeholder="000,00" className={INPUT_UNDERLINE_2}/>

                            <label htmlFor="carac_obra__base">BASE:</label>
                            <input type="text" name="carac_obra__base" id="carac_obra__base" inputMode="numeric" pattern="\d{1,5}(,\d{2})?" maxLength="8" placeholder="00000,00" className={INPUT_UNDERLINE_2}/>

                            <label htmlFor="carac_obra__ancho">ANCHO:</label>
                            <input type="text" name="carac_obra__ancho" id="carac_obra__ancho" inputMode="numeric" pattern="\d{1,5}(,\d{2})?" maxLength="8" placeholder="00000,00" className={INPUT_UNDERLINE_2}/>

                            <label htmlFor="carac_obra__longitud">LONGITUD:</label>
                            <input type="text" name="carac_obra__longitud" id="carac_obra__longitud" inputMode="numeric" pattern="\d{1,5}(,\d{2})?" maxLength="8" placeholder="00000,00" className={INPUT_UNDERLINE_2}/>

                            <label htmlFor="carac_obra__diametro">DIAMETRO:</label>
                            <input type="text" name="carac_obra__diametro" id="carac_obra__diametro" inputMode="numeric" pattern="\d{1,4}(,\d{2})?" maxLength="7" placeholder="0000,00" className={INPUT_UNDERLINE_2}/>

                            <label htmlFor="carac_obra__area">AREA:</label>
                            <input type="text" name="carac_obra__area" id="carac_obra__area" inputMode="numeric" pattern="\d{1,5}(,\d{2})?" maxLength="8" placeholder="00000,00" className={INPUT_UNDERLINE_2}/>

                            <label htmlFor="carac_obra__volumen">VOLUMEN:</label>
                            <input type="text" name="carac_obra__volumen" id="carac_obra__volumen" inputMode="numeric" pattern="\d{1,5}(,\d{2})?" maxLength="8" placeholder="00000,00" className={INPUT_UNDERLINE_2}/>

                    </div>

                </article>

                {/* <!--  ========================================== DAÑOS_ESTRUCTURALES ==================================  --> */}

                <article className={`${FORM_SECTION} ${DIV_3COL} danos_estruc`}>
                    <SubTitle className="col-span-3">DAÑOS ESTRUCTURALES</SubTitle>

                    <div>

                        <CheckOption id="danos_estruc__ex_ace_su" name="danos_estruc__ex_ace_su" value="exposicion del acero superficial" label="EXPOSICION DEL ACERO SUPERFICIAL"/>
                        <CheckOption id="danos_estruc__ero_estruc_inter" name="danos_estruc__ero_estruc_inter" value="erocion de estructura interna" label="EROSION DE ESTRUCTURA INTERNA"/>
                        <CheckOption id="danos_estruc__ero_cober_inter" name="danos_estruc__ero_cober_inter" value="erocion de cobertura interno" label="EROSION DE COBERTURA INTERNO"/>
                        <CheckOption id="danos_estruc__def_exce_alza" name="danos_estruc__def_exce_alza" value="deformacion excesiva del alzado" label="DEFORMACION EXCESIVA DEL ALZADO"/>

                    </div>

                    <div>

                        <CheckOption id="danos_estruc__efec_sismi" name="danos_estruc__efec_sismi" value="efecto sismico" label="EFECTO SISMICO"/>
                        <CheckOption id="danos_estruc__desli_exter" name="danos_estruc__desli_exter" value="deslizamiento externo" label="DESLIZAMIENTO EXTERNO"/>
                        <CheckOption id="danos_estruc__ruptu_fricc" name="danos_estruc__ruptu_fricc" value="ruptura por friccion" label="RUPTURA POR FRICCION"/>
                        <CheckOption id="danos_estruc__despla_profu" name="danos_estruc__despla_profu" value="deslizamiento profundo" label="DESPLAZAMIENTO PROFUNDO"/>

                    </div>

                    <div>

                        <CheckOption id="danos_estruc__desliza" name="danos_estruc__desliza" value="deslizamiento" label="DESLIZAMIENTO"/>
                        <CheckOption id="danos_estruc__desplaza" name="danos_estruc__desplaza" value="desplazamiento" label="DESPLAZAMIENTO"/>
                        <CheckOption id="danos_estruc__sobre_paso" name="danos_estruc__sobre_paso" value="sobre paso" label="SOBRE PASO"/>
                        <CheckOption id="danos_estruc__vuelco" name="danos_estruc__vuelco" value="vuelco" label="VUELCO"/>

                    </div>

                </article>

                {/* <!--  ========================================== DAÑOS_VISIBLES ==================================  --> */}

                <article className={`${FORM_SECTION} ${DIV_3COL} danos_visivles`}>
                    <SubTitle className="col-span-3">DAÑOS VISIBLES</SubTitle>

                    <div>

                        <CheckOption id="danos_visivles__rup_es_cort" name="danos_visivles__rup_es_cort" value="ruptura por esfuerzo cortante" label="RUPTURA POR ESFUERZO CORTANTE"/>
                        <CheckOption id="danos_visivles__rup_falla_cort" name="danos_visivles__rup_falla_cort" value="ruptura por falla de solape" label="RUPTURA POR FALLA DE SOLAPE"/>
                        <CheckOption id="danos_visivles__rup_esfu_raspan" name="danos_visivles__rup_esfu_raspan" value="ruptura por esfuerzo raspante" label="RUPTURA POR ESFUERZO RASPANTE"/>
                        <CheckOption id="danos_visivles__fisu_capa_concre" name="danos_visivles__fisu_capa_concre" value="fisura en la capa de concreto" label="FISURA EN LA CAPA DE CONCRETO"/>

                    </div>

                    <div>

                        <CheckOption id="danos_visivles__super_giro_exce" name="danos_visivles__super_giro_exce" value="superficial giro excesivo" label="SUPERFICIAL GIRO EXCESIVO"/>
                        <CheckOption id="danos_visivles__eroci_superfi" name="danos_visivles__eroci_superfi" value="erocion de superficie" label="EROCION DE SUPERFICIE"/>
                        <CheckOption id="danos_visivles__socava_base" name="danos_visivles__socava_base" value="socavacion de la base" label="SOCAVACION DE LA BASE"/>
                        <CheckOption id="danos_visivles__discon_concre" name="danos_visivles__discon_concre" value="discontinuidad del concreto" label="DISCONTINUIDAD DEL CONCRETO"/>

                    </div>

                    <div>

                        <CheckOption id="danos_visivles__figu_exce" name="danos_visivles__figu_exce" value="figuracion excesiva" label="FIGURACION EXCESIVA"/>
                        <CheckOption id="danos_visivles__colma" name="danos_visivles__colma" value="colmatada" label="COLMATADA"/>
                        <CheckOption id="danos_visivles__carca" name="danos_visivles__carca" value="carcavas" label="CARCAVAS"/>
                        <CheckOption id="danos_visivles__asenta" name="danos_visivles__asenta" value="asentamiento" label="ASENTAMIENTO"/>

                    </div>

                </article>

                {/* <!--  ========================================== DAÑOS_FUNCIONALES ==================================  --> */}

                <article className={`${FORM_SECTION} ${DIV_3COL} danos_funci`}>
                    <SubTitle className="col-span-3">DAÑOS FUNCIONALES</SubTitle>

                    <div>

                        <CheckOption id="danos_funci__gene_duct" name="danos_funci__gene_duct" value="generacion de ductos" label="GENERACION DE DUCTOS"/>
                        <CheckOption id="danos_funci__frac_comp" name="danos_funci__frac_comp" value="fracturas de compuertas" label="FRACTURAS DE COMPUERTAS"/>

                    </div>

                    <div>

                        <CheckOption id="danos_funci__obst_alivi" name="danos_funci__obst_alivi" value="obstruccion de aliviaderos" label="OBSTRUCCION DE ALIVIADEROS"/>
                        <CheckOption id="danos_funci__perme_cober_inter" name="danos_funci__perme_cober_inter" value="permeabilidad de cobertura interna" label="PERMEABILIDAD DE COBERTURA INTERNA"/>

                    </div>

                    <div>

                        <CheckOption id="danos_funci__sedi_alt_max_obra" name="danos_funci__sedi_alt_max_obra" value="sedimiento a la altura maxima de la obra" label="SEDIMIENTO A LA ALTURA MAXIMA DE LA OBRA"/>
                        <CheckOption id="danos_funci__infil" name="danos_funci__infil" value="infiltracion" label="INFILTRACION"/>

                    </div>

                </article>

                {/* <!--  ========================================== DAÑOS_CONCRETO ==================================  --> */}

                <article className={`${FORM_SECTION} danos_estructurales flex flex-col`}>

                    <div className="flex items-center justify-between gap-2.5">

                        <section className="border border-black grid grid-cols-3 items-stretch gap-x-7 px-7 py-1 flex-1 danos_concr">
                            <SubTitle className="col-span-3">DAÑOS EN EL CONCRETO</SubTitle>

                            <CheckOption id="danos_concr__desag" name="danos_concr__desag" value="desagregacion" label="DESAGREGACIÓN"/>
                            <CheckOption id="danos_concr__disgr" name="danos_concr__disgr" value="disgregacion" label="DISGREGACIÓN"/>
                            <CheckOption id="danos_concr__cavit" name="danos_concr__cavit" value="cavitacion" label="CAVITACIÓN"/>

                        </section>

                        <section className="border border-black grid grid-cols-3 items-stretch gap-x-7 px-7 py-1 flex-1 danos_acero">
                            <SubTitle className="col-span-3">DAÑOS EN EL ACERO</SubTitle>

                            <CheckOption id="danos_acero__oxida" name="danos_acero__oxida" value="oxidación" label="OXIDACIÓN"/>
                            <CheckOption id="danos_acero__corro" name="danos_acero__corro" value="corroción" label="CORROCIÓN"/>
                            <CheckOption id="danos_acero__defor" name="danos_acero__defor" value="deformación" label="DEFORMACIÓN"/>

                        </section>

                    </div>

                </article>

                {/* <!--  ========================================== METODOLOGIA_APLICADA ==================================  --> */}

                <div className="container_meto_apli grid grid-cols-3 items-stretch gap-1">

                    <article className="border border-black p-1 grid grid-cols-3 gap-1 items-stretch text-center col-[1/3] mb-1 meto_apli">
                        <SubTitle className="col-span-3">METODOLOGIAS APLICADAS</SubTitle>

                        <h3 className="col-span-2">BOCETO DE LA OBRA Y NIVELES DE COLMATACION</h3>

                        <h3>PRUEBA DEL MORTERO</h3>

                        <div className="border border-black relative meto_apli-imgContainer">
                            <h3 className="absolute w-full">FRONTAL</h3>

                            <div className="flex items-center h-15">A</div>
                            <div className="flex items-center h-15 border-2 border-dashed border-[#0008]">M</div>
                            <div className="flex items-center h-15">B</div>

                        </div>

                        <div className="border border-black relative meto_apli-imgContainer">
                            <h3 className="absolute w-full">CORTE</h3>

                            <div className="flex items-center h-15">A</div>
                            <div className="flex items-center h-15 border-2 border-dashed border-[#0008]">M</div>
                            <div className="flex items-center h-15">B</div>

                        </div>

                        <div className="border border-black grid grid-cols-2 items-center px-5 meto_apli-mortero">

                            <label htmlFor="meto_apli__mortero__grandes" className="h-9">
                                <img src={morteroGrandes} alt="Mortero Grande" className="h-full w-full border border-black"/>
                            </label>
                            <input type="hidden" name="meto_apli__prueba_mortero" value=""/>
                            <input type="radio" name="meto_apli__prueba_mortero" value="mortero grandes" id="meto_apli__mortero__grandes" className={RADIO_BASE}/>

                            <label htmlFor="meto_apli__mortero__medianos" className="h-9">
                                <img src={morteroMedianos} alt="Mortero Mediano" className="h-full w-full border border-black"/>
                            </label>
                            <input type="radio" name="meto_apli__prueba_mortero" value="mortero medianos" id="meto_apli__mortero__medianos" className={RADIO_BASE}/>


                            <label htmlFor="meto_apli__mortero__borilla" className="h-9">
                                <img src={morteroBoronilla} alt="Mortero Borilla (viruta)" className="h-full w-full border border-black"/>
                            </label>
                            <input type="radio" name="meto_apli__prueba_mortero" value="mortero borilla" id="meto_apli__mortero__borilla" className={RADIO_BASE}/>


                            <label htmlFor="meto_apli__mortero__polvo" className="h-9">
                                <img src={morteroPolvo} alt="Mortero Polvo" className="h-full w-full border border-black"/>
                            </label>
                            <input type="radio" name="meto_apli__prueba_mortero" value="mortero polvo" id="meto_apli__mortero__polvo" className={RADIO_BASE}/>

                        </div>


                    </article>

                    <article className={`${FORM_SECTION} meto_apli-observaciones`}>
                        <SubTitle>OBSERVACIONES</SubTitle>

                        <textarea className={TEXTAREA_OBS} name="meto_apli__observaciones" id="meto_apli__observaciones" wrap="soft"></textarea>

                    </article>

                </div>

                <footer className="pg2_footer grid grid-cols-[auto_1fr] items-stretch gap-1">

                    <div className={`${FORM_SUB_SECTION} pg2_footer-leyenda grid grid-cols-2 items-center gap-1`}>

                        <h3 className="col-span-2">NIVELES DE <br/> CONTAMINACION</h3>

                        <label htmlFor="nivel_contaminacion__alto">A: ALTO</label>
                        <input type="hidden" name="nivel_contaminacion" value=""/>
                        <input type="radio" name="nivel_contaminacion" value="alto" id="nivel_contaminacion__alto" className={RADIO_BASE}/>

                        <label htmlFor="nivel_contaminacion__medio">M: MEDIO </label>
                        <input type="radio" name="nivel_contaminacion" value="medio" id="nivel_contaminacion__medio" className={RADIO_BASE}/>

                        <label htmlFor="nivel_contaminacion__bajo">B: BAJO </label>
                        <input type="radio" name="nivel_contaminacion" value="bajo" id="nivel_contaminacion__bajo" className={RADIO_BASE}/>
                    </div>

                    <div className={`${FORM_SUB_SECTION} org_parti grid grid-cols-[auto_1fr_auto_auto] items-center gap-1 text-center`}>

                        <SubTitle className="row-span-4">ORGANIZACIONES <br/> PARTICIPANTES</SubTitle>

                        <h3>NOMBRE Y APELLIDO:</h3>
                        <h3>INSTITUCION:</h3>
                        <h3>TELEFONO:</h3>

                        <input type="text" name="org_parti__nom_ape_1" id="org_parti__nom_ape_1" required className={INPUT_BASE}/>
                        <input type="text" name="org_parti__insti_1" id="org_parti__insti_1" required className={INPUT_BASE}/>
                        <input type="tel" name="org_parti__tlf_1" id="org_parti__tlf_1" placeholder="0000-0000000"  maxLength="12" required className={INPUT_BASE}/>

                        <input type="text" name="org_parti__nom_ape_2" id="org_parti__nom_ape_2" className={INPUT_BASE}/>
                        <input type="text" name="org_parti__insti_2" id="org_parti__insti_2" className={INPUT_BASE}/>
                        <input type="tel" name="org_parti__tlf_2" id="org_parti__tlf_2" placeholder="0000-0000000" maxLength="12" className={INPUT_BASE}/>

                        <input type="text" name="org_parti__nom_ape_3" id="org_parti__nom_ape_3" className={INPUT_BASE}/>
                        <input type="text" name="org_parti__insti_3" id="org_parti__insti_3" className={INPUT_BASE}/>
                        <input type="tel" name="org_parti__tlf_3" id="org_parti__tlf_3" placeholder="0000-0000000" maxLength="12" className={INPUT_BASE}/>

                    </div>

                </footer>

            </section>

            <div className="form_buttons mt-2 flex items-center justify-center gap-4">
                <button type="submit" className="btn_submit rounded bg-[#2288ee] px-6 py-2 font-bold text-white transition hover:bg-[#1a6cb8] active:scale-95" id="main_form-submit">ENVIAR</button>
                <button type="reset" className="btn_reset rounded bg-[#e2e8f0] px-6 py-2 font-bold text-[#1e293b] transition hover:bg-[#cbd5e1] active:scale-95">REINICIAR</button>
            </div>

        </form>

    </>
  )
}
