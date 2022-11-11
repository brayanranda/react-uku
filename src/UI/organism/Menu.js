import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <aside className="bg-white col-2 flex flex-col justify-between shadow-xl fixed left-0 top-0 px-4 pb-2 pt-36 h-full">
      <ul className="overflow-y-scroll h-full">
        {routes.map((route, index) => (
          <li className="`mr-1 text-lg cursor-pointer" key={index}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-yellow-400 py-2 px-3 hover:bg-yellow-400 duration-300 flex justify-center rounded-xl mb-1 text-center"
                  : "py-2 px-3 hover:bg-yellow-400 duration-300 flex justify-center rounded-xl mb-1 text-center"
              }
              to={route.to}
              end
            >
              {route.text}
            </NavLink>
          </li>
        ))}
      </ul>
      <p className="text-gray-400 p-0 m-0 font-bold text-center pt-5">
        ukulima © 2022
      </p>
    </aside>
  );
};

const routes = [];

routes.push({
  to: "/home",
  text: "Agricultor",
  private: true,
});

routes.push({
  to: "/abono-organico",
  text: "Abono Organico",
  private: true,
});

routes.push({
  to: "/analisis-elemento",
  text: "Análisis Elemento",
  private: true,
});
routes.push({
  to: "/analisis-suelo",
  text: "Análisis Suelo",
  private: true,
});
routes.push({
  to: "/cultivo",
  text: "Cultivo",
  private: true,
});

routes.push({
  to: "/densidad",
  text: "Densidad",
  private: true,
});

routes.push({
  to: "/distancia-siembra",
  text: "Distancia siembra",
  private: true,
});

routes.push({
  to: "/elemento",
  text: "Elemento",
  private: true,
});
routes.push({
  to: "/elemento-variedad",
  text: "Elemento variedad",
  private: true,
});
routes.push({
  to: "/enmienda",
  text: "Enmienda",
  private: true,
});
routes.push({
  to: "/etapa-fenologica",
  text: "Etapa Fenológica",
  private: true,
});

routes.push({
  to: "/finca",
  text: "Finca",
  private: true,
});

routes.push({
  to: "/tipo-cultivo",
  text: "Tipo Cultivo",
  private: true,
});

routes.push({
  to: "/topografia",
  text: "Topografía",
  private: true,
});

routes.push({
  to: "/variedad",
  text: "Variedad",
  private: true,
});

routes.push({
  to: "/recomendacion-abono",
  text: "Recomendación Abono",
  private: true,
});

export default Menu;
