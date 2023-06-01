import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnalisisSueloContext from "../../context/AnalisisSueloContext";
import CultivoContext from "../../context/CultivoContext";
import DensidadContext from "../../context/DensidadContext";
import FormPost from "./FormPost";
import ListVariedades from "./List";
const Index = () => {
  const {
    getAnalisisSuelos,
    analisisSuelos,
    getClaseTextural,
    getProfundidad,
    claseTextural,
    profundidad,
    postData,
    putData,
    isLoading,
  } = useContext(AnalisisSueloContext);
  const { getCultivos, cultivos } = useContext(CultivoContext);
  const { getDensidades, densidades } = useContext(DensidadContext);
  const [isFormPost, setIsFormPost] = useState(false);
  const [updateOrAdd, setUpdateOrAdd] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [inputsStates, setInputsStates] = useState({});
  const [elementoData, setElementoData] = useState({
    fecha: "",
    idCultivo: { idCultivo: "" },
    idProfundidad: { idProfundidadMuestra: "" },
    idDensidad: { idDensidad: "" },
    porcentArcilla: "",
    porcentArena: "",
    porcentLimos: "",
    phSuelo: "",
    conductividadElectrica: "",
    intercambioCationico: "",
    aluminioIntercambiable: "",
    materiaOrganica: "",
    analisisElementoCollection: [
      {
        valor: 0.1,
        idElemento: {
          id: 2,
          nombre: "FÓSFORO (P)",
        },
      },
      {
        valor: 0.1,
        idElemento: {
          id: 3,
          nombre: "POTASIO (K)",
        },
      },
      {
        valor: 0.1,
        idElemento: {
          id: 5,
          nombre: "MAGNESIO (Mg)",
        },
      },
      {
        valor: 0.1,
        idElemento: {
          id: 4,
          nombre: "CALCIO (Ca)",
        },
      },
      {
        valor: 100000,
        idElemento: {
          id: 6,
          nombre: "AZUFRE (S)",
        },
      },
      {
        valor: 100000,
        idElemento: {
          id: 8,
          nombre: "SODIO (Na)",
        },
      },
    ],
  });

  useEffect(() => {
    getCultivos();
    getDensidades();
    getClaseTextural();
    getProfundidad();
  }, []);

  const validateInput = () => {
    const arrInputs = Object.keys(inputsStates).map((key) => inputsStates[key]);
    const validateFirstInputs = arrInputs.every((key) => key);
    return validateFirstInputs;
  };

  const handleSave = async () => {
    const validate = validateInput();
    if (validate === false) {
      return;
    }
    await postData(elementoData);
    setIsFormPost(!isFormPost);
    setInputsStates({});
    setUpdateOrAdd(true);
  }

  const onSearchChange = ({ target }) => {
    setCurrentPage(0)
    setSearch(target.value)
  }

  const toggleFormPost = () => {
    setInputsStates({})
    setIsFormPost(!isFormPost)
  }

  return (
    <div className="col-10 fixed top-0 right-0 p-5 overflow-y-scroll max-h-screen">
      <div className="w-100 mt-16">
        {isFormPost ? (
          <FormPost
            isFormPost={isFormPost}
            setIsFormPost={setIsFormPost}
            data={elementoData}
            setData={setElementoData}
            onSubmit={handleSave}
            cultivos={cultivos}
            densidades={densidades}
            profundidad={profundidad}
            inputsStates={inputsStates}
            setInputsStates={setInputsStates}
          />
        ) : null}
        <Row>
          <Col className="col-uku">
            <div className="flex items-center mb-4 justify-between w-100">
              <div className="flex items-center">
                <p className="text-2xl mr-2">Inicio</p>
                <p className="text-2xl">/</p>
                <p className="text-2xl ml-2 text-green-700">
                  Lista Análisis Suelo
                </p>
              </div>
              <div className="md:w-25 lg:w-2/6 xl:w-50 mr-4 ml-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por clase textural"
                  value={search}
                  onChange={onSearchChange}
                />
              </div>
              <button
                onClick={() => toggleFormPost()}
                className="bg-green-700 rounded-md py-1 px-2 text-white hover:bg-green-700 flex items-center gap-2 font-sm"
              >
                <FontAwesomeIcon
                  className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800"
                  icon={faPlus}
                />
                Agregar Análisis Suelo
              </button>
            </div>
            <ListVariedades
              getAnalisisSuelos={getAnalisisSuelos}
              analisisSuelos={analisisSuelos}
              putData={putData}
              updateOrAdd={updateOrAdd}
              setUpdateOrAdd={setUpdateOrAdd}
              isLoading={isLoading}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              search={search}
              cultivos={cultivos}
              densidades={densidades}
              claseTextural={claseTextural}
              profundidad={profundidad}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
