import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Col, CardBody, Modal, Card, CardHeader, Row } from "reactstrap";
import { Link } from "react-router-dom";

const Preview = ({
  data,
  setIsFormPreview,
  isFormPreview
}) => {
  const toggleFormPut = () => {
    setIsFormPreview(!isFormPreview);
    removeBodyCss();
  };

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  
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
