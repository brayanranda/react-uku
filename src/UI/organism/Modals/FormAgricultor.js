import React from "react";
import { Button, Modal, Input, CardBody, Form, Label, Col } from "reactstrap";

const FormAgricultor = ({
  modal_large,
  setmodal_large,
  // setData,
  // data,
  // onSubmit,
}) => {
  function tog_large() {
    setmodal_large(!modal_large);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Modal
      size="lg"
      isOpen={modal_large}
      toggle={() => {
        tog_large();
      }}
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0" id="myLargeModalLabel">
          Add data
        </h5>
        <button
          onClick={() => {
            setmodal_large(false);
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
        <CardBody className="pb-0">
          <Form className="row">
            <div className="col-md-6">
              <div className="row mb-4">
                <Label className="col-sm-3 col-form-label">
                  Customer Name:
                </Label>
                <Col sm={9}>
                  <Input
                    onChange={handleChange}
                    name="customerName"
                    value={data.customerName}
                    type="text"
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label
                  htmlFor="horizontal-password-Input"
                  className="col-sm-3 col-form-label"
                >
                  Account Manager:
                </Label>
                <Col sm={9}>
                  <Input
                    onChange={handleChange}
                    name="accountManager"
                    value={data.accountManager}
                    type="select"
                    className="form-control"
                    id="horizontal-password-Input"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </Col>
              </div>
            </div>
            <hr />
            <div className="text-right">
              <Button color="warning" className="me-2">
                Guardar
              </Button>
            </div>
          </Form>
        </CardBody>
      </div>
    </Modal>
  );
};

export default FormAgricultor;
