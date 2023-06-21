import React from "react";
import { Form, Label, Input, Col, CardBody, Modal } from "reactstrap";

const FormPut = ({
  onSubmit,
  data,
  setData,
  setIsFormPut,
  isFormPut,
  elementos,
  variedades,
}) => {
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
          <h5 className="modal-title mt-0 text-xl font-medium">
            Editar Análisis Elemento
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
          <CardBody className="p-0 md:p-3">
            <Form className="row">
              <div className="row mb-4">
                <Label
                  htmlFor="horizontal-password-Input"
                  className="col-sm-3 col-form-label"
                >
                  nombre
                </Label>
                <Col sm={9}>
                  <Input
                    name="nombre"
                    onChange={handleChange}
                    type="text"
                    value={data.nombre}
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label
                  htmlFor="horizontal-password-Input"
                  className="col-sm-3 col-form-label"
                >
                  valor minimo
                </Label>
                <Col sm={9}>
                  <Input
                    name="valorMinimo"
                    onChange={handleChange}
                    value={data.valorMinimo}
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
                  valor maximo
                </Label>
                <Col sm={9}>
                  <Input
                    name="valorMaximo"
                    onChange={handleChange}
                    value={data.valorMaximo}
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
                  valor optimo
                </Label>
                <Col sm={9}>
                  <Input
                    name="valorOptimo"
                    value={data.valorOptimo}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Elemento</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    className="form-select"
                    value={data.idElemento.id}
                    name="idElemento"
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar </option>
                    {elementos &&
                      elementos.map((tipo, index) => (
                        <option key={index} value={tipo.id}>
                          {tipo.nombre}
                        </option>
                      ))}
                  </select>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Variedad</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    value={data.idVariedad.id}
                    className="form-select"
                    name="idVariedad"
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar </option>
                    {variedades &&
                      variedades.map((tipo, index) => (
                        <option key={index} value={tipo.id}>
                          {tipo.descripcion}
                        </option>
                      ))}
                  </select>
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
                      onClick={toggleFormPost}
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
