import React from "react";
import { Form, Label, Input, Col, CardBody, Modal } from "reactstrap";

const FormPost = ({
  onSubmit,
  data,
  setData,
  setIsFormPost,
  isFormPost,
  cultivos,
  densidades,
  claseTextural,
  profundidad,
  inputsStates,
  setInputsStates,
}) => {
  const toggleFormPost = () => {
    setInputsStates({});
    setIsFormPost(!isFormPost);
    removeBodyCss();
  };

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  const getCultivo = (value) => {
    let el = {};
    cultivos.forEach((element) => {
      if (element.idCultivo === value) {
        el = element;
      }
    });
    return el;
  };
  const getDensidad = (value) => {
    let el = {};
    densidades.forEach((element) => {
      if (element.idDensidad === value) {
        el = element;
      }
    });
    return el;
  };
  const getClaseTextural = (value) => {
    let el = {};
    claseTextural.forEach((element) => {
      if (element.idClaseTextural === value) {
        el = element;
      }
    });
    return el;
  };
  const getProfundidad = (value) => {
    let el = {};
    profundidad.forEach((element) => {
      if (element.idProfundidadMuestra === value) {
        el = element;
      }
    });
    return el;
  };
  const handleChange = (isValid, e) => {
    const { name, value } = e.target;
    if (name === "idCultivo") {
      setData({ ...data, [name]: getCultivo(Number(value)) });
      return;
    }
    if (name === "idDensidad") {
      setData({ ...data, [name]: getDensidad(Number(value)) });
      return;
    }
    if (name === "idClaseTextural") {
      setData({ ...data, [name]: getClaseTextural(Number(value)) });
      return;
    }
    if (name === "idProfundidad") {
      setData({ ...data, [name]: getProfundidad(Number(value)) });
      return;
    }
    if (
      name === "porcentArena" ||
      name === "porcentLimos" ||
      name === "porcentArcilla"
    ) {
      if (isValid) {
        setData({ ...data, [name]: Number(value) });
      } else {
        setData({ ...data, [name]: value });
      }
      setInputsStates({ ...inputsStates, [name]: isValid });
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
            Registrar Análisis Suelo
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
                <Label className="col-sm-3 col-form-label">
                  Clase Textural
                </Label>
                <Col sm={9}>
                  <select
                    type="select"
                    className="form-select"
                    name="idClaseTextural"
                    onChange={(e) => {handleChange(e.selectedIndex != 0, e)}}
                  >
                    <option value="">Seleccionar </option>
                    {claseTextural &&
                      claseTextural.map((tipo, index) => (
                        <option key={index} value={tipo.idClaseTextural}>
                          {tipo.nombre}
                        </option>
                      ))}
                  </select>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Cultivo</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    className="form-select"
                    name="idCultivo"
                    onChange={(e) => {handleChange(e.selectedIndex != 0, e)}}
                  >
                    <option value="">Seleccionar </option>
                    {cultivos &&
                      cultivos.map((tipo, index) => (
                        <option key={index} value={tipo.idCultivo}>
                          {tipo.descripcion}
                        </option>
                      ))}
                  </select>
                </Col>
              </div>
              <div className="row mb-4">
                <Label
                  htmlFor="horizontal-password-Input"
                  className="col-sm-3 col-form-label"
                >
                  Porcentaje de Arena
                </Label>
                <Col sm={9}>
                  <Input
                    invalid={inputsStates.porcentArena === false}
                    name="porcentArena"
                    onChange={(e) =>
                      handleChange(
                        e.target.value.match(/^[0-9]+$/) !== null &&
                          e.target.value.length < 4 &&
                          e.target.value.length > 0,
                        e
                      )
                    }
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
                  Porcentaje de Limos
                </Label>
                <Col sm={9}>
                  <Input
                    invalid={inputsStates.porcentLimos === false}
                    name="porcentLimos"
                    onChange={(e) =>
                      handleChange(
                        e.target.value.match(/^[0-9]+$/) !== null &&
                          e.target.value.length < 4 &&
                          e.target.value.length > 0,
                        e
                      )
                    }
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
                  Porcentaje de Arcilla
                </Label>
                <Col sm={9}>
                  <Input
                    invalid={inputsStates.porcentArcilla === false}
                    name="porcentArcilla"
                    onChange={(e) =>
                      handleChange(
                        e.target.value.match(/^[0-9]+$/) !== null &&
                          e.target.value.length < 4 &&
                          e.target.value.length > 0,
                        e
                      )
                    }
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
                  Fecha
                </Label>
                <Col sm={9}>
                  <Input
                    name="fecha"
                    onChange={e => {
                      handleChange(
                        e.target.value.match(
                          /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/
                        ) !== null
                          ? true
                          : false,
                        e
                      )
                    }}
                    type="date"
                    className="form-control"
                  />
                </Col>
              </div>

              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Densidad</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    className="form-select"
                    name="idDensidad"
                    onChange={(e) => {handleChange(e.selectedIndex != 0, e)}}
                  >
                    <option value="">Seleccionar </option>
                    {densidades &&
                      densidades.map((tipo, index) => (
                        <option key={index} value={tipo.idDensidad}>
                          {tipo.valor}
                        </option>
                      ))}
                  </select>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Profundidad</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    className="form-select"
                    name="idProfundidad"
                    onChange={(e) => {handleChange(e.selectedIndex != 0, e)}}
                  >
                    <option value="">Seleccionar </option>
                    {profundidad &&
                      profundidad.map((tipo, index) => (
                        <option key={index} value={tipo.idProfundidadMuestra}>
                          {tipo.profundidad}
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
