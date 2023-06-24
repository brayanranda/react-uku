import React from "react";
import { Form, Label, Input, Col, CardBody, Modal, Row, Select } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const FormPut = ({
  data,
  setData,
  onSubmit,
  isFormPut,
  showErros,
  variedades,
  topografias,
  setIsFormPut,
  inputsStates,
  setShowErrors,
  setInputsStates,
  distanciaSiembras,
  etapasFenologicas,
  methodDistanciaSiembras,
  methodEtapasFenologicas,
  methodTopografias,
  methodVariedades,
  methodFincas,
}) => {

  const toggleFormPut = () => {
    setInputsStates({})
    setIsFormPut(!isFormPut);
  }

  const handleChange = (isValid, e) => {
    const { name, value } = e.target;
    if (name === "idDistanciaSiembra") {
      setData({ ...data, [name]: methodDistanciaSiembras(Number(value)) });
      setInputsStates({ ...inputsStates, [name]: isValid})
      return;
    }
    if (name === "idEtapaFenologica") {
      setData({ ...data, [name]: methodEtapasFenologicas(Number(value)) });
      setInputsStates({ ...inputsStates, [name]: isValid})
      return;
    }
    if (name === "idFinca") {
      setData({ ...data, [name]: methodFincas(Number(value)) });
      setInputsStates({ ...inputsStates, [name]: isValid})
      return;
    }
    if (name === "idSuelo") {
      setData({ ...data, "idSuelo": {"id": Number(value)} });
      setInputsStates({ ...inputsStates, [name]: isValid})
      return;
    }
    if (name === "idTopografia") {
      setData({ ...data, [name]: methodTopografias(Number(value)) });
      setInputsStates({ ...inputsStates, [name]: isValid})
      return;
    }
    if (name === "idVariedad") {
      setData({ ...data, [name]: methodVariedades(Number(value)) });
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
        isOpen={isFormPut}
        toggle={() => { toggleFormPut(); setShowErrors(false) }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Editar Cultivo</h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            data-dismiss="modal"
            onClick={() => { toggleFormPut(); setShowErrors(false) }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <CardBody className="p-0 md:p-3">
            <Form className="row">
              <Row>
                <Col md={6}>
                  <Label className="col-form-label">Descripción</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      name="descripcion"
                      value={data.descripcion}
                      className="form-control"
                      valid={showErros && inputsStates?.descripcion === true}
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
                  <Label className="col-form-label">Plantas por Hectárea</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      className="form-control"
                      name="plantasPorHectarea"
                      value={data.plantasPorHectarea}
                      valid={showErros && inputsStates?.plantasPorHectarea === true}
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
                    <Input
                      type="select"
                      className="form-select"
                      name="idDistanciaSiembra"
                      value={data.idDistanciaSiembra.id}
                      valid={showErros && inputsStates?.idDistanciaSiembra === true}
                      onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                      invalid={ showErros && (inputsStates?.idDistanciaSiembra === false || !data?.idDistanciaSiembra)}
                    >
                      <option value="" hidden>Seleccionar </option>
                      {distanciaSiembras && distanciaSiembras.length > 0 &&
                        distanciaSiembras.map((distancia, index) => (
                          <option key={index} value={distancia.id}>{distancia.descripcion}</option>
                        ))}
                    </Input>
                    {
                      showErros && (inputsStates?.idDistanciaSiembra === false || !data?.idDistanciaSiembra) 
                        ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                        : null
                    }
                  </div>
                </Col>
                <Col md={6}>
                  <Label className="col-form-label">Etapa Fenológica</Label>
                  <div className="w-100">
                    <Input
                      type="select"
                      className="form-select"
                      name="idEtapaFenologica"
                      value={data.idEtapaFenologica.id}
                      valid={showErros && inputsStates?.idEtapaFenologica === true}
                      onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                      invalid={ showErros && (inputsStates?.idEtapaFenologica === false || !data?.idEtapaFenologica)}
                    >
                      <option value="" hidden>Seleccionar </option>
                      {etapasFenologicas && etapasFenologicas.length > 0 &&
                        etapasFenologicas.map((etapa, index) => (
                          <option key={index} value={etapa.id}>{etapa.descripcion}</option>
                        ))}
                    </Input>
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
                  <Label className="col-form-label">Topografía</Label>
                    <div className="w-100">
                      <Input
                        type="select"
                        name="idTopografia"
                        className="form-select"
                        value={data.idTopografia.id}
                        valid={showErros && inputsStates?.idTopografia === true}
                        onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                        invalid={ showErros && (inputsStates?.idTopografia === false || !data?.idTopografia)}  
                      >
                        <option value="" hidden>Seleccionar </option>
                        {topografias && topografias.length > 0 &&
                          topografias.map((topografia, index) => (
                            <option key={index} value={topografia.id}>{topografia.descripcion}</option>
                        ))}
                      </Input>
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
                    <Input
                      type="select"
                      name="idVariedad"
                      className="form-select"
                      value={data.idVariedad.id}
                      valid={showErros && inputsStates?.idVariedad === true}
                      onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                      invalid={ showErros && (inputsStates?.idVariedad === false || !data?.idVariedad)}
                    >
                      <option value="" hidden>Seleccionar </option>
                      {variedades && variedades.length > 0 &&
                        variedades.map((variedad, index) => (
                          <option key={index} value={variedad.id}>{variedad.descripcion}</option>
                      ))}
                    </Input>
                    {
                      showErros && (inputsStates?.idTopografia === false || !data?.idTopografia) 
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
                      <Input
                        type="select"
                        name="rendimiento"
                        className="form-select"
                        value={data.rendimiento}
                        valid={showErros && inputsStates?.rendimiento === true}
                        onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                        invalid={ showErros && (inputsStates?.rendimiento === false || !data?.rendimiento)}  
                      >
                        <option value="" hidden>Seleccionar </option>
                        {
                          [...Array(8)].map((e, x) => 
                            <option key={x}>{x+3}</option>
                          )
                        }
                      </Input>
                      {
                        showErros && (inputsStates?.rendimiento === false || !data?.rendimiento) 
                          ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                          : null
                      }
                    </div>
                </Col>
              </Row>

              <div className="flex items-center gap-1 md:w-2/3 mt-4">
                <button onClick={() => { onSubmit() }} type="button" className="btn bg-green-700 text-white hover:bg-green-800 w-full" >
                  <FontAwesomeIcon icon={faFloppyDisk} className="me-2" /> Guardar
                </button>
                <button onClick={() => { toggleFormPut(); setShowErrors(false) }} className="bg-gray-300 btn hover:bg-gray-400 w-full hover:text-white" > Cancelar </button>
              </div>
            </Form>
          </CardBody>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default FormPut;
