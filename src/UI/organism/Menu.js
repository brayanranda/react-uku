import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <aside className="bg-white col-2 hidden lg:flex flex-col justify-between shadow-xl fixed left-0 top-0 px-2 lg:px-4 pb-2 pt-36 h-full">
      <ul className="overflow-y-scroll h-full">
        {routes.map((route, index) => (
          <li className="`mr-1 text-lg cursor-pointer" key={index}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-yellow-400 py-2 px-3 hover:bg-yellow-400 duration-300 transform hover:scale-110 flex justify-center hover:text-black mb-1 text-center"
                  : "py-2 px-3 hover:bg-gray-100 duration-300 flex transform hover:scale-110 justify-center hover:text-black mb-1 text-center"
              }
              to={route.to}
              end
            >
              {route.text}
            </NavLink>
          </li>
        ))}
      </ul>
      <p className="text-gray-400 p-0 m-0 font-bold text-center pt-5">ukulima © 2023</p>
    </aside>
  );
};

const routes = [];

routes.push({
  to: "/finca",
  text: "Finca",
  private: true,
});

routes.push({
  to: "/cultivo",
  text: "Cultivo",
  private: true,
});

export default Menu;
