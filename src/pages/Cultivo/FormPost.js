import React, { useContext, useEffect, useState } from "react";
import { Form, Label, Input, Col, CardBody, Modal, Row } from "reactstrap";
import LotesContext from "../../context/LotesContext";
import SuelosContext from "../../context/SuelosContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const FormPost = ({
  data,
  fincas,
  setData,
  onSubmit,
  showErros,
  isFormPost,
  variedades,
  topografias,
  inputsStates,
  setIsFormPost,
  setInputsStates,
  distanciaSiembras,
  etapasFenologicas,
}) => {
  const { getLotes, lotes } = useContext(LotesContext)
  const { getSuelos, suelos } = useContext(SuelosContext)
  const [idLote, setIdLote] = useState("")

  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
  }

  const handleLote = (e) => {
    setIdLote(e.target.value)
  }
  
  useEffect(() => {
    if(data && data.idFinca.idFinca !== "") {
      getLotes(data?.idFinca?.idFinca)
    }
  }, [data])

  useEffect(() => {
    if(idLote && idLote !== "") {
      getSuelos(idLote)
    }
  }, [idLote])

  const getDistanciaSiembras = (value) => {
    let el = {};
    distanciaSiembras.forEach((element) => {
      if (element.id === value) {
        el = element;
      }
    });
    return el;
  }

  const getEtapasFenologicas = (value) => {
    let el = {};
    etapasFenologicas.forEach((element) => {
      if (element.id === value) {
        el = element;
      }
    });
    return el;
  }

  const getFincas = (value) => {
    let el = {};
    fincas.forEach((element) => {
      if (element.idFinca === value) {
        el = element;
      }
    });
    return el;
  }

  const getTopografias = (value) => {
    let el = {};
    topografias.forEach((element) => {
      if (element.id === value) {
        el = element;
      }
    });
    return el;
  }

  const getVariedades = (value) => {
    let el = {};
    variedades.forEach((element) => {
      if (element.id === value) {
        el = element;
      }
    });
    return el;
  }

  const handleChange = (isValid, e) => {
    const { name, value } = e.target;
    if (name === "idDistanciaSiembra") {
      setData({ ...data, [name]: getDistanciaSiembras(Number(value)) });
      setInputsStates({ ...inputsStates, [name]: isValid})
      return;
    }
    if (name === "idEtapaFenologica") {
      setData({ ...data, [name]: getEtapasFenologicas(Number(value)) });
      setInputsStates({ ...inputsStates, [name]: isValid})
      return;
    }
    if (name === "idFinca") {
      setData({ ...data, [name]: getFincas(Number(value)) });
      setInputsStates({ ...inputsStates, [name]: isValid})
      return;
    }
    if (name === "idSuelo") {
      setData({ ...data, "idSuelo": {"id": 1} });
      setInputsStates({ ...inputsStates, [name]: isValid})
      return;
    }
    if (name === "idTopografia") {
      setData({ ...data, [name]: getTopografias(Number(value)) });
      setInputsStates({ ...inputsStates, [name]: isValid})
      return;
    }
    if (name === "idVariedad") {
      setData({ ...data, [name]: getVariedades(Number(value)) });
      setInputsStates({ ...inputsStates, [name]: isValid})
      return;
    }
    setData({ ...data, [name]: value });
    setInputsStates({ ...inputsStates, [name]: isValid })
  }

  return (
    <React.Fragment>
      <Modal
        size="lg"
        isOpen={isFormPost}
        toggle={() => { toggleFormPost() }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Registrar Cultivo</h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            data-dismiss="modal"
            onClick={() => { setIsFormPost(false) }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <CardBody className="p-0 md:p-3">
            <Form className="row">
              <Row>
                <Col md={6}>
                  <Label className="col-form-label" >Descripción</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      name="descripcion"
                      className="form-control"
                      valid={inputsStates?.descripcion === true}
                      onChange={e => handleChange(e.target.value.length > 4, e)}
                      invalid={ showErros && (inputsStates?.descripcion === false || !data?.descripcion)}

                    />
                    {
                      showErros && (inputsStates?.descripcion === false || !data?.descripcion) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                        : null
                    }
                  </div>
                </Col>
                <Col md={6}>
                  <Label className="col-form-label">Plantas por Hectarea</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      name="plantasPorHectarea"
                      className="form-control"
                      valid={inputsStates?.plantasPorHectarea === true}
                      onChange={e => handleChange(e.target.value.length > 0, e)}
                      invalid={ showErros && (inputsStates?.plantasPorHectarea === false || !data?.plantasPorHectarea)}
                    />
                    {
                      showErros && (inputsStates?.plantasPorHectarea === false || !data?.plantasPorHectarea) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                        : null
                    }
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label className="col-form-label">Distancia Siembra</Label>
                  <div className="w-100">
                    <select
                      type="select"
                      className="form-select"
                      name="idDistanciaSiembra"
                      valid={inputsStates?.idDistanciaSiembra === true}
                      onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                      invalid={ showErros && (inputsStates?.idDistanciaSiembra === false || !data?.idDistanciaSiembra)}
                    >
                      <option value="" hidden>Seleccionar </option>
                      {distanciaSiembras && distanciaSiembras.length > 0 &&
                        distanciaSiembras.map((distancia, index) => (
                          <option key={index} value={distancia.id}>{distancia.descripcion}</option>
                        ))}
                    </select>
                    {
                      showErros && (inputsStates?.idDistanciaSiembra === false || !data?.idDistanciaSiembra) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                        : null
                    }
                  </div>
                </Col>
                <Col md={6}>
                  <Label className="col-form-label">Etapa Fenologica</Label>
                  <div className="w-100">
                    <select
                      type="select"
                      className="form-select"
                      name="idEtapaFenologica"
                      valid={inputsStates?.idEtapaFenologica === true}
                      onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                      invalid={ showErros && (inputsStates?.idEtapaFenologica === false || !data?.idEtapaFenologica)}
                    >
                      <option value="" hidden>Seleccionar </option>
                      {etapasFenologicas && etapasFenologicas.length > 0 &&
                        etapasFenologicas.map((etapa, index) => (
                          <option key={index} value={etapa.id}>{etapa.descripcion}</option>
                        ))}
                    </select>
                    {
                      showErros && (inputsStates?.idEtapaFenologica === false || !data?.idEtapaFenologica) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                        : null
                    }
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label className="col-form-label">Topografia</Label>
                  <div className="w-100">
                    <select
                      type="select"
                      name="idTopografia"
                      className="form-select"
                      valid={inputsStates?.idTopografia === true}
                      onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                      invalid={ showErros && (inputsStates?.idTopografia === false || !data?.idTopografia)}
                    >
                      <option value="" hidden>Seleccionar </option>
                      {topografias && topografias.length > 0 &&
                        topografias.map((topografia, index) => (
                          <option key={index} value={topografia.id}>{topografia.descripcion}</option>
                        ))}
                    </select>
                    {
                      showErros && (inputsStates?.idTopografia === false || !data?.idTopografia) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                        : null
                    }
                  </div>
                </Col>
                <Col md={6}>
                  <Label className="col-form-label">Variedad</Label>
                  <div className="w-100">
                    <select
                      type="select"
                      name="idVariedad"
                      className="form-select"
                      valid={inputsStates?.idVariedad === true}
                      onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                      invalid={ showErros && (inputsStates?.idVariedad === false || !data?.idVariedad)}
                    >
                      <option value="" hidden>Seleccionar </option>
                      {variedades && variedades.length > 0 &&
                        variedades.map((variedad, index) => (
                          <option key={index} value={variedad.id}>{variedad.descripcion}</option>
                      ))}
                    </select>
                    {
                      showErros && (inputsStates?.idVariedad === false || !data?.idVariedad) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                        : null
                    }
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label className="col-form-label">Rendimiento (Ton/ha)</Label>
                  <div className="w-100">
                    <select
                      type="select"
                      name="rendimiento"
                      className="form-select"
                      valid={inputsStates?.rendimiento === true}
                      onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                      invalid={ showErros && (inputsStates?.rendimiento === false || !data?.rendimiento)}
                    >
                      <option value="" hidden>Seleccionar </option>
                      {
                        [...Array(8)].map((e, x) => 
                          <option key={x}>{x+3}</option>
                        )
                      }
                    </select>
                    {
                      showErros && (inputsStates?.rendimiento === false || !data?.rendimiento) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                        : null
                    }
                  </div>
                </Col>
                <Col md={6}>
                  <Label className="col-form-label">Finca</Label>
                  <div className="w-100">
                    <select
                      type="select"
                      name="idFinca"
                      className="form-select"
                      valid={inputsStates?.idFinca === true}
                      onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                      invalid={ showErros && (inputsStates?.idFinca === false || !data?.idFinca)}
                    >
                      <option value="" hidden>Seleccionar </option>
                      {
                        fincas && fincas.length > 0 ?
                          fincas.map((finca, index) =>
                            <option key={index} value={finca.idFinca}>{finca.nombre}</option>
                          )
                          : <option>No se encontraron fincas.</option>
                      }
                    </select>
                    {
                      showErros && (inputsStates?.idFinca === false || !data?.idFinca) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                        : null
                    }
                  </div>
                </Col>
              </Row>
              <Row>
                {
                  lotes && lotes.length > 0 &&
                    <Col md={6}>
                      <Label className="col-form-label">Lote</Label>
                      <div className="w-100">
                        <select
                          type="select"
                          value={idLote}
                          className="form-select"
                          onChange={handleLote}
                        >
                          <option value="" hidden>Seleccionar </option>
                          {
                            lotes && lotes.length > 0 ?
                              lotes.map((lote, index) =>
                                <option key={index} value={lote.id}>{lote.descripcion}</option>
                              )
                              : <option>No se encontraron lotes.</option>
                          }
                        </select>
                      </div>
                    </Col>
                }
                {
                  suelos && suelos.length > 0 &&
                    <Col md={6}>
                      <Label className="col-form-label">Suelo</Label>
                      <div className="w-100">
                        <select
                          type="select"
                          name="idSuelo"
                          className="form-select"
                          valid={inputsStates?.idSuelo === true}
                          onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                          invalid={ showErros && (inputsStates?.idSuelo === false || !data?.idSuelo)}
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
                        {
                          showErros && (inputsStates?.idSuelo === false || !data?.idSuelo) 
                            ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                            : null
                        }
                      </div>
                    </Col>
                }
              </Row>
              <div className="flex items-center gap-1 mt-4 md:w-2/3">
                <button
                  onClick={() => { onSubmit() }}
                  type="button" className="btn bg-green-700 text-white hover:bg-green-800 w-full"
                >
                  <FontAwesomeIcon icon={faFloppyDisk} className="me-2" /> Guardar
                </button>
                <button onClick={toggleFormPost} className="bg-gray-300 btn hover:bg-gray-400 w-full hover:text-white" > Cancelar </button>
              </div>
            </Form>
          </CardBody>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default FormPost;
