import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faEdit,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Modal } from "reactstrap";

const FormPreview = ({
  data,
  setIsFormPreview,
  isFormPreview,
}) => {
  const toggleFormPut = () => {
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
          toggleFormPut();
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium"> Ukulima </h5>
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
          <div className="py-3 font-semibold text-lg flex items-center justify-between">
            <p>Necesidades / Elementos de Variedad / {data.id}</p>
            <button className="bg-green-700 rounded-md py-1 px-2 text-white hover:bg-green-700 flex items-center gap-2 font-sm">
                <FontAwesomeIcon
                  className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800"
                  icon={faPlus}
                />
              Agregar
            </button>
          </div>
          <div className="card-body rounded-2xl shadow-md">
            <div className="rounded-2xl bg-white">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Elemento</th>
                      <th className="text-end">Valor Min</th>
                      <th className="text-end">Valor Max</th>
                      <th className="text-end">Valor Optimizado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((e, x) => (
                      <tr key={x} className="card-text placeholder-glow">
                        <td>Element {Math.trunc(Math.random()*10)}</td>
                        <td className="text-end">{Math.trunc(Math.random()*100)}</td>
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

export default FormPreview;
