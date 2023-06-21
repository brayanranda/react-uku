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
    if (search.length === 0) return lotes.slice(currentPage, currentPage + 5);

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
  }

  const toggleModalDelete = () => {
    setModalDelete(!modalDelete)
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
                  !isLoading && lotes.length > 0 ?
                    filteredLotes().map((lote, x) => 
                      <tr key={x} className="card-text placeholder-glow">
                        <td>{lote.id}</td>
                        <td>{lote.descripcion}</td>
                        <td className="text-end flex items-center justify-end gap-2">
                          <Link to={`/suelo/${lote.id}`}
                              className="btn flex items-center gap-2 cursor-pointer duration-300 transform rounded-md bg-amber-400 hover:bg-amber-200 hover:text-amber-900"
                          >
                              <FontAwesomeIcon icon={faWater} /> Suelos
                          </Link>
                          <Link to={`/analisis-suelo/${lote.id}`}
                              className="btn flex items-center gap-2 cursor-pointer duration-300 transform rounded-md bg-gray-200 hover:bg-gray-50 hover:text-blue-900"
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
