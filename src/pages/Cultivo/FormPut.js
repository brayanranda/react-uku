import React, { useContext, useEffect, useState } from "react";
import { Form, Label, Input, Col, CardBody, Modal, Row } from "reactstrap";
import LotesContext from "../../context/LotesContext";
import SuelosContext from "../../context/SuelosContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const FormPut = ({
  data,
  setData,
  onSubmit,
  isFormPut,
  variedades,
  topografias,
  setIsFormPut,
  setShowErrors,
  distanciaSiembras,
  etapasFenologicas,
}) => {
  const { getLotes, lotes } = useContext(LotesContext)
  const { getSuelos, suelos } = useContext(SuelosContext)
  const [idLote, setIdLote] = useState("")

  const toggleFormPut = () => {
    setIsFormPut(!isFormPut);
    removeBodyCss();
  }

  const handleLote = (e) => {
    setIdLote(e.target.value)
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  useEffect(() => {
    if(data && data.idFinca.idFinca !== "") {
      getLotes(data?.idFinca?.idFinca)
    }
  }, [data])

  useEffect(() => {
    if(idLote && idLote !== "") {
      getSuelos(idLote)
    }
  }, [idLote])


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
            onClick={() => { setIsFormPut(false); setShowErrors(false) }}
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
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <Label className="col-form-label">Plantas por Hectárea</Label>
                  <div className="w-100">
                    <Input
                      type="text"
                      onChange={handleChange}
                      className="form-control"
                      name="plantasPorHectarea"
                      value={data.plantasPorHectarea}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label className="col-form-label">Distancia Siembra</Label>
                  <div className="w-100">
                    <select
                      type="select"
                      onChange={handleChange}
                      className="form-select"
                      name="idDistanciaSiembra"
                      value={data.idDistanciaSiembra.id}
                    >
                      <option value="">Seleccionar </option>
                      {distanciaSiembras && distanciaSiembras.length > 0 &&
                        distanciaSiembras.map((distancia, index) => (
                          <option key={index} value={distancia.id}>{distancia.descripcion}</option>
                        ))}
                    </select>
                  </div>
                </Col>
                <Col md={6}>
                  <Label className="col-form-label">Etapa Fenológica</Label>
                  <div className="w-100">
                    <select
                      type="select"
                      onChange={handleChange}
                      className="form-select"
                      name="idEtapaFenologica"
                      value={data.idEtapaFenologica.id}
                    >
                      <option value="">Seleccionar </option>
                      {etapasFenologicas && etapasFenologicas.length > 0 &&
                        etapasFenologicas.map((etapa, index) => (
                          <option key={index} value={etapa.id}>{etapa.descripcion}</option>
                        ))}
                    </select>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label className="col-form-label">Topografía</Label>
                    <div className="w-100">
                      <select
                        type="select"
                        name="idTopografia"
                        className="form-select"
                        onChange={handleChange}
                        value={data.idTopografia.id}
                      >
                        <option value="">Seleccionar </option>
                        {topografias && topografias.length > 0 &&
                          topografias.map((topografia, index) => (
                            <option key={index} value={topografia.id}>{topografia.descripcion}</option>
                          ))}
                      </select>
                    </div>
                </Col>
                <Col md={6}>
                  <Label className="col-form-label">Variedad</Label>
                  <div className="w-100">
                    <select
                      type="select"
                      name="idVariedad"
                      className="form-select"
                      onChange={handleChange}
                      value={data.idVariedad.id}
                    >
                      <option value="">Seleccionar </option>
                      {variedades && variedades.length > 0 &&
                        variedades.map((variedad, index) => (
                          <option key={index} value={variedad.id}>{variedad.descripcion}</option>
                        ))}
                    </select>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label className="col-form-label">Rendimiento (Ton/ha)</Label>
                    <div className="w-100">
                      <select
                        type="select"
                        name="rendimiento"
                        className="form-select"
                        onChange={handleChange}
                        value={data.rendimiento}
                      >
                        <option value="">Seleccionar </option>
                        {
                          [...Array(8)].map((e, x) => 
                            <option>{x+3}</option>
                          )
                        }
                      </select>
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
