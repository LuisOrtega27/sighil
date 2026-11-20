import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import {
  FaArrowLeft,
  FaLock,
  FaRightToBracket,
  FaShieldHalved,
  FaUserPlus,
  FaUserTie,
  FaWater,
} from "react-icons/fa6"

import {useAuth} from "../context/auth"
import { INSTITUTION } from "../config/institution"

export const Login = () => {
  
  const navigate = useNavigate();
  const {register,handleSubmit, getValues, formState:{errors}, reset} = useForm()
  const [view, setView] = useState("login")
  const [passMatch, setPassMatch] = useState(false);
  const [loginError, setLoginError] = useState("")
  const [registerError, setRegisterError] = useState("")

  const {signUp, signIn, isAuthenticated} = useAuth();

  useEffect(()=>{
    if(isAuthenticated) navigate("/");
  },[isAuthenticated, navigate])

  const onSubmitLogin = handleSubmit(async (values)=>{
    setLoginError("")

    try {
      await signIn(values)
      reset();
    } catch (error) {
      setLoginError(error.response?.data?.message ?? "No se pudo iniciar sesión")
    }

  })

  const onSubmitRegister = handleSubmit( async (values)=>{
    setRegisterError("")
    if(!passMatch ) {
      setRegisterError("Las contraseñas no coinciden")
      return
    }

    try {
      await signUp(values)
      alert("Solicitud de registro enviada. El administrador del sistema validará tus credenciales.");
      setView("login")
      reset()
    } catch (error) {
      setRegisterError(error.response?.data?.message ?? "No se pudo enviar la solicitud")
    }

  })

  return (
    <div className="bg-slate-950 text-slate-100 font-sans min-h-screen flex items-center justify-center p-4 md:p-8">

      <div className="w-full max-w-5xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col md:flex-row min-h-150">

        {/* ============ PANEL CORPORATIVO ============ */}
        <div className="md:w-1/2 animated-grad p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            <FaWater className="text-[300px]" />
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <img src={INSTITUTION.logo} alt={`Logo ${INSTITUTION.alcaldia}`} className="h-12 w-auto" />
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-red-400 block font-bold">{INSTITUTION.alcaldia}</span>
              <span className="text-xs text-slate-300 tracking-wider">{INSTITUTION.coordinacion}</span>
            </div>
          </div>

          <div className="relative z-10 my-8 md:my-0">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              {INSTITUTION.sigla}
            </h1>
            <div className="h-1 w-16 bg-blue-500 rounded mb-6"></div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              <strong>{INSTITUTION.nombre}</strong>.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              {INSTITUTION.descripcion}
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>{INSTITUTION.version}</span>
            <span className="flex items-center gap-1.5">
              <FaShieldHalved className="text-blue-400" />
              {INSTITUTION.acceso}
            </span>
          </div>
        </div>

        {/* ============ PANEL DE AUTENTICACIÓN ============ */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-slate-900/40">

          {view === "login" ? (
            <div className="space-y-6 block">
              <div>
                <h2 className="text-xl font-bold text-slate-100 tracking-wide">Ingreso al Sistema</h2>
                <p className="text-xs text-slate-400">Introduce tus credenciales autorizadas para acceder a los módulos.</p>
              </div>

              <form className="space-y-4" onSubmit={onSubmitLogin}>
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Usuario Institucional</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="ej. usuario@gmail.com"
                      {...register("email", {required: true})} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-colors font-mono user-valid:border-red-500" />
                    <FaUserTie className="absolute left-3.5 top-3.5 text-slate-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Contraseña de Seguridad</label>
                    <a href="#" className="text-[10px] text-blue-400 hover:underline">¿La olvidaste?</a>
                  </div>
                  <div className="relative">
                    <input 
                      type="password" 
                      placeholder="••••••••••••"
                      required
                      {...register("password", {required: true})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-colors font-mono user-valid:border-red-500" />
                    <FaLock className="absolute left-3.5 top-3.5 text-slate-500" />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input type="checkbox" id="remember" {...register("remember")} className="accent-blue-600 rounded" />
                  <label htmlFor="remember" className="text-[11px] text-slate-400 cursor-pointer select-none">Mantener sesión iniciada en este terminal</label>
                </div>

                {loginError && <p role="alert" className="text-[11px] text-alert">{loginError}</p>}

                <button type="submit" className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500 transition-all shadow-md shadow-blue-950/50 flex items-center justify-center gap-2">
                  <FaRightToBracket />
                  Autenticar Entrada
                </button>
              </form>

              <div className="text-center pt-4 border-t border-slate-800/80">
                <p className="text-xs text-slate-400">
                  ¿Es tu primera vez ingresando?
                  <button onClick={() => setView("register")} className="text-blue-400 font-bold hover:underline ml-1">Crea tu usuario aquí</button>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 block">
              <div>
                <h2 className="text-xl font-bold text-slate-100 tracking-wide flex items-center gap-2">
                  <FaUserPlus className="text-emerald-400" />
                  Solicitud de Registro
                </h2>
                <p className="text-xs text-slate-400">Crea una cuenta técnica. La cuenta requerirá aprobación del administrador.</p>
              </div>

              <form className="space-y-3" onSubmit={onSubmitRegister}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Nombre</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Juan"
                      pattern=".{4,}"
                      required
                      {...register("fname", {required: {value: true, message:"name is required"}})} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none transition-colors invalid:border-red-500" />
                      {errors.fname && <span>{errors.fname.message}</span>}
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Apellido</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Pérez"
                      pattern=".{4,}"
                      required
                      {...register("lname", {required: true})} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none transition-colors invalid:border-red-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Cedula de Identidad</label>
                    <input 
                      type="text" 
                      placeholder="00.000.000" 
                      maxLength={10}
                      pattern="^\d{1,2}\.\d{3}\.\d{3}"
                      required
                      {...register("ci", {
                        required: {value: true, message: "C.I. is required"},
                        maxLength: {value: 10, message: "10 characters max"},
                        pattern: {value: /^\d{1,2}\.\d{3}\.\d{3}/, message: "value does not match the pattern"}
                      })} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none transition-colors font-mono invalid:border-red-500" />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Numero de Telefono</label>
                    <input 
                      type="text" 
                      placeholder="0000-0000000"
                      maxLength={12}
                      pattern="^\d{4}-\d{7}"
                      required
                      {...register("phone", {
                        required: {value: true, message: "C.I. is required"},
                        maxLength: {value: 12, message: "12 characters max"},
                        pattern: {value: /^\d{4}-\d{7}/, message: "value does not match the pattern"}
                      })} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none transition-colors font-mono invalid:border-red-500" />
                  </div>
                    
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Correo Institucional</label>
                  <input 
                    type="email" 
                    placeholder="jperez@alcaldia.gob"
                    required
                    {...register("email", {required: true, message: "email is required"})} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none transition-colors font-mono invalid:border-red-500" />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Área o Departamento</label>
                  <select 
                    required
                    {...register("direccion_id", {required: true})} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none transition-colors">
                    <option value={6}>Visitante</option>
                    <option value={1}>Presidencia</option>
                    <option value={2}>Coordinación de Quebradas</option>
                    <option value={3}>Direción de Riesgos</option>
                    <option value={4}>Protección Civil</option>
                    <option value={5}>Sala de Riesgo</option>
                    <option value={7}>Informatica</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Contraseña</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      required
                      {...register("password", {
                        required: {value: true, message: "the pasword is required"},
                        minLength: {value: 6, message: "the password must have alt least 6 characters"},
                        maxLength: {value: 6, message: "password max length is 20 characters"}
                      })}  
                      className={`
                        w-full bg-slate-950 
                        border  rounded-xl 
                        px-3 py-2 
                        text-xs text-slate-200 font-mono
                        focus:outline-none 
                        ${passMatch ? "border-emerald-500" : "border-alert"}
                        transition-colors`}/>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">Confirmar</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      required
                      className={`
                        w-full bg-slate-950 
                        border  rounded-xl 
                        px-3 py-2 
                        text-xs text-slate-200 font-mono
                        focus:outline-none 
                        ${passMatch ? "border-emerald-500" : "border-alert"}
                        transition-colors`}
                        onChange={e=> e.target.value === getValues("password") ? setPassMatch(true) : setPassMatch(false)}/>
                  </div>
                </div>

                {registerError && <p role="alert" className="text-[11px] text-alert">{registerError}</p>}

                <button type="submit" className="w-full mt-2 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 transition-all shadow-md shadow-emerald-950/50">
                  Enviar Solicitud de Alta
                </button>
              </form>

              <div className="text-center pt-2">
                <button onClick={() => setView("login")} className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 mx-auto">
                  <FaArrowLeft />
                  Volver al inicio de sesión
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
