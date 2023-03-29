import React from "react";
import { Form, Label, Input, Col, CardBody, Modal } from "reactstrap";
import { inputs, ranges, inRange } from "../../utils/ranges.utils";

const FormPut = ({
  onSubmit,
  data,
  setData,
  setIsFormPut,
  isFormPut,
  cultivos,
  densidades,
  claseTextural,
  profundidad,
  inputsStates,
  setInputsStates,
}) => {
  const toggleFormPut = () => {
    setInputsStates({});
    setIsFormPut(!isFormPut);
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
        isOpen={isFormPut}
        toggle={() => {
          toggleFormPut();
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">
            Editar Análisis Suelo
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
                <Label className="col-sm-3 col-form-label">
                  Clase Textural
                </Label>
                <Col sm={9}>
                  <select
                    type="select"
                    className="form-select"
                    name="idClaseTextural"
                    value={data.idClaseTextural.idClaseTextural}
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
                    value={data.idCultivo.idCultivo}
                    onChange={(e) => {
                      handleChange(e.selectedIndex != 0, e);
                    }}
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
                    value={data.porcentArena}
                    onChange={(e) =>
                      handleChange(
                        e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null &&
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
                    value={data.porcentLimos}
                    onChange={(e) =>
                      handleChange(
                        e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null &&
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
                  {inputsStates.porcentLimos === false ? (
                    <p>
                      Por favor ingrese un valor entre{" "}
                      {ranges[data.idClaseTextural.idClaseTextural].limo.join(
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
                  Porcentaje de Arcilla
                </Label>
                <Col sm={9}>
                  <Input
                    invalid={inputsStates.porcentArcilla === false}
                    name="porcentArcilla"
                    value={data.porcentArcilla}
                    onChange={(e) =>
                      handleChange(
                        e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null &&
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
                  {inputsStates.porcentArcilla === false ? (
                    <p>
                      Por favor ingrese un valor entre{" "}
                      {ranges[
                        data.idClaseTextural.idClaseTextural
                      ].arcilla.join(" - ")}
                    </p>
                  ) : null}
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
                    value={data.phSuelo}
                    invalid={inputsStates.phSuelo === false}
                    name="phSuelo"
                    onChange={(e) =>
                      handleChange(
                        e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null &&
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
                    value={data.conductividadElectrica}
                    invalid={inputsStates.conductividadElectrica === false}
                    name="conductividadElectrica"
                    onChange={(e) =>
                      handleChange(
                        e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null &&
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
                    value={data.intercambioCationico}
                    invalid={inputsStates.intercambioCationico === false}
                    name="intercambioCationico"
                    onChange={(e) =>
                      handleChange(
                        e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null &&
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
                    value={data.fecha}
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
                    value={data.idDensidad.idDensidad}
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
                    value={data.idProfundidad.idProfundidadMuestra}
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
