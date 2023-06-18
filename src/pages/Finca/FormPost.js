import React from "react";
import { Form, Label, Input, Col, CardBody, Modal } from "reactstrap";

const FormPost = ({
  onSubmit,
  data,
  setData,
  setIsFormPost,
  isFormPost,
  corregimientos,
  municipios,
  veredas,
  agricultores,
}) => {
  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
    removeBodyCss();
  };

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  const getAgricultor = (value) => {
    let el = {};
    agricultores.forEach((element) => {
      if (element.identificacion === value) {
        el = element;
      }
    });
    return el;
  };
  const getCorregimiento = (value) => {
    let el = {};
    corregimientos.forEach((element) => {
      if (element.idCorregimiento === value) {
        el = element;
      }
    });
    return el;
  };
  const getMunicipio = (value) => {
    let el = {};
    municipios.forEach((element) => {
      if (element.idMunicipio === value) {
        el = element;
      }
    });
    return el;
  };
  const getVereda = (value) => {
    let el = {};
    veredas.forEach((element) => {
      if (element.idVereda === value) {
        el = element;
      }
    });
    return el;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "idAgricultor") {
      setData({ ...data, [name]: getAgricultor(Number(value)) });
      return;
    }
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
        <div className="modal-header">
          <h5
            className="modal-title mt-0 text-xl font-medium"
            id="myLargeModalLabel"
          >
            Registrar Finca
          </h5>
          <button
            type="button"
            data-dismiss="modal"
            aria-label="Close"
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
                    name="nombre"
                    value={data.nombre}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Área total</Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    className="form-control col-lg-9"
                    name="areaTotal"
                    value={data.areaTotal}
                    onChange={handleChange}
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Área en uso</Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    className="form-control col-lg-9"
                    name="areaEnUso"
                    value={data.areaEnUso}
                    onChange={handleChange}
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">
                  Geolocalización
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    className="form-control"
                    name="geolocalizacion"
                    value={data.geolocalizacion}
                    onChange={handleChange}
                  />
                </Col>
              </div>
              {/* <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Agricultor</Label>
                <Col sm={9}>
                  <select
                    type="select"
                    value={data.idAgricultor.identificacion}
                    name="idAgricultor"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar ...</option>
                    {agricultores &&
                      agricultores.map((agricultor, index) => (
                        <option key={index} value={agricultor.identificacion}>
                          {agricultor.nombres + agricultor.apellidos}
                        </option>
                      ))}
                  </select>
                </Col>
              </div> */}

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
                    {corregimientos &&
                      corregimientos.map((corregimiento, index) => (
                        <option
                          key={index}
                          value={corregimiento.idCorregimiento}
                        >
                          {corregimiento.nombre}
                        </option>
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
                    {municipios &&
                      municipios.map((municipio, index) => (
                        <option key={index} value={municipio.idMunicipio}>
                          {municipio.nombre}
                        </option>
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
                    {veredas &&
                      veredas.map((vereda, index) => (
                        <option key={index} value={vereda.idVereda}>
                          {vereda.nombre}
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
