import React from "react";
import { Form, Label, Input, Col, CardBody, Modal } from "reactstrap";

const FormPut = ({
  onSubmit,
  data,
  setData,
  setIsFormPut,
  isFormPut,
  distanciaSiembras,
  etapasFenologicas,
  fincas,
  variedades,
  topografias,
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
            Editar Cultivo
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
                  Descripción
                </Label>
                <Col sm={9}>
                  <Input
                    name="descripcion"
                    value={data.descripcion}
                    onChange={handleChange}
                    type="textarea"
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label
                  htmlFor="horizontal-password-Input"
                  className="col-sm-3 col-form-label"
                >
                  Plantas por Hectárea
                </Label>
                <Col sm={9}>
                  <Input
                    name="plantasPorHectarea"
                    value={data.plantasPorHectarea}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">
                  Distancia Siembra
                </Label>
                <Col sm={9}>
                  <select
                    type="select"
                    className="form-select"
                    name="idDistanciaSiembra"
                    value={data.idDistanciaSiembra.id}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar </option>
                    {distanciaSiembras &&
                      distanciaSiembras.map((tipo, index) => (
                        <option key={index} value={tipo.id}>
                          {tipo.descripcion}
                        </option>
                      ))}
                  </select>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">
                  Etapa Fenológica
                </Label>
                <Col sm={9}>
                  <select
                    type="select"
                    className="form-select"
                    name="idEtapaFenologica"
                    value={data.idEtapaFenologica.id}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar </option>
                    {etapasFenologicas &&
                      etapasFenologicas.map((tipo, index) => (
                        <option key={index} value={tipo.id}>
                          {tipo.descripcion}
                        </option>
                      ))}
                  </select>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Finca</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    className="form-select"
                    name="idFinca"
                    value={data.idFinca.idFinca}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar </option>
                    {fincas &&
                      fincas.map((tipo, index) => (
                        <option key={index} value={tipo.idFinca}>
                          {tipo.nombre}
                        </option>
                      ))}
                  </select>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Topografía</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    className="form-select"
                    name="idTopografia"
                    value={data.idTopografia.id}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar </option>
                    {topografias &&
                      topografias.map((tipo, index) => (
                        <option key={index} value={tipo.id}>
                          {tipo.descripcion}
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
                    className="form-select"
                    name="idVariedad"
                    value={data.idVariedad.id}
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
