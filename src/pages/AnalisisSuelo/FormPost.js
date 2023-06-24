import React, { useContext, useEffect } from "react";
import { Form, Label, Input, Col, CardBody, Modal, Row } from "reactstrap";
import { inputs, validarTerreno } from "../../utils/ranges.utils";
import { Toaster, toast } from "react-hot-toast";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import SuelosContext from "../../context/SuelosContext";

const FormPost = ({
  data,
  setData,
  onSubmit,
  cultivosBySuelo,
  isFormPost,
  profundidad,
  inputsStates,
  setIsFormPost,
  setInputsStates,
}) => {
  let { idLote } = useParams()
  const { getSuelos, suelos } = useContext(SuelosContext)

  useEffect(() => {
    if(idLote && idLote !== "") {
      getSuelos(idLote)
    }
  }, [idLote])

  const toggleFormPost = () => {
    setInputsStates({});
    setIsFormPost(!isFormPost);
  }

  const handleChange = (isValid, e) => {
    const { name, value } = e.target;
    if (name === "idCultivo") {
      setData({ ...data, [name]: { idCultivo: Number(value) } });
      return;
    }
    if (name === "idDensidad") {
      setData({ ...data, [name]: Number(value) });
      return;
    }
    if (name === "idProfundidad") {
      setData({ ...data, [name]: { idProfundidadMuestra: Number(value) } });
      return;
    }
    if (name === "idSuelo") {
      setData({ ...data, [name]: { id: Number(value) } });
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
  }

  const handleElement = (element, value) => {
    setData((prevState) => {
      const copyState = { ...prevState };
      copyState.analisisElementoCollection[element].valor = Number(value);
      return { ...copyState };
    });
  }

  return (
    <React.Fragment>
      <Modal
        size="lg"
        isOpen={isFormPost}
        toggle={() => { toggleFormPost() }}
      >
        <Toaster />
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Registrar Análisis Suelo</h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            data-dismiss="modal"
            onClick={() => { setIsFormPost(false)}}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <CardBody className="p-0 md:p-3">
            <Form className="row">
              <Row>
                <Col md={4}>
                  {
                    suelos && suelos.length > 0 &&
                      <>
                        <Label className="col-form-label">Suelo del lote</Label>
                        <div className="w-100">
                          <select
                            type="select"
                            name="idSuelo"
                            className="form-select"
                            onChange={(e) => {handleChange(e.selectedIndex != 0, e)}}
                          >
                            <option value="" hidden>Seleccionar </option>
                            {
                              suelos && suelos.length > 0 ?
                                suelos.map((suelo, index) => 
                                  <option key={index} value={suelo.id}>{suelo.descripcion}</option>
                                )
                                : <option>No se encontraron suelos.</option>
                            }
                          </select>
                        </div>  
                      </>
                  }
                </Col>
                <Col md={4}>
                  <Label className="col-form-label">Cultivo</Label>
                  <div className="w-100">
                    <select
                      type="select"
                      name="idCultivo"
                      className="form-select"
                      onChange={(e) => {
                        handleChange(e.selectedIndex != 0, e);
                      }}
                    >
                      <option value="" hidden>Seleccionar </option>
                      {cultivosBySuelo && cultivosBySuelo.length > 0 ?
                        cultivosBySuelo.map((cultivo, index) => (
                          <option key={index} value={cultivo.idCultivo}>{cultivo.descripcion}</option>
                        )) : <option disabled="false">No hay cultivos en el suelo.</option>
                      }
                    </select>
                  </div>
                </Col>
                <Col md={4}>
                    <Label className="col-form-label">Fecha</Label>
                    <div className="w-100">
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
                    </div>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Label className="col-form-label">Densidad aparente del suelo (opcional)</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      className="form-control"
                      name="idDensidad"
                      onChange={e => handleChange(e.target.value.length > 4, e)}
                    />
                  </div>
                </Col>
                <Col md={6}>
                    <Label className="col-form-label">Profundidad de muestreo</Label>
                    <div className="w-100">
                      <select
                        type="select"
                        className="form-select"
                        name="idProfundidad"
                        onChange={(e) => {
                          handleChange(e.selectedIndex != 0, e);
                        }}
                      >
                        <option value="" hidden>Seleccionar </option>
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

              <Row className="mt-2">
                <Col xs={4}>
                  <Label className="col-form-label">% Arena</Label>
                  <div className="w-100">
                    <Input
                      invalid={inputsStates.porcentArena === false}
                      name="porcentArena"
                      onChange={(e) =>
                        handleChange(
                          e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null,
                          e
                        )
                      }
                      type="text"
                      className="form-control"
                    />
                    {inputsStates.porcentArena === false ? (
                      <p>Por favor ingrese un valor valido</p>
                    ) : null}
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="row mb-4">
                    <Label className="col-form-label">% Limos</Label>
                    <div className="w-100">
                      <Input
                        invalid={inputsStates.porcentLimos === false}
                        name="porcentLimos"
                        onChange={(e) =>
                          handleChange(
                            e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null,
                            e
                          )
                        }
                        type="text"
                        className="form-control"
                      />
                      {inputsStates.porcentLimos === false ? (
                        <p>Por favor ingrese un valor valido</p>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <Label className="col-form-label">% Arcilla</Label>
                  <div className="w-100">
                    <Input
                      invalid={inputsStates.porcentArcilla === false}
                      name="porcentArcilla"
                      onChange={(e) =>
                        handleChange(
                          e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null,
                          e
                        )
                      }
                      type="text"
                      className="form-control"
                    />
                    {inputsStates.porcentArcilla === false ? (
                      <p>Por favor ingrese un valor valido</p>
                    ) : null}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={3}>
                  <Label className="col-form-label">pH Suelo</Label>
                  <div className="w-100">
                    <Input
                      invalid={inputsStates.phSuelo === false}
                      name="phSuelo"
                      onChange={(e) =>
                        handleChange(
                          e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null &&
                            e.target.value.length > 0,
                          e
                        )
                      }
                      type="number"
                      min="0" max="14"
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col md={3}>
                  <Label className="col-form-label">Conductividad Electrica</Label>
                  <div className="w-100">
                    <Input
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
                  </div>
                </Col>
                <Col md={6}>
                  <Label className="col-form-label">Capacidad de Intercambio Cationico</Label>
                  <div className="w-100">
                    <Input
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
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Label className="col-form-label">Aluminio Intercambiable</Label>
                  <div className="w-100">
                    <Input
                      invalid={inputsStates.aluminioIntercambiable === false}
                      name="aluminioIntercambiable"
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
                  </div>
                </Col>
                <Col md={6}>
                  <Label className="col-form-label">Materia Organica</Label>
                  <div className="w-100">
                    <Input
                      invalid={inputsStates.materiaOrganica === false}
                      name="materiaOrganica"
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
                      onChange={(e) => handleElement(0, e.target.value)}
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
                      onChange={(e) => handleElement(1, e.target.value)}
                    />
                  </div>
                </Col>
                <Col xs={4}>
                  <Label className="col-form-label">Magnesio</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      name="magnesio"
                      className="form-control"
                      onChange={(e) => handleElement(2, e.target.value)}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xs={4}>
                  <Label className="col-form-label">Calcio</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      name="calcio"
                      className="form-control"
                      onChange={(e) => handleElement(3, e.target.value)}
                    />
                  </div>
                </Col>
                <Col xs={4}>
                  <Label className="col-form-label">Azufre</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      name="azufre"
                      className="form-control"
                      onChange={(e) =>
                        handleElement(
                          4,
                          !e.target.value.trim() ? 100000 : e.target.value
                        )
                      }
                    />
                  </div>
                </Col>
                <Col xs={4}>
                  <Label className="col-form-label">Sodio</Label>
                  <div className="w-100">
                    <Input
                      name="sodio"
                      onChange={(e) =>
                        handleElement(
                          5,
                          !e.target.value.trim() ? 100000 : e.target.value
                        )
                      }
                      type="text"
                      className="form-control"
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col XS={4}>
                  <Label className="col-form-label">Boro</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      name="boro"
                      className="form-control"
                      onChange={(e) => handleElement(6, e.target.value)}
                    />
                  </div>
                </Col>
                <Col XS={4}>
                  <Label className="col-form-label">Cobre</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      name="cobre"
                      className="form-control"
                      onChange={(e) => handleElement(7, e.target.value)}
                    />
                  </div>
                </Col>
              </Row>

              <div className="row gap-2 mt-4">
                <Col xs={6} md={4} className="px-0 mx-0">
                  <button
                    type="button"
                    className="btn bg-green-700 text-white hover:bg-green-800 w-full"
                    onClick={() => {
                      if (
                        !validarTerreno(
                          data.porcentArena,
                          data.porcentLimos,
                          data.porcentArcilla
                        )
                      ) {
                        toast.error(
                          "Oops! Error, por favor revisa la informacion"
                        );
                        return;
                      }
                      onSubmit();
                    }}
                  >
                    <FontAwesomeIcon icon={faFloppyDisk} className="me-2" /> Guardar
                  </button>
                </Col>
                <Col xs={4} className="px-0 mx-0">
                  <button onClick={toggleFormPost} className="bg-gray-300 btn hover:bg-gray-400 w-full hover:text-white">Cancelar</button>
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
