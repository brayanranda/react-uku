import React from "react";
import { Form, Label, Input, Col, CardBody, Modal } from "reactstrap";

const FormPut = ({ onSubmit, data, setData, setIsFormPut, isFormPut }) => {
  const toggleFormPut = () => {
    setIsFormPut(!isFormPut);
    removeBodyCss();
  };

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <React.Fragment>
      <Modal
        size="lg"
        isOpen={isFormPut}
        toggle={() => {
          toggleFormPut();
        }}
      >
        <div className="modal-header">
          <h5
            className="modal-title mt-0 text-xl font-medium"
            id="myLargeModalLabel"
          >
            Editar Agricultor
          </h5>
          <button
            onClick={() => {
              setIsFormPut(false);
            }}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <CardBody>
            <Form className="row">
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
                    value={data.nombres}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Apellidos</Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    className="form-control col-lg-9"
                    name="apellidos"
                    value={data.apellidos}
                    onChange={handleChange}
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">
                  Fecha Nacimiento
                </Label>
                <Col sm={9}>
                  <Input
                    type="date"
                    className="form-control col-lg-9"
                    name="fechaNacimiento"
                    value={data.fechaNacimiento}
                    onChange={handleChange}
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">
                  Identificación
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    className="form-control"
                    name="identificacion"
                    value={data.identificacion}
                    onChange={handleChange}
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
                    value={data.telefono}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row justify-content-end">
                <Col sm={9}>
                  <div>
                    <button
                      type="button"
                      className="bg-green-700 rounded-md text-white hover:bg-green-700 px-4 me-2"
                      onClick={() => {
                        onSubmit();
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={toggleFormPut}
                      className="bg-gray-300 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </Col>
              </div>
            </Form>
          </CardBody>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default FormPut;
