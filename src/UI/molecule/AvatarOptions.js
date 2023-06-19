import { useContext, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import FormRequestPassword from "../../pages/Profile/FormRequestPassword";
import { useForm } from "../../hooks/useForm";

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
    <ul className="bg-white shadow-md rounded-3xl position-absolute top-20 right-0 w-48 py-3">
      {isFormPost &&
        <FormRequestPassword
          email={email}
          onSubmit={handleSave}
          isFormPost={isFormPost}
          setIsFormPost={setIsFormPost}
          onInputChange={onInputChange}
        />
      }
      <li
        className="py-2 px-3 hover:bg-gray-100"
        onClick={() => { toggleFormPost() }}
      >
        Cambiar contraseña
      </li>
      <li
        onClick={() => { logout() }}
        className="py-2 px-3 hover:bg-gray-100"
      >
        <i className="fas fa-user"></i> Cerrar sesión
      </li>
    </ul>
  );
};

export default AvatarOptions;
