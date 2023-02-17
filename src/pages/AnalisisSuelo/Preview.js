import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Col, Modal } from "reactstrap";
import { Link } from "react-router-dom";

const Preview = ({
  setIsFormPreview,
  isFormPreview,
  toggleFormPost
}) => {
  const togglePreview = () => {
    setIsFormPreview(!isFormPreview);
    removeBodyCss();
  };

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  return (
    <React.Fragment>
      <Modal
        size="lg"
        isOpen={isFormPreview}
        toggle={() => {
          togglePreview();
        }}
      >
        <div className="modal-header">
          <h5
            className="modal-title mt-0 text-xl font-medium"
            id="myLargeModalLabel"
          >
            Ukulima
          </h5>
          <button
            onClick={() => {
              setIsFormPreview(false);
            }}
            type="button"
            className="close text-xl p-0"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body p-4">
          <div className="bg-green-200 card-body rounded-2xl p-4">
            <div className="row align-items-center mb-3">
              <Col md={10} className="text-xl">
                <FontAwesomeIcon icon={faNewspaper} />{" "}
                Elementos de Análisis
              </Col>
              <Col md={2} className="d-flex justify-content-end">
                <Link to="/analisis-suelo">
                  <FontAwesomeIcon
                    onClick={() => {
                      togglePreview()
                      toggleFormPost()}
                    }
                    className="cursor-pointer duration-300 transform hover:scale-105 bg-white rounded-full hover:bg-green-200 hover:text-green-800 p-2"
                    icon={faPlus}
                  />
                </Link>
              </Col>
            </div>
            <div className="rounded-2xl bg-white">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Elemento</th>
                      <th className="text-end">Valor</th>
                      <th className="text-end">Análisis de Suelo</th>
                    </tr>
                  </thead>
                  <tbody>
                  {[...Array(10)].map((e, x) => (
                      <tr key={x} className="card-text placeholder-glow">
                        <td>00{Math.trunc(Math.random()*9)}</td>
                        <td>Element {Math.trunc(Math.random()*10)}</td>
                        <td className="text-end">{Math.trunc(Math.random()*10000)}</td>
                        <td className="text-end">{Math.trunc(Math.random()*1000)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default Preview;
