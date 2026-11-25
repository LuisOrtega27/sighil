/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   Sidebar.jsx
   Aside de navegacion unico de SIGHIL, compartido por /siroh y /prmau.
   Los items (rutas, ids, textos, permisos y submenus) los declara cada pagina;
   aqui solo se renderizan con NavLink y se deriva el estado activo de la URL.
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

import { Link, NavLink, useLocation } from "react-router-dom";
import { INSTITUTION } from "../config/institution";

const Sidebar = ({ title, subtitle, menuId, items, onLogout }) => {
  const { pathname, search } = useLocation();
  const sub = new URLSearchParams(search).get("sub");

  const linkCls = ({ isActive }) =>
    `mb-1 block cursor-pointer rounded-md px-3.5 py-[11px] text-[12.5px] text-gray-200 transition-all duration-300 hover:bg-secondary hover:pl-[18px] hover:font-semibold hover:text-white ${isActive ? "bg-secondary pl-[18px] font-semibold text-white" : ""}`;

  const isOpen = (item) =>
    pathname === item.to || pathname.startsWith(`${item.to}/`);

  const submenuCls = (item) => {
    if (item.submenu === "ficha") {
      return `nav-submenu list-none pl-[15px] ${isOpen(item) ? "is-open" : ""}`;
    }
    if (item.submenu === "met") {
      return `mb-2.5 list-none pl-[15px] ${isOpen(item) ? "" : "hidden"}`;
    }
    return "";
  };

  const childCls = (item, child) => {
    if (item.submenu === "met" && child.sub && sub === child.sub) {
      return "mb-0.5 block cursor-pointer rounded-r border-l-2 border-l-secondary bg-white/10 py-1.5 pl-2.5 pr-2.5 text-[11.5px] text-white transition-colors";
    }
    if (item.submenu === "met") {
      return `mb-0.5 block cursor-pointer rounded-r border-l-2 border-white/20 py-1.5 pl-2.5 pr-2.5 text-[11.5px] text-[#94a3b8] transition-colors hover:border-l-secondary hover:bg-white/10 hover:text-white`;
    }
    return "mb-0.5 block cursor-pointer rounded-r border-l-2 border-white/20 py-1.5 pl-2.5 pr-2.5 text-[11.5px] text-white transition-colors hover:border-l-[#f8fafc]";
  };

  return (
    <aside className="fixed left-0 top-0 z-100 flex h-screen w-72 flex-col justify-between bg-primary px-5 py-6 text-white shadow-[4px_0_10px_rgba(0,0,0,0.1)]">
      <div className="text-center">
        <Link to={"/"} className="mb-3 flex max-h-22 w-full items-center justify-center rounded-lg bg-white/5 p-2.5">
          <img src={INSTITUTION.logo} alt={`Logo ${INSTITUTION.alcaldia}`} className="max-h-16 max-w-full object-contain" />
        </Link>
        <h2 className="mb-3 border-b-2 border-secondary pb-2 text-[22px] font-extrabold tracking-[1px]">{title}</h2>
        <p className="text-[10px] font-bold uppercase leading-[1.3] text-[#94a3b8]">{subtitle}</p>

        <ul id={menuId} className="mt-5 list-none text-left flex flex-col gap-16">
          <div>
            {items.map((item) => (
              <li key={item.key}>
                <NavLink id={item.id} to={item.to} end className={linkCls}>
                  {item.label}
                </NavLink>

                {item.children && (
                  <ul id={item.submenuId} className={submenuCls(item)}>
                    {item.children.map((child) => (
                      <li key={child.key ?? child.id}>
                        {child.type === "button" ? (
                          <button
                            type="button"
                            id={child.id}
                            onClick={child.onClick}
                            className={`mb-0.5 block cursor-pointer rounded-r border-l-2 border-white/20 py-1.5 pl-2.5 pr-2.5 text-[11.5px] text-white transition-colors hover:border-l-white w-full bg-transparent text-left`}
                          >
                            {child.label}
                          </button>
                        ) : (
                          <NavLink id={child.id} to={child.to} end className={childCls(item, child)}>
                            {child.label}
                          </NavLink>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </div>

          <div>

            <li>
              <Link to="/" className={`mb-1 block cursor-pointer rounded-md px-3.5 py-2 text-[12.5px] text-gray-200 transition-all duration-300 hover:bg-secondary hover:pl-4 hover:font-semibold hover:text-white`}>
                ↩️ Volver al inicio
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={onLogout}
                className={`text-red-500 font-semibold mb-1 block cursor-pointer rounded-md px-3.5 py-2.75 text-[12.5px] transition-all duration-300 hover:bg-secondary hover:pl-4 hover:font-semibold hover:text-white w-full text-left`}
              >
                ⎋ Cerrar sesión
              </button>
            </li>
          </div>

        </ul>
      </div>

      <div className="border-t border-ink pt-3 text-center text-[10.5px] leading-[1.3] text-[#64748b]">
        {INSTITUTION.alcaldiaMunicipio}
        <br />
        {INSTITUTION.gestion}
        <br />
        <b>{INSTITUTION.entorno}</b>
      </div>
    </aside>
  );
};

export default Sidebar;
