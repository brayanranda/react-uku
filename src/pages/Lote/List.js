import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faEdit, faTableList, faWater, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import NoFoundData from "../../UI/atom/NoFoundData";
import FormPut from "./FormPut";
import ModalDelete from "../../UI/organism/ModalDelete";

const Index = ({
  lotes,
  idLote,
  search,
  loteData,
  isFormPut,
  isLoading,
  handlePut,
  setIdLote,
  currentPage,
  setLoteData,
  setIsFormPut,
  handleDelete,
  setCurrentPage,
}) => {
  const [modalDelete, setModalDelete] = useState(false)
  
  const toggleFormPut = (lote) => {
    setLoteData({"descripcion": lote.descripcion})
    setIsFormPut(!isFormPut);
  }

  const toggleModalDelete = () => {
    setModalDelete(!modalDelete)
  }

  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }

  const filter = () => {
    const result = lotes.filter((variedad) =>
      variedad.descripcion.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  }

  const filteredLotes = () => {
    if (search.length === 0) return lotes.slice(currentPage, currentPage + 9);

    const filtered = filter();
    return filtered.slice(currentPage, currentPage + 9);
  }

  const nextPage = () => {
    if (filter().length > currentPage + 9) {
      setCurrentPage(currentPage + 9);
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 9);
    }
  }

  return (
    <>
      {
          modalDelete && 
              <ModalDelete
                  id={idLote}
                  title={"Lote"}
                  onSubmit={handleDelete}
                  modalDelete={modalDelete}
                  setModalDelete={setModalDelete}
                  description={"¿Esta seguro de eliminar el lote?"}
              />
      }
      {
          isFormPut &&
            <FormPut
              loteData={loteData}
              isFormPut={isFormPut}
              handlePut={handlePut}
              setLoteData={setLoteData}
              setIsFormPut={setIsFormPut}
              toggleFormPut={toggleFormPut}
            />
      }
      {
        !isLoading && lotes.length > 0 
          ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-100 gap-4">
              {
                filteredLotes().map((lote, x) => 
                  <div key={x} className="bg-white shadow-md p-4 rounded-md">
                    <p><b>Identificador: </b> {lote.id}</p>
                    <p><b>Descripción del lote: </b> {lote.descripcion}</p>
                    <div className="bg-gray-100 p-2 rounded-md flex items-center gap-2 mt-3 flex-wrap">
                      <Link
                        to={`/suelo/${lote.id}`}
                        className="cursor-pointer hover:bg-amber-300 flex items-center gap-2 px-3 py-1 hover:text-amber-900 bg-amber-400 rounded-full duration-300"
                      >
                          <FontAwesomeIcon icon={faWater} /> Suelos
                      </Link>
                      <Link
                        to={`/analisis-suelo/${lote.id}`}
                        className="cursor-pointer hover:bg-gray-300 flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full duration-300"
                      >
                          <FontAwesomeIcon icon={faTableList} /> Análisis de suelo
                      </Link>
                      <FontAwesomeIcon
                          icon={faEdit}
                          onClick={() => { toggleFormPut(lote); setIdLote(lote.id) }}
                          className="btn cursor-pointer duration-300 transform rounded-md bg-green-200 hover:text-green-800 p-2.5"
                      />
                      <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => { toggleModalDelete(); setIdLote(lote.id) }}
                          className="btn cursor-pointer duration-300 transform rounded-md bg-red-200 hover:text-red-800 p-2.5"
                      />
                    </div>
                  </div>
                )
              }
            </div>
          :
            <div className="bg-white h-96 text-center w-full flex items-center justify-center">
              <div>
                <NoFoundData />
                <p>No se encontraron lotes registrados.</p>
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
