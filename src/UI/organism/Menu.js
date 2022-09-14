import { useState } from "react";

const Menu = () => {
  const [items, setItems] = useState([
    "Abono-organico",
    "Agricultor",
    "Analisis",
    "Corregimiento",
    "Cultivo",
    "Densidad",
    "Departamento",
    "Distancia siembra",
    "Elemento",
    "Etapa-fenelogica",
    "Finca",
    "Municipio",
    "Tipo-cultivo",
    "Topografia",
    "Variedad",
    "Vereda",
    "Recomendacion-abono",
    "items test",
    "items test",
    "items test",
    "items test",
    "items test",
  ]);
  return (
    <aside className="bg-white col-2 flex flex-col justify-between shadow-xl fixed left-0 top-0 px-4 pb-2 pt-36 h-full">
      <ul className="overflow-y-scroll h-full">
        {items.map((item, index) => (
          <li
            key={index}
            className={`mr-1 text-lg cursor-pointer duration-300 py-2 px-3 rounded-xl hover:bg-yellow-400 ${
              index === 0 ? "bg-yellow-400" : ""
            } text-center`}
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="text-gray-400 p-0 m-0 font-bold text-center pt-5">
        ukulima © 2022
      </p>
    </aside>
  );
};

export default Menu;
