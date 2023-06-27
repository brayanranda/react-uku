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
  getDistanciaSiembras,
  distanciaSiembras,
  putData,
  updateOrAdd,
  setUpdateOrAdd,
  isLoading,
  currentPage,
  setCurrentPage,
  search,
}) => {
  const [isFormPut, setIsFormPut] = useState(false);
  const [distanciaSiembrasData, setDistanciaSiembrasData] = useState({
    descripcion: "",
    id: "",
  });

  // const toggleFormPut = (topografia) => {
  //   setDistanciaSiembrasData(topografia);
  //   setIsFormPut(!isFormPut);
  // };

  useEffect(() => {
    if (updateOrAdd) {
      getDistanciaSiembras();
      setUpdateOrAdd(false);
    }
  }, [updateOrAdd]);
  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }
  // const handlePut = async () => {
  //   await putData(distanciaSiembrasData);
  //   setIsFormPut(!isFormPut);
  //   setUpdateOrAdd(true);
  // };
  const filter = () => {
    const result = distanciaSiembras.filter((distanciaSiembra) =>
      distanciaSiembra.descripcion.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  };
  const filteredDistanciaSiembras = () => {
    if (search.length === 0)
      return distanciaSiembras.slice(currentPage, currentPage + 5);

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
          data={distanciaSiembrasData}
          setData={setDistanciaSiembrasData}
          onSubmit={handlePut}
        />
      ) : null} */}
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Descripcion</th>
                {/* <th>Acciones</th> */}
              </tr>
            </thead>
            <tbody>
              {!isLoading && distanciaSiembras.length > 0 ? (
                filteredDistanciaSiembras().map((distanciaSiembra, x) => (
                  <tr key={x}>
                    <td>{distanciaSiembra.id}</td>
                    <td>{distanciaSiembra.descripcion}</td>
                    {/* <td>
                      <FontAwesomeIcon
                        className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                        icon={faEye}
                      />
                      <FontAwesomeIcon
                        onClick={() => {
                          toggleFormPut(distanciaSiembra);
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
