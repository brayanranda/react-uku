import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, Col, Row } from "reactstrap";
import { Image } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";

import logo from "../../assets/images/logo-vertical.png";
import { Toaster } from "react-hot-toast";

export const ForgotPasswordPage = () => {
  const { forgotPassword, ok } = useContext(AuthContext);
  const { email, onInputChange, onResetForm } = useForm({
    email: "",
  });
  const navigate = useNavigate();
  const validateInputs = () => {
    const validate = { email: false };
    if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) !== null) {
      validate.email = true;
    }
    return validate;
  };

  const onLogin = async (event) => {
    event.preventDefault();
    const validate = validateInputs();
    if (!validate.email) return;
    await forgotPassword(email);
    if (ok === true) {
      console.log("entre");
      navigate("/login", {
        replace: true,
      });
    } else {
      onResetForm();
    }
  };
  return (
    <Row className="d-flex align-items-center justify-content-center w-100 min-h-screen px-6 mx-0 bg-image-uku">
      <Toaster />
      <Col
        sm={8}
        md={8}
        lg={6}
        xl={4}
        className="bg-white p-3 p-md-5 rounded-3"
      >
        <Image src={logo} width={120} className="mx-auto logo-lr" alt="" />
        <h4 className=" text-center mt-3 mb-4 text-2xl font-medium">
          Solicitud de cambio de contraseña
        </h4>
        <form onSubmit={onLogin}>
          <label className="d-block  mb-3" htmlFor="email">
            <p className="font-bold">Correo electrónico</p>
            <input
              name="email"
              onChange={onInputChange}
              type="email"
              value={email}
              className="form-control"
              placeholder="ejemplo@ukulima.com"
            />
          </label>
          <Button
            type="submit"
            className="w-100 my-4 bg-green-600 hover:bg-green-700"
          >
            Solicitar
          </Button>
          <p className=" text-center">
            <Link className="font-medium ml-2" to="/login">
              Iniciar sesión
            </Link>
          </p>
        </form>
      </Col>
    </Row>
  );
};
