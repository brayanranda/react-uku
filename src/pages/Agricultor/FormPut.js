import React from "react";
import {
  Form,
  Label,
  Input,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Col,
  Card,
  CardBody,
  Button,
} from "reactstrap";

const FormPut = ({ onSubmit, data, setData, setIsFormPut, isFormPut }) => {
  
  const toggleFormPut = () => {
    setIsFormPut(!isFormPut);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <React.Fragment>
      <Offcanvas
        isOpen={isFormPut}
        direction="end"
        toggle={toggleFormPut}
      >
        <OffcanvasHeader toggle={toggleFormPut} className="w-full">
          <div className="text-center w-full">
            <h3>Agregar Agricultor</h3>
            <img
              className="mb-3 w-50"
              src="https://hensallco-op.ca/userContent/images/red-and-yellow-divider-576px.png"
              alt=""
            />
          </div>
        </OffcanvasHeader>
        <OffcanvasBody>
          <Card>
            <CardBody>
              <Form>
                <div className="row mb-4">
                  <Label className="col-sm-3 col-form-label">Apellidos</Label>
                  <Col sm={9}>
                    <input
                      type="text"
                      className="form-control col-lg-9"
                      name="apellidos"
                      onChange={handleChange}
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Label className="col-sm-3 col-form-label">
                    Fecha Nacimiento
                  </Label>
                  <Col sm={9}>
                    <input
                      type="date"
                      className="form-control col-lg-9"
                      name="fechaNacimiento"
                      onChange={handleChange}
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Label className="col-sm-3 col-form-label">
                    Identificacion
                  </Label>
                  <Col sm={9}>
                    <input
                      type="text"
                      className="form-control"
                      name="identificacion"
                      onChange={handleChange}
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Label
                    htmlFor="horizontal-password-Input"
                    className="col-sm-3 col-form-label"
                  >
                    Nombres
                  </Label>
                  <Col sm={9}>
                    <Input
                      name="nombres"
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Label
                    htmlFor="horizontal-password-Input"
                    className="col-sm-3 col-form-label"
                  >
                    Contraseña
                  </Label>
                  <Col sm={9}>
                    <Input
                      name="password"
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                    />
                  </Col>
                </div>

                <div className="row mb-4">
                  <Label
                    htmlFor="horizontal-password-Input"
                    className="col-sm-3 col-form-label"
                  >
                    Teléfono
                  </Label>
                  <Col sm={9}>
                    <Input
                      name="telefono"
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                    />
                  </Col>
                </div>
                <div className="row justify-content-end">
                  <Col sm={9}>
                    <div>
                      <Button
                        color="warning"
                        className="px-4 me-2"
                        onClick={() => {
                          onSubmit();
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={toggleFormPut}
                        color="primary"
                        className="w-md"
                      >
                        <i className="fas fa-window-close me-2"></i>
                        Cancel
                      </Button>
                    </div>
                  </Col>
                </div>
              </Form>
            </CardBody>
          </Card>
        </OffcanvasBody>
      </Offcanvas>
    </React.Fragment>
  );
};

export default FormPut;
