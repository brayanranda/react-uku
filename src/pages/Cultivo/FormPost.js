import React from "react";
import { Form, Label, Input, Col, CardBody, Modal } from "reactstrap";

const FormPost = ({
  onSubmit,
  data,
  setData,
  setIsFormPost,
  isFormPost,
  distanciaSiembras,
  etapasFenologicas,
  fincas,
  variedades,
  topografias,
}) => {
  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
    removeBodyCss();
  };

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  const getDistanciaSiembras = (value) => {
    let el = {};
    distanciaSiembras.forEach((element) => {
      if (element.id === value) {
        el = element;
      }
    });
    return el;
  };
  const getEtapasFenologicas = (value) => {
    let el = {};
    etapasFenologicas.forEach((element) => {
      if (element.id === value) {
        el = element;
      }
    });
    return el;
  };
  const getFincas = (value) => {
    let el = {};
    fincas.forEach((element) => {
      if (element.idFinca === value) {
        el = element;
      }
    });
    return el;
  };
  const getTopografias = (value) => {
    let el = {};
    topografias.forEach((element) => {
      if (element.id === value) {
        el = element;
      }
    });
    return el;
  };
  const getVariedades = (value) => {
    let el = {};
    variedades.forEach((element) => {
      if (element.id === value) {
        el = element;
      }
    });
    return el;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "idDistanciaSiembra") {
      setData({ ...data, [name]: getDistanciaSiembras(Number(value)) });
      return;
    }
    if (name === "idEtapaFenologica") {
      setData({ ...data, [name]: getEtapasFenologicas(Number(value)) });
      return;
    }
    if (name === "idFinca") {
      setData({ ...data, [name]: getFincas(Number(value)) });
      return;
    }
    if (name === "idTopografia") {
      setData({ ...data, [name]: getTopografias(Number(value)) });
      return;
    }
    if (name === "idVariedad") {
      setData({ ...data, [name]: getVariedades(Number(value)) });
      return;
    }
    setData({ ...data, [name]: value });
  };

  return (
    <React.Fragment>
      <Modal
        size="lg"
        isOpen={isFormPost}
        toggle={() => {
          toggleFormPost();
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">
            Registrar Cultivo
          </h5>
          <button
            onClick={() => {
              setIsFormPost(false);
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
                  Plantas por Hectarea
                </Label>
                <Col sm={9}>
                  <Input
                    name="plantasPorHectarea"
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
                  Etapa Fenologica
                </Label>
                <Col sm={9}>
                  <select
                    type="select"
                    className="form-select"
                    name="idEtapaFenologica"
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
                <Label className="col-sm-3 col-form-label">Topografia</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    className="form-select"
                    name="idTopografia"
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
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="bg-green-700 rounded-md text-white hover:bg-green-700 px-4"
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

export default FormPost;
