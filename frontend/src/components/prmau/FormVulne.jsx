import { FormTabs } from "./FormTabs"
import { FormContainer } from "./FormContainer"
import { FormSection } from "./FormSection"
import { FormSectionTitle } from "./FormSectionTitle"
import { FormSectionSubTitle } from "./FormSectionSubTitle"
import { FormCheckboxGrid } from "./FormCheckboxGrid"
import { CheckboxItem } from "./CheckboxItem"
import { FormRow } from "./FormRow"
import { FormGroup } from "./FormGroup"
import { FormBody } from "./FormBody"
import { FormActions } from "./FormActions"
import { FormSelect } from "./FormSelect"

import { useEffect, useState } from "react"
import {
    getVulnManzanas,
    getVulnOrganizaciones,
    getVulnParroquias,
    getVulnSectores,
    submitVulnerabilidad,
} from "../../api/prmau"

// links de navegacion para el formalario
const tabList = [
    { 
        name: "1. Ubicación y Ocupante", 
        path: "#DGSO"
    },
    { 
        name: "2. Terreno y Parcela", 
        path: "#SPAA"
    },
    { 
        name: "3. Vivienda y Censo", 
        path: "#CVDP"
    },
    { 
        name: "4. Elementos Estructurales", 
        path: "#TMSC"
    },
    { 
        name: "5. Patologías y Diagnóstico", 
        path: "#DEEE"
    },
    { 
        name: "6. Equipamientos y Servicios", 
        path: "#ESES"
    },
]

const formToPayload = (form) => {
    const fd = new FormData(form)
    const out = {}
    for (const [key, value] of fd.entries()) {
        if (!key) continue
        if (out[key] === undefined) out[key] = value
        else if (Array.isArray(out[key])) out[key].push(value)
        else out[key] = [out[key], value]
    }
    return out
}

export const FormVulne = () => {
    
    /*  como funciona el codigo catastral?
        
        1. El codigo catastral debe ser de 36 caracteres en total (contando los guiones)
            01-001-012-U01-001-003-000-000-00-00
            
        2. El usuario puede escribir en el input del codigo catastral a partir del caracter 23 (despues del guion de la manzana)
        
        3. Se debe respetar el formato del codigo catastral. (maximo de caracterees y guiones)

    */ 
    const [codCatastro, setCodCatastro] = useState(["01","001","000","U01","000","000"]) 

    // las listas se actualizan conectando con la base de datos
    const [listParroquias, setListParroquias] = useState([])
    const [listSectores, setListSectores] = useState([])
    const [listManzanas, setListManzanas] = useState([])
    const [listOrganizaciones, setListOrganizaciones] = useState([])

    // los filtros usan el id para filtrar usando la llave foranea
    const [parroquiaFilter, setParroquiaFilter] = useState(0)
    const [sectorFilter, setSectorFilter] = useState(0)

    // se controla el valor de los campos para activar el input de codigo catastral
    const [parroquia, setParroquia] = useState(null)
    const [sector, setSector] = useState(null)
    const [manzana, setManzana] = useState(null)

    const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" })
    const [submitting, setSubmitting] = useState(false)
     
    // CONECCION CON LA BASE DE DATOS

    // buscar parroquias
    useEffect(()=>{
        
        const fetchParroquias = async ()=>{
            try {
                const result = await getVulnParroquias()
                setListParroquias(Array.isArray(result) ? result : [])
            } catch {
                // TODO(backend): cargar parroquias desde la API de vulnerabilidad.
                setListParroquias([])
            }
        }
        fetchParroquias()

    }, [])

    // Buscar sectores y organizaciones
    useEffect(()=>{
        
        if(parroquiaFilter === 0) return
        
        const fetchSectores = async ()=>{
            try {
                const result = await getVulnSectores(parroquiaFilter)
                setListSectores(Array.isArray(result) ? result : [])
            } catch {
                // TODO(backend): cargar sectores desde la API de vulnerabilidad.
                setListSectores([])
            }
        }
        fetchSectores()

        const fetchOrganizaciones = async ()=>{
            try {
                const result = await getVulnOrganizaciones(parroquiaFilter)
                setListOrganizaciones(Array.isArray(result) ? result : [])
            } catch {
                // TODO(backend): cargar organizaciones desde la API de vulnerabilidad.
                setListOrganizaciones([])
            }
        }
        fetchOrganizaciones()

    }, [parroquiaFilter])

    // Buscar Manzanas
    useEffect(()=>{
        if(sectorFilter === 0) return

        const fetchManzanas = async ()=>{
            try {
                const result = await getVulnManzanas(sectorFilter)
                setListManzanas(Array.isArray(result) ? result : [])
            } catch {
                // TODO(backend): cargar manzanas desde la API de vulnerabilidad.
                setListManzanas([])
            }
        }
        fetchManzanas()
        
    },[sectorFilter])

    const handleParroquia = (e)=>{
        let [id, cod] = e.target.value.split(",")

        let arr = [ ...codCatastro]
        arr[2] = cod || "000"

        setParroquia(e.target.value)
        setCodCatastro(arr)
        setParroquiaFilter(parseInt(id, 10) || 0)
    }

    const handleSector = (e)=>{
        
        let [id, cod] = e.target.value.split(",")

        let arr = [ ...codCatastro]
        arr[4] = cod || "000"
        
        setSector(e.target.value)
        setCodCatastro(arr)
        setSectorFilter(parseInt(id, 10) || 0)
    }

    const handleManzana = (e)=>{
        
        let cod = (e.target.value || "").split(",")[1]

        let arr = [ ...codCatastro]
        arr[5] = cod || "000"
        
        setManzana(e.target.value)
        setCodCatastro(arr)
    }

    const handleCodCatastral = (e)=>{

        let inputValue = e.target.value
        let lastChar =  inputValue.at(-1)

        // No borrar el formato previo
        if(codCatastro.length === 6 && e.nativeEvent.data === null) return 
        
        // Eliminar todo exepto el codigo anterior
        if(codCatastro.length > 6 && e.nativeEvent.data === null)
            setCodCatastro(inputValue.split("-"))

        // Solo permitir numeros
        if( isNaN( lastChar ) || lastChar == " " ) return 
        
        // Añadir "-" n cantidad de elementos
        if(inputValue.length === 23 || inputValue.length === 27 || inputValue.length === 30)
            inputValue = inputValue.substring( inputValue.length-1, -1) + "-" + lastChar

        // no pasar de 32 caracteres
        if(inputValue.length===33) return
        
        setCodCatastro(inputValue.split("-"))
        
    }

    const handleChange = ()=>{} // todabia no hecho

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitStatus({ type: "", message: "" })
        setSubmitting(true)
        try {
            const payload = formToPayload(e.currentTarget)
            payload.cod_catastral = codCatastro.join("-")
            // TODO(backend): confirmar mapeo definitivo de campos y tabla destino.
            const res = await submitVulnerabilidad(payload)
            setSubmitStatus({
                type: "success",
                message: `Formulario de vulnerabilidad enviado correctamente${res?.id ? ` (ID: ${res.id})` : ""}.`,
            })
        } catch (error) {
            setSubmitStatus({
                type: "error",
                message: error?.response?.data?.message || "No se pudo enviar el formulario de vulnerabilidad.",
            })
        } finally {
            setSubmitting(false)
        }
    }
    
  return (
    <FormContainer>
        
        <form onSubmit={handleSubmit} onChange={handleChange}>

            <header className="flex border-b-3 border-b-vul-primary mb-5">

                <div className="text-center flex-1 pb-4 font-segoe">
                    <h1 className="text-vul-primary text-2xl font-bold">Alcaldía de Caracas</h1>
                    <h2 className="text-vul-secondary font-bold">Instituto Municipal de Gestión de Riesgos y Administración de Desastres</h2>
                    <h3>REGISTRO DE VULNERABILIDAD FÍSICA (IMGRAD)</h3>
                </div>

                <div className="meta-info">
                    <div>
                        <strong>Nº CONTROL:</strong> 
                        <input name={"n_ficha"} className="text-siroh-alert-red font-bold w-16 text-center" readOnly/>
                    </div>
                    <div> <strong>Fecha:</strong> <input type="date" name="fch_transcrip" readOnly/> </div>
                    <div> <strong>Fecha Levantamiento:</strong> <input type="date" name="fch_levan" readOnly/> </div>
                </div>

            </header>

            <FormTabs tabList={tabList}/> {/* Navegacion del formulario */}
            
            <FormBody>

                {/* 1. */}
                <FormSection sectionName={"form-section-DGSO"} id={"DGSO"} >
                    <FormSectionTitle text="1. Datos Geográficos, Sociales y del Ocupante"/>
                    
                    <FormSectionSubTitle text={"Informacion del catastro"}/>
                    <FormRow>
                        <FormSelect inputName="parroquia" label="Parroquia" optionList={listParroquias} actionHandler={handleParroquia}/>
                        <FormSelect inputName="sector" label="Sector" optionList={listSectores} filter={parroquiaFilter} actionHandler={handleSector}/>
                        <FormSelect inputName="manzana" label="Manzana" optionList={listManzanas} filter={parroquiaFilter} actionHandler={handleManzana}/>
                    </FormRow>
                    <FormRow>
                        <FormSelect inputName="organizacion" label="Organizacion" optionList={listOrganizaciones} filter={parroquiaFilter}/>
                        {/* CODIGO CATASTRAL Debo ver si pongo esto en un componente */}
                        <div className="flex flex-col">
                            <label className="
                                text-xs 
                                font-medium 
                                mb-1 
                                text-vul-label 
                                uppercase
                            " htmlFor={"cod_catastro"}> Codigo Catastral </label> 
                            <input className="
                                    py-2 px-3 
                                    border-2 rounded-xs border-siroh-border-muted 
                                    text-xs
                                    bg-white
                                " 
                                type="text" 
                                name="cod_catastral"
                                id="cod_catastro"
                                readOnly={ !(parroquia && sector && manzana) } // activar el input cuando se hayan seleccionando parroquia, sector y manzana
                                required
                                value={codCatastro.join("-")}
                                onChange={handleCodCatastral}
                            />
                        </div>
                    </FormRow>

                    <FormSectionSubTitle text={"Informacion de la persona"}/>
                    <FormRow>
                        <FormGroup inputName="apellidos_nombres" label={"Apellidos y Nombres del Ocupante"}/>
                        <FormGroup inputName="cedula" label={"Cédula de Identidad"}/>
                    </FormRow>
                    <FormRow>
                        <FormGroup inputName="tlf_celular" label={"Teléfono Celular"}/>
                        <FormGroup inputName="tlf_local" label={"Teléfono Local"}/>
                    </FormRow>

                    <FormSectionSubTitle text={"Condicion"}/>

                    <FormCheckboxGrid>
                        {/* Hay que cambiar la base de datos */}
                        <CheckboxItem inputType="radio" inputName="condicion_ocupante" label={"Propietario"}/>
                        <CheckboxItem inputType="radio" inputName="condicion_ocupante" label={"Inquilino / Ausente"}/>
                    </FormCheckboxGrid>
                    
                </FormSection>

                {/* 2. */}
                <FormSection sectionName={"form-section-SPAA"} id={"SPAA"}>
                    <FormSectionTitle text={"2. Situación de la Parcela y Amenazas Ambientales"}/>

                    <FormSectionSubTitle text={"Emplazamiento de la Parcela en el Terreno:"}/>
                    <FormCheckboxGrid>
                        <CheckboxItem inputName={"emplazamiento_parcela"} label={"Al Borde del Talud"}/>
                        <CheckboxItem inputName={"emplazamiento_parcela"} label={"Sobre el Talud"}/>
                        <CheckboxItem inputName={"emplazamiento_parcela"} label={"Al Pie del Talud"}/>
                    </FormCheckboxGrid>

                    <FormSectionSubTitle text={"Factores de Riesgo e Inestabilidad del Entorno:"}/>
                    <FormCheckboxGrid>
                        <CheckboxItem inputName={"factores_riesgo"} label={"Deslizamientos o Derrumbes Recientes"}/>
                        <CheckboxItem inputName={"factores_riesgo"} label={"Árboles y/o Postes Inclinados"}/>
                        <CheckboxItem inputName={"factores_riesgo"} label={"Grietas y Hundimientos en Calles/Escaleras"}/>
                        <CheckboxItem inputName={"factores_riesgo"} label={"Grietas y Hundimientos en el Terreno"}/>
                        <CheckboxItem inputName={"factores_riesgo"} label={"Botes de Agua (Blanca y/o Servida)"}/>
                        <CheckboxItem inputName={"factores_riesgo"} label={"Terreno Húmedo (Sobresaturado)"}/>
                        <CheckboxItem inputName={"factores_riesgo"} label={"Socavación (Por Acción Humana)"}/>
                        <CheckboxItem inputName={"factores_riesgo"} label={"Procesos Erosivos Activos"}/>
                        <CheckboxItem inputName={"factores_riesgo"} label={"Cauces o Quebradas Adyacentes"}/>
                        <CheckboxItem inputName={"factores_riesgo"} label={"Botaderos de Basura en las Cercanías"}/>
                    </FormCheckboxGrid>

                    <FormSectionSubTitle text={"Observaciones:"}/>
                    <FormRow>
                        <FormGroup inputType={"textarea"} inputName={"obs_parcela"} />
                    </FormRow>
                </FormSection>

                {/* 3. */}
                <FormSection sectionName={"form-section-CVDP"} id={"CVDP"}>

                    <FormSectionTitle text={"2. Características de la Vivienda y Datos Poblacionales"}/>

                    <FormSectionSubTitle text={"Tipo de vivienda"}/>

                    <FormRow>
                        <FormRow>
                            <CheckboxItem inputType="radio" inputName={"tipo_vivienda"} label={"Unifamiliar"}/>
                            <CheckboxItem inputType="radio" inputName={"tipo_vivienda"} label={"Multifamiliar"}/>
                        </FormRow>
                        <FormGroup inputType="number" inputName={"n_pisos"} label={"N° de Pisos"}/>
                        <FormGroup inputType="number" inputName={"n_entradas_indep"} label={"N° de Entradas Indep."}/>
                        <FormGroup inputType="number" inputName={"n_familias"} label={"N° de Familias"}/>
                    </FormRow>

                    <FormSectionSubTitle text={"Desglose Demográfico (N° Personas en la Vivienda: 3)"}/>
                    <FormRow>
                            <FormGroup inputType="number" inputName={"n_lactantes"} label={"Lactantes"}/>
                            <FormGroup inputType="number" inputName={"n_ninos"} label={"Niños"}/>
                            <FormGroup inputType="number" inputName={"n_adultos"} label={"Adultos"}/>
                            <FormGroup inputType="number" inputName={"n_adultos_mayores"} label={"Adultos Mayores"}/>
                            <FormGroup inputType="number" inputName={"n_discapacitados"} label={"Discapacitados"}/>
                            <FormGroup inputType="number" inputName={"n_personas"} label={"N° de personas"}/>
                    </FormRow>

                    <FormSectionSubTitle text={"Observaciones"}/>
                    <FormRow>
                        <FormGroup inputType="textarea" inputName={"obs_vivienda"} />
                    </FormRow>
                    
                    
                </FormSection>

                {/* 4. */}
                <FormSection sectionName={"form-section-TMSC"} id={"TMSC"}>
                    <FormSectionTitle text={"4. Tipología de Materiales y Sistema Constructivo"}/>

                    <FormSectionSubTitle text={"Paredes"}/>
                    <FormCheckboxGrid>
                        <CheckboxItem inputName={"paredes"} label={"Zinc"}/>
                        <CheckboxItem inputName={"paredes"} label={"Madera"}/>
                        <CheckboxItem inputName={"paredes"} label={"Bahareque / Adobe"}/>
                        <CheckboxItem inputName={"paredes"} label={"Cartón"}/>
                        <CheckboxItem inputName={"paredes"} label={"Bloques Cemento / Arcilla"}/>
                        <FormGroup inputName={"paredes_otros"} label={"Otros (especificar)"}/>
                    </FormCheckboxGrid>
                    
                    <FormSectionSubTitle text={"Techo / Entre Piso"}/>
                    <FormCheckboxGrid>
                        <CheckboxItem inputName={"techo"} label={"Paja / Bambú"}/>
                        <CheckboxItem inputName={"techo"} label={"Zinc y/o Acerolit"}/>
                        <CheckboxItem inputName={"techo"} label={"Tabelones"}/>
                        <CheckboxItem inputName={"techo"} label={"Losa Acero"}/>
                        <CheckboxItem inputName={"techo"} label={"Madera"}/>
                        <FormGroup inputName={"techo_otros"} label={"Otros (especificar)"}/>
                    </FormCheckboxGrid>

                    
                    <FormSectionSubTitle text={"Columnas"}/>
                    <FormCheckboxGrid>
                        <CheckboxItem inputName={"columnas"} label={"Acero"}/>
                        <CheckboxItem inputName={"columnas"} label={"Concreto Armado"}/>
                        <CheckboxItem inputName={"columnas"} label={"Madera"}/>
                        <CheckboxItem inputName={"columnas"} label={"Prefabricado"}/>
                        <CheckboxItem inputName={"columnas"} label={"Ninguno"}/>
                        <FormGroup inputName={"columnas_otros"} label={"Otros (especificar)"}/>
                    </FormCheckboxGrid>
                    
                    <FormSectionSubTitle text={"Vigas"}/>
                    <FormCheckboxGrid>
                        <CheckboxItem inputName={"vigas"} label={"Acero"}/>
                        <CheckboxItem inputName={"vigas"} label={"Concreto Armado"}/>
                        <CheckboxItem inputName={"vigas"} label={"Madera"}/>
                        <CheckboxItem inputName={"vigas"} label={"Prefabricado"}/>
                        <CheckboxItem inputName={"vigas"} label={"Ninguno"}/>
                        <FormGroup inputName={"vigas_otros"} label={"Otros (especificar)"}/>
                    </FormCheckboxGrid>
                    
                    <FormSectionSubTitle text={"Observaciones:"}/>
                    <FormRow>
                        <FormGroup inputType={"textarea"} inputName={"obs_materiales"} />
                    </FormRow>
                    {/* <FormSectionSubTitle text={"Pisos / Acabados"}/>
                    <FormRow>
                        <FormGroup inputName={""} label={"Especificar tipología o estado físico de los pisos..."} />
                    </FormRow> */}
                    
                </FormSection>
                
                {/* 5. */}
                <FormSection sectionName={"form-section-DEEE"} id={"DEEE"}>
                    <FormSectionTitle text="5. Daños Estructurales, Equipamiento y Evaluación Final"/>

                    <FormSectionSubTitle text="Patologías y Daños Visibles en la Edificación"/>
                    <FormCheckboxGrid>
                        <CheckboxItem inputName={"patologias"} label={"Grietas Diagonales en Paredes"}/>
                        <CheckboxItem inputName={"patologias"} label={"Grietas Horizontales en Paredes"}/>
                        <CheckboxItem inputName={"patologias"} label={"Presencia de Humedad Activa"}/>
                        <CheckboxItem inputName={"patologias"} label={"Filtraciones en Losas/Techos"}/>
                        <CheckboxItem inputName={"patologias"} label={"Presenta Hundimientos en Pisos"}/>
                        <CheckboxItem inputName={"patologias"} label={"Presenta Grietas en Pisos"}/>
                        <CheckboxItem inputName={"patologias"} label={"Puertas/Ventanas Trabadas (Descuadre)"}/>
                        <CheckboxItem inputName={"patologias"} label={"Desniveles Piso-Terreno / Columnas Expuestas"}/>
                        <CheckboxItem inputName={"patologias"} label={"Fundaciones Visibles (Erosión)"}/>
                        <CheckboxItem inputName={"patologias"} label={"Techo con Vigas en Ambos Sentidos"}/>
                        <CheckboxItem inputName={"patologias"} label={"Vigas con Daño / Elementos Arqueados"}/>
                        <CheckboxItem inputName={"patologias"} label={"Columnas con Espesor Adecuado (25x25cm)"}/>
                        <CheckboxItem inputName={"patologias"} label={"Continuidad de Columnas en todos los Niveles"}/>
                        <CheckboxItem inputName={"patologias"} label={"Columnas con Daños / Agrietamientos"}/>
                        <CheckboxItem inputName={"patologias"} label={"Efecto de Columna Corta"}/>
                    </FormCheckboxGrid>
                    
                </FormSection>

                {/* 6 */}
                <FormSection sectionName={"form-section-ESES"} id={"ESES"}>
                    <FormSectionTitle text={"6. Equipamientos y Servicios"} />

                    <FormSectionSubTitle text={"Tanque de almacenamiento"} />
                    <FormCheckboxGrid>
                        <CheckboxItem inputType="radio" inputName={"tanque_almacenamiento"} label={"Subterraneo"} />
                        <CheckboxItem inputType="radio" inputName={"tanque_almacenamiento"} label={"Elevado"} />
                        <CheckboxItem inputType="radio" inputName={"tanque_almacenamiento"} label={"Pozo septico"} />
                    </FormCheckboxGrid>

                    <FormSectionSubTitle text={"Observaciones"} />
                    <FormRow>
                        <FormGroup inputType={"textarea"} inputName={"obs_equipamientos"} />
                    </FormRow>

                    {submitStatus.message && (
                        <div
                            className={`mt-4 rounded-md px-4 py-3 text-sm font-semibold ${submitStatus.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                            {submitStatus.message}
                        </div>
                    )}

                    <FormActions disabled={submitting}/> {/* Submit BTN */} 

                </FormSection>

            </FormBody>

            
        </form>
    </FormContainer>

  )
}
