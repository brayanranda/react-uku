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
      {
        !isLoading && suelos.length > 0 
          ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-100 gap-4">
              {
                filteredSuelos().map((suelo, x) => 
                  <div key={x} className="bg-white shadow-lg p-4 rounded-md">
                    <p><b>Identificador: </b> {suelo.id}</p>
                    <p><b>Descripción del suelo: </b> {suelo.descripcion}</p>
                    <p
                      onClick={() => { toggleFormPut(suelo); setIdSuelo(suelo.id)}}
                      className="cursor-pointer hover:bg-yellow-300 flex items-center gap-2 px-3 py-1 bg-yellow-400 rounded-full duration-300 w-fit mt-3"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      Editar
                    </p>
                  </div>
                )
              }
            </div>
          :
            <div className="bg-white h-96 text-center w-full flex items-center justify-center">
              <div>
                <NoFoundData />
                <p>No se encontraron lotes registradas.</p>
              </div>
            </div>
      }
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
