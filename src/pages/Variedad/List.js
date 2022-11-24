import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
// import FormPut from "./FormPut";
import { Toaster } from "react-hot-toast";
import { Spinner } from "reactstrap";

const Index = ({
  getVariedades,
  variedades,
  putData,
  // tiposcultivos,
  updateOrAdd,
  setUpdateOrAdd,
  isLoading,
  currentPage,
  setCurrentPage,
  search,
}) => {
  const [isFormPut, setIsFormPut] = useState(false);
  const [variedadData, setVariedadData] = useState({
    cultivoCollection: null,
    descripcion: "",
    idTipoCultivo: {
      id: 1,
      descripcion: "",
      variedadCollection: null,
    },
  });

  const toggleFormPut = (variedad) => {
    setVariedadData(variedad);
    setIsFormPut(!isFormPut);
  };

  useEffect(() => {
    if (updateOrAdd) {
      getVariedades();
      setUpdateOrAdd(false);
    }
  }, [updateOrAdd]);
  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }
  const handlePut = async () => {
    await putData(variedadData);
    setIsFormPut(!isFormPut);
    setUpdateOrAdd(true);
  };
  const filter = () => {
    const result = variedades.filter((variedad) =>
      variedad.descripcion.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  };
  const filteredVariedades = () => {
    if (search.length === 0)
      return variedades.slice(currentPage, currentPage + 6);

    // Si hay algo en la caja de texto
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
      {/* {isFormPut ? (
        <FormPut
          isFormPut={isFormPut}
          setIsFormPut={setIsFormPut}
          data={variedadData}
          setData={setVariedadData}
          onSubmit={handlePut}
          tiposcultivos={tiposcultivos}
        />
      ) : null} */}
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table">
            <thead>
              <tr>
                <th>Descripcion</th>
                <th>Tipo cultivo</th>
                {/* <th>Acciones</th> */}
              </tr>
            </thead>
            <tbody>
              {!isLoading && variedades.length > 0 ? (
                filteredVariedades().map((variedad, x) => (
                  <tr key={x}>
                    <td>{variedad.descripcion}</td>
                    <td>{variedad.idTipoCultivo.descripcion}</td>
                    {/* <td>
                      <FontAwesomeIcon
                        className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                        icon={faEye}
                      />
                      <FontAwesomeIcon
                        onClick={() => {
                          toggleFormPut(variedad);
                        }}
                        className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                        icon={faEdit}
                      />
                    </td> */}
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
