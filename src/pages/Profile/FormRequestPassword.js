import React from "react";
import { Form, Label, Input, Col, CardBody, Modal } from "reactstrap";
import { Toaster } from "react-hot-toast";

const FormRequestPassword = ({
  onSubmit,
  setIsFormPost,
  isFormPost,
  email,
  onInputChange,
}) => {
  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
    removeBodyCss();
  };

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  return (
    <React.Fragment>
      <Modal
        size="md"
        isOpen={isFormPost}
        toggle={() => {
          toggleFormPost();
        }}
      >
        <Toaster />
        <div className="modal-header">
          <h5
            className="modal-title mt-0 text-xl font-medium"
            id="myLargeModalLabel"
          >
            Solicitud de cambio de contraseña
          </h5>
          <button
            onClick={() => {
              setIsFormPost(false);
            }}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <CardBody className="p-0 md:p-3">
            <Form className="row" onSubmit={onSubmit}>
              <div className="flex items-center mb-4">
                <Label className="col-sm-3 col-form-label">Correo electronico</Label>
                <Col sm={9}>
                  <Input
                    name="email"
                    onChange={onInputChange}
                    type="email"
                    value={email}
                    className="form-control"
                  />
                </Col>
              </div>
              {/* <p className="text-xs text-slate-600 mb-2">Se cerrará la sesión luego de solicitar el cambio de contraseña</p> */}
              <div className="row justify-content-end">
                <Col sm={9}>
                  <div className="flex">
                    <button type="submit" className="btn bg-green-700 rounded-md text-white hover:bg-green-700 px-4 me-2">Solicitar</button>
                    <button onClick={toggleFormPost} className="btn bg-gray-300 rounded-md hover:bg-gray-300">Cancel</button>
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

export default FormRequestPassword;
