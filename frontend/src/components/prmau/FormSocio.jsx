import { useRef, useState } from "react"

import {
  CheckboxItem,
  FormCheckboxGrid,
  FormGroup,
  FormSectionMiniSubTitle,
  FormSectionSubTitle,
  FormSectionTitle,
  PrmauFormRow,
} from "../formPrimitives"
import { FormActions } from "./FormActions"
import { FormBody } from "./FormBody"
import { FormContainer } from "./FormContainer"
import { FormSection } from "./FormSection"
import { FormTabs } from "./FormTabs"
import { FormHeader } from "./FormHeader"
import { SubmitStatus } from "./SubmitStatus"
import { useFormSubmit } from "./useFormSubmit"

import { FaXmark } from "react-icons/fa6" 
import { submitSocioeconomico } from "../../api/prmau"

const tabList = [
    { 
        name: "1. Ubicación y Empadronador", 
        path: "#DGUI"
    },
    { 
        name: "2. Ocupantes (Censo)", 
        path: "#DOI"
    },
    { 
        name: "3. Fuerza de Trabajo", 
        path: "#FTJH"
    },
    { 
        name: "4. Situación de Riesgo", 
        path: "#SDR"
    },
]

const MAX_INTEGRANTES = 20

const createOcupante = (id) => ({
  id,
  apellidos_nombres: "",
  ci: "",
  parentesco: "",
  sexo: "M",
  anio_nac: "",
  nacionalidad: "Venezolano",
  estado_civil: "Soltero(a)",
  nivel_estudio: "Ninguno",
  trabaja: "si",
})

export const FormSocio = () => {
  const nextId = useRef(2)
  const [ocupantes, setOcupantes] = useState([createOcupante(1)])
  const { submitStatus, submitting, handleSubmit } = useFormSubmit({
    submit: submitSocioeconomico,
    buildPayload: (payload) => {
      payload.ocupantes = ocupantes.map(({ id, ...rest }) => {
        void id
        return rest
      })
      payload.n_ocupantes = ocupantes.length
      return payload
    },
    successMessage: (res) => `Formulario socioeconómico enviado correctamente${res?.id ? ` (ID: ${res.id})` : ""}.`,
    errorMessage: "No se pudo enviar el formulario socioeconómico.",
  })

  const agregarIntegrante = () => {
    setOcupantes((prev) => {
      if (prev.length >= MAX_INTEGRANTES) return prev
      const id = nextId.current++
      return [...prev, createOcupante(id)]
    })
  }

  const eliminarIntegrante = (id) => {
    setOcupantes((prev) => {
      if (prev.length <= 1) return prev
      return prev.filter((row) => row.id !== id)
    })
  }

  const ajustarCantidad = (cantidad) => {
    const n = Math.min(MAX_INTEGRANTES, Math.max(1, Number(cantidad)))
    setOcupantes((prev) => {
      if (n === prev.length) return prev
      if (n < prev.length) return prev.slice(0, n)
      const next = [...prev]
      while (next.length < n) next.push(createOcupante(nextId.current++))
      return next
    })
  }

  const updateOcupante = (id, field, value) => {
    setOcupantes((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    )
  }

  return (
    <FormContainer>
        <form onSubmit={handleSubmit}>

            <FormHeader title="REGISTRO DE VULNERABILIDAD FÍSICA (IMGRAD)">
                <div>
                    <strong>Nº CONTROL:</strong> 
                    <input name={"n_control"} className="text-siroh-alert-red font-bold w-16 text-center" defaultValue={"94000"} />
                </div>
                <div className="flex gap-2">
                    <strong>Nº de Hogar:</strong>
                    <input name="n_hogar" className="w-16 text-center border-2" type="text" placeholder="---"/>
                    <span>de</span>
                    <input name="total_hogares" className="w-16 text-center border-2" type="text" placeholder="---"/>
                </div>
            </FormHeader>

            <FormTabs tabList={tabList}/>

            <FormBody>

                {/* 1. */}
                <FormSection sectionName={"form-section-DGUI"} id={"DGUI"}>
                    <FormSectionTitle text={"I. Datos Generales y Ubicación del Inmueble"}/>

                    <FormSectionSubTitle text={"Datos de la persona"} />
                    <PrmauFormRow>
                        <FormGroup inputName={"empadronador_nombre"} label={"Nombre y Apellido del Empadronador"}/>
                        <FormGroup inputName={"empadronador_ci"} label={"Cédula de Identidad (C.I.)"}/>
                    </PrmauFormRow>

                    <FormSectionSubTitle text={"Datos del inmueble"} />
                    <PrmauFormRow>
                        <FormGroup inputName={"estado"} label={"Estado (Edo.)"}/>
                        <FormGroup inputName={"municipio"} label={"Municipio (Mun.)"}/>
                        <FormGroup inputName={"parroquia"} label={"Parroquia (Prr.)"}/>
                        <FormGroup inputName={"sector"} label={"Sector / Ámbitos (Amb. / Sect.)"}/>
                        <FormGroup inputName={"manzana"} label={"Manzana / Comunidad (Manz.)"}/>
                    </PrmauFormRow>

                    <FormSectionSubTitle text={"Codigo catastral"} />
                    <PrmauFormRow>
                        <FormGroup inputName={"cod_catastral"} label={"Código Catastral"}/>
                    </PrmauFormRow>

                </FormSection>
                
                {/* 2. */}
                <FormSection sectionName={"form-section-DOI"} id={"DOI"} >

                    <FormSectionTitle text={"II. Datos de los Ocupantes del Inmueble"} />
                    
                    <table id="tablaOcupantes" className="table-fixed  w-full text-center text-xs border-2 border-blue-400">
                        
                        <thead>
                            <tr className="bg-siroh-border-muted text-vul-primary font-bold" >
                                <td className="border-x border-white">Nº</td>
                                <td className="border-x border-white">Apellidos y Nombres</td>
                                <td className="border-x border-white">Nº C.I.</td>
                                <td className="border-x border-white">Parentesco</td>
                                <td className="border-x border-white">Sexo</td>
                                <td className="border-x border-white">Año Nac.</td>
                                <td className="border-x border-white">Nacionalidad</td>
                                <td className="border-x border-white">Estado Civil</td>
                                <td className="border-x border-white">Nivel Estudio</td>
                                <td className="border-x border-white">¿Trabaja?</td>
                                <td className="border-x border-white">Acción</td>
                            </tr>
                        </thead>

                        <tbody className=" [&>input]:h-10 [&>input]:bg-black">
                            {ocupantes.map((row, index) => (
                            <tr key={row.id} className="bg-white border-y border-blue-400 hover:bg-blue-100 h-10">
                                <td>{index + 1}</td>
                                <td> <input type="text" className="w-full" value={row.apellidos_nombres} onChange={(e) => updateOcupante(row.id, "apellidos_nombres", e.target.value)} placeholder="Jefe(a) de hogar"/> </td>
                                <td> <input type="number" className="w-full" value={row.ci} onChange={(e) => updateOcupante(row.id, "ci", e.target.value)} placeholder="C.I."/> </td>
                                <td> 
                                    <select value={row.parentesco} onChange={(e) => updateOcupante(row.id, "parentesco", e.target.value)}>
                                        <option value="">-- Seleccionar --</option>
                                        <option value={"Jefe(a) del hogar"}>Jefe(a) del hogar</option>
                                        <option value={"Cónyuge"}>Cónyuge</option>
                                        <option value={"Hijo(a)"}>Hijo(a)</option>
                                        <option value={"Nieto(a)"}>Nieto(a)</option>
                                        <option value={"Madre/Padre"}>Madre/Padre</option>
                                        <option value={"Suegro(a)"}>Suegro(a)</option>
                                        <option value={"Hermano(a)"}>Hermano(a)</option>
                                        <option value={"Sobrino(a)"}>Sobrino(a)</option>
                                        <option value={"Primo(a)"}>Primo(a)</option>
                                        <option value={"Yerno/Nuera"}>Yerno/Nuera</option>
                                        <option value={"Otro"}>Otro</option>
                                    </select> 
                                </td>
                                <td> 
                                    <select value={row.sexo} onChange={(e) => updateOcupante(row.id, "sexo", e.target.value)}>
                                        <option value="M">M</option>
                                        <option value="F">F</option>
                                    </select> 
                                </td>
                                <td> <input type="date" value={row.anio_nac} onChange={(e) => updateOcupante(row.id, "anio_nac", e.target.value)}/> </td>
                                <td> 
                                    <select value={row.nacionalidad} onChange={(e) => updateOcupante(row.id, "nacionalidad", e.target.value)}>
                                        <option value="Venezolano">Venezolano</option>
                                        <option value="Extranjero">Extranjero</option>
                                    </select>
                                </td>
                                <td>
                                    <select value={row.estado_civil} onChange={(e) => updateOcupante(row.id, "estado_civil", e.target.value)}>
                                        <option value="Soltero(a)">Soltero(a)</option>
                                        <option value="Casado(a)">Casado(a)</option>
                                        <option value="Concubino(a)">Concubino(a)</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </td>
                                <td>
                                    <select value={row.nivel_estudio} onChange={(e) => updateOcupante(row.id, "nivel_estudio", e.target.value)}>
                                        <option value="Ninguno">Ninguno</option>
                                        <option value="Básico">Básico</option>
                                        <option value="Diversificado">Diversificado</option>
                                        <option value="Universitario">Universitario</option>
                                    </select>
                                </td>
                                <td>
                                    <select value={row.trabaja} onChange={(e) => updateOcupante(row.id, "trabaja", e.target.value)}>
                                        <option value="si">si</option>
                                        <option value="no">no</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="bg-siroh-alert-red cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 p-1"
                                        onClick={() => eliminarIntegrante(row.id)}
                                        disabled={ocupantes.length <= 1}
                                        aria-label="Eliminar integrante"
                                    > <FaXmark className="mx-auto text-white font-bold"/> </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
        
                    </table>

                    <div className="flex items-center gap-3 mt-8">
                        <button
                            type="button"
                            className="bg-siroh-success-green text-white font-bold p-2 rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                            onClick={agregarIntegrante}
                            disabled={ocupantes.length >= MAX_INTEGRANTES}
                        >+ Agregar Integrante</button>
                        <label className="text-xs font-medium text-vul-label uppercase flex items-center gap-2">
                            Nº de integrantes
                            <select
                                className="py-2 px-3 border-2 rounded-xs border-siroh-border-muted text-xs bg-white font-normal normal-case text-ink"
                                value={ocupantes.length}
                                onChange={(e) => ajustarCantidad(e.target.value)}
                            >
                                {Array.from({ length: MAX_INTEGRANTES }, (_, i) => i + 1).map((n) => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>

                            <span className="text-xs font-medium text-vul-label uppercase flex items-center gap-2">/ 20</span>
                        </label>
                    </div>

                </FormSection>

                {/* 3. */}
                <FormSection sectionName={"form-section-FTJH"} id={"FTJH"}>
                    <FormSectionTitle text={"III. Fuerza de Trabajo Jefe(a) del Hogar"} />

                    <FormSectionSubTitle text={"1. ¿En cuál de estas situaciones se encuentra actualmente?"} />
                    <PrmauFormRow>
                        <CheckboxItem inputType="radio" inputName={"ft_situacion_actual"} label={"a- Trabajando"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_situacion_actual"} label={"b- Sin trabajar"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_situacion_actual"} label={"c- Buscando trabajo por primera vez"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_situacion_actual"} label={"d- En quehaceres del hogar"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_situacion_actual"} label={"e- Estudiando"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_situacion_actual"} label={"f- Como pensionado o jubilado"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_situacion_actual"} label={"g- Otra situación (especifique):"}/>
                    </PrmauFormRow>

                    <FormSectionSubTitle text={"2. ¿Cuánto tiempo tiene sin trabajar?"} />
                    <PrmauFormRow>
                        <CheckboxItem inputType="radio" inputName={"ft_tiempo_sin_trabajar"} label={"a- Hasta 3 meses"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_tiempo_sin_trabajar"} label={"b- De 4 a 6 meses"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_tiempo_sin_trabajar"} label={"c- De 7 a 12 meses"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_tiempo_sin_trabajar"} label={"d- Más de 1 año"}/>
                    </PrmauFormRow>

                    <FormSectionSubTitle text={"3. ¿Cuál es su ocupación en la empresa, organismo o negocio donde trabaja?"} />
                    <PrmauFormRow>
                        <FormGroup inputName={"ft_ocupacion"} label={""} inputPlaceholder={"Ej: Chofer, aprendiz de tornero, oficinista, maestra, etc."}/>
                    </PrmauFormRow>

                    <FormSectionSubTitle text={"4. ¿A qué se dedica la empresa, organismo o negocio donde trabaja?"} />
                    <PrmauFormRow>
                        <FormGroup inputName={"ft_actividad_empresa"} label={""} inputPlaceholder={"Ej: Transporte de pasajeros, fábrica, banco, educación, etc."}/>
                    </PrmauFormRow>

                    <FormSectionSubTitle text={"4. ¿A qué se dedica la empresa, organismo o negocio donde trabaja?"} />
                    <FormCheckboxGrid>
                        <CheckboxItem inputType="radio" inputName={"ft_ingreso_tipo"} label={"a- Ingreso en Bs:"}/>
                        <FormGroup inputName={"ft_ingreso_bs"} inputPlaceholder={"Monto Bs."} />
                    </FormCheckboxGrid>
                    <FormCheckboxGrid>
                        <CheckboxItem inputType="radio" inputName={"ft_ingreso_tipo"} label={"b- No tuvo ingresos"}/>
                    </FormCheckboxGrid>

                    <FormSectionSubTitle text={"6. ¿Cuántas personas en su hogar tienen trabajo remunerado?"} />
                    <FormCheckboxGrid>
                        <CheckboxItem inputType="radio" inputName={"ft_personas_trabajo_remunerado"} label={"a- Una persona"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_personas_trabajo_remunerado"} label={"b- Dos personas"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_personas_trabajo_remunerado"} label={"c- Tres personas o más"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_personas_trabajo_remunerado"} label={"d- Ninguno"}/>
                    </FormCheckboxGrid>

                    <FormSectionSubTitle text={"7. ¿Cuál fue el monto total del ingreso del hogar el mes pasado?"}/>
                    <FormCheckboxGrid>
                        <CheckboxItem inputType="radio" inputName={"ft_ingreso_hogar"} label={"a- Menos de un salario mínimo"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_ingreso_hogar"} label={"b- Un salario mínimo"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_ingreso_hogar"} label={"c- De uno a dos salarios mínimos"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_ingreso_hogar"} label={"d- De dos a cuatro salarios mínimos"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_ingreso_hogar"} label={"e- Más de cuatro salarios mínimos"}/>
                        <CheckboxItem inputType="radio" inputName={"ft_ingreso_hogar"} label={"f- Ninguno"}/>
                    </FormCheckboxGrid>

                    <FormSectionSubTitle text={"8. ¿En la vivienda se realiza alguna(s) actividad(es) económica(s)?"}/>
                    <FormCheckboxGrid>
                        <CheckboxItem inputType="radio" inputName={"ft_actividad_economica_vivienda"} label={"a- Sí"} />
                        <CheckboxItem inputType="radio" inputName={"ft_actividad_economica_vivienda"} label={"b- No"} />
                    </FormCheckboxGrid>
                </FormSection>

                {/* 4. */}

                <FormSection sectionName={"form-section-SDR"} id={"SDR"}>
                    <FormSectionTitle text={"IV. Situación de Riesgo"} />

                    <FormSectionSubTitle text={"Aspectos que pueden incidir en una situación de riesgo:"} />

                    <FormSectionMiniSubTitle text={"De la Vivienda"} />
                    <FormCheckboxGrid>
                        <CheckboxItem inputName={"riesgo_vivienda"} label={"¿Fisuras o grietas en las paredes?"} />
                        <CheckboxItem inputName={"riesgo_vivienda"} label={"¿Columnas fracturadas?"} />
                        <CheckboxItem inputName={"riesgo_vivienda"} label={"¿Vigas fracturadas?"} />
                        <CheckboxItem inputName={"riesgo_vivienda"} label={"Presencia en los alrededores de otras viviendas, calles, escaleras, muros, etc. en situación de riesgo que puedan afectarla"} />
                        <CheckboxItem inputName={"riesgo_vivienda"} label={"¿Hundimiento del piso?"} />
                        <FormGroup inputName={"riesgo_vivienda_otros"} label={"Otros (especificar):"} />
                    </FormCheckboxGrid>

                    <FormSectionMiniSubTitle text={"Del Terreno"} />
                    <FormCheckboxGrid>
                        <CheckboxItem inputName={"riesgo_terreno"} label={"¿Existen o han existido hundimientos del terreno?"} />
                        <CheckboxItem inputName={"riesgo_terreno"} label={"¿Existen o han existido deslizamientos del terreno?"} />
                        <CheckboxItem inputName={"riesgo_terreno"} label={"¿Está al borde, sobre o al pie de un talud?"} />
                        <CheckboxItem inputName={"riesgo_terreno"} label={"¿Tiene botes de aguas en la cercanía (blancas y/o negras)?"} />
                        <CheckboxItem inputName={"riesgo_terreno"} label={"¿Existen árboles o postes en la cercanía que estén inclinados?"} />

                        <FormCheckboxGrid>
                            <label>Drenajes o quebradas en la cercanía:</label>
                            <CheckboxItem inputName={"drenajes_quebradas"} label={"A menos de 10 m."} />
                            <CheckboxItem inputName={"drenajes_quebradas"} label={"de 10 a 20 m."} />
                            <CheckboxItem inputName={"drenajes_quebradas"} label={"de 20 a 40 m."} />
                        </FormCheckboxGrid>
                    </FormCheckboxGrid>

                    <FormSectionMiniSubTitle text={"Dictamen / Nivel de Riesgo Evaluado:"} />
                    <FormCheckboxGrid>
                        <CheckboxItem inputType="radio" inputName={"nivel_riesgo"} label={"Alto"} />
                        <CheckboxItem inputType="radio" inputName={"nivel_riesgo"} label={"Mediano"} />
                        <CheckboxItem inputType="radio" inputName={"nivel_riesgo"} label={"Bajo"} />
                        <CheckboxItem inputName={"sin_riesgo_visible"} label={"LA INSPECCIÓN VISUAL NO REFLEJA NINGÚN TIPO DE RIESGO"} />
                    </FormCheckboxGrid>

                    <FormSectionTitle text={"Firma del Empadronador"} />
                    <PrmauFormRow>
                        <FormGroup inputName={"firma_empadronador"} inputPlaceholder={"Firma o Nombre del Evaluador"} />
                    </PrmauFormRow>

                    <SubmitStatus status={submitStatus} />

                    <FormActions disabled={submitting}/> {/* Submit BTN */} 
                    
                </FormSection>

            </FormBody>


        </form>
        
    </FormContainer>
  )
}
