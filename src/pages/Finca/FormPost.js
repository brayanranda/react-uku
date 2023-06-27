import React, { useEffect } from "react";
import { Form, Label, Input, Col, CardBody, Modal, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";

const FormPost = ({
  data,
  setData,
  onSubmit,
  showErros,
  isFormPost,
  municipios,
  inputsStates,
  setShowErrors,
  setIsFormPost,
  corregimientos,
  toggleFormPost,
  setInputsStates,
  handleModalMapa,
  handleModalHelp,
}) => {

  const handleChange = (isValid, e) => {
    const { name, value } = e.target;
    if (name === "idCorregimiento") {
      setData({ ...data, [name]: { idCorregimiento: value } });
      setInputsStates({ ...inputsStates, [name]: { idCorregimiento: isValid } })
      return;
    }
    if (name === "idMunicipio") {
      setData({ ...data, [name]: { idMunicipio: value } });
      setInputsStates({ ...inputsStates, [name]: { idMunicipio: isValid } })
      return;
    }
    setData({ ...data, [name]: value });
    setInputsStates({ ...inputsStates, [name]: isValid })
  }

  return (
    <React.Fragment>
      <Modal size="lg" isOpen={isFormPost} toggle={() => { toggleFormPost(); setShowErrors(false)}} >
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Registrar Finca</h5>

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
              onClick={() => { setIsFormPost(false)}}
              className="btn bg-red-500 text-white"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
        <div className="modal-body">
          <CardBody className="p-0 md:p-3">
            <Form className="row">
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Nombre</Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    name="nombre"
                    value={data.nombre}
                    className="form-control"
                    valid={inputsStates?.nombre === true}
                    onChange={e => handleChange(e.target.value.length > 4, e)}
                    invalid={ showErros && (inputsStates?.nombre === false || !data?.nombre)}
                  />
                  {
                    showErros && (inputsStates?.nombre === false || !data?.nombre) 
                      ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                      : null
                  }
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Área total</Label>
                <Col sm={9}>
                  <Input
                    type="number"
                    name="areaTotal"
                    value={data.areaTotal}
                    className="form-control col-lg-9"
                    valid={inputsStates?.areaTotal === true}
                    onChange={(e) =>
                      handleChange(
                        e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null &&
                          e.target.value.length > 0,
                        e
                      )
                    }
                    invalid={ showErros && (inputsStates?.areaTotal === false || !data?.areaTotal)}
                  />
                  {
                    showErros && (inputsStates?.areaTotal === false || !data?.areaTotal) 
                      ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                      : null
                  }
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Área en uso</Label>
                <Col sm={9}>
                  <Input
                    type="number"
                    name="areaEnUso"
                    value={data.areaEnUso}
                    className="form-control col-lg-9"
                    valid={inputsStates?.areaEnUso === true}
                    onChange={(e) =>
                      handleChange(
                        e.target.value.match(/^[0-9]*\.?[0-9]+$/) !== null &&
                          e.target.value.length > 0,
                        e
                      )
                    }
                    invalid={ showErros && (inputsStates?.areaEnUso === false || !data?.areaEnUso)}
                  />
                  {
                    showErros && (inputsStates?.areaEnUso === false || !data?.areaEnUso) 
                      ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                      : null
                  }
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Geolocalización</Label>
                <Col sm={9}>
                  <Row>
                    <Col xs={12} lg={8}>
                      <Input
                        type="text"
                        disabled={true}
                        name="geolocalizacion"
                        className="form-control"
                        value={data?.geolocalizacion}
                        invalid={ showErros && !data?.geolocalizacion}
                      />
                      {
                        showErros && (!data?.geolocalizacion) 
                          ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                          : null
                      }
                    </Col>
                    <Col xs={12} lg={4} className="m-0">
                      <Button color="warning" className="w-100" onClick={() => { handleModalMapa() }}>Mostrar Mapa</Button>
                    </Col>
                  </Row>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Municipio</Label>
                <Col sm={9}>
                  <Input
                    type="select"
                    name="idMunicipio"
                    className="form-select"
                    value={data?.idMunicipio?.idMunicipio}
                    valid={inputsStates?.idMunicipio === true}
                    onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                    invalid={ showErros && (inputsStates?.idMunicipio?.idMunicipio === false || !data?.idMunicipio?.idMunicipio)}
                  >
                    <option value="" hidden>Seleccionar ...</option>
                    {municipios && municipios.length > 0 &&
                      municipios.map((municipio, index) => (
                        <option key={index} value={municipio.idMunicipio}>{municipio.nombre}</option>
                      ))}
                  </Input>
                  {
                    showErros && (inputsStates?.idMunicipio?.idMunicipio === false || !data?.idMunicipio?.idMunicipio) 
                      ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                      : null
                  }
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Vereda</Label>
                <Col sm={9}>
                  <Input
                    type="select"
                    name="idCorregimiento"
                    className="form-select"
                    value={data?.idCorregimiento?.idCorregimiento}
                    onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                  >
                    <option value="" hidden>Seleccionar...</option>
                    {
                      corregimientos && corregimientos.length > 0 
                        ?
                          corregimientos.map((corregimiento, index) => (
                            <option key={index} value={corregimiento.idCorregimiento}>{corregimiento.nombre}</option>
                          ))
                        : <option disabled={true}>No se encontraron veredas.</option>
                    }
                  </Input>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Precipitación anual</Label>
                <Col sm={9}>
                  <Input
                    type="select"
                    name="precipitacion"
                    className="form-select"
                    value={data?.precipitacion}
                    valid={inputsStates?.precipitacion === true}
                    onChange={e => handleChange(e.target.selectedIndex !== 0, e )}
                    invalid={ showErros && (inputsStates?.precipitacion === false || !data?.precipitacion)}
                  >
                    <option value="" hidden>Seleccionar ...</option>
                    <option>Lluvioso</option>
                    <option>Medio</option>
                    <option>Seco</option>
                  </Input>
                  {
                    showErros && (inputsStates?.precipitacion === false || !data?.precipitacion) 
                      ? <span className="text-danger text-small d-block pt-1">Necesitas este campo</span>
                      : null
                  }
                </Col>
              </div>
              <div className="row justify-content-end">
                <Col sm={9}>
                  <div className="row gap-2">
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
                      <button onClick={()=> {toggleFormPost(); setShowErrors(false)}} className="bg-gray-300 btn hover:bg-gray-400 w-full hover:text-white">Cancelar</button>
                    </Col>
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
