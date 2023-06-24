import React from "react";
import { Form, Label, Input, CardBody, Modal } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";

const FormPost = ({ 
  sueloData,
  isFormPost,
  handleSave,
  setSueloData,
  setIsFormPost,
  toggleFormPost,
 }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSueloData({ ...sueloData, [name]: value });
  }

  return (
    <React.Fragment>
      <Modal size="md" centered isOpen={isFormPost} toggle={() => { toggleFormPost() }}>
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Registrar Suelo</h5>
          <button
            type="button"
            aria-label="Close"
            data-dismiss="modal"
            className="btn bg-red-500 text-white"
            onClick={() => { setIsFormPost(false)}}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="modal-body">
          <CardBody className="p-0 md:p-3">
            <Form className="row">
              <Label className="col-form-label">Descripción</Label>
              <div className="w-100">
                <Input
                  type="textarea"
                  name="descripcion"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="flex items-center gap-1 w-2/3 mt-4">
                <button 
                  onClick={() => { handleSave() }}
                  type="button" className="btn bg-green-700 text-white hover:bg-green-800 w-full"
                >
                  <FontAwesomeIcon icon={faFloppyDisk} className="me-2" /> Guardar
                </button>
                <button onClick={toggleFormPost} className="bg-gray-300 btn hover:bg-gray-400 w-full hover:text-white" > Cancelar </button>
              </div>
            </Form>
          </CardBody>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default FormPost;
