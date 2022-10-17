import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { helpHttp } from "../../helpers/helpHttp";
import toast from "react-hot-toast";

import { types } from "../types/types";
// const initialState = {
//     logged: false,
// }

const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    isLogged: !!user,
    user: user,
  };
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);
  const api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let authURL = REACT_APP_API_URL + "auth/";

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
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
        createUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
