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
  getAnalisisSuelos,
  analisisSuelos,
  claseTextural,
  profundidad,
  densidades,
  cultivos,
  putData,
  updateOrAdd,
  setUpdateOrAdd,
  isLoading,
  currentPage,
  setCurrentPage,
  search,
}) => {
  const [isFormPut, setIsFormPut] = useState(false);
  const [showError, setshowError] = useState(false);
  const [inputsStates, setInputsStates] = useState({
    porcentArena: true,
    porcentLimos: true,
    porcentArcilla: true,
    fecha: true,
    idClaseTextural: true,
    idCultivo: true,
    idDensidad: true,
    idProfundidad: true,
  });
  const [elementoData, setElementoData] = useState({
    idAnalisisSuelo: "",
    porcentArena: "",
    porcentLimos: "",
    porcentArcilla: "",
    fecha: "",
    idClaseTextural: { idClaseTextural: "" },
    idCultivo: { idCultivo: "" },
    idDensidad: { idDensidad: "" },
    idProfundidad: { idProfundidadMuestra: "", profundidad: "" },
  });

  const toggleFormPut = (elemento) => {
    setElementoData(elemento);
    clearStates();
    setIsFormPut(!isFormPut);
  };

  useEffect(() => {
    if (updateOrAdd) {
      getAnalisisSuelos();
      setUpdateOrAdd(false);
    }
  }, [updateOrAdd]);
  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }
  const clearStates = () => {
    setInputsStates({
      porcentArena: true,
      porcentLimos: true,
      porcentArcilla: true,
      fecha: true,
      idClaseTextural: true,
      idCultivo: true,
      idDensidad: true,
      idProfundidad: true,
    });
  };
  const validateInput = () => {
    const arrInputs = Object.keys(inputsStates).map((key) => inputsStates[key]);
    const validateFirstInputs = arrInputs.every((key) => key);
    return validateFirstInputs;
  };
  const handlePut = async () => {
    const validate = validateInput();
    if (validate === false) {
      setshowError(true);
      return;
    } else {
      await putData(elementoData);
      setshowError(false);
      setIsFormPut(!isFormPut);
      clearStates();
      setUpdateOrAdd(true);
    }
  };
  const filter = () => {
    const result = analisisSuelos.filter((elemento) =>
      elemento.idClaseTextural.nombre
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    return result;
  };
  const filteredElementos = () => {
    if (search.length === 0)
      return analisisSuelos.slice(currentPage, currentPage + 6);

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
          data={elementoData}
          setData={setElementoData}
          onSubmit={handlePut}
          cultivos={cultivos}
          densidades={densidades}
          claseTextural={claseTextural}
          profundidad={profundidad}
          inputsStates={inputsStates}
          setInputsStates={setInputsStates}
          showError={showError}
          setshowError={setshowError}
        />
      ) : null}
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Clase Textural</th>
                <th>Cultivo</th>
                <th>Porcentaje de Arena</th>
                <th>Porcentaje de Limos</th>
                <th>Porcentaje de Arcilla</th>
                <th>Fecha</th>
                <th>Densidad</th>
                <th>Profundidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && analisisSuelos.length > 0 ? (
                filteredElementos().map((elemento, x) => (
                  <tr key={x}>
                    <td>{elemento.idAnalisisSuelo}</td>
                    <td>{elemento.idClaseTextural.nombre}</td>
                    <td>{elemento.idCultivo.descripcion}</td>
                    <td>{elemento.porcentArena}</td>
                    <td>{elemento.porcentLimos}</td>
                    <td>{elemento.porcentArcilla}</td>
                    <td>{elemento.fecha}</td>
                    <td>{elemento.idDensidad.valor}</td>
                    <td>{elemento.idProfundidad.profundidad}</td>
                    <td>
                      <FontAwesomeIcon
                        onClick={() => {
                          toggleFormPut(elemento);
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
