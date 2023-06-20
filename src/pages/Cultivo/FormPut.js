import React, { useContext, useEffect, useState } from "react";
import { Form, Label, Input, Col, CardBody, Modal, Row } from "reactstrap";
import LotesContext from "../../context/LotesContext";
import SuelosContext from "../../context/SuelosContext";

const FormPut = ({
  data,
  fincas,
  setData,
  onSubmit,
  isFormPut,
  variedades,
  topografias,
  setIsFormPut,
  distanciaSiembras,
  etapasFenologicas,
}) => {
  const { getLotes, lotes } = useContext(LotesContext)
  const { getSuelos, suelos } = useContext(SuelosContext)
  const [idLote, setIdLote] = useState("")

  const handleLote = (e) => {
    setIdLote(e.target.value)
  }

  const toggleFormPut = () => {
    setIsFormPut(!isFormPut);
    removeBodyCss();
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
        toggle={() => { toggleFormPut() }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Editar Cultivo</h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            data-dismiss="modal"
            onClick={() => { setIsFormPut(false) }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <CardBody>
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
                        distanciaSiembras.map((tipo, index) => (
                          <option key={index} value={tipo.id}>{tipo.descripcion}</option>
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
                        etapasFenologicas.map((tipo, index) => (
                          <option key={index} value={tipo.id}>{tipo.descripcion}</option>
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
                          topografias.map((tipo, index) => (
                            <option key={index} value={tipo.id}>{tipo.descripcion}</option>
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
                        variedades.map((tipo, index) => (
                          <option key={index} value={tipo.id}>{tipo.descripcion}</option>
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
                        name="idVariedad"
                        className="form-select"
                        onChange={handleChange}
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
                <Col md={6}>
                  <Label className="col-form-label">Finca</Label>
                  <div className="w-100">
                    <select
                      type="select"
                      name="idFinca"
                      className="form-select"
                      onChange={handleChange}
                      value={data?.idFinca?.idFinca}
                    >
                      <option value="">Seleccionar </option>
                      {fincas && fincas.length > 0 &&
                        fincas.map((tipo, index) => (
                          <option key={index} value={tipo.idFinca}>{tipo.nombre}</option>
                        ))}
                    </select>
                  </div>
                </Col>
              </Row>
              <Row>
                {
                  lotes && lotes.length > 0 &&
                    <Col md={6}>
                      <Label className="col-form-label">Lote</Label>
                      <div className="w-100">
                        <select
                          type="select"
                          value={idLote}
                          className="form-select"
                          onChange={handleLote}
                        >
                          <option value="" hidden>Seleccionar </option>
                          {
                            lotes && lotes.length > 0 ?
                              lotes.map((lote, index) =>
                                <option key={index} value={lote.id}>{lote.descripcion}</option>
                              )
                              : <option>No se encontraron lotes.</option>
                          }
                        </select>
                      </div>
                    </Col>
                }
                {
                  suelos && suelos.length > 0 &&
                    <Col md={6}>
                      <Label className="col-form-label">Suelo</Label>
                      <div className="w-100">
                        <select
                          type="select"
                          name="idSuelo"
                          className="form-select"
                          onChange={handleChange}
                        >
                          <option value="" hidden>Seleccionar </option>
                          {
                            suelos && suelos.length > 0 ?
                              suelos.map((suelo, index) => 
                                <option key={index} value={suelo.id}>{suelo.descripcion}</option>
                              )
                              : <option>No se encontraron suelos.</option>
                          }
                        </select>
                      </div>
                    </Col>
                }
              </Row>

              <div className="flex items-center gap-1 mt-4">
                <button
                  type="button"
                  onClick={() => { onSubmit() }}
                  className="bg-green-700 rounded-md text-white hover:bg-green-700 px-4"
                >
                  Save
                </button>
                <button onClick={toggleFormPut} className="bg-gray-300 rounded-md hover:bg-gray-300" >Cancel</button>
              </div>
            </Form>
          </CardBody>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default FormPut;
