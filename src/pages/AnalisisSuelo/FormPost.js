import React, { useContext, useEffect, useState } from "react";
import { Form, Label, Input, Col, CardBody, Modal, Row } from "reactstrap";
import { Toaster, toast } from "react-hot-toast";
import { faEyeSlash, faFloppyDisk, faQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import SuelosContext from "../../context/SuelosContext";
import ModalAyuda from "../../UI/organism/ModalAyuda";

const FormPost = ({
  data,
  setData,
  showMsj,
  onSubmit,
  showErros,
  isFormPost,
  setShowMsj,
  profundidad,
  inputsStates,
  setIsFormPost,
  setShowErrors,
  setInputsStates,
  cultivosBySuelo,
}) => {
  let { idLote } = useParams()
  const [modalHelp, setModalHelp ] = useState(false)

  const { getSuelos, suelos } = useContext(SuelosContext)
  const textoForm = [
    {
      title: "SUELO DEL LOTE: ",
      description: "Considerando que un lote puede tener varios ambientes con su respectivo análisis de suelo. Indique a cual corresponde este análisis de suelo (Ejm. Suelo 1, Suelo 2, o Piscina 1, Piscina 2, etc.)"
    },
    {
      title: "CULTIVO: ",
      description: "Seleccionar la variedad o material genético del cultivo sembrado."
    },
    {
      title: "DENSIDAD APARENTE DEL SUELO (opcional): ",
      description: "Si dispone del dato de la densidad aparente del suelo, introduzca el valor. Recuerde separar los decimales con punto. Si no dispone del dato dejar en blanco y el sistema estima el valor"
    },
    {
      title: "PROFUNDIDAD DE MUESTREO: ",
      description: "Debe seleccionar la profundidad de suelo a la cual se realizó el muestreo de suelo."
    },
    {
      title: "TODOS LOS PARAMETROS: ",
      description: "Ingresar solo el valor en número y recuerda separar los decimales con punto. Si el campo se vuelve al color rojo, debe corregir el dato ingresado."
    },
  ]

  useEffect(() => {
    if(idLote && idLote !== "") {
      getSuelos(idLote)
    }
  }, [idLote])

  const toggleFormPost = () => {
    setInputsStates({});
    setIsFormPost(!isFormPost);
  }

  const handleModalHelp = () => {
    setModalHelp(!modalHelp)
  }

  useEffect(() => {
    if(data) {
      console.log("sss");
      console.log(data);
    }
  }, [data])

  const handleChange = (isValid, e) => {
    const { name, value } = e.target;
    if (name === "idCultivo") {
      setData({ ...data, [name]: { idCultivo: Number(value) } });
      setInputsStates({ ...inputsStates, [name]: isValid });
      return;
    }
    if(name === "fecha") {
      setData({ ...data, [name]: value });
      setInputsStates({ ...inputsStates, [name]: isValid });
      return;
    }
    if (name === "idDensidad") {
      setData({ ...data, [name]: Number(value) });
      return;
    }
    if (name === "idProfundidad") {
      setData({ ...data, [name]: { idProfundidadMuestra: Number(value) } });
      setInputsStates({ ...inputsStates, [name]: isValid });
      return;
    }
    if (name === "idSuelo") {
      setData({ ...data, [name]: { id: Number(value) } });
      setInputsStates({ ...inputsStates, [name]: isValid });
      return;
    }
    if (name === "phSuelo") {
      if(Number(value) > 0 && Number(value) <= 14) {
        setData({ ...data, [name]: Number(value) });
        setInputsStates({ ...inputsStates, [name]: isValid });
        return;
      }
      toast.error("pH suelo debe ser mayor a 0 y menor a 15.")
      setData({ ...data, [name]: "" });
      return;
    }
    setData({ ...data, [name]: Number(value) });
    setInputsStates({ ...inputsStates, [name]: isValid });
  }

  const handleElement = (element, value, name) => {
    setData((prevState) => {
      const copyState = { ...prevState };
      copyState.analisisElementoCollection[element].valor = Number(value);
      return { ...copyState };
    });
    setInputsStates({ ...inputsStates, [name]: true });
  }

  return (
    <React.Fragment>
      <Modal
        size="lg"
        isOpen={isFormPost}
        toggle={() => { toggleFormPost(); setShowErrors(false) }}
      >
        {
          modalHelp &&
            <ModalAyuda 
              modalHelp={modalHelp}
              textoForm={textoForm}
              setModalHelp={setModalHelp}
              handleModalHelp={handleModalHelp}
            />
        }
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Registrar Análisis Suelo</h5>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn bg-gray-200"
              onClick={() => { handleModalHelp() }}
            >
              <FontAwesomeIcon icon={faQuestion} />
            </button>
            <button
              type="button"
              aria-label="Close"
              data-dismiss="modal"
              className="btn bg-red-500 text-white"
              onClick={() => { setIsFormPost(false); setShowErrors(false) }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
        <div className="modal-body">
          <CardBody className="p-0 md:p-3">
            <Form className="row">
              <Row className="mb-3">
                <Col md={4}>
                  {
                    suelos && suelos.length > 0 &&
                      <>
                        <Label className="col-form-label">Suelo del lote</Label>
                        <div className="w-100">
                          <Input
                            type="select"
                            name="idSuelo"
                            className="form-select"
                            valid={showErros && inputsStates?.idSuelo === true}
                            onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                            invalid={ showErros && (inputsStates?.idSuelo === false || !data?.idSuelo?.id)}        
                          >
                            <option value="" hidden>Seleccionar...</option>
                            {
                              suelos && suelos.length > 0 ?
                                suelos.map((suelo, index) => 
                                  <option key={index} value={suelo.id}>{suelo.descripcion}</option>
                                )
                                : <option disabled={true}>No se encontraron suelos.</option>
                            }
                          </Input>
                          {
                            showErros && (inputsStates?.idSuelo === false || !data?.idSuelo?.id) 
                              ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                              : null
                          }
                        </div>  
                      </>
                  }
                </Col>
                <Col md={4}>
                  <Label className="col-form-label">Cultivo</Label>
                  <div className="w-100">
                    <Input
                      type="select"
                      name="idCultivo"
                      className="form-select"
                      valid={showErros && inputsStates?.idCultivo === true}
                      onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                      invalid={ showErros && (inputsStates?.idCultivo === false || !data?.idCultivo?.idCultivo)}        

                    >
                      <option value="" hidden>Seleccionar...</option>
                      {cultivosBySuelo && cultivosBySuelo.length > 0 ?
                        cultivosBySuelo.map((cultivo, index) => (
                          <option key={index} value={cultivo.idCultivo}>{cultivo.descripcion}</option>
                        )) : <option disabled={true}>No hay cultivos en el suelo.</option>
                      }
                    </Input>
                    {
                      showErros && (inputsStates?.idCultivo === false || !data?.idCultivo?.idCultivo) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                        : null
                    }
                  </div>
                </Col>
                <Col md={4}>
                    <Label className="col-form-label">Fecha</Label>
                    <div className="w-100">
                      <Input
                        type="date"
                        name="fecha"
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
                        valid={inputsStates?.fecha === true}
                        invalid={ showErros && (inputsStates?.fecha === false || !data?.fecha)}  
                      />
                      {
                        showErros && (inputsStates?.fecha === false || !data?.fecha) 
                          ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                          : null
                      }
                    </div>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Label className="col-form-label">Densidad aparente del suelo (opcional)</Label>
                  <div className="w-100">
                    <Input
                      type="number"
                      name="idDensidad"
                      className="form-control"
                      onChange={(e) =>
                        handleChange(
                          e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null,
                          e
                        )
                      }
                    />
                  </div>
                </Col>
                <Col md={6}>
                    <Label className="col-form-label">Profundidad de muestreo</Label>
                    <div className="w-100">
                      <Input
                        type="select"
                        name="idProfundidad"
                        className="form-select"
                        valid={showErros && inputsStates?.idProfundidad === true}
                        onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                        invalid={ showErros && (inputsStates?.idProfundidad === false || !data?.idProfundidad?.idProfundidadMuestra)}    
                      >
                        <option value="" hidden>Seleccionar </option>
                        {
                          profundidad && profundidad.length > 0 ?
                            profundidad.map((tipo, index) => 
                              <option key={index} value={tipo.idProfundidadMuestra}>{tipo.profundidad}</option>
                            )
                            : <option disabled={true}>No se encontraron profundidades</option>
                        }
                      </Input>
                      {
                        showErros && (inputsStates?.idProfundidad === false || !data?.idProfundidad?.idProfundidadMuestra) 
                          ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                          : null
                      }
                    </div>
                </Col>
              </Row>

              <Row className="my-2">
                <Col xs={4}>
                  <Label className="col-form-label">% Arena</Label>
                  <div className="w-100">
                    <Input
                      type="number"
                      name="porcentArena"
                      className="form-control"
                      valid={showErros && inputsStates?.porcentArena === true}
                      invalid={ showErros && (inputsStates?.porcentArena === false || !data?.porcentArena)}
                      onChange={(e) =>
                        handleChange(
                          e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null,
                          e
                        )
                      }
                    />
                    {
                      showErros && (inputsStates?.porcentArena === false || !data?.porcentArena) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                        : null
                    }
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="row">
                    <Label className="col-form-label">% Limos</Label>
                    <div className="w-100">
                      <Input
                        type="number"
                        name="porcentLimos"
                        className="form-control"
                        valid={showErros && inputsStates?.porcentLimos === true}
                        invalid={ showErros && (inputsStates?.porcentLimos === false || !data?.porcentLimos)}
                        onChange={(e) =>
                          handleChange(
                            e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null,
                            e
                          )
                        }
                      />
                      {
                        showErros && (inputsStates?.porcentLimos === false || !data?.porcentLimos) 
                          ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                          : null
                      }
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <Label className="col-form-label">% Arcilla</Label>
                  <div className="w-100">
                    <Input
                      type="number"
                      name="porcentArcilla"
                      className="form-control"
                      valid={showErros && inputsStates?.porcentArcilla === true}
                      invalid={ showErros && (inputsStates?.porcentArcilla === false || !data?.porcentArcilla)}
                      onChange={(e) =>
                        handleChange(
                          e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null,
                          e
                        )
                      }
                    />
                    {
                      showErros && (inputsStates?.porcentArcilla === false || !data?.porcentArcilla) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                        : null
                    }
                  </div>
                </Col>
              </Row>
              
              {
                showMsj &&
                  <div
                    onClick={() => { setShowMsj(false) }}
                    className="bg-red-50 rounded-md p-2 flex items-center justify-center cursor-pointer hover:bg-red-100 duration-300 gap-2"
                  >
                      <FontAwesomeIcon icon={faEyeSlash} />
                      <p className="text-sm text-center">La suma total de los 3 porcentajes debe menor o igual 100.</p>
                  </div>
              }

              <Row className="mb-2">
                <Col md={3}>
                  <Label className="col-form-label">pH Suelo</Label>
                  <div className="w-100">
                    <Input
                      min="0"
                      max="14"
                      type="number"
                      name="phSuelo"
                      className="form-control"
                      valid={showErros && inputsStates?.phSuelo === true}
                      invalid={ showErros && (inputsStates?.phSuelo === false || !data?.phSuelo || (data.phSuelo < 0 && data.phSuelo > 14))}
                      onChange={(e) =>
                        handleChange(
                          e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null &&
                            e.target.value.length > 0,
                          e
                        )
                      }
                    />
                    {
                      showErros && (data.phSuelo < 0 && data.phSuelo > 14)
                        ? <span className="text-danger text-small d-block pt-1">pH suelo debe ser mayor a 0 y menor a 15.</span>
                        : showErros && (inputsStates?.phSuelo === false || !data?.phSuelo) 
                          ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                          : null
                    }
                  </div>
                </Col>
                <Col md={3}>
                  <Label className="col-form-label">Conductividad Electrica</Label>
                  <div className="w-100">
                    <Input
                      type="number"
                      className="form-control"
                      name="conductividadElectrica"
                      valid={showErros && inputsStates?.conductividadElectrica === true}
                      invalid={ showErros && (inputsStates?.conductividadElectrica === false || !data?.conductividadElectrica)}
                      onChange={(e) =>
                        handleChange(
                          e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null &&
                            e.target.value.length > 0,
                          e
                        )
                      }
                    />
                    {
                      showErros && (inputsStates?.conductividadElectrica === false || !data?.conductividadElectrica) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                        : null
                    }
                  </div>
                </Col>
                <Col md={6}>
                  <Label className="col-form-label">Capacidad de Intercambio Cationico</Label>
                  <div className="w-100">
                    <Input
                      type="number"
                      className="form-control"
                      name="intercambioCationico"
                      valid={showErros && inputsStates?.intercambioCationico === true}
                      invalid={ showErros && (inputsStates?.intercambioCationico === false || !data?.intercambioCationico)}
                      onChange={(e) =>
                        handleChange(
                          e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null &&
                            e.target.value.length > 0,
                          e
                        )
                      }
                    />
                    {
                      showErros && (inputsStates?.intercambioCationico === false || !data?.intercambioCationico) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                        : null
                    }
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Label className="col-form-label">Aluminio Intercambiable</Label>
                  <div className="w-100">
                    <Input
                      type="number"
                      className="form-control"
                      name="aluminioIntercambiable"
                      valid={showErros && inputsStates?.aluminioIntercambiable === true}
                      invalid={ showErros && (inputsStates?.aluminioIntercambiable === false || !data?.aluminioIntercambiable)}
                      onChange={(e) =>
                        handleChange(
                          e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null &&
                            e.target.value.length > 0,
                          e
                        )
                      }
                    />
                    {
                      showErros && (inputsStates?.aluminioIntercambiable === false || !data?.aluminioIntercambiable) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                        : null
                    }
                  </div>
                </Col>
                <Col md={6}>
                  <Label className="col-form-label">Materia Organica</Label>
                  <div className="w-100">
                    <Input
                      type="number"
                      name="materiaOrganica"
                      className="form-control"
                      valid={showErros && inputsStates?.materiaOrganica === true}
                      invalid={ showErros && (inputsStates?.materiaOrganica === false || !data?.materiaOrganica)}
                      onChange={(e) =>
                        handleChange(
                          e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null &&
                            e.target.value.length > 0,
                          e
                        )
                      }
                    />
                    {
                      showErros && (inputsStates?.materiaOrganica === false || !data?.materiaOrganica) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                        : null
                    }
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xs={4}>
                  <Label className="col-form-label">Fosforo</Label>
                  <div className="w-100">
                    <Input
                      type="number"
                      name="fosforo"
                      className="form-control"
                      valid={showErros && inputsStates?.fosforo === true}
                      onChange={(e) => handleElement(0, e.target.value, e.target.name)}
                      invalid={ showErros && (inputsStates?.fosforo === false || !data?.analisisElementoCollection[0]?.valor)}    
                      // onChange={(e) =>
                      //   handleChange(
                      //     e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null,
                      //     e
                      //   )
                      // }
                    />
                    {
                      showErros && (inputsStates?.fosforo === false || !data?.analisisElementoCollection[0]?.valor) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                        : null
                    }
                  </div>
                </Col>
                <Col xs={4}>
                  <Label className="col-form-label">Potasio</Label>
                  <div className="w-100">
                    <Input
                      type="number"
                      name="potasio"
                      className="form-control"
                      valid={showErros && inputsStates?.potasio === true}
                      onChange={(e) => handleElement(1, e.target.value, e.target.name)}
                      invalid={ showErros && (inputsStates?.potasio === false || !data?.analisisElementoCollection[1]?.valor)}    
                      // onChange={(e) =>
                      //   handleChange(
                      //     e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null,
                      //     e
                      //   )
                      // }
                    />
                    {
                      showErros && (inputsStates?.potasio === false || !data?.analisisElementoCollection[1]?.valor) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                        : null
                    }
                  </div>
                </Col>
                <Col xs={4}>
                  <Label className="col-form-label">Magnesio</Label>
                  <div className="w-100">
                    <Input
                      type="number"
                      name="magnesio"
                      className="form-control"
                      valid={showErros && inputsStates?.magnesio === true}
                      onChange={(e) => handleElement(2, e.target.value, e.target.name)}
                      invalid={ showErros && (inputsStates?.magnesio === false || !data?.analisisElementoCollection[2]?.valor)}
                      // onChange={(e) =>
                      //   handleChange(
                      //     e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null,
                      //     e
                      //   )
                      // }
                    />
                    {
                      showErros && (inputsStates?.magnesio === false || !data?.analisisElementoCollection[2]?.valor) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                        : null
                    }
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xs={4}>
                  <Label className="col-form-label">Calcio</Label>
                  <div className="w-100">
                    <Input
                      type="number"
                      name="calcio"
                      className="form-control"
                      valid={showErros && inputsStates?.calcio === true}
                      onChange={(e) => handleElement(3, e.target.value, e.target.name)}
                      invalid={ showErros && (inputsStates?.calcio === false || !data?.analisisElementoCollection[3]?.valor)}
                      // onChange={(e) =>
                      //   handleChange(
                      //     e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null,
                      //     e
                      //   )
                      // }
                    />
                    {
                      showErros && (inputsStates?.calcio === false || !data?.analisisElementoCollection[3]?.valor) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                        : null
                    }
                  </div>
                </Col>
                <Col xs={4}>
                  <Label className="col-form-label">Azufre</Label>
                  <div className="w-100">
                    <Input
                      type="number"
                      name="azufre"
                      className="form-control"
                      valid={showErros && inputsStates?.azufre === true}
                      onChange={(e) => handleElement(4, e.target.value, e.target.name)}
                      invalid={ showErros && (inputsStates?.azufre === false || !data?.analisisElementoCollection[4]?.valor)}
                      // onChange={(e) =>
                      //   handleChange(
                      //     e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null,
                      //     e
                      //   )
                      // }
                    />
                    {
                      showErros && (inputsStates?.azufre === false || !data?.analisisElementoCollection[4]?.valor) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                        : null
                    }
                  </div>
                </Col>
                <Col xs={4}>
                  <Label className="col-form-label">Sodio</Label>
                  <div className="w-100">
                    <Input
                      type="number"
                      name="sodio"
                      className="form-control"
                      valid={showErros && inputsStates?.sodio === true}
                      onChange={(e) => handleElement(5, e.target.value, e.target.name)}
                      invalid={ showErros && (inputsStates?.sodio === false || !data?.analisisElementoCollection[5]?.valor)}
                      // onChange={(e) =>
                      //   handleChange(
                      //     e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null,
                      //     e
                      //   )
                      // }
                    />
                    {
                      showErros && (inputsStates?.sodio === false || !data?.analisisElementoCollection[5]?.valor) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                        : null
                    }
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xs={4}>
                  <Label className="col-form-label">Boro</Label>
                  <div className="w-100">
                    <Input
                      type="number"
                      name="boro"
                      className="form-control"
                      valid={showErros && inputsStates?.boro === true}
                      onChange={(e) => handleElement(6, e.target.value, e.target.name)}
                      invalid={ showErros && (inputsStates?.boro === false || !data?.analisisElementoCollection[6]?.valor)}
                      // onChange={(e) =>
                      //   handleChange(
                      //     e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null,
                      //     e
                      //   )
                      // }
                    />
                    {
                      showErros && (inputsStates?.boro === false || !data?.analisisElementoCollection[6]?.valor)
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                        : null
                    }
                  </div>
                </Col>
                <Col xs={4}>
                  <Label className="col-form-label">Cobre</Label>
                  <div className="w-100">
                    <Input
                      type="number"
                      name="cobre"
                      className="form-control"
                      valid={showErros && inputsStates?.cobre === true}
                      onChange={(e) => handleElement(7, e.target.value, e.target.name)}
                      invalid={ showErros && (inputsStates?.cobre === false || !data?.analisisElementoCollection[7]?.valor)}
                      // onChange={(e) =>
                      //   handleChange(
                      //     e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null,
                      //     e
                      //   )
                      // }
                    />
                    {
                      showErros && (inputsStates?.cobre === false || !data?.analisisElementoCollection[7]?.valor)
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo.</span>
                        : null
                    }
                  </div>
                </Col>
              </Row>

              <div className="row gap-2 mt-4">
                <Col xs={6} md={4} className="px-0 mx-0">
                  <button
                    type="button"
                    onClick={() => { onSubmit() }}
                    className="btn bg-green-700 text-white hover:bg-green-800 w-full"
                  >
                    <FontAwesomeIcon icon={faFloppyDisk} className="me-2" /> Guardar
                  </button>
                </Col>
                <Col xs={4} className="px-0 mx-0">
                  <button onClick={() => { toggleFormPost(); setShowErrors(false) }} className="bg-gray-300 btn hover:bg-gray-400 w-full hover:text-white">Cancelar</button>
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
