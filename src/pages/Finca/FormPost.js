import React, { useEffect } from "react";
import { Form, Label, Input, Col, CardBody, Modal, Row, Button } from "reactstrap";

const FormPost = ({
  data,
  setData,
  veredas,
  onSubmit,
  location,
  isFormPost,
  municipios,
  agricultores,
  setIsFormPost,
  corregimientos,
  handleModalMapa,
}) => {
  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  useEffect(() => {
    if(location) {
      // setData({ ...data, [name]: getVereda(Number(value)) });
      console.log(typeof location);
      console.log(location);
    }
  }, [location])

  const getAgricultor = (value) => {
    let el = {};
    agricultores.forEach((element) => {
      if (element.identificacion === value) {
        el = element;
      }
    });
    return el;
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
      setData({ ...data, [name]: { idCorregimiento: value } });
      return;
    }
    if (name === "idMunicipio") {
      setData({ ...data, [name]: { idMunicipio: value } });
      return;
    }
    if (name === "idVereda") {
      setData({ ...data, [name]: { idVereda: value } });
      return;
    }
    setData({ ...data, [name]: value });
  }

  return (
    <React.Fragment>
      <Modal size="lg" isOpen={isFormPost} toggle={() => { toggleFormPost() }} >
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Registrar Finca</h5>
          <button
            type="button"
            aria-label="Close"
            data-dismiss="modal"
            className="close text-xl p-0"
            onClick={() => { setIsFormPost(false) }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <CardBody>
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
                    <Col xs={8}>
                      <Input
                        type="text"
                        disabled={true}
                        name="geolocalizacion"
                        onChange={handleChange}
                        className="form-control"
                        value={data?.geolocalizacion}
                      />
                    </Col>
                    <Col xs={4}>
                      <Button color="warning" className="w-100" onClick={() => { handleModalMapa() }}>Mostrar Mapa</Button>
                    </Col>
                  </Row>
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Corregimiento</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    name="idCorregimiento"
                    className="form-select"
                    onChange={handleChange}
                    value={data?.idCorregimiento?.idCorregimiento}
                  >
                    <option value="" hidden>Seleccionar ...</option>
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
                    name="idMunicipio"
                    className="form-select"
                    onChange={handleChange}
                    value={data?.idMunicipio?.idMunicipio}
                  >
                    <option value="" hidden>Seleccionar ...</option>
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
                    name="idVereda"
                    className="form-select"
                    onChange={handleChange}
                    value={data?.idVereda?.idVereda}
                  >
                    <option value="" hidden>Seleccionar ...</option>
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
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => { onSubmit() }}
                      className="bg-green-700 rounded-md text-white hover:bg-green-700 px-4"
                    >
                      Save
                    </button>
                    <button onClick={toggleFormPost} className="bg-gray-300 rounded-md hover:bg-gray-300">Cancel</button>
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
