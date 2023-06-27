import { useContext, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import FormRequestPassword from "../../pages/Profile/FormRequestPassword";
import { useForm } from "../../hooks/useForm";
import { faKey, faRightFromBracket, faWheatAwn, faHouseChimneyWindow, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { getUser } from "../../hooks/useGetUser";

const AvatarOptions = () => {
  const { forgotPassword, logout, isOk } = useContext(AuthContext);
  const { email, onInputChange, onResetForm } = useForm({
    email: "",
  })

  const [isFormPost, setIsFormPost] = useState(false);
  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
  }

  const validateInputs = () => {
    let validate = false;
    if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) !== null) {
      validate = true;
    }
    return validate;
  }

  const handleSave = async (event) => {
    event.preventDefault();
    const validate = validateInputs();
    if (!validate) return;
    await forgotPassword(email);
    if (isOk) {
      toggleFormPost();
      logout();
    } else onResetForm();
  }

  return (
    <ul className="bg-white shadow-xl rounded-xl position-absolute top-18 right-0 w-60 py-3">
      {isFormPost &&
        <FormRequestPassword
          email={email}
          onSubmit={handleSave}
          isFormPost={isFormPost}
          setIsFormPost={setIsFormPost}
          onInputChange={onInputChange}
        />
      }
      <li className="sm:hidden py-2 px-3 bg-green-100 flex gap-4 items-center overflow-hidden">
        <FontAwesomeIcon icon={faUser} />
        {getUser()}
      </li>
      <Link
        to="/finca"
        onClick={() => { toggleFormPost() }}
        className="lg:hidden py-2 px-3 hover:bg-gray-100 flex gap-4 items-center"
      >
        <FontAwesomeIcon icon={faHouseChimneyWindow} />
        Finca
      </Link>
      <Link
        to="/cultivo"
        onClick={() => { toggleFormPost() }}
        className="lg:hidden py-2 px-3 hover:bg-gray-100 flex gap-4 items-center"
      >
        <FontAwesomeIcon icon={faWheatAwn} />
        Cultivo
      </Link>
      {/* <li
        onClick={() => { toggleFormPost() }}
        className="py-2 px-3 hover:bg-gray-100 flex gap-4 items-center"
      >
        <FontAwesomeIcon icon={faKey} />
        Cambiar contraseña
      </li> */}
      <li
        onClick={() => { logout() }}
        className="py-2 px-3 hover:bg-red-50 flex gap-4 items-center"
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        Cerrar sesión
      </li>
    </ul>
  );
};

export default AvatarOptions;
