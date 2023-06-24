import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnalisisSueloContext from "../../context/AnalisisSueloContext";
import CultivoContext from "../../context/CultivoContext";
import DensidadContext from "../../context/DensidadContext";
import FormPost from "./FormPost";
import ListAnalisisSuelo from "./List";
import { Toaster } from "react-hot-toast";
import { SuelosProvider } from "../../context/SuelosContext";

const Index = () => {
  const {
    postData,
    isLoading,
    profundidad,
    getProfundidad,
    analisisSuelos,
    getClaseTextural,
    getAnalisisSuelos,
  } = useContext(AnalisisSueloContext);
  const [modalHelpList, setModalHelpList ] = useState(false);
  const [modalHelpPost, setModalHelpPost ] = useState(false);

  const { getCultivosBySuelo, cultivosBySuelo } = useContext(CultivoContext);
  const { getDensidades, densidades } = useContext(DensidadContext);
  const [isFormPost, setIsFormPost] = useState(false);
  const [updateOrAdd, setUpdateOrAdd] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [inputsStates, setInputsStates] = useState({});
  const [elementoData, setElementoData] = useState({
    fecha: "",
    idCultivo: { idCultivo: "" },
    idSuelo: { id: "" },
    idProfundidad: { idProfundidadMuestra: "" },
    idDensidad: "",
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
        valor: 0.1,
        idElemento: {
          id: 6,
          nombre: "AZUFRE (S)",
        },
      },
      {
        valor: 0.1,
        idElemento: {
          id: 8,
          nombre: "SODIO (Na)",
        },
      },
      {
        valor: 0.1,
        idElemento: {
          id: 14,
          nombre: "BORO (B)",
        },
      },
      {
        valor: 0.1,
        idElemento: {
          id: 13,
          nombre: "COBRE (Cu)",
        },
      },
    ],
  });

  useEffect(() => {
    getDensidades();
    getClaseTextural();
    getProfundidad();
  }, []);

  const handleModalHelp = () => {
    setModalHelpList(!modalHelpList)
  }

  useEffect(() => {
    if(elementoData && Object.entries(elementoData).length !== 0 && elementoData?.idSuelo?.id) {
      getCultivosBySuelo(elementoData.idSuelo.id)
    }
  }, [elementoData])

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
    <>
      <Toaster />
      <div className="col-12 col-lg-10 fixed top-0 right-0 p-4 overflow-y-scroll max-h-screen">
        <div className="w-100 mt-16">
          {isFormPost &&
            <SuelosProvider>
              <FormPost
                data={elementoData}
                cultivosBySuelo={cultivosBySuelo}
                onSubmit={handleSave}
                isFormPost={isFormPost}
                densidades={densidades}
                setData={setElementoData}
                profundidad={profundidad}
                inputsStates={inputsStates}
                setIsFormPost={setIsFormPost}
                setInputsStates={setInputsStates}
              />
            </SuelosProvider>
          }
          <Row>
             <Col>
              <div className="md:flex gap-3 items-center mb-6 justify-between w-100 mt-3">
                <div className="flex items-center gap-2">
                  <div className="text-2xl flex items-center gap-2">
                    <p className="text-green-700">Lista Análisis Suelos</p>
                    <p className="font-light text-black">
                      {
                        analisisSuelos && analisisSuelos.length > 0 &&
                          ` (${analisisSuelos[0]?.idSuelo?.idLote?.idFinca?.nombre})`
                      }
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn bg-gray-200"
                    onClick={() => { handleModalHelp() }}
                  >
                    <FontAwesomeIcon icon={faQuestion} />
                  </button>
                </div>
                
                <div className="flex items-center mt-3 mb:mt-0">
                  <div className="w-52 md:w-80 mr-4">
                    <input
                      type="text"
                      value={search}
                      onChange={onSearchChange}
                      placeholder="Buscar..."
                      className="form-control rounded-full"
                    />
                  </div>
                  <button
                    onClick={() => toggleFormPost()}
                    className="btn bg-green-700 hover:bg-green-800 rounded-full text-white duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="duration-300 transform text-white hover:text-green-800"
                    />
                    Agregar
                  </button>
                </div>
              </div>
              <ListAnalisisSuelo
                search={search}
                isLoading={isLoading}
                updateOrAdd={updateOrAdd}
                modalHelpList={modalHelpList}
                currentPage={currentPage}
                analisisSuelos={analisisSuelos}
                setCurrentPage={setCurrentPage}
                setModalHelpList={setModalHelpList}
                getAnalisisSuelos={getAnalisisSuelos}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Index;
