import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "reactstrap";
import NoFoundData from "../../UI/atom/NoFoundData";
import FormPut from "./FormPut";

const Index = ({
  suelos,
  search,
  sueloData,
  isLoading,
  handlePut,
  isFormPut,
  setIdSuelo,
  currentPage,
  setIsFormPut,
  setSueloData,
  setCurrentPage,
}) => {

  const toggleFormPut = (suelo) => {
    setSueloData({"descripcion": suelo.descripcion})
    setIsFormPut(!isFormPut);
  }

  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }

  const filter = () => {
    const result = suelos.filter((suelo) =>
      suelo.descripcion.toLowerCase().includes(search.toLowerCase())
    )
    return result;
  }

  const filteredSuelos = () => {
    if (search.length === 0) return suelos.slice(currentPage, currentPage + 5);

    const filtered = filter();
    return filtered.slice(currentPage, currentPage + 5);
  }

  const nextPage = () => {
    if (filter().length > currentPage + 5) {
      setCurrentPage(currentPage + 5);
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 5);
    }
  };

  return (
    <>
      {
          isFormPut &&
            <FormPut
              sueloData={sueloData}
              isFormPut={isFormPut}
              handlePut={handlePut}
              setSueloData={setSueloData}
              setIsFormPut={setIsFormPut}
              toggleFormPut={toggleFormPut}
            />
      }
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
                  !isLoading && suelos.length > 0 ? 
                    filteredSuelos().map((suelo, x) => 
                      <tr key={x} className="card-text placeholder-glow">
                        <td>{suelo.id}</td>
                        <td>{suelo.descripcion}</td>
                        <td className="text-end flex items-center justify-end gap-2">
                          <FontAwesomeIcon
                              icon={faEdit}
                              onClick={() => { toggleFormPut(suelo); setIdSuelo(suelo.id)}}
                              className="cursor-pointer duration-300 transform rounded-md bg-green-200 hover:text-green-800 p-2.5"
                          />
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
