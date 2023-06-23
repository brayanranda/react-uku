import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFlaskVial,faChevronLeft,faChevronRight,faBook} from "@fortawesome/free-solid-svg-icons";
import { Toaster } from "react-hot-toast";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NoFoundData from "../../UI/atom/NoFoundData";

const Index = ({
  search,
  isLoading,
  currentPage,
  analisisSuelos,
  setCurrentPage,
  getAnalisisSuelos,
}) => {
  let { idLote } = useParams()

  useEffect(() => {
      getAnalisisSuelos(idLote);
  }, []);
  
  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }

  const filter = () => {
    const result = analisisSuelos.filter((elemento) =>
      elemento.idClaseTextural.nombre
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    return result;
  }

  const filteredElementos = () => {
    if (search.length === 0)
      return analisisSuelos.slice(currentPage, currentPage + 5);

    const filtered = filter();
    return filtered.slice(currentPage, currentPage + 5);
  }

  const nextPage = () => {
    if (filter().length > currentPage + 5) {
      setCurrentPage(currentPage + 5)
    }
  }

  const prevPage = () => {
    console.log(analisisSuelos);
    if (currentPage > 0) {
      setCurrentPage(currentPage - 5)
    }
  }
  
  return (
    <>
      <Toaster />
      {
        !isLoading && analisisSuelos.length > 0 
          ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-100 gap-4">
              {
                filteredElementos().map((elemento, x) => 
                  <div key={x} className="bg-white shadow-lg p-4 rounded-md">
                    <p><b>Identificador: </b> {elemento.idAnalisisSuelo}</p>
                    <p><b>Lote: </b> {elemento.idSuelo?.idLote?.descripcion}</p>
                    <p><b>Suelo: </b> {elemento.idSuelo?.descripcion}</p>
                    <p><b>Fecha: </b> {elemento.fecha}</p>
                    <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2 mt-3">
                      <Link
                        to={`/results/${elemento.idAnalisisSuelo}`}
                        className="cursor-pointer hover:bg-yellow-300 flex items-center gap-2 px-3 py-1 bg-yellow-400 rounded-full duration-300 w-fit mt-3"
                      >
                        <FontAwesomeIcon
                          icon={faFlaskVial}
                          className="text-xl cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                        />
                        Interpretación
                      </Link>
                      <Link
                        to={`/recomendaciones/${elemento.idAnalisisSuelo}`}
                        className="cursor-pointer hover:bg-yellow-300 flex items-center gap-2 px-3 py-1 bg-yellow-400 rounded-full duration-300 w-fit mt-3"
                      >
                        <FontAwesomeIcon
                          icon={faBook}
                          className="text-xl cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                        />
                        Recomendación
                      </Link>
                    </div>
                  </div>
                )
              }
            </div>
          :
            <div className="bg-white h-96 text-center w-full flex items-center justify-center">
              <div>
                <NoFoundData />
                <p>No se encontraron análisis de suelo registradas.</p>
              </div>
            </div>
      }
      <div className="flex mt-3">
        <div
          onClick={prevPage}
          className="mr-2 w-7 h-7 bg-green-700 rounded-md text-white hover:bg-green-900 cursor-pointer flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div
          onClick={nextPage}
          className="w-7 h-7 bg-green-700 rounded-md text-white hover:bg-green-900 cursor-pointer flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </>
  );
};

export default Index;
