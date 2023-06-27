import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Toaster } from "react-hot-toast";
import { Spinner } from "reactstrap";

const Index = ({
  getEnmiendas,
  enmiendas,
  updateOrAdd,
  setUpdateOrAdd,
  isLoading,
  currentPage,
  setCurrentPage,
  search,
}) => {
  useEffect(() => {
    if (updateOrAdd) {
      getEnmiendas();
      setUpdateOrAdd(false);
    }
  }, [updateOrAdd]);
  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }
  const filter = () => {
    const result = enmiendas.filter((enmienda) =>
      enmienda.descripcion.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  };
  const filteredEnmiendas = () => {
    if (search.length === 0)
      return enmiendas.slice(currentPage, currentPage + 5);

    const filtered = filter();
    return filtered.slice(currentPage, currentPage + 5);
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
  return (
    <>
      <Toaster />
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table">
            <thead>
              <tr>
                <th className="text-center">Id</th>
                <th className="text-center">DescripciÓn</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && enmiendas.length > 0 ? (
                filteredEnmiendas().map((enmienda, x) => (
                  <tr key={x}>
                    <td className="text-center">{enmienda.id}</td>
                    <td className="text-center">{enmienda.descripcion}</td>
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
      <div className="flex mt-3 gap-2">
        <div
          className="gap-2 btn bg-gray-700 rounded-md text-white hover:bg-gray-900 cursor-pointer flex items-center justify-center"
          onClick={prevPage}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          Anterior
        </div>
        <div
          className="gap-2 btn bg-green-700 rounded-md text-white hover:bg-green-900 cursor-pointer flex items-center justify-center"
          onClick={nextPage}
        >
          Siguiente
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </>
  );
};

export default Index;
