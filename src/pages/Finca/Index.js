import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import FincaContext from "../../context/FincaContext";
import FormPost from "./FormPost";
import ListVariedad from "./List";
import AgricultorContext from "../../context/AgricultorContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalMapa from "./ModalMapa";

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
  const [isFormPost, setIsFormPost] = useState(false);
  const [modalMapa, setModalMapa] = useState(false);
  const [updateOrAdd, setUpdateOrAdd] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(null);

  const [fincaData, setFincaData] = useState({
    nombre: "",
    areaTotal: "",
    areaEnUso: "",
    geolocalizacion: "",
    idCorregimiento: { idCorregimiento: "" },
    idMunicipio: { idMunicipio: "" },
    idVereda: { idVereda: "" },
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

  const handleModalMapa = () => {
    setModalMapa(!modalMapa)
  }

  useEffect(() => {
    getAgricultores();
    getCorregimientos();
    getMunicipios();
    getVeredas();
  }, [])

  const handleSave = async () => {
    await postFinca(fincaData);
    clearForm();
    setIsFormPost(!isFormPost);
    setUpdateOrAdd(true);
  }

  const onSearchChange = ({ target }) => {
    setCurrentPage(0);
    setSearch(target.value);
  }

  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
  }

  const handleLocationSave = (location) => {
    // Aquí puedes enviar la ubicación al servidor para guardarla
    console.log('Ubicación guardada:', location);
  };

  return (
    <div className="col-10 fixed top-0 right-0 p-5 overflow-y-scroll max-h-screen">
      <div className="w-100 mt-16">
        {
          isFormPost &&
            <FormPost
              data={fincaData}
              veredas={veredas}
              location={location}
              onSubmit={handleSave}
              setData={setFincaData}
              isFormPost={isFormPost}
              municipios={municipios}
              agricultores={agricultores}
              setIsFormPost={setIsFormPost}
              corregimientos={corregimientos}
              handleModalMapa={handleModalMapa}
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
          <Col className="col-uku">
            <div className="flex items-center mb-4 justify-between w-100 mt-3">
              <div className="flex items-center">
                <p className="text-2xl mr-2">Inicio</p>
                <p className="text-2xl">/</p>
                <p className="text-2xl ml-2 text-green-700">Lista Fincas</p>
              </div>
              <div className="md:w-25 lg:w-2/6 xl:w-50 mr-4 ml-auto">
                <input
                  type="text"
                  value={search}
                  className="form-control"
                  onChange={onSearchChange}
                  placeholder="Buscar por nombre"
                />
              </div>
              <button onClick={() => toggleFormPost()} className="bg-green-700 rounded-md py-1 px-2 text-white hover:bg-green-700 flex items-center gap-2 font-sm">
                  <FontAwesomeIcon
                    className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800"
                    icon={faPlus}
                  />
                Agregar Finca
              </button>
            </div>
            <ListVariedad
              fincas={fincas}
              search={search}
              putFinca={putFinca}
              veredas={veredas}
              getFincas={getFincas}
              isLoading={isLoading}
              municipios={municipios}
              currentPage={currentPage}
              updateOrAdd={updateOrAdd}
              agricultores={agricultores}
              setUpdateOrAdd={setUpdateOrAdd}
              setCurrentPage={setCurrentPage}
              corregimientos={corregimientos}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
