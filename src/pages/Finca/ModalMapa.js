import React from "react";
import { Modal } from "reactstrap";
import Mapa from "../Mapa/Mapa"

const ModalMapa = ({ handleModalMapa, handleLocationSave, setModalMapa, modalMapa, location, setLocation }) => {

  return (
    <React.Fragment>
      <Modal
        size="lg"
        isOpen={modalMapa}
        toggle={() => { handleModalMapa() }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0 text-xl font-medium">Seleccionar ubicación</h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            data-dismiss="modal"
            onClick={() => { setModalMapa(false) }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
            <Mapa
                location={location}
                setLocation={setLocation}
                onSave={handleLocationSave}
            />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ModalMapa;
