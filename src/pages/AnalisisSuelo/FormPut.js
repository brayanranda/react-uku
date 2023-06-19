import React from "react";
import { Form, Label, Input, Col, CardBody, Modal, Row } from "reactstrap";
import { inputs, ranges, inRange } from "../../utils/ranges.utils";

const FormPut = ({
  data,
  setData,
  onSubmit,
  cultivos,
  isFormPut,
  densidades,
  profundidad,
  setIsFormPut,
  inputsStates,
  claseTextural,
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
        toggle={() => { toggleFormPut() }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Editar Análisis Suelo</h5>
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
              <Row>
                <Col md={6}>
                  <Label className="col-form-label">Aluminio Intercambiable</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      className="form-control"
                      name="aluminioIntercambiable"
                      invalid={inputsStates.aluminioIntercambiable === false}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <Label className="col-form-label">Materia Organica</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      name="materiaOrganica"
                      className="form-control"
                      invalid={inputsStates.materiaOrganica === false}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Label className="col-sm-3 col-form-label">Cultivo</Label>
                  <div className="w-100">
                    <select
                      type="select"
                      className="form-select"
                      name="idCultivo"
                      value={data?.idCultivo?.idCultivo}
                      onChange={(e) => { handleChange(e.selectedIndex != 0, e) }}
                    >
                      <option value="">Seleccionar </option>
                      {cultivos && cultivos.length > 0 &&
                        cultivos.map((tipo, index) => (
                          <option key={index} value={tipo.idCultivo}>
                            {tipo.descripcion}
                          </option>
                        ))}
                    </select>
                  </div>
                </Col>
                <Col md={6}>
                  <Label className="col-sm-3 col-form-label">Fecha</Label>
                  <div className="w-100">
                    <Input
                      type="date"
                      name="fecha"
                      value={data.fecha}
                      className="form-control"
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
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col xs={4}>
                  <Label className="col-form-label">% Arena</Label>
                  <div className="w-100">
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
                        {ranges[data.idClaseTextural.idClaseTextural].arena.join(" - ")}
                      </p>
                    ) : null}
                  </div>
                </Col>
                <Col xs={4}>
                  <Label className="col-form-label">% Limos</Label>
                  <div className="w-100">
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
                        {ranges[data.idClaseTextural.idClaseTextural].limo.join(" - ")}
                      </p>
                    ) : null}
                  </div>
                </Col>
                <Col xs={4}>
                  <Label className="col-form-label">% Arcilla</Label>
                  <div className="w-100">
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
                  </div>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col md={4}>
                  <Label className="col-form-label">PH Suelo</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      value={data.phSuelo}
                      className="form-control"
                      invalid={inputsStates.phSuelo === false}
                      name="phSuelo"
                      onChange={(e) =>
                        handleChange(
                          e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null &&
                            e.target.value.length > 0,
                          e
                        )
                      }
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <Label className="col-form-label">Conductividad Electrica</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      className="form-control"
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
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <Label className="col-form-label">Intercambio Cationico</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      className="form-control"
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
                    />
                  </div>
                </Col>
              </Row>
              
              <Row className="mt-2">
                <Col md={6}>
                  <Label className="col-form-label">Densidad</Label>
                  <div className="w-100">
                    <select
                      type="select"
                      className="form-select"
                      name="idDensidad"
                      value={data?.idDensidad?.idDensidad}
                      onChange={(e) => { handleChange(e.selectedIndex != 0, e) }}
                    >
                      <option value="">Seleccionar </option>
                      {densidades && densidades.length > 0 &&
                        densidades.map((tipo, index) => (
                          <option key={index} value={tipo.idDensidad}>
                            {tipo.valor}
                          </option>
                        ))}
                    </select>
                  </div>
                </Col>
                <Col md={6}>
                  <Label className="col-form-label">Profundidad</Label>
                  <div className="w-100">
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
                      {profundidad && profundidad.length > 0 &&
                        profundidad.map((tipo, index) => (
                          <option key={index} value={tipo.idProfundidadMuestra}>
                            {tipo.profundidad}
                          </option>
                        ))}
                    </select>
                  </div>                  
                </Col>
              </Row>

              <Row>
                <Col xs={4}>
                  <Label className="col-form-label">Fosforo</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      name="fosforo"
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col xs={4}>
                  <Label className="col-form-label">Potasio</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      name="potasio"
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col xs={4}>
                  <Label className="col-sm-3 col-form-label">Magnesio</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      name="magnesio"
                      className="form-control"
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xs={4}>
                  <Label className="col-sm-3 col-form-label">Calcio</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      name="calcio"
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col xs={4}>
                  <Label className="col-sm-3 col-form-label">Azufre</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      name="azufre"
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col xs={4}>
                  <Label className="col-sm-3 col-form-label">Sodio</Label>
                  <div className="w-100">
                    <Input
                      name="sodio"
                      type="text"
                      className="form-control"
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col XS={4}>
                  <Label className="col-sm-3 col-form-label">Boro</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      name="boro"
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col XS={4}>
                  <Label className="col-sm-3 col-form-label">Cobre</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      name="azufre"
                      className="form-control"
                    />
                  </div>
                </Col>
              </Row>

              <div className="flex items-center gap-1 mt-4">
                <button
                  type="button"
                  onClick={() => { onSubmit() }}
                  className="bg-green-700 rounded-md text-white hover:bg-green-700 px-4"
                >
                  Save
                </button>
                <button onClick={toggleFormPut} className="bg-gray-300 rounded-md hover:bg-gray-300">Cancel</button>
              </div>
            </Form>
          </CardBody>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default FormPut;
