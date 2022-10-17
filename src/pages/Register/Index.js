// import logo from "../../assets/images/logo-vertical.png";
// import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import { Image } from "react-bootstrap";
// import { Button, Col, Row } from "reactstrap";
// import AuthContext from "../../context/AuthContext";
// import { Toaster } from "react-hot-toast";
import { RegisterPage } from "../../auth/pages/RegisterPage";

const Index = () => {
  // const { post } = useContext(AuthContext);
  // const [isRegister, setIsRegister] = useState(false);
  // const [isRegisterinFail, setIsRegisterinFail] = useState(false);
  // const [data, setData] = useState({
  //   nombres: "",
  //   apellidos: "",
  //   email: "",
  //   password: "",
  //   identificacion: 1,
  //   telefono: "",
  //   fechaNacimiento: "",
  //   idTipoIdentificacion: 1,
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData({ ...data, [name]: value });
  //   if (name === "idTipoIdentificacion") {
  //     setData({ ...data, [name]: Number(value) });
  //   }
  //   if (name === "identificacion") {
  //     setData({ ...data, [name]: Number(value) });
  //   }
  // };

  // const handleSave = async () => {
  //   await post(data);
  //   setIsRegister(true);
  //   setIsRegisterinFail(false);
  //   // setIsRegister(false)
  //   // setIsRegisterinFail(true)
  // };

  return (
    <RegisterPage />
    // <Row className="d-flex align-items-center justify-content-center w-100 min-h-screen px-6 mx-0 bg-image-uku">
    //   <Col lg={8} xl={6} className="bg-white p-3 p-md-5 rounded-3">
    //     <Image src={logo} width={120} className="mx-auto" alt="" />
    //     <h4 className=" text-center mt-3 mb-4 text-2xl font-medium">
    //       Registrar usuario
    //     </h4>
    //     <Row>
    //       <Col md={6}>
    //         <label className="d-block  mb-3" htmlFor="nombres">
    //           <p className="font-bold">Nombres</p>
    //           <input
    //             id="nombres"
    //             name="nombres"
    //             onChange={handleChange}
    //             type="text"
    //             className="form-control"
    //             placeholder="Carlos"
    //           />
    //         </label>
    //         <label className="d-block  mb-3" htmlFor="apellidos">
    //           <p className="font-bold">Apellidos</p>
    //           <input
    //             id="apellidos"
    //             name="apellidos"
    //             onChange={handleChange}
    //             type="text"
    //             className="form-control"
    //             placeholder="Angarita"
    //           />
    //         </label>
    //         <label className="d-block  mb-3" htmlFor="email">
    //           <p className="font-bold">Correo electrónico</p>
    //           <input
    //             id="email"
    //             name="email"
    //             onChange={handleChange}
    //             type="email"
    //             className="form-control"
    //             placeholder="ejemplo@ukulima.com"
    //           />
    //         </label>
    //         <label className="d-block  mb-3" htmlFor="password">
    //           <p className="font-bold">Contraseña</p>
    //           <input
    //             id="password"
    //             name="password"
    //             onChange={handleChange}
    //             type="password"
    //             className="form-control"
    //             placeholder="* * * * * * * * *"
    //           />
    //         </label>
    //       </Col>
    //       <Col md={6}>
    //         <label className="d-block  mb-3" htmlFor="telefono">
    //           <p className="font-bold">Teléfono</p>
    //           <input
    //             id="telefono"
    //             name="telefono"
    //             onChange={handleChange}
    //             type="text"
    //             className="form-control"
    //             placeholder="3101234567"
    //           />
    //         </label>
    //         <label className="d-block  mb-3" htmlFor="identificacion">
    //           <p className="font-bold">Identificación</p>
    //           <input
    //             id="identificacion"
    //             name="identificacion"
    //             onChange={handleChange}
    //             type="text"
    //             className="form-control"
    //             placeholder="1090444555"
    //           />
    //         </label>
    //         <label className="d-block  mb-3">
    //           <p className="font-bold">Tipo Identificación</p>
    //           <select
    //             name="idTipoIdentificacion"
    //             onChange={handleChange}
    //             type="text"
    //             className="form-select"
    //             placeholder="Angarita"
    //           >
    //             <option value="">Seleccionar...</option>
    //             <option value="1">Cédula de Ciudadanía</option>
    //           </select>
    //         </label>
    //         <label className="d-block  mb-3" htmlFor="fechaNacimiento">
    //           <p className="font-bold">Fecha de Nacimiento</p>
    //           <input
    //             id="fechaNacimiento"
    //             name="fechaNacimiento"
    //             onChange={handleChange}
    //             type="date"
    //             className="form-control"
    //             placeholder="1090444555"
    //           />
    //         </label>
    //       </Col>
    //       <Button
    //         onClick={() => {
    //           handleSave();
    //         }}
    //         className="col-6 mx-auto my-4 bg-green-600 hover:bg-green-700"
    //       >
    //         Continuar
    //       </Button>
    //       <p className=" text-center">
    //         Ya tengo cuenta
    //         <Link className="font-medium ml-2" to="/">
    //           Iniciar sesión
    //         </Link>
    //       </p>
    //     </Row>
    //   </Col>
    // </Row>
  );
};

export default Index;
