import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Modal } from "reactstrap";
import { Link } from "react-router-dom";

const Preview = ({ setIsFormPreview, isFormPreview }) => {
  const togglePreview = () => {
    setIsFormPreview(!isFormPreview);
    removeBodyCss();
  };

  const removeBodyCss = () => {
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
          <h5 className="modal-title mt-0 text-xl font-medium">Detalle del Lote</h5>
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
            <p>Información del Lote</p>
          </div>
          <div className="card-body rounded-2xl shadow-md">
            <div className="rounded-2xl bg-white">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th className="text-center">Persona Encargada</th>
                      <th className="text-center">Metros</th>
                      <th className="text-center">Tipo de Cultivo</th>
                      <th className="text-center">Variedad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((e, x) => (
                      <tr key={x} className="card-text placeholder-glow">
                        <td>Element {Math.trunc(Math.random()*10)}</td>
                        <td className="text-center">{Math.trunc(Math.random()*100)}</td>
                        <td className="text-center">{Math.trunc(Math.random()*10000)}</td>
                        <td className="text-center">{Math.trunc(Math.random()*1000)}</td>
                        <td className="text-center">{Math.trunc(Math.random()*1000)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-body p-4">
          <div className="py-3 font-semibold text-lg flex items-center justify-between">
            <p>Lista de Cultivos</p>
            <Link to="/cultivo" className="bg-slate-500 rounded-md py-1 px-2 text-white hover:bg-slate-600 flex items-center gap-2 font-sm">
              <FontAwesomeIcon className="cursor-pointe" icon={faEye} />
              Ver todos los Cultivos
            </Link>
          </div>
          {/* <div className="card-body rounded-2xl shadow-md">
            <div className="rounded-2xl bg-white">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Descripción</th>
                      <th className="text-center">Plantas por Hectárea</th>
                      <th className="text-center">Distancia Siembra</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((e, x) => (
                      <tr key={x} className="card-text placeholder-glow">
                        <td>{Math.trunc(Math.random()*10)}</td>
                        <td>Descripción de Cultivos</td>
                        <td className="text-center">{Math.trunc(Math.random()*10000)}</td>
                        <td className="text-center">{Math.trunc(Math.random()*1000)}</td>
                        <td className="text-center">
                          <FontAwesomeIcon 
                            onClick={() => {
                              togglePreview()
                            }}
                            className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                            icon={faEye}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default Preview;
