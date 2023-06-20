import React, { useState, useContext, useEffect } from "react";
import { Button, Col, Row } from "reactstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnalisisSueloContext from "../../context/AnalisisSueloContext";
import CultivoContext from "../../context/CultivoContext";
import DensidadContext from "../../context/DensidadContext";
import FormPost from "./FormPost";
import ListAnalisisSuelo from "./List";

const Index = () => {
  const {
    putData,
    postData,
    isLoading,
    profundidad,
    claseTextural,
    getProfundidad,
    analisisSuelos,
    getClaseTextural,
    getAnalisisSuelos,
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
        {isFormPost &&
          <FormPost
            data={elementoData}
            cultivos={cultivos}
            onSubmit={handleSave}
            isFormPost={isFormPost}
            densidades={densidades}
            setData={setElementoData}
            profundidad={profundidad}
            inputsStates={inputsStates}
            setIsFormPost={setIsFormPost}
            setInputsStates={setInputsStates}
          />
        }
        <Row>
          <Col className="col-uku">
            <div className="flex items-center mb-4 justify-between w-100">
              <div className="flex items-center">
                <p className="text-2xl mr-2">Inicio</p>
                <p className="text-2xl">/</p>
                <p className="text-2xl ml-2 text-green-700">Lista Análisis Suelo</p>
              </div>
              <div className="md:w-25 lg:w-2/6 xl:w-50 mr-4 ml-auto">
                <input
                  type="text"
                  value={search}
                  className="form-control rounded-full"
                  onChange={onSearchChange}
                  placeholder="Buscar por clase textural"
                />
              </div>
              <button
                onClick={() => toggleFormPost()}
                className="btn bg-green-700 hover:bg-green-800 rounded-full text-white duration-300 flex items-center gap-2 cursor-pointer"
              >
                <FontAwesomeIcon
                  className="duration-300 transform text-white hover:text-green-800"
                  icon={faPlus}
                />
                Agregar Análisis Suelos
              </button>
            </div>
            <ListAnalisisSuelo
              search={search}
              putData={putData}
              cultivos={cultivos}
              isLoading={isLoading}
              densidades={densidades}
              updateOrAdd={updateOrAdd}
              currentPage={currentPage}
              profundidad={profundidad}
              claseTextural={claseTextural}
              analisisSuelos={analisisSuelos}
              setUpdateOrAdd={setUpdateOrAdd}
              setCurrentPage={setCurrentPage}
              getAnalisisSuelos={getAnalisisSuelos}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
