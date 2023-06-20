import React, { useEffect } from "react";
import { Form, Label, Input, Col, CardBody, Modal } from "reactstrap";
import { useParams } from "react-router-dom";

const FormPut = ({ 
  sueloData,
  isFormPut,
  handlePut,
  setSueloData,
  setIsFormPut,
  toggleFormPut,
 }) => {
  let { idLote } = useParams()
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSueloData({ ...sueloData, [name]: value, "idLote": idLote });
  };

  return (
    <React.Fragment>
      <Modal size="md" isOpen={isFormPut} toggle={() => { toggleFormPut() }}>
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Editar Suelo</h5>
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
              <Label className="col-form-label">Descripción</Label>
              <div className="w-100">
                <Input
                  type="textarea"
                  name="descripcion"
                  onChange={handleChange}
                  className="form-control"                   
                  value={sueloData.descripcion}
                />
              </div>
              
              <div className="flex items-center gap-1 mt-4">
                <button onClick={() => { handlePut() }} type="button" className="bg-green-700 rounded-md text-white hover:bg-green-700 px-4" > Save </button>
                <button onClick={toggleFormPut} className="bg-gray-300 rounded-md hover:bg-gray-300" > Cancel </button>
              </div>
            </Form>
          </CardBody>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default FormPut;
