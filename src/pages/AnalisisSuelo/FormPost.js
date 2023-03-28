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
  let inputs = [
    "porcentArena",
    "porcentLimos",
    "porcentArcilla",
    "phSuelo",
    "conductividadElectrica",
    "intercambioCationico",
  ];
  const inRange = (range, value) => value >= range[1] && value <= range[0];
  const ranges = {
    1: {
      arena: [100, 85],
      limo: [15, 0],
      arcilla: [10, 0],
    },
    2: {
      arena: [90, 70],
      limo: [30, 0],
      arcilla: [15, 0],
    },
    11: {
      arena: [85, 43],
      limo: [50, 0],
      arcilla: [20, 0],
    },
    3: {
      arena: [52, 23],
      limo: [50, 32],
      arcilla: [27, 7],
    },
    4: {
      arena: [50, 0],
      limo: [87, 50],
      arcilla: [27, 0],
    },
    5: {
      arena: [20, 0],
      limo: [100, 80],
      arcilla: [12, 0],
    },
    6: {
      arena: [80, 45],
      limo: [28, 0],
      arcilla: [35, 20],
    },
    10: {
      arena: [45, 20],
      limo: [53, 15],
      arcilla: [40, 27],
    },
    7: {
      arena: [20, 0],
      limo: [73, 40],
      arcilla: [40, 27],
    },
    8: {
      arena: [67, 45],
      limo: [20, 0],
      arcilla: [55, 35],
    },
    12: {
      arena: [20, 0],
      limo: [60, 40],
      arcilla: [60, 40],
    },
    9: {
      arena: [45, 0],
      limo: [40, 0],
      arcilla: [100, 40],
    },
  };
  const toggleFormPost = () => {
    setInputsStates({});
    setIsFormPost(!isFormPost);
    removeBodyCss();
  };

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const handleChange = (isValid, e) => {
    const { name, value } = e.target;
    if (name === "idCultivo") {
      setData({ ...data, [name]: { idCultivo: Number(value) } });
      return;
    }
    if (name === "idDensidad") {
      setData({ ...data, [name]: { idDensidad: Number(value) } });
      return;
    }
    if (name === "idClaseTextural") {
      setData({ ...data, [name]: { idClaseTextural: Number(value) } });
      return;
    }
    if (name === "idProfundidad") {
      setData({ ...data, [name]: { idProfundidadMuestra: Number(value) } });
      return;
    }
    if (inputs.includes(name)) {
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
                    onChange={(e) => {
                      handleChange(e.selectedIndex != 0, e);
                    }}
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
                    onChange={(e) => {
                      handleChange(e.selectedIndex != 0, e);
                    }}
                  >
                    <option value="">Seleccionar </option>
                    {cultivos &&
                      cultivos.map((tipo, index) => (
                        <option key={index} value={tipo.idCultivo}>
                          {tipo.idCultivo}
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
                          inRange(
                            ranges[data.idClaseTextural.idClaseTextural].arena,
                            e.target.value
                          ),
                        e
                      )
                    }
                    type="text"
                    className="form-control"
                  />
                  {inputsStates.porcentArena === false ? (
                    <p>
                      Por favor ingrese un valor entre{" "}
                      {ranges[data.idClaseTextural.idClaseTextural].arena.join(
                        " - "
                      )}
                    </p>
                  ) : null}
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
                          inRange(
                            ranges[data.idClaseTextural.idClaseTextural].limo,
                            e.target.value
                          ),
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
                          inRange(
                            ranges[data.idClaseTextural.idClaseTextural]
                              .arcilla,
                            e.target.value
                          ),
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
                  PH Suelo
                </Label>
                <Col sm={9}>
                  <Input
                    invalid={inputsStates.phSuelo === false}
                    name="phSuelo"
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
                  Conductividad Electrica
                </Label>
                <Col sm={9}>
                  <Input
                    invalid={inputsStates.conductividadElectrica === false}
                    name="conductividadElectrica"
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
                  Intercambio Cationico
                </Label>
                <Col sm={9}>
                  <Input
                    invalid={inputsStates.intercambioCationico === false}
                    name="intercambioCationico"
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
                    onChange={(e) => {
                      handleChange(
                        e.target.value.match(
                          /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/
                        ) !== null
                          ? true
                          : false,
                        e
                      );
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
                    onChange={(e) => {
                      handleChange(e.selectedIndex != 0, e);
                    }}
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
                    onChange={(e) => {
                      handleChange(e.selectedIndex != 0, e);
                    }}
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
