import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faChevronRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import FormPut from "./FormPut";
import { Toaster } from "react-hot-toast";
import { Spinner } from "reactstrap";
import { useParams } from "react-router-dom";
import NoFoundData from "../../UI/atom/NoFoundData";

const Index = ({
  fincas,
  search,
  putData,
  cultivos,
  isLoading,
  clearForm,
  showErros,
  variedades,
  currentPage,
  topografias,
  getCultivos,
  inputsStates,
  setShowErrors,
  setCurrentPage,
  setInputsStates,
  distanciaSiembras,
  etapasFenologicas,
  methodDistanciaSiembras,
  methodEtapasFenologicas,
  methodTopografias,
  methodVariedades,
  methodFincas,
}) => {
  
  let { idFinca } = useParams()
  const [isFormPut, setIsFormPut] = useState(false);
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

  const toggleFormPut = (cultivo) => {
    let tempiptState = {...inputsStates}
    setShowErrors(false)
    setCultivoData(cultivo);
    Object.entries(cultivo).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        tempiptState[key] = true
      }else{
        tempiptState[key] = false
      }
    })
    setInputsStates(tempiptState)
    setIsFormPut(!isFormPut);
  }

  useEffect(() => {
      if(!idFinca) {
        getCultivos()
      } else {
        getCultivos(idFinca)
      }
  }, [])

  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }

  const isvalidateInput = () => {
      const arrInputsStates = Object.keys(inputsStates).map(key => inputsStates[key])
      const validateSecondInputs = arrInputsStates.every(key => key)
      return validateSecondInputs
  }

  const handlePut = async () => {
    setShowErrors(true)
    const validate = isvalidateInput()
    if (!validate) return

    await putData(cultivoData);
    await getCultivos()

    clearForm();
    setIsFormPut(!isFormPut);
    setShowErrors(false)
    setInputsStates({})
  }

  const filter = () => {
    const result = cultivos.filter((cultivo) =>
      cultivo.descripcion.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  }

  const filteredcultivos = () => {
    if (search.length === 0)
      return cultivos.slice(currentPage, currentPage + 9);

    const filtered = filter();
    return filtered.slice(currentPage, currentPage + 9);
  }

  const nextPage = () => {
    if (filter().length > currentPage + 9) {
      setCurrentPage(currentPage + 9);
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 9);
    }
  }

  return (
    <>
      <Toaster />
      {
        isFormPut &&
          <FormPut
            fincas={fincas}
            data={cultivoData}
            onSubmit={handlePut}
            showErros={showErros}
            isFormPut={isFormPut}
            variedades={variedades}
            setData={setCultivoData}
            topografias={topografias}
            setIsFormPut={setIsFormPut}
            inputsStates={inputsStates}
            setShowErrors={setShowErrors}
            setInputsStates={setInputsStates}
            distanciaSiembras={distanciaSiembras}
            etapasFenologicas={etapasFenologicas}
            methodDistanciaSiembras={methodDistanciaSiembras}
            methodEtapasFenologicas={methodEtapasFenologicas}
            methodTopografias={methodTopografias}
            methodVariedades={methodVariedades}
            methodFincas={methodFincas}
          />
      }
      {
        !isLoading && cultivos.length > 0 
          ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-100 gap-4">
              {
                filteredcultivos().map((cultivo, x) => 
                  <div key={x} className="bg-white shadow-md p-4 rounded-md">
                    <p><b>Identificador: </b> {cultivo.idCultivo}</p>
                    <p><b>Descripción del cultivo: </b> {cultivo.descripcion}</p>
                    <p><b>Plantas por Hectárea: </b> {cultivo.plantasPorHectarea}</p>
                    <p><b>Distancia Siembra: </b> {cultivo?.idDistanciaSiembra?.descripcion}</p>
                    <p><b>Etapa Fenológica: </b> {cultivo?.idEtapaFenologica?.descripcion}</p>
                    <p><b>Finca: </b> {cultivo?.idFinca?.nombre}</p>
                    <p><b>Lote: </b> {cultivo?.idSuelo?.idLote?.descripcion}</p>
                    <p><b>Suelo: </b> {cultivo?.idSuelo?.descripcion}</p>
                    <p><b>Topografía: </b> {cultivo?.idTopografia?.descripcion}</p>
                    <p><b>Variedad: </b> {cultivo?.idVariedad?.descripcion}</p>
                    <p
                      onClick={() => { toggleFormPut(cultivo) }}
                      className="w-fit mt-3 cursor-pointer hover:bg-yellow-300 flex items-center gap-2 px-3 py-1 bg-yellow-400 rounded-full duration-300"
                    >
                      <FontAwesomeIcon icon={faEdit}/>
                      Editar
                    </p>
                  </div>
                )
              }
            </div>
          :
            <div className="bg-white h-96 text-center w-full flex items-center justify-center">
              <div>
                <NoFoundData />
                <p>No se encontraron cultivos registrados.</p>
              </div>
            </div>
      }
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
