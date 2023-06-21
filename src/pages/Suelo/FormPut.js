import React from "react";
import { Form, Label, Input, CardBody, Modal } from "reactstrap";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

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
  }

  return (
    <React.Fragment>
      <Modal size="md" isOpen={isFormPut} centered toggle={() => { toggleFormPut() }}>
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
              <div className="flex items-center gap-1 w-2/3 mt-4">
                <button 
                  onClick={() => { handlePut() }} type="button"
                  className="btn bg-green-700 text-white hover:bg-green-800 w-full"
                >
                  <FontAwesomeIcon icon={faFloppyDisk} className="me-2" /> Guardar
                </button>
                <button onClick={toggleFormPut} className="bg-gray-300 btn hover:bg-gray-400 w-full hover:text-white" > Cancelar </button>
              </div>
            </Form>
          </CardBody>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default FormPut;
