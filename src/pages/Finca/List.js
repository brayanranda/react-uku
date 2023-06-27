import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCircleExclamation, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import FormPut from "./FormPut";
import { Toaster } from "react-hot-toast";
import { Spinner } from "reactstrap";
import Preview from "./Preview";
import NoFoundData from "../../UI/atom/NoFoundData";
import ModalMapa from "./ModalMapa";

const Index = ({
  search,
  fincas,
  veredas,
  putFinca,
  getFincas,
  isLoading,
  showErros,
  clearForm,
  municipios,
  updateOrAdd,
  currentPage,
  agricultores,
  inputsStates,
  setShowErrors,
  corregimientos,
  setUpdateOrAdd,
  setCurrentPage,
  setInputsStates,
  handleModalHelp,
  getCorregimientos,
}) => {
  const [isFormPut, setIsFormPut] = useState(false);
  const [modalMapa, setModalMapa] = useState(false);
  const [location, setLocation] = useState(null);
  const [isFormPreview, setIsFormPreview] = useState(false);
  const [fincaData, setFincaData] = useState({
    nombre: "",
    areaTotal: 0,
    areaEnUso: 0,
    geolocalizacion: "",
    idCorregimiento: { idCorregimiento: 1 },
    idMunicipio: { idMunicipio: "" },
  })

  const toggleFormPut = (finca) => {
    let tempiptState = {...inputsStates}
    setShowErrors(false)
    setFincaData(finca);
    Object.entries(finca).forEach(([key, value]) => {
      if(key === "loteEntityCollection"){
        return;
      }
      if (value !== undefined && value !== null && value !== "") {
        tempiptState[key] = true
      }else{
        tempiptState[key] = false
      }
    })
    setInputsStates(tempiptState)
    setIsFormPut(!isFormPut);
  }

  const toggleFormPreview = (finca) => {
    setFincaData(finca);
    setIsFormPreview(!isFormPreview);
  }

  useEffect(() => {
    if (updateOrAdd) {
      getFincas();
      setUpdateOrAdd(false);
    }
  }, [updateOrAdd])

  const isvalidateInput = () => {
    const arrInputsStates = Object.keys(inputsStates).map(key => inputsStates[key])
    const validateSecondInputs = arrInputsStates.every(key => key)
    return validateSecondInputs
  }

const handlePut = async () => {
  setShowErrors(true)
  const validate = isvalidateInput()
  if (!validate) return

  await putFinca(fincaData);
  clearForm();
  setIsFormPut(!isFormPut);
  setUpdateOrAdd(true);

  setShowErrors(false)
  setInputsStates({})
}

  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }

  const filter = () => {
    const result = fincas.filter((finca) =>
      finca.nombre.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  }

  const filteredFincas = () => {
    if (search.length === 0) return fincas.slice(currentPage, currentPage + 9);

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
  const handleModalMapa = () => {
    setModalMapa(!modalMapa)
  }
  const handleLocationSave = (location) => {
    let {lat, lng} = location;
    setInputsStates({...inputsStates, geolocalizacion:true})
    setFincaData({...fincaData, geolocalizacion: `${lat},${lng}`});
  }
  return (
    <>
      <Toaster />
      {isFormPut &&
        <FormPut
          data={fincaData}
          onSubmit={handlePut}
          isFormPut={isFormPut}
          showErros={showErros}
          setData={setFincaData}
          municipios={municipios}
          inputsStates={inputsStates}
          setIsFormPut={setIsFormPut}
          agricultores={agricultores}
          setShowErrors={setShowErrors}
          corregimientos={corregimientos}
          handleModalHelp={handleModalHelp}
          setInputsStates={setInputsStates}
          handleModalMapa={handleModalMapa}
          getCorregimientos={getCorregimientos}
        />
      }
      {isFormPreview &&
        <Preview
          data={fincaData}
          veredas={veredas}
          onSubmit={handlePut}
          setData={setFincaData}
          municipios={municipios}
          agricultores={agricultores}
          isFormPreview={isFormPreview}
          corregimientos={corregimientos}
          setIsFormPreview={setIsFormPreview}
        />
      }
      {
        modalMapa &&
          <ModalMapa
            location={location}
            modalMapa={modalMapa}
            setLocation={setLocation}
            setModalMapa={setModalMapa}
            handleModalMapa={handleModalMapa}
            handleLocationSave={handleLocationSave}
          />
      }
      {
        !isLoading && fincas.length > 0 
          ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-100 gap-4">
              {
                filteredFincas().map((finca, x) => 
                  <div key={x} className="bg-white shadow-md p-4 rounded-md overflow-hidden">
                    <p><b>Identificador: </b> {finca.idFinca}</p>
                    <p><b>Nombre de Finca: </b> {finca.nombre}</p>
                    <p><b>Area total: </b> {finca.areaTotal}</p>
                    <p><b>Area en uso: </b> {finca.areaEnUso}</p>
                    <p className="flex flex-wrap"><b>Geolocalización: </b> {finca.geolocalizacion}</p>
                    <p><b>Vereda: </b> {finca?.idCorregimiento?.nombre}</p>
                    <p><b>Municipio: </b> {finca?.idMunicipio?.nombre}</p>
                    <div className="flex items-center flex-wrap gap-2 mt-3">
                      <p
                        onClick={() => { toggleFormPut(finca) }}
                        className="cursor-pointer hover:bg-yellow-300 flex items-center gap-2 px-3 py-1 bg-yellow-400 rounded-full duration-300"
                      >
                        <FontAwesomeIcon icon={faEdit}/>
                        Editar
                      </p>
                      <p
                        onClick={() => { toggleFormPreview(finca) }}
                        className="cursor-pointer hover:bg-gray-200 flex items-center gap-2 px-3 py-1 bg-gray-300 rounded-full duration-300"
                      >
                        <FontAwesomeIcon icon={faCircleExclamation}/>
                        Ver detalle
                      </p>
                    </div>
                  </div>
                )
              }
            </div>
          :
            <div className="bg-white h-96 text-center w-full flex items-center justify-center">
              <div>
                <NoFoundData />
                <p>No se encontraron fincas registradas.</p>
              </div>
            </div>
      }      
      <div className="flex mt-3 gap-2">
        <div
          onClick={prevPage}
          className="btn gap-2 bg-gray-700 rounded-md text-white hover:bg-green-900 cursor-pointer flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          Anterior
        </div>
        <div
          onClick={nextPage}
          className="btn gap-2 bg-green-700 rounded-md text-white hover:bg-green-900 cursor-pointer flex items-center justify-center"
        >
          Siguiente
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </>
  );
};

export default Index;
