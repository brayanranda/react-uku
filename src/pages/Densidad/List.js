import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import FormPut from "./FormPut";
import { Toaster } from "react-hot-toast";
import { Spinner } from "reactstrap";

const Index = ({
  getDensidades,
  densidades,
  putData,
  updateOrAdd,
  setUpdateOrAdd,
  isLoading,
  currentPage,
  setCurrentPage,
  search,
}) => {
  const [isFormPut, setIsFormPut] = useState(false);
  const [inputsStates, setInputsStates] = useState({});
  const [densidadData, setDensidadData] = useState({
    valor: "",
    idDensidad: "",
    analisisSueloCollection: null,
  });

  const toggleFormPut = (topografia) => {
    setDensidadData(topografia);
    setInputsStates({});
    setIsFormPut(!isFormPut);
  };

  useEffect(() => {
    if (updateOrAdd) {
      getDensidades();
      setUpdateOrAdd(false);
    }
  }, [updateOrAdd]);
  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }
  const validateInput = () => {
    const arrInputs = Object.keys(inputsStates).map((key) => inputsStates[key]);
    const validateFirstInputs = arrInputs.every((key) => key);
    return validateFirstInputs;
  };
  const handlePut = async () => {
    const validate = validateInput();
    if (validate === false) {
      return;
    }
    await putData(densidadData);
    setIsFormPut(!isFormPut);
    setInputsStates({});
    setUpdateOrAdd(true);
  };
  const filter = () => {
    const result = densidades.filter((densidad) =>
      densidad.valor.toString().includes(search)
    );
    return result;
  };
  const filteredDensidades = () => {
    if (search.length === 0)
      return densidades.slice(currentPage, currentPage + 6);

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
      {isFormPut ? (
        <FormPut
          isFormPut={isFormPut}
          setIsFormPut={setIsFormPut}
          data={densidadData}
          setData={setDensidadData}
          onSubmit={handlePut}
          inputsStates={inputsStates}
          setInputsStates={setInputsStates}
        />
      ) : null}
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th className="text-center">Valor</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && densidades.length > 0 ? (
                filteredDensidades().map((densidad, x) => (
                  <tr key={x}>
                    <td>{densidad.idDensidad}</td>
                    <td className="text-center">{densidad.valor}</td>
                    <td className="text-center">
                      <FontAwesomeIcon
                        onClick={() => {
                          toggleFormPut(densidad);
                        }}
                        className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                        icon={faEdit}
                      />
                    </td>
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
