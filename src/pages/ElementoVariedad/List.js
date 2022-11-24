import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Toaster } from "react-hot-toast";
import { Spinner } from "reactstrap";

const Index = ({
  getElementosVariedades,
  elementosVariedades,
  updateOrAdd,
  setUpdateOrAdd,
  isLoading,
  currentPage,
  setCurrentPage,
  search,
}) => {
  useEffect(() => {
    if (updateOrAdd) {
      getElementosVariedades();
      setUpdateOrAdd(false);
    }
  }, [updateOrAdd]);
  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }

  const filter = () => {
    const result = elementosVariedades.filter((elemento) =>
      elemento.nombre.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  };
  const filteredElementos = () => {
    if (search.length === 0)
      return elementosVariedades.slice(currentPage, currentPage + 6);

    const filtered = filter();
    return filtered.slice(currentPage, currentPage + 6);
  };

  const nextPage = () => {
    if (filter().length > currentPage + 6) {
      setCurrentPage(currentPage + 6);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 6);
    }
  };
  return (
    <>
      <Toaster />
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Valor Mínimo</th>
                <th>Valor Máximo</th>
                <th>Valor Optimo</th>
                <th>Elemento</th>
                <th>Variedad</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && elementosVariedades.length > 0 ? (
                filteredElementos().map((elemento, x) => (
                  <tr key={x}>
                    <td>{elemento.idElementoVariedad}</td>
                    <td>{elemento.nombre}</td>
                    <td>{elemento.valorMinimo}</td>
                    <td>{elemento.valorMaximo}</td>
                    <td>{elemento.valorOptimo}</td>
                    <td>{elemento.idElemento.nombre}</td>
                    <td>{elemento.idVariedad.descripcion}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No found data</td>
                </tr>
              )}
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
