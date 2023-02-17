import React from "react";
import { Form, Label, Input, Col, CardBody, Modal } from "reactstrap";

const FormPost = ({ setIsFormPost, isFormPost }) => {
  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
    removeBodyCss();
  };

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const handleChange = (e) => {}

  return (
    <React.Fragment>
      <Modal
        size="lg"
        isOpen={isFormPost}
        toggle={() => {
          toggleFormPost();
        }}
      >
        <div className="modal-header">
          <h5
            className="modal-title mt-0 text-xl font-medium"
            id="myLargeModalLabel"
          >
            Registrar Lote
          </h5>
          <button
            onClick={() => {
              setIsFormPost(false);
            }}
            type="button"
            className="close text-xl p-0"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <CardBody>
            <Form className="row">
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Nombre del Lote</Label>
                <Col sm={9}>
                  <Input
                    name="nombre"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Nombre del Encargado</Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    className="form-control col-lg-9"
                    name="areaTotal"
                    onChange={handleChange}
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">Metros</Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    className="form-control col-lg-9"
                    name="areaEnUso"
                    onChange={handleChange}
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">
                  Tipo de Cultivo
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    className="form-control"
                    name="geolocalizacion"
                    onChange={handleChange}
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">
                  Variedad
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    className="form-control"
                    name="geolocalizacion"
                    onChange={handleChange}
                  />
                </Col>
              </div>
              
              <div className="row justify-content-end">
                <Col sm={9}>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="bg-green-700 rounded-md text-white hover:bg-green-700 px-4"
                    >
                      Save
                    </button>
                    <button
                      onClick={toggleFormPost}
                      className="bg-gray-300 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
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
