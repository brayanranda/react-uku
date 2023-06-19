import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faEdit, faTableList, faWater } from "@fortawesome/free-solid-svg-icons";
import { Toaster } from "react-hot-toast";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import NoFoundData from "../../UI/atom/NoFoundData";

const Index = ({
  lotes,
  search,
  isLoading,
  currentPage,
  setCurrentPage,
}) => {

  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }

  const filter = () => {
    const result = lotes.filter((variedad) =>
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

  return (
    <>
      <Toaster />
     
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table">
            <thead>
              <tr>
                <th>Identificador</th>
                <th>Descripcion</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
                {
                  lotes && lotes.length > 0 ?
                    lotes.map((lote, x) => 
                      <tr key={x} className="card-text placeholder-glow">
                        <td>{lote.id}</td>
                        <td>{lote.descripcion}</td>
                        <td className="text-end flex items-center justify-end gap-2">
                          <FontAwesomeIcon
                              className="cursor-pointer duration-300 transform rounded-md bg-green-200 hover:text-green-800 p-2.5"
                              icon={faEdit}
                          />
                          <Link to={`/suelo/${lote.id}`}
                              className="flex items-center gap-2 cursor-pointer duration-300 transform rounded-md bg-amber-400 hover:bg-amber-200 hover:text-amber-900 p-1.5"
                          >
                              <FontAwesomeIcon icon={faWater} />
                              Suelos
                          </Link>
                          <Link to={`/analisis-suelo/${lote.id}`}
                              className="flex items-center gap-2 cursor-pointer duration-300 transform rounded-md bg-blue-200 hover:text-blue-900 p-1.5"
                          >
                              <FontAwesomeIcon icon={faTableList} />
                              Análisis de suelo
                          </Link>
                        </td>
                      </tr>
                    )
                    : <tr><td colSpan={3} className="text-center"><NoFoundData /></td></tr>
                }
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
