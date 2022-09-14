import logo from "../../assets/images/logo-vertical.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { Button, Col, Row } from "reactstrap";

const Index = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
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
        <Image src={logo} width={120} className="mx-auto" alt="" />
        <h4 className=" text-center mt-3 mb-4 text-2xl font-medium">
          Iniciar sesión
        </h4>
        <div>
          <label className="d-block  mb-3" htmlFor="email">
            <p className="font-bold">Correo electrónico</p>
            <input
              id="email"
              name="email"
              onChange={handleChange}
              type="email"
              className="form-control"
              placeholder="ejemplo@ukulima.com"
            />
          </label>
          <label className="d-block  mb-3" htmlFor="password">
            <p className="font-bold">Contraseña</p>
            <input
              id="password"
              name="password"
              onChange={handleChange}
              type="password"
              className="form-control"
              placeholder="* * * * * * * * *"
            />
          </label>
          <Button className="w-100 my-4 bg-green-600 hover:bg-green-700">
            Ingresar
          </Button>
          <p className=" text-center">
            ¿No tienes cuenta?
            <Link className="font-medium ml-2" to="/register">
              Registrate
            </Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Index;
