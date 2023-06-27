import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFlaskVial,faChevronLeft,faChevronRight,faBook} from "@fortawesome/free-solid-svg-icons";
import { Toaster } from "react-hot-toast";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NoFoundData from "../../UI/atom/NoFoundData";
import ModalAyuda from "../../UI/organism/ModalAyuda";

const Index = ({
  search,
  isLoading,
  currentPage,
  modalHelpList,
  analisisSuelos,
  setCurrentPage,
  setModalHelpList,
  getAnalisisSuelos,
  handleModalHelpList,
}) => {
  let { idLote } = useParams()

  const textoForm = [
    {
      title: "",
      description: "Esta ventana permite agregar los datos del análisis de suelo para un lote y obtener la interpretación del análisis y la recomendación de manejo sostenible del suelo."
    },
    {
      title: "",
      description: "REPORTE INTERPRETACION: Genera el reporte con la interpretación de los datos del análisis de suelo. Se puede descargar como archivo PDF."
    },
    {
      title: "",
      description: "REPORTE RECOMENDACIONES: Genera el reporte con las recomendaciones de manejo sostenible de suelo, de acuerdo a los datos del análisis de suelo. Se puede descargar como archivo PDF."
    },  
  ]

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
      return analisisSuelos.slice(currentPage, currentPage + 12);

    const filtered = filter();
    return filtered.slice(currentPage, currentPage + 12);
  }

  const nextPage = () => {
    if (filter().length > currentPage + 12) {
      setCurrentPage(currentPage + 12)
    }
  }

  const prevPage = () => {
    console.log(analisisSuelos);
    if (currentPage > 0) {
      setCurrentPage(currentPage - 12)
    }
  }
  
  return (
    <>
      {
        modalHelpList &&
          <ModalAyuda
            textoForm={textoForm}
            modalHelp={modalHelpList}
            setModalHelp={setModalHelpList}
            handleModalHelp={handleModalHelpList}
          />
      }
      <Toaster />
      {
        !isLoading && analisisSuelos.length > 0 
          ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-100 gap-4">
              {
                filteredElementos().map((elemento, x) => 
                  <div key={x} className="bg-white shadow-md p-4 rounded-md">
                    <p><b>Identificador: </b> {elemento.idAnalisisSuelo}</p>
                    <p><b>Lote: </b> {elemento.idSuelo?.idLote?.descripcion}</p>
                    <p><b>Suelo: </b> {elemento.idSuelo?.descripcion}</p>
                    <p><b>Fecha: </b> {elemento.fecha}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <Link
                        to={`/results/${elemento.idAnalisisSuelo}`}
                        className="cursor-pointer hover:bg-yellow-300 flex items-center gap-2 px-3 py-1 bg-yellow-400 rounded-full duration-300 w-fit"
                      >
                        <FontAwesomeIcon icon={faFlaskVial} />
                        Interpretación
                      </Link>
                      <Link
                        to={`/recomendaciones/${elemento.idAnalisisSuelo}`}
                        className="cursor-pointer hover:bg-gray-300 flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full duration-300 w-fit"
                      >
                        <FontAwesomeIcon icon={faBook} />
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
                <p>No se encontraron análisis de suelo registrados.</p>
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
