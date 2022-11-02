import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, Col, Row } from "reactstrap";
import { Image } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";

import logo from "../../assets/images/logo-vertical.png";

export const ChangePasswordPage = () => {
  const { login, isLogged } = useContext(AuthContext);
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
  const onLogin = async (event) => {
    event.preventDefault();
    const validate = validateInputs();
    if (!validate.emailOrPhone || !validate.password) return;
    const user = { emailOrPhone, password };
    await login(user);
    if (isLogged) {
      navigate("/home", {
        replace: true,
      });
    } else {
      onResetForm();
    }
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
          Cambiar contraseña
        </h4>
        <form onSubmit={onLogin}>
          <label className="d-block  mb-3" htmlFor="email">
            <p className="font-bold">Contraseña</p>
            <input
              name="password"
              onChange={onInputChange}
              type="password"
              value={emailOrPhone}
              className="form-control"
              placeholder="* * * * * * * * *"
            />
          </label>
          <label className="d-block  mb-3" htmlFor="password">
            <p className="font-bold">Repetir contraseña</p>
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
            Continuar
          </Button>
          <p className=" text-center">
            <Link className="font-medium ml-2" to="/">
              Iniciar sesión
            </Link>
          </p>
        </form>
      </Col>
    </Row>
  );
};
