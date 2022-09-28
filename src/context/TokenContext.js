import { createContext, useState } from "react";

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
    const [roles, setRoles] = useState([])
    const TOKEN_KEY = 'AuthToken';
    const EMAIL_KEY = 'AuthEmail';
    const AUTHORITIES_KEY = 'AuthAuthorities';

  const setToken = token => {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  
  const getToken = () => {
    return sessionStorage.getItem(TOKEN_KEY)
  }

  const setEmail = email => {
    window.sessionStorage.removeItem(EMAIL_KEY)
    window.sessionStorage.setItem(EMAIL_KEY, email)
  }

  const getEmail = () => {
    return sessionStorage.getItem(EMAIL_KEY)
  }

  const setAuthorities = authorities => {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  const getAuthorities = () => {
    setRoles([])
    if(sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach((authority = { authority }) => {
        roles.push(authority.authority)
      });
    }
    return roles;
  }

  const logOut = () => {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  const data = {
    roles,
    setRoles,
    setToken,
    getToken,
    setEmail,
    getEmail,
    setAuthorities,
    getAuthorities,
    logOut,
  };

  return (
    <TokenContext.Provider value={data}>{children}</TokenContext.Provider>
  );
}

export { TokenProvider };
export default TokenContext;