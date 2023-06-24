import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Modal } from "reactstrap";

const ModalAyuda = ({ modalHelp, setModalHelp, handleModalHelp, textoForm }) => {

  return (
    <React.Fragment>
      <Modal
        size="md"
        isOpen={modalHelp}
        toggle={() => { handleModalHelp() }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Recomendaciones</h5>
          <button
            type="button"
            aria-label="Close"
            data-dismiss="modal"
            className="btn bg-red-500 text-white"
            onClick={() => { setModalHelp(false)}}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="modal-body p-4">
          <ul className="space-y-4">
            {
              textoForm.map((text, index) => 
                <li key={index}>
                  <b>{text.title}</b>
                  {text.description}
                </li>
              )
            }
          </ul>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ModalAyuda;
