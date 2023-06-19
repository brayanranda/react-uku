import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun, faWheatAwn } from "@fortawesome/free-solid-svg-icons";
import { Col, CardBody, Modal, Card, CardHeader, Row } from "reactstrap";
import { Link } from "react-router-dom";

const Preview = ({ data, setIsFormPreview, isFormPreview }) => {
  const toggleFormPut = () => {
    setIsFormPreview(!isFormPreview);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  
  return (
    <React.Fragment>
      <Modal
        size="lg"
        isOpen={isFormPreview}
        toggle={() => { toggleFormPut() }}
      >
        <div className="modal-header">
          <h5 id="myLargeModalLabel" className="modal-title mt-0 text-xl font-medium">Ukulima</h5>
          <button
            type="button"
            aria-label="Close"
            data-dismiss="modal"
            className="close text-xl p-0"
            onClick={() => { setIsFormPreview(false) }}
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
                    {data.idAgricultor.nombres + " " + data.idAgricultor.nombres}
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
            <Link to={`/cultivo/${data.idFinca}`} className="bg-green-700 rounded-md py-1 px-2 text-white hover:text-white hover:bg-green-800 flex items-center gap-2 font-sm">
                <FontAwesomeIcon className="cursor-pointer" icon={faWheatAwn}/> Ver Cultivos
            </Link>
            <Link to={`/lote/${data.idFinca}`} className="bg-slate-400 rounded-md py-1 px-2 text-white hover:bg-slate-500 flex items-center gap-2 font-sm">
                <FontAwesomeIcon className="cursor-pointer" icon={faMountainSun}/> Ver Lotes
            </Link>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default Preview;
