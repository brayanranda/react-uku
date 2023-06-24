import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import FincaContext from "../../context/FincaContext";
import FormPost from "./FormPost";
import ListFinca from "./List";
import AgricultorContext from "../../context/AgricultorContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalMapa from "./ModalMapa";
import { Toaster } from "react-hot-toast";
import ModalAyuda from "../../UI/organism/ModalAyuda";

const Index = () => {
  const {
    fincas,
    veredas,
    putFinca,
    postFinca,
    getFincas,
    isLoading,
    municipios,
    getVeredas,
    getMunicipios,
    corregimientos,
    getCorregimientos,
  } = useContext(FincaContext);

  const { getAgricultores, agricultores } = useContext(AgricultorContext);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalMapa, setModalMapa] = useState(false);
  const [modalHelp, setModalHelp ] = useState(false);
  const [showErros, setShowErrors] = useState(false);
  const [isFormPost, setIsFormPost] = useState(false);
  const [updateOrAdd, setUpdateOrAdd] = useState(true);

  const textoForm = [
    {
      title: "NOMBRE: ",
      description: "Ingresar el nombre de la finca o de la unidad de producción."
    },
    {
      title: "AREA TOTAL: ",
      description: "Ingresar en número el área total de la finca en hectáreas."
    },
    {
      title: "AREA EN USO: ",
      description: "Ingresar en número el área en uso para el cultivo expresada en hectáreas."
    },
    {
      title: "GEOLOCALIZACIÓN: ",
      description: "Corresponde a las coordenadas geográficas expresadas en metros. Se determinan ubicando con el cursor la finca en el mapa mostrado por el geo- navegador usado en el sistema."
    },
  ]

  const [fincaData, setFincaData] = useState({
    nombre: "",
    areaTotal: "",
    areaEnUso: "",
    geolocalizacion: "",
    idCorregimiento: { idCorregimiento: "" },
    idMunicipio: { idMunicipio: "" },
    idVereda: { idVereda: "" },
    precipitacion: "",
  })

  const [inputsStates, setInputsStates] = useState({
      nombre: false,
      areaTotal: false,
      areaEnUso: false,
      geolocalizacion: true,
      idMunicipio: false ,
      idVereda: false ,
      precipitacion: false,
  })

  const clearForm = () => {
    setFincaData({
      nombre: "",
      areaTotal: "",
      areaEnUso: "",
      geolocalizacion: "",
      idCorregimiento: { idCorregimiento: "" },
      idMunicipio: { idMunicipio: "" },
      idVereda: { idVereda: "" },
    });
  }
  
  const handleModalHelp = () => {
    setModalHelp(!modalHelp)
  }

  const handleModalMapa = () => {
    setModalMapa(!modalMapa)
  }

  useEffect(() => {
    getAgricultores();
    getCorregimientos();
    getMunicipios();
    getVeredas();
  }, [])

  const isvalidateInput = () => {
      const arrInputsStates = Object.keys(inputsStates).map(key => inputsStates[key])
      const validateSecondInputs = arrInputsStates.every(key => key)
      return validateSecondInputs
  }

  const handleSave = async () => {
    setShowErrors(true)
    const validate = isvalidateInput()
    if (!validate) return

    await postFinca(fincaData);
    clearForm();
    setIsFormPost(!isFormPost);
    setUpdateOrAdd(true);

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

  const handleLocationSave = (location) => {
    let {lat, lng} = location;
    setFincaData({...fincaData, geolocalizacion: `${lat},${lng}`});
  }

  return (
    <>
      <Toaster />
      <div className="col-12 col-lg-10 fixed top-0 right-0 p-4 overflow-y-scroll max-h-screen">
        <div className="w-100 mt-16">
          {
            isFormPost &&
              <FormPost
                data={fincaData}
                veredas={veredas}
                location={location}
                onSubmit={handleSave}
                showErros={showErros}
                setData={setFincaData}
                isFormPost={isFormPost}
                municipios={municipios}
                inputsStates={inputsStates}
                agricultores={agricultores}
                setShowErrors={setShowErrors}
                setIsFormPost={setIsFormPost}
                corregimientos={corregimientos}
                handleModalHelp={handleModalHelp}
                handleModalMapa={handleModalMapa}
                setInputsStates={setInputsStates}
              />
          }
          {
            modalHelp &&
              <ModalAyuda
                modalHelp={modalHelp}
                textoForm={textoForm}
                setModalHelp={setModalHelp}
                handleModalHelp={handleModalHelp}
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
          <Row>
             <Col>
              <div className="md:flex gap-3 items-center mb-6 justify-between w-100 mt-3">
                <p className="text-2xl ml-2 text-green-700">Lista Fincas</p>
                <div className="flex items-center mt-3 mb:mt-0">
                  <div className="w-52 md:w-96 mr-4">
                    <input
                      type="text"
                      value={search}
                      onChange={onSearchChange}
                      className="form-control rounded-full"
                      placeholder="Buscar..."
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
              <ListFinca
                fincas={fincas}
                search={search}
                veredas={veredas}
                putFinca={putFinca}
                getFincas={getFincas}
                showErros={showErros}
                clearForm={clearForm}
                isLoading={isLoading}
                municipios={municipios}
                currentPage={currentPage}
                updateOrAdd={updateOrAdd}
                agricultores={agricultores}
                inputsStates={inputsStates}
                setShowErrors={setShowErrors}
                setUpdateOrAdd={setUpdateOrAdd}
                setCurrentPage={setCurrentPage}
                corregimientos={corregimientos}
                handleModalHelp={handleModalHelp}
                setInputsStates={setInputsStates}
                handleModalMapa={handleModalMapa}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Index;
