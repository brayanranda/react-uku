import React from "react";
import { Form, Label, Input, CardBody, Modal } from "reactstrap";

const FormPost = ({ 
  loteData,
  isFormPost,
  handleSave,
  setLoteData,
  setIsFormPost,
  toggleFormPost,
 }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoteData({ ...loteData, [name]: value });
  }

  return (
    <React.Fragment>
      <Modal size="md" isOpen={isFormPost} toggle={() => { toggleFormPost() }}>
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Registrar Lote</h5>
          <button
            type="button"
            aria-label="Close"
            data-dismiss="modal"
            className="close text-xl p-0"
            onClick={() => { setIsFormPost(false) }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <CardBody>
            <Form className="row">
              <div className="row mb-3">
                <Label className="orm-label">Descripción</Label>
                <div className="w-100">
                  <Input
                    type="textarea"
                    name="descripcion"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <button onClick={() => { handleSave() }} type="button" className="bg-green-700 rounded-md text-white hover:bg-green-700 px-4" > Save </button>
                <button onClick={toggleFormPost} className="bg-gray-300 rounded-md hover:bg-gray-300" > Cancel </button>
              </div>
            </Form>
          </CardBody>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default FormPost;
