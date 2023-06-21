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
    precipitacion: "",
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
             <Col>
              <div className="md:flex gap-3 items-center mb-6 justify-between w-100 mt-3">
                <p className="text-2xl ml-2 text-green-700">Lista Fincas</p>
                <div className="flex items-center mt-3 mb:mt-0">
                  <div className="w-52 md:w-96 mr-4">
                    <input
                      type="text"
                      value={search}
                      className="form-control rounded-full"
                      onChange={onSearchChange}
                      placeholder="Buscar por nombre"
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
