import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";

import logo from "../../assets/images/logo-vertical.png";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const { emailOrPhone, password, onInputChange, onResetForm } = useForm({
    emailOrPhone: "",
    password: "",
  });
  const navigate = useNavigate();
  const validateInputs = () => {
    const validate = { emailOrPhone: false, password: false };
    if (emailOrPhone.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) !== null) {
      validate.emailOrPhone = true;
    }
    if (password.length > 5) validate.password = true;
    return validate;
  };
  const onLogin = (event) => {
    event.preventDefault();
    const validate = validateInputs();
    if (!validate.emailOrPhone || !validate.password) return;
    const user = { emailOrPhone, password };
    login(user);
    onResetForm();
    navigate("/home", {
      replace: true,
    });
  };
  return (
    <Row className="d-flex align-items-center justify-content-center w-100 min-h-screen px-6 mx-0 bg-image-uku">
      <Col
        sm={8}
        md={8}
        lg={6}
        xl={4}
        className="bg-white p-3 p-md-5 rounded-3"
      >
        <Image src={logo} width={120} className="mx-auto logo-lr" alt="" />
        <h4 className=" text-center mt-3 mb-4 text-2xl font-medium">
          Iniciar sesión
        </h4>
        <form onSubmit={onLogin}>
          <label className="d-block  mb-3" htmlFor="email">
            <p className="font-bold">Correo electrónico</p>
            <input
              name="emailOrPhone"
              onChange={onInputChange}
              type="email"
              value={emailOrPhone}
              className="form-control"
              placeholder="ejemplo@ukulima.com"
            />
          </label>
          <label className="d-block  mb-3" htmlFor="password">
            <p className="font-bold">Contraseña</p>
            <input
              name="password"
              onChange={onInputChange}
              value={password}
              type="password"
              className="form-control"
              placeholder="* * * * * * * * *"
            />
          </label>
          <Button
            type="submit"
            className="w-100 my-4 bg-green-600 hover:bg-green-700"
          >
            Ingresar
          </Button>
          <p className=" text-center">
            ¿No tienes cuenta?
            <Link className="font-medium ml-2" to="/register">
              Registrate
            </Link>
          </p>
        </form>
      </Col>
    </Row>
  );
};
