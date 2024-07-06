import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { helpHttp } from "../../helpers/helpHttp";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

import { types } from "../types/types";

const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isOk = localStorage.getItem("isOk");

  return {
    isLogged: !!user,
    user: user,
    isOk: !!isOk,
  };
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, dispatch] = useReducer(authReducer, {}, init);
  const api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let authURL = REACT_APP_API_URL + "auth/";

  //FORGOT PASSWORD
  const forgotPassword = async (email = "") => {
    const options = {
      headers: { "content-type": "application/json" },
    };
    try {
      const res = await api.get(
        `${authURL}solicitudPassword/${email}`,
        options
      );
      console.log(res);
      if (!res.err) {
        toast.success(res.mensaje);
        localStorage.setItem("isOK", "true");
        const action = { type: types.forgotPass };
        dispatch(action);
      } else toast.error(res.statusText.mensaje);
    } catch (error) {
      console.log(error);
    }
  };

  const changePassword = async (user = {}, token = "") => {
    const options = {
      body: user,
      headers: { "content-type": "application/json" },
    };
    try {
      const res = await api.post(`${authURL}recuperar/${token}`, options);
      if (!res.err) {
        toast.success(res.mensaje)
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //REGISTER USER

  const createUser = async (newUser = {}) => {
    const options = {
      body: newUser,
      headers: { "content-type": "application/json" },
    };
    try {
      const res = await api.post(authURL + "nuevoAgricultor", options);
      console.log(res);
      if (!res.err) {
        login({ emailOrPhone: newUser.email, password: newUser.password });
      } else toast.error(res.statusText.mensaje);
    } catch (error) {
      console.log(error);
    }
  };

  //METODOS LOGIN
  const login = async (loginUser = {}) => {
    const options = {
      body: loginUser,
      headers: { "content-type": "application/json" },
    };
    try {
      const res = await api.post(authURL + "login", options);
      if (res.token) {
        localStorage.setItem("user", JSON.stringify(res));
        localStorage.setItem("token-auth", JSON.stringify(res.token));
        toast.success("Bienvenido a ukulima");
        const action = { type: types.login, payload: res };
        dispatch(action);
      } else toast.error("Correo o contraseña incorrectos");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isOK");
    localStorage.removeItem("token-auth");
    const action = { type: types.logout };
    dispatch(action);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,

        // Methods
        login,
        logout,
        forgotPassword,
        changePassword,
        createUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
