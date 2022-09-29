import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

function AuthRoute(props) {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [props?.location?.pathname]);

  return <Route {...props} />;
}
export default AuthRoute;
