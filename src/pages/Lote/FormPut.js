import React from "react";
import { Form, Label, Input, Col, CardBody, Modal } from "reactstrap";

const FormPut = ({ 
  loteData,
  isFormPut,
  handlePut,
  setLoteData,
  setIsFormPut,
  toggleFormPut,
 }) => {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoteData({ ...loteData, [name]: value });
  };

  return (
    <React.Fragment>
      <Modal size="lg" isOpen={isFormPut} toggle={() => { toggleFormPut() }}>
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Registrar Lote</h5>
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
          <CardBody>
            <Form className="row">
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Descripción</Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    name="descripcion"
                    onChange={handleChange}
                    className="form-control"
                  />
                </Col>
              </div>
              
              <div className="row justify-content-end">
                <Col sm={9}>
                  <div className="flex items-center gap-1">
                    <button onClick={() => { handlePut() }} type="button" className="bg-green-700 rounded-md text-white hover:bg-green-700 px-4" > Save </button>
                    <button onClick={toggleFormPut} className="bg-gray-300 rounded-md hover:bg-gray-300" > Cancel </button>
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
