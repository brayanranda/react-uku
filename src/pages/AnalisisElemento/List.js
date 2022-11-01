import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faEye,
  // faEdit,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
// import FormPut from "./FormPut";
import { Toaster } from "react-hot-toast";
import { Spinner } from "reactstrap";

const Index = ({
  getAnalisisElementos,
  analisiselementos,
  // elementos,
  // variedades,
  // putData,
  updateOrAdd,
  setUpdateOrAdd,
  isLoading,
  currentPage,
  setCurrentPage,
  search,
}) => {
  // const [isFormPut, setIsFormPut] = useState(false);
  // const [elementoData, setElementoData] = useState({
  //   nombre: "",
  //   idElemento: { id: "" },
  //   idVariedad: { id: "" },
  //   valorMaximo: "",
  //   valorMinimo: "",
  //   valorOptimo: "",
  // });

  // const toggleFormPut = (elemento) => {
  //   setElementoData(elemento);
  //   setIsFormPut(!isFormPut);
  // };

  useEffect(() => {
    if (updateOrAdd) {
      getAnalisisElementos();
      setUpdateOrAdd(false);
    }
  }, [updateOrAdd]);
  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }
  // const handlePut = async () => {
  //   await putData(elementoData);
  //   setIsFormPut(!isFormPut);
  //   setUpdateOrAdd(true);
  // };
  const filter = () => {
    const result = analisiselementos.filter((elemento) =>
      elemento.valor.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  };
  const filteredElementos = () => {
    if (search.length === 0)
      return analisiselementos.slice(currentPage, currentPage + 5);

    // Si hay algo en la caja de texto
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
      {/* {isFormPut ? (
        <FormPut
          isFormPut={isFormPut}
          setIsFormPut={setIsFormPut}
          data={elementoData}
          setData={setElementoData}
          onSubmit={handlePut}
          elementos={elementos}
          variedades={variedades}
        />
      ) : null} */}
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Elemento</th>
                <th>Valor</th>
                <th>Analisis Suelo</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && analisiselementos.length > 0 ? (
                filteredElementos().map((elemento, x) => (
                  <tr key={x}>
                    <td>{elemento.id}</td>
                    <td>{elemento.idElemento.nombre}</td>
                    <td>{elemento.valor}</td>
                    <td>{elemento.idAnalisisSuelo.porcentArena}</td>
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
