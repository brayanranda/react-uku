import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, Col, Row } from "reactstrap";
import { Image } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import logo from "../../assets/images/logo-vertical.png";
import { Toaster } from "react-hot-toast";
export const RegisterPage = () => {
  const { createUser, isLogged } = useContext(AuthContext);
  const { formState, onInputChange, onResetForm } = useForm({
    nombres: "",
    apellidos: "",
    email: "",
    password: "",
    identificacion: "",
    idTipoIdentificacion: "",
    confirmationToken: "",
    estado: false,
    fechaNacimiento: "",
    telefono: "",
  });
  const navigate = useNavigate();
  const onRegister = async (event) => {
    event.preventDefault();
    const data = {
      ...formState,
      identificacion: Number(formState.identificacion),
      idTipoIdentificacion: {
        idTipo: Number(formState.idTipoIdentificacion),
        nombre: "CC",
        agricultorCollection: null,
      },
      estado: false,
      confirmationToken: "",
    };
    await createUser(data);
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
      <div>
        <Toaster />
      </div>
      <Col lg={8} xl={6} className="bg-white p-3 p-md-5 rounded-3">
        <Image src={logo} width={120} className="mx-auto" alt="" />
        <h4 className=" text-center mt-3 mb-4 text-2xl font-medium">
          Registrar usuario
        </h4>
        <form onSubmit={onRegister}>
          <Row>
            <Col md={6}>
              <label className="d-block  mb-3" htmlFor="nombres">
                <p className="font-bold">Nombres</p>
                <input
                  name="nombres"
                  onChange={onInputChange}
                  value={formState.nombres}
                  type="text"
                  className="form-control"
                  placeholder="Carlos"
                  required
                />
              </label>
              <label className="d-block  mb-3" htmlFor="apellidos">
                <p className="font-bold">Apellidos</p>
                <input
                  name="apellidos"
                  value={formState.apellidos}
                  onChange={onInputChange}
                  type="text"
                  className="form-control"
                  required
                  placeholder="Angarita"
                />
              </label>
              <label className="d-block  mb-3" htmlFor="email">
                <p className="font-bold">Correo electrónico</p>
                <input
                  name="email"
                  value={formState.email}
                  onChange={onInputChange}
                  type="email"
                  className="form-control"
                  required
                  placeholder="ejemplo@ukulima.com"
                />
              </label>
              <label className="d-block  mb-3" htmlFor="password">
                <p className="font-bold">Contraseña</p>
                <input
                  name="password"
                  value={formState.password}
                  onChange={onInputChange}
                  type="password"
                  className="form-control"
                  required
                  placeholder="* * * * * * * * *"
                />
              </label>
            </Col>
            <Col md={6}>
              <label className="d-block  mb-3" htmlFor="telefono">
                <p className="font-bold">Teléfono</p>
                <input
                  name="telefono"
                  value={formState.telefono}
                  onChange={onInputChange}
                  type="text"
                  className="form-control"
                  required
                  placeholder="3101234567"
                />
              </label>
              <label className="d-block  mb-3" htmlFor="identificacion">
                <p className="font-bold">Identificación</p>
                <input
                  name="identificacion"
                  value={formState.identificacion}
                  onChange={onInputChange}
                  type="text"
                  className="form-control"
                  required
                  placeholder="1090444555"
                />
              </label>
              <label className="d-block  mb-3">
                <p className="font-bold">Tipo Identificación</p>
                <select
                  name="idTipoIdentificacion"
                  value={formState.idTipoIdentificacion}
                  onChange={onInputChange}
                  type="text"
                  className="form-select"
                  required
                  placeholder="Angarita"
                >
                  <option value="">Seleccionar...</option>
                  <option value="1">Cédula de Ciudadanía</option>
                </select>
              </label>
              <label className="d-block  mb-3" htmlFor="fechaNacimiento">
                <p className="font-bold">Fecha de Nacimiento</p>
                <input
                  name="fechaNacimiento"
                  value={formState.fechaNacimiento}
                  onChange={onInputChange}
                  type="date"
                  className="form-control"
                  required
                  placeholder="1090444555"
                />
              </label>
            </Col>
            <Button
              type="submit"
              className="col-6 mx-auto my-4 bg-green-600 hover:bg-green-700"
            >
              Continuar
            </Button>
            <p className=" text-center">
              Ya tengo cuenta
              <Link className="font-medium ml-2" to="/login">
                Iniciar sesión
              </Link>
            </p>
          </Row>
        </form>
      </Col>
    </Row>
  );
};
