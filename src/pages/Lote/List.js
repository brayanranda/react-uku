import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faEdit, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Toaster } from "react-hot-toast";
import { Spinner } from "reactstrap";
import Preview from "./Preview";

const Index = ({
  variedades,
  isLoading,
  currentPage,
  setCurrentPage,
  search,
}) => {
    const [isFormPreview, setIsFormPreview] = useState(false);
    const [isFormPost, setIsFormPost] = useState(false);

  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }

  const filter = () => {
    const result = variedades.filter((variedad) =>
      variedad.descripcion.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  };

  const nextPage = () => {
    if (filter().length > currentPage + 5) {
      setCurrentPage(currentPage + 5);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 5);
    }
  };

  const toggleFormPreview = () => {
    setIsFormPreview(!isFormPreview);
  };

  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
  };
  
  return (
    <>
      <Toaster />
      {isFormPreview ? (
        <Preview isFormPreview={isFormPreview} setIsFormPreview={setIsFormPreview} toggleFormPost={toggleFormPost} />
      ) : null}
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Persona Encargada</th>
                <th className="text-end">Metros</th>
                <th className="text-end">Tipo de Cultivo</th>
                <th className="text-end">Variedad</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
                {[...Array(10)].map((e, x) => (
                    <tr key={x} className="card-text placeholder-glow">
                        <td>Nombre del Lote{Math.trunc(Math.random()*9)}</td>
                        <td>Nombre de la Persona {Math.trunc(Math.random()*10)}</td>
                        <td className="text-end">{Math.trunc(Math.random()*10000)}</td>
                        <td>Tipo de Cultivo {Math.trunc(Math.random()*10)}</td>
                        <td>Variedad {Math.trunc(Math.random()*10)}</td>
                        <td className="text-end">
                        <FontAwesomeIcon
                            className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                            icon={faEdit}
                        />
                        <FontAwesomeIcon onClick={() => {toggleFormPreview()}}
                            className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                            icon={faCircleExclamation}
                        />
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex mt-3">
        <div
          className="mr-2 w-7 h-7 bg-green-700 rounded-md text-white hover:bg-green-900 cursor-pointer flex items-center justify-center"
          onClick={prevPage}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div
          className="w-7 h-7 bg-green-700 rounded-md text-white hover:bg-green-900 cursor-pointer flex items-center justify-center"
          onClick={nextPage}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </>
  );
};

export default Index;
