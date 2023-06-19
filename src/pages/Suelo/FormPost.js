import React from "react";
import { Form, Label, Input, Col, CardBody, Modal } from "reactstrap";

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
      <Modal size="lg" isOpen={isFormPost} toggle={() => { toggleFormPost() }}>
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Registrar Suelo</h5>
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
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Descripción</Label>
                <Col sm={9}>
                  <Input
                    type="textarea"
                    name="descripcion"
                    onChange={handleChange}
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row justify-content-end">
                <Col sm={9}>
                  <div className="flex items-center gap-1">
                    <button onClick={() => { handleSave() }} type="button" className="bg-green-700 rounded-md text-white hover:bg-green-700 px-4" > Save </button>
                    <button onClick={toggleFormPost} className="bg-gray-300 rounded-md hover:bg-gray-300" > Cancel </button>
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

export default FormPost;
