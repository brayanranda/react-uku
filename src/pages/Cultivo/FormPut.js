import React from "react";
import { Form, Label, Input, Col, CardBody, Modal } from "reactstrap";

const FormPut = ({
  data,
  fincas,
  setData,
  onSubmit,
  isFormPut,
  variedades,
  topografias,
  setIsFormPut,
  distanciaSiembras,
  etapasFenologicas,
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
        toggle={() => { toggleFormPut() }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Editar Cultivo</h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            data-dismiss="modal"
            onClick={() => { setIsFormPut(false) }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <CardBody>
            <Form className="row">
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Descripción</Label>
                <Col sm={9}>
                  <Input
                    type="textarea"
                    name="descripcion"
                    value={data.descripcion}
                    onChange={handleChange}
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Plantas por Hectárea</Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                    name="plantasPorHectarea"
                    value={data.plantasPorHectarea}
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Distancia Siembra</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    onChange={handleChange}
                    className="form-select"
                    name="idDistanciaSiembra"
                    value={data.idDistanciaSiembra.id}
                  >
                    <option value="">Seleccionar </option>
                    {distanciaSiembras && distanciaSiembras.length > 0 &&
                      distanciaSiembras.map((tipo, index) => (
                        <option key={index} value={tipo.id}>{tipo.descripcion}</option>
                      ))}
                  </select>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Etapa Fenológica</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    onChange={handleChange}
                    className="form-select"
                    name="idEtapaFenologica"
                    value={data.idEtapaFenologica.id}
                  >
                    <option value="">Seleccionar </option>
                    {etapasFenologicas && etapasFenologicas.length > 0 &&
                      etapasFenologicas.map((tipo, index) => (
                        <option key={index} value={tipo.id}>{tipo.descripcion}</option>
                      ))}
                  </select>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Finca</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    name="idFinca"
                    className="form-select"
                    onChange={handleChange}
                    value={data?.idFinca?.idFinca}
                  >
                    <option value="">Seleccionar </option>
                    {fincas && fincas.length > 0 &&
                      fincas.map((tipo, index) => (
                        <option key={index} value={tipo.idFinca}>{tipo.nombre}</option>
                      ))}
                  </select>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Topografía</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    name="idTopografia"
                    className="form-select"
                    onChange={handleChange}
                    value={data.idTopografia.id}
                  >
                    <option value="">Seleccionar </option>
                    {topografias && topografias.length > 0 &&
                      topografias.map((tipo, index) => (
                        <option key={index} value={tipo.id}>{tipo.descripcion}</option>
                      ))}
                  </select>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Variedad</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    name="idVariedad"
                    className="form-select"
                    onChange={handleChange}
                    value={data.idVariedad.id}
                  >
                    <option value="">Seleccionar </option>
                    {variedades && variedades.length > 0 &&
                      variedades.map((tipo, index) => (
                        <option key={index} value={tipo.id}>{tipo.descripcion}</option>
                      ))}
                  </select>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Rendimiento (Ton/ha)</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    name="idVariedad"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar </option>
                    {
                      [...Array(8)].map((e, x) => 
                        <option>{x+3}</option>
                      )
                    }
                  </select>
                </Col>
              </div>
              <div className="row justify-content-end">
                <Col sm={9}>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="bg-green-700 rounded-md text-white hover:bg-green-700 px-4"
                      onClick={() => { onSubmit() }}
                    >
                      Save
                    </button>
                    <button onClick={toggleFormPut} className="bg-gray-300 rounded-md hover:bg-gray-300" >Cancel</button>
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
