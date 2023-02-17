import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faNewspaper,
  faCircleExclamation,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
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

          <div className="bg-green-200 card-body rounded-2xl p-4">
            <div className="row align-items-center mb-3">
              <Col md={10} className="text-xl">
                <FontAwesomeIcon icon={faNewspaper} />{" "}
                Estudios Realizados
              </Col>
              <Col md={2} className="d-flex justify-content-end">
                <Link to="/analisis-suelo">
                  <FontAwesomeIcon
                    className="cursor-pointer duration-300 transform hover:scale-105 bg-white rounded-full hover:bg-green-200 hover:text-green-800 p-2"
                    icon={faEye}
                  />
                </Link>
              </Col>
            </div>
            <div className="rounded-2xl bg-white">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Clase Textural</th>
                      <th>Cultivo</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>001</td>
                      <td>Clase 1</td>
                      <td>Cultivo 1</td>
                      <td>
                        <FontAwesomeIcon
                          className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                          icon={faEdit}
                        />
                        <FontAwesomeIcon
                          className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                          icon={faCircleExclamation}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>002</td>
                      <td>Clase 2</td>
                      <td>Cultivo 2</td>
                      <td>
                        <FontAwesomeIcon
                          className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                          icon={faEdit}
                        />
                        <FontAwesomeIcon
                          className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                          icon={faCircleExclamation}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>003</td>
                      <td>Clase 3</td>
                      <td>Cultivo 3</td>
                      <td>
                        <FontAwesomeIcon
                          className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                          icon={faEdit}
                        />
                        <FontAwesomeIcon
                          className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                          icon={faCircleExclamation}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default Preview;
