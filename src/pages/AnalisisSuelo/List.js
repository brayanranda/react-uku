import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFlaskVial,
  faChevronLeft,
  faChevronRight,
  faCircleExclamation,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import FormPut from "./FormPut";
import { Toaster } from "react-hot-toast";
import { Spinner } from "reactstrap";
import Preview from "./Preview";
import FormPost from "../Elemento/FormPost";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NoFoundData from "../../UI/atom/NoFoundData";

const Index = ({
  search,
  putData,
  cultivos,
  isLoading,
  densidades,
  currentPage,
  profundidad,
  claseTextural,
  analisisSuelos,
  setUpdateOrAdd,
  setCurrentPage,
  getAnalisisSuelos,
}) => {
  let { idLote } = useParams()
  const [isFormPost, setIsFormPost] = useState(false);
  const [elementoData, setElementoData] = useState({
    id: "",
    nombre: "",
    unidad: "",
  });

  const [isFormPut, setIsFormPut] = useState(false);
  const [inputsStates, setInputsStates] = useState({});
  const [analisisData, setAnalisisData] = useState({
    fecha: "",
    idClaseTextural: { idClaseTextural: "" },
    idCultivo: { idCultivo: "" },
    idProfundidad: { idProfundidadMuestra: "" },
    idDensidad: { idDensidad: "" },
    porcentArcilla: "",
    porcentArena: "",
    porcentLimos: "",
    phSuelo: "",
    conductividadElectrica: "",
    intercambioCationico: "",
  });

  const toggleFormPut = (elemento) => {
    setAnalisisData(elemento);
    setInputsStates({});
    setIsFormPut(!isFormPut);
  };

  useEffect(() => {
      getAnalisisSuelos(idLote);
  }, []);
  
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
    await putData(analisisData);
    setIsFormPut(!isFormPut);
    setInputsStates({});
    setUpdateOrAdd(true);
  };

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
    if (currentPage > 0) {
      setCurrentPage(currentPage - 5)
    }
  }

  const handleSaveElemento = async () => {
    console.log(elementoData);
  }

  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
  }

  return (
    <>
      <Toaster />
      {isFormPut &&
        <FormPut
          isFormPut={isFormPut}
          setIsFormPut={setIsFormPut}
          data={analisisData}
          setData={setAnalisisData}
          onSubmit={handlePut}
          cultivos={cultivos}
          densidades={densidades}
          claseTextural={claseTextural}
          profundidad={profundidad}
          inputsStates={inputsStates}
          setInputsStates={setInputsStates}
        />
      }
      {isFormPost &&
        <FormPost
          isFormPost={isFormPost}
          setIsFormPost={setIsFormPost}
          data={elementoData}
          setData={setElementoData}
          onSubmit={handleSaveElemento}
        />
      }

      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Clase Textural</th>
                <th>% Arena</th>
                <th>% Limos</th>
                <th>% Arcilla</th>
                <th>Fecha</th>
                <th>Densidad</th>
                <th>Profundidad</th>
                <th>PH Suelo</th>
                <th>Conductividad Electrica</th>
                <th>Intercambio Cationico</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && analisisSuelos.length > 0 ? (
                filteredElementos().map((elemento, x) => (
                  <tr key={x}>
                    <td>{elemento.idAnalisisSuelo}</td>
                    <td>{elemento?.idClaseTextural?.nombre}</td>
                    <td>{elemento.porcentArena}</td>
                    <td>{elemento.porcentLimos}</td>
                    <td>{elemento.porcentArcilla}</td>
                    <td>{elemento.fecha}</td>
                    <td>{elemento.idDensidad.valor}</td>
                    <td>{elemento?.idProfundidad?.profundidad}</td>
                    <td>{elemento.phSuelo}</td>
                    <td>{elemento.conductividadElectrica}</td>
                    <td>{elemento.intercambioCationico}</td>
                    <td className="grid grid-cols-2">
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => { toggleFormPut(elemento) }}
                        className="text-xl cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                      />
                      <Link to={`/results/${elemento.idAnalisisSuelo}`}>
                        <FontAwesomeIcon
                          icon={faFlaskVial}
                          className="text-xl cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                        />
                      </Link>
                      <Link to={`/recomendaciones/${elemento.idAnalisisSuelo}`}>
                        <FontAwesomeIcon
                          icon={faBook}
                          className="text-xl cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                        />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                  <tr><td colSpan={13} className="text-center"><NoFoundData /></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
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
