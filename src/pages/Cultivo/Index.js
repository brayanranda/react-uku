import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import CultivoContext from "../../context/CultivoContext";
import DistanciaSiembraContext from "../../context/DistanciaSiembraContext";
import FincaContext from "../../context/FincaContext";
import TopografiaContext from "../../context/TopografiaContext";
import VariedadContext from "../../context/VariedadContext";
import FormPost from "./FormPost";
import ListCultivo from "./List";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import { LotesProvider } from "../../context/LotesContext";
import { SuelosProvider } from "../../context/SuelosContext";
import { useParams } from "react-router-dom";

const Index = () => {
  const {
    putData,
    cultivos,
    postData,
    isLoading,
    getCultivos,
    etapasFenologicas,
    getEtapasFenologicas,
  } = useContext(CultivoContext);
  
  let { idFinca } = useParams()
  const { getFincas, fincas } = useContext(FincaContext);
  const { getVariedades, variedades } = useContext(VariedadContext);
  const { getTopografias, topografias } = useContext(TopografiaContext);
  const { getDistanciaSiembras, distanciaSiembras } = useContext(DistanciaSiembraContext);
  const [showErros, setShowErrors] = useState(false)
  
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isFormPost, setIsFormPost] = useState(false);
  const [cultivoData, setCultivoData] = useState({
    descripcion: "",
    plantasPorHectarea: 0,
    idDistanciaSiembra: {},
    idEtapaFenologica: {},
    idFinca: {},
    idTopografia: {},
    idVariedad: {},
    rendimiento: 0,
    idSuelo: {},
  })

  const [inputsStates, setInputsStates] = useState({
    descripcion: false,
    plantasPorHectarea: false,
    idDistanciaSiembra: false,
    idEtapaFenologica: false,
    idFinca: false,
    idTopografia: false,
    idVariedad: false,
    rendimiento: false,
    idSuelo: false,
  })

  const clearForm = () => {
    setCultivoData({
      descripcion: "",
      plantasPorHectarea: 0,
      idDistanciaSiembra: {},
      idEtapaFenologica: {},
      idFinca: {},
      idTopografia: {},
      idVariedad: {},
      rendimiento: 0,
      idSuelo: {},
    });
  }

  const isvalidateInput = () => {
      const arrInputsStates = Object.keys(inputsStates).map(key => inputsStates[key])
      const validateSecondInputs = arrInputsStates.every(key => key)
      // console.log('validateSecondInputs: ', validateSecondInputs);
      return validateSecondInputs
  }

  useEffect(() => {
    getDistanciaSiembras();
    getEtapasFenologicas();
    getFincas();
    getTopografias();
    getVariedades();
  }, [])

  const handleSave = async () => {
    setShowErrors(true)
    const validate = isvalidateInput()
    if (!validate) return

    await postData(cultivoData);
    if(!idFinca) {
      await getCultivos()
    } else {
      await getCultivos(idFinca)
    }
    clearForm();
    setIsFormPost(!isFormPost);

    setShowErrors(false)
    setInputsStates({})
  }

  const onSearchChange = ({ target }) => {
    setCurrentPage(0);
    setSearch(target.value);
  }

  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
  }

  const methodDistanciaSiembras = (value) => {
    let el = {};
    distanciaSiembras.forEach((element) => {
      if (element.id === value) {
        el = element;
      }
    });
    return el;
  }

  const methodEtapasFenologicas = (value) => {
    let el = {};
    etapasFenologicas.forEach((element) => {
      if (element.id === value) {
        el = element;
      }
    });
    return el;
  }

  const methodFincas = (value) => {
    let el = {};
    fincas.forEach((element) => {
      if (element.idFinca === value) {
        el = element;
      }
    });
    return el;
  }

  const methodTopografias = (value) => {
    let el = {};
    topografias.forEach((element) => {
      if (element.id === value) {
        el = element;
      }
    });
    return el;
  }

  const methodVariedades = (value) => {
    let el = {};
    variedades.forEach((element) => {
      if (element.id === value) {
        el = element;
      }
    });
    return el;
  }

  return (
    <>
      <Toaster />
      <div className="col-12 col-lg-10 fixed top-0 right-0 p-4 overflow-y-scroll max-h-screen">
        <div className="w-100 mt-16">
          {isFormPost &&
            <LotesProvider>
              <SuelosProvider>
                <FormPost
                  fincas={fincas}
                  data={cultivoData}
                  showErros={showErros}
                  onSubmit={handleSave}
                  isFormPost={isFormPost}
                  variedades={variedades}
                  setData={setCultivoData}
                  topografias={topografias}
                  inputsStates={inputsStates}
                  setShowErrors={setShowErrors}
                  setIsFormPost={setIsFormPost}
                  setInputsStates={setInputsStates}
                  distanciaSiembras={distanciaSiembras}
                  etapasFenologicas={etapasFenologicas}
                  methodDistanciaSiembras={methodDistanciaSiembras}
                  methodEtapasFenologicas={methodEtapasFenologicas}
                  methodTopografias={methodTopografias}
                  methodVariedades={methodVariedades}
                  methodFincas={methodFincas}
                />
              </SuelosProvider>
            </LotesProvider>
          }
          <Row>
            <Col>
              <div className="md:flex gap-3 items-center mb-6 justify-between w-100 mt-3">
                <p className="text-2xl ml-2 text-green-700">Lista Cultivos</p>
                <div className="flex items-center mt-3 mb:mt-0">
                  <div className="w-52 md:w-96 mr-4">
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
                      className="duration-300 transform text-white hover:text-green-800"
                      icon={faPlus}
                    />
                    Agregar
                  </button>
                </div>
              </div>
              <ListCultivo
                search={search}
                fincas={fincas}
                putData={putData}
                cultivos={cultivos}
                clearForm={clearForm}
                isLoading={isLoading}
                showErros={showErros}
                variedades={variedades}
                topografias={topografias}
                getCultivos={getCultivos}
                currentPage={currentPage}
                inputsStates={inputsStates}
                setShowErrors={setShowErrors}
                setCurrentPage={setCurrentPage}
                setInputsStates={setInputsStates}
                distanciaSiembras={distanciaSiembras}
                etapasFenologicas={etapasFenologicas}
                methodDistanciaSiembras={methodDistanciaSiembras}
                methodEtapasFenologicas={methodEtapasFenologicas}
                methodTopografias={methodTopografias}
                methodVariedades={methodVariedades}
                methodFincas={methodFincas}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Index;
