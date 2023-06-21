import { useContext, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import FormRequestPassword from "../../pages/Profile/FormRequestPassword";
import { useForm } from "../../hooks/useForm";
import { faKey, faRightFromBracket, faWheatAwn, faHouseChimneyWindow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

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
      <Link
        to="/finca"
        className="lg:hidden py-2 px-3 hover:bg-gray-100 flex gap-4 items-center"
        onClick={() => { toggleFormPost() }}
      >
        <FontAwesomeIcon icon={faHouseChimneyWindow} />
        Finca
      </Link>
      <Link
        to="/cultivo"
        className="lg:hidden py-2 px-3 hover:bg-gray-100 flex gap-4 items-center"
        onClick={() => { toggleFormPost() }}
      >
        <FontAwesomeIcon icon={faWheatAwn} />
        Cultivo
      </Link>
      <li
        className="py-2 px-3 hover:bg-gray-100 flex gap-4 items-center"
        onClick={() => { toggleFormPost() }}
      >
        <FontAwesomeIcon icon={faKey} />
        Cambiar contraseña
      </li>
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
