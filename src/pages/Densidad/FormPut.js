import React from "react";
import { Form, Label, Input, Col, CardBody, Modal } from "reactstrap";

const FormPut = ({
  onSubmit,
  data,
  setData,
  setIsFormPut,
  isFormPut,
  inputsStates,
  setInputsStates,
}) => {
  const toggleFormPut = () => {
    setInputsStates({});
    setIsFormPut(!isFormPut);
    removeBodyCss();
  };

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const handleChange = (isValid, e) => {
    const { name, value } = e.target;
    if (isValid) {
      setData({ ...data, [name]: Number(value) });
    } else {
      setData({ ...data, [name]: value });
    }
    setInputsStates({ ...inputsStates, [name]: isValid });
  };

  return (
    <React.Fragment>
      <Modal
        size="lg"
        isOpen={isFormPut}
        toggle={() => {
          toggleFormPut();
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">
            Editar Densidad
          </h5>
          <button
            onClick={() => {
              setIsFormPut(false);
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
            <Form className="row">
              <div className="row mb-4">
                <Label
                  htmlFor="horizontal-password-Input"
                  className="col-sm-3 col-form-label"
                >
                  Valor
                </Label>
                <Col sm={9}>
                  <Input
                    invalid={inputsStates.valor === false}
                    name="valor"
                    value={data.valor}
                    onChange={(e) =>
                      handleChange(
                        e.target.value.match(/^[0-9]+$/) !== null &&
                          e.target.value.length < 4 &&
                          e.target.value.length > 0,
                        e
                      )
                    }
                    type="text"
                    className="form-control"
                  />
                </Col>
              </div>
              <div className="row justify-content-end">
                <Col sm={9}>
                  <div>
                    <button
                      type="button"
                      className="bg-green-700 rounded-md text-white hover:bg-green-700 px-4 me-2"
                      onClick={() => {
                        onSubmit();
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={toggleFormPut}
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

export default FormPut;
