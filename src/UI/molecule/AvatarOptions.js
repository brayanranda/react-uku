import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const AvatarOptions = () => {
  const { logOut } = useContext(AuthContext);

  return (
    <ul className="bg-white shadow-md rounded-3xl position-absolute top-20 right-0 w-48 py-3">
      <li className="py-2 px-3 hover:bg-gray-100">
        <i className="fas fa-user"></i>
        Perfil
      </li>
      <li
        onClick={() => {
          logOut();
        }}
        className="py-2 px-3 hover:bg-gray-100"
      >
        <i className="fas fa-user"></i>
        Cerrar sesión
      </li>
    </ul>
  );
};

export default AvatarOptions;
