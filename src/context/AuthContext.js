import React, { createContext, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [resLogin, setResLogin] = useState(null);
  const [userInfo, setUserInfo] = useState("");

  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let authURL = REACT_APP_API_URL + "auth/";
  let url = REACT_APP_API_URL + "usuario/";

  const [user, setUser] = useState(null);

  const login2 = ({ username }) => {
    setUser({ username });
    navigate("/home");
  };

  const [roles, setRoles] = useState([]);

  const post = async (user) => {
    let data = user;
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    let res = null;
    try {
      res = await api.post(authURL + "nuevoAgricultor", options);
      localStorage.setItem("token-auth", JSON.stringify(res.confirmationToken));
      navigate("/home");
      toast.success("Bienvenido a ukulima");
    } catch (error) {
      console.log(error);
      toast.error("Error");
      return res.err;
    }
  };

  const putUser = async (user) => {
    let data = user;
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    let res = null;
    try {
      res = await api.post(url, options);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (loginUser) => {
    let data = loginUser;
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    let res = null;
    try {
      res = await api.post(authURL + "login", options);
      if (res.token) {
        setResLogin(res);
        localStorage.setItem("token-auth", JSON.stringify(res.token));
        setIsLogged(true);
        navigate("/home", { replace: true });
        toast.success("Bienvenido a ukulima");
      }
    } catch (error) {
      setIsLogged(false);
      setIsLoginFail(true);
      console.log(error);
    }
  };

  const logOut = () => {
    localStorage.clear();
    window.sessionStorage.clear();
    localStorage.removeItem("token-auth");
    navigate("/", { replace: true });
  };

  const data = {
    login2,
    user,
    setUser,
    roles,
    setRoles,
    post,
    putUser,
    login,
    resLogin,
    setResLogin,
    isLogged,
    isLoginFail,
    setIsLogged,
    setIsLoginFail,
    userInfo,
    setUserInfo,
    logOut,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
function useAuth() {
  const auth = React.useContext(AuthContext);
  return auth;
}

function AuthRoute(props) {
  const auth = useAuth();

  if (!auth.resLogin) {
    return <Navigate to="/login" />;
  }

  return props.children;
}
export { AuthProvider, AuthRoute, useAuth };
export default AuthContext;
