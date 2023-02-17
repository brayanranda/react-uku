import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Col, CardBody, Modal, Card, CardHeader, Row } from "reactstrap";
import { Link } from "react-router-dom";

const Preview = ({
  data,
  setData,
  setIsFormPreview,
  isFormPreview,
  corregimientos,
  municipios,
  veredas,
  agricultores,
}) => {
  const toggleFormPut = () => {
    setIsFormPreview(!isFormPreview);
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
        isOpen={isFormPreview}
        toggle={() => {
          toggleFormPut();
        }}
      >
        <div className="modal-header">
          <h5
            className="modal-title mt-0 text-xl font-medium"
            id="myLargeModalLabel"
          >
            Ukulima
          </h5>
          <button
            onClick={() => {
              setIsFormPreview(false);
            }}
            type="button"
            className="close text-xl p-0"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body p-4">
          <Card className="rounded-2xl shadow-md mb-3 overflow-hidden">
            <CardHeader className="px-4 py-3 font-semibold text-lg">Finca / {data.nombre}</CardHeader>
            <CardBody className="p-4">
              <Row>
                <Col md={8} className="mb-3">
                  <p className="d-block">Corregimiento</p>
                  <p className="text-xl font-semibold">{data.idCorregimiento.nombre}</p>
                </Col>
                <Col md={4} className="mb-3">
                  <p className="d-block">Area en uso</p>
                  <p className="text-xl font-semibold">{data.areaEnUso}</p>
                </Col>
              </Row>

              <Row>
                <Col md={8} className="mb-3">
                  <p className="d-block">Municipio</p>
                  <p className="text-xl font-semibold">{data.idMunicipio.nombre}</p>
                </Col>
                <Col md={4} className="mb-3">
                  <p className="d-block">Agricultor</p>
                  <p className="text-xl font-semibold">
                    {data.idAgricultor.nombres +
                      " " +
                      data.idAgricultor.nombres}
                  </p>
                </Col>
              </Row>

              <Row>
                <p className="d-block">Vereda</p>
                <p className="text-xl font-semibold">{data.idVereda.nombre}</p>
              </Row>
            </CardBody>
          </Card>

          <div className="flex items-center gap-1">
            <Link to="/lote" className="bg-green-700 rounded-md py-1 px-2 text-white hover:text-white hover:bg-green-800 flex items-center gap-2 font-sm">
                <FontAwesomeIcon className="cursor-pointer" icon={faEye}/>
              Ver Lotes
            </Link>
            <Link to="/analisis-suelo" className="bg-slate-400 rounded-md py-1 px-2 text-white hover:bg-slate-500 flex items-center gap-2 font-sm">
                <FontAwesomeIcon className="cursor-pointer" icon={faEye}/>
              Ver Estudios Realizados
            </Link>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default Preview;
