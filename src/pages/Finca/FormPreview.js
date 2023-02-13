import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faNewspaper,
  faCircleExclamation,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Col, CardBody, Modal, Card, CardHeader, Row } from "reactstrap";

const FormPreview = ({
  onSubmit,
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
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <Card className="rounded-2xl shadow-md mb-3">
            <CardHeader>Finca / {data.nombre}</CardHeader>
            <CardBody>
              <Row>
                <Col md={8}>
                  <small className="d-block">Corregimiento</small>
                  <b>{data.idCorregimiento.nombre}</b>
                </Col>
                <Col md={4}>
                  <small className="d-block">Area en uso</small>
                  <b>{data.areaEnUso}</b>
                </Col>
              </Row>

              <Row>
                <Col md={8}>
                  <small className="d-block">Municipio</small>
                  <b>{data.idMunicipio.nombre}</b>
                </Col>
                <Col md={4}>
                  <small className="d-block">Agricultor</small>
                  <b>
                    {data.idAgricultor.nombres +
                      " " +
                      data.idAgricultor.nombres}
                  </b>
                </Col>
              </Row>

              <Row>
                <small className="d-block">Vereda</small>
                <b>{data.idVereda.nombre}</b>
              </Row>
            </CardBody>
          </Card>

          <div className="bg-green-200 card-body rounded-2xl">
            <div className="row align-items-center mb-1">
              <Col md={10}>
                <FontAwesomeIcon className="text-xl " icon={faNewspaper} />{" "}
                Estudios Realizados
              </Col>
              <Col md={2} className="d-flex justify-content-end">
                <FontAwesomeIcon
                  className="cursor-pointer duration-300 transform hover:scale-105 bg-white rounded-full hover:bg-green-200 hover:text-green-800 p-2"
                  icon={faEye}
                />
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

export default FormPreview;
