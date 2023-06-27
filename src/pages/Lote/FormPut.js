import React from "react";
import { Form, Label, Input, CardBody, Modal } from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";

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
      <Modal size="md" centered isOpen={isFormPut} toggle={() => { toggleFormPut() }}>
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Editar Lote</h5>
          <button
            type="button"
            aria-label="Close"
            data-dismiss="modal"
            className="btn bg-red-500 text-white"
            onClick={() => { setIsFormPut(false)}}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="modal-body">
          <CardBody className="p-0 md:p-3">
            <Form className="row">
              <div className="row mb-4">
                <Label className="col-form-label">Descripción</Label>
                <div className="w-100">
                  <Input
                    type="textarea"
                    name="descripcion"
                    onChange={handleChange}
                    className="form-control"                   
                    value={loteData.descripcion}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 md:w-2/3">
                <button onClick={() => { handlePut() }} type="button" className="btn bg-green-700 text-white hover:bg-green-800 w-full" >
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
