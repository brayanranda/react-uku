import React from "react";
import { Form, Label, Input, Col, CardBody, Modal, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const FormPut = ({
  data,
  veredas,
  setData,
  onSubmit,
  isFormPut,
  municipios,
  setIsFormPut,
  corregimientos,
  handleModalMapa,
}) => {
  const toggleFormPut = () => {
    setIsFormPut(!isFormPut);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const getCorregimiento = (value) => {
    let el = {};
    corregimientos.forEach((element) => {
      if (element.idCorregimiento === value) {
        el = element;
      }
    });
    return el;
  }

  const getMunicipio = (value) => {
    let el = {};
    municipios.forEach((element) => {
      if (element.idMunicipio === value) {
        el = element;
      }
    });
    return el;
  }

  const getVereda = (value) => {
    let el = {};
    veredas.forEach((element) => {
      if (element.idVereda === value) {
        el = element;
      }
    });
    return el;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "idCorregimiento") {
      setData({ ...data, [name]: getCorregimiento(Number(value)) });
      return;
    }
    if (name === "idMunicipio") {
      setData({ ...data, [name]: getMunicipio(Number(value)) });
      return;
    }
    if (name === "idVereda") {
      setData({ ...data, [name]: getVereda(Number(value)) });
      return;
    }
    setData({ ...data, [name]: value });
  }

  return (
    <React.Fragment>
      <Modal
        size="lg"
        isOpen={isFormPut}
        toggle={() => { toggleFormPut() }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Editar Finca</h5>
          <button
            type="button"
            aria-label="Close"
            data-dismiss="modal"
            className="close text-xl p-0"
            onClick={() => { setIsFormPut(false) }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
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
                    onChange={handleChange}
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Área total</Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    name="areaTotal"
                    value={data.areaTotal}
                    onChange={handleChange}
                    className="form-control col-lg-9"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Área en uso</Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    name="areaEnUso"
                    value={data.areaEnUso}
                    onChange={handleChange}
                    className="form-control col-lg-9"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Geolocalización</Label>
                <Col sm={9}>
                  <Row>
                    <Col xs={12} md={12}>
                      <Input
                        type="text"
                        disabled={true}
                        name="geolocalizacion"
                        onChange={handleChange}
                        className="form-control"
                        value={data?.geolocalizacion}
                      />
                    </Col>
                    <Col xs={12} md={4} className="mt-2">
                      {/* <Button color="warning" className="w-100" onClick={() => { handleModalMapa() }}>Mostrar Mapa</Button> */}
                    </Col>
                  </Row>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Corregimiento</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    value={data.idCorregimiento.idCorregimiento}
                    name="idCorregimiento"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar ...</option>
                    {corregimientos && corregimientos.length > 0 &&
                      corregimientos.map((corregimiento, index) => (
                        <option key={index} value={corregimiento.idCorregimiento}>{corregimiento.nombre}</option>
                      ))}
                  </select>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Municipio</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    value={data.idMunicipio.idMunicipio}
                    name="idMunicipio"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar ...</option>
                    {municipios && municipios.length > 0 &&
                      municipios.map((municipio, index) => (
                        <option key={index} value={municipio.idMunicipio}>{municipio.nombre}</option>
                      ))}
                  </select>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Vereda</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    value={data.idVereda.idVereda}
                    name="idVereda"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar ...</option>
                    {veredas && veredas.length > 0 &&
                      veredas.map((vereda, index) => (
                        <option key={index} value={vereda.idVereda}>{vereda.nombre}</option>
                    ))}
                  </select>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Precipitación anual</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    name="precipitacion"
                    className="form-select"
                    onChange={handleChange}
                    value={data?.precipitacion}
                  >
                    <option value="" hidden>Seleccionar ...</option>
                    <option>Lluvioso</option>
                    <option>Medio</option>
                    <option>Seco</option>
                  </select>
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
                      <button onClick={toggleFormPut} className="bg-gray-300 btn hover:bg-gray-400 w-full hover:text-white">Cancelar</button>
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

export default FormPut;
