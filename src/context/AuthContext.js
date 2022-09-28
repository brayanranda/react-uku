import { createContext, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import * as global from 'global'

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let authURL = REACT_APP_API_URL + "auth/";
  let url = REACT_APP_API_URL + "usuario/";
  
  const [roles, setRoles] = useState([])

  const post = (user) => {
    let data = user;
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    }
    api.post(authURL + 'nuevo', options)
  };

  const putUser = (user) => {
    let data = user;
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    }
    api.put(url, options)
  };

  const login = (loginUser) => {
    let data = loginUser;
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    }
    api.post(authURL + 'login', options)
  };

  const data = {
    roles,
    setRoles,
    post,
    putUser,
    login,
  };

  return (
    <TokenContext.Provider value={data}>{children}</TokenContext.Provider>
  );
}

export { TokenProvider };
export default TokenContext;