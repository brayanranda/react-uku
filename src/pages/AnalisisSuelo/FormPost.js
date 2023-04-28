import React from "react";
import { Form, Label, Input, Col, CardBody, Modal } from "reactstrap";
import { inputs, ranges, validarTerreno } from "../../utils/ranges.utils";
import { Toaster, toast } from "react-hot-toast";

const FormPost = ({
  onSubmit,
  data,
  setData,
  setIsFormPost,
  isFormPost,
  cultivos,
  densidades,
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
  const handleElement = (element, value) => {
    setData((prevState) => {
      const copyState = { ...prevState };
      copyState.analisisElementoCollection[element].valor = Number(value);
      return { ...copyState };
    });
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
        <Toaster />
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
                <Label className="col-sm-3 col-form-label">Fecha</Label>
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
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">
                  Porcentaje de Arena
                </Label>
                <Col sm={9}>
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
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">
                  Porcentaje de Limos
                </Label>
                <Col sm={9}>
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
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">
                  Porcentaje de Arcilla
                </Label>
                <Col sm={9}>
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
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">PH Suelo</Label>
                <Col sm={9}>
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
                    type="text"
                    className="form-control"
                  />
                </Col>
              </div>

              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">
                  Conductividad Electrica
                </Label>
                <Col sm={9}>
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
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">
                  Intercambio Cationico
                </Label>
                <Col sm={9}>
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
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">
                  Aluminio Intercambiable
                </Label>
                <Col sm={9}>
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
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">
                  Materia Organica
                </Label>
                <Col sm={9}>
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
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Fosforo</Label>
                <Col sm={9}>
                  <Input
                    name="fosforo"
                    onChange={(e) => handleElement(0, e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Potasio</Label>
                <Col sm={9}>
                  <Input
                    name="potasio"
                    onChange={(e) => handleElement(1, e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Magnesio</Label>
                <Col sm={9}>
                  <Input
                    name="magnesio"
                    onChange={(e) => handleElement(2, e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Calcio</Label>
                <Col sm={9}>
                  <Input
                    name="calcio"
                    onChange={(e) => handleElement(3, e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Azufre</Label>
                <Col sm={9}>
                  <Input
                    name="azufre"
                    onChange={(e) =>
                      handleElement(
                        4,
                        !e.target.value.trim() ? 100000 : e.target.value
                      )
                    }
                    type="text"
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Sodio</Label>
                <Col sm={9}>
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
                </Col>
              </div>
              <div className="row justify-content-end">
                <Col sm={9}>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="bg-green-700 rounded-md text-white hover:bg-green-700 px-4"
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
