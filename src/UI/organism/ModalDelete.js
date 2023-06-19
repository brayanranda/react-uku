import React from "react"
import { Modal } from "reactstrap"

const ModalDelete = ({ onSubmit, modalDelete, setModalDelete, handleModalDelete, id, title, description }) => {

    return (
        <div>
            <Modal isOpen={modalDelete} toggle={() => { handleModalDelete() }} backdrop={"static"}>
                <div className="modal-header">
                    <h5 className="modal-title">Eliminar {title}</h5>
                    <button
                        type="button"
                        aria-label="Close"
                        className="btn-close"
                        onClick={() => { setModalDelete(false) }}
                    ></button>
                </div>
                <div className="modal-body"><p>{description}</p></div>
                <div className="modal-footer flex justify-start">
                    <button
                        type="button"
                        className="btn bg-red-500 text-white"
                        onClick={() => { onSubmit(id); setModalDelete(false) }}
                    >
                        Continuar
                    </button>
                    <button
                        type="button"
                        className="btn bg-gray-300"
                        onClick={() => { setModalDelete(false)}}
                    >
                        Cancelar
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default ModalDelete
