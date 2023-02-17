import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import FincaContext from "../../context/FincaContext";
import FormPost from "./FormPost";
import ListVariedad from "./List";
import AgricultorContext from "../../context/AgricultorContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  const {
    getFincas,
    fincas,
    getCorregimientos,
    corregimientos,
    getMunicipios,
    municipios,
    getVeredas,
    veredas,
    putData,
    postData,
    isLoading,
  } = useContext(FincaContext);
  const { getAgricultores, agricultores } = useContext(AgricultorContext);
  const [isFormPost, setIsFormPost] = useState(false);
  const [updateOrAdd, setUpdateOrAdd] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [fincaData, setFincaData] = useState({
    nombre: "",
    areaTotal: "",
    areaEnUso: "",
    geolocalizacion: "",
    idAgricultor: { identificacion: "" },
    idCorregimiento: { idCorregimiento: "" },
    idMunicipio: { idMunicipio: "" },
    idVereda: { idVereda: "" },
  });
  const clearForm = () => {
    setFincaData({
      nombre: "",
      areaTotal: "",
      areaEnUso: "",
      geolocalizacion: "",
      idAgricultor: { identificacion: "" },
      idCorregimiento: { idCorregimiento: "" },
      idMunicipio: { idMunicipio: "" },
      idVereda: { idVereda: "" },
    });
  };

  useEffect(() => {
    getAgricultores();
    getCorregimientos();
    getMunicipios();
    getVeredas();
  }, []);

  const handleSave = async () => {
    await postData(fincaData);
    clearForm();
    setIsFormPost(!isFormPost);
    setUpdateOrAdd(true);
  };

  const onSearchChange = ({ target }) => {
    setCurrentPage(0);
    setSearch(target.value);
  };
  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
  };

  return (
    <div className="col-10 fixed top-0 right-0 p-5 overflow-y-scroll max-h-screen">
      <div className="w-100 mt-16">
        {isFormPost ? (
          <FormPost
            isFormPost={isFormPost}
            setIsFormPost={setIsFormPost}
            data={fincaData}
            setData={setFincaData}
            onSubmit={handleSave}
            corregimientos={corregimientos}
            municipios={municipios}
            veredas={veredas}
            agricultores={agricultores}
          />
        ) : null}
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
                  className="form-control"
                  placeholder="Buscar por nombre"
                  value={search}
                  onChange={onSearchChange}
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
              getFincas={getFincas}
              fincas={fincas}
              putData={putData}
              corregimientos={corregimientos}
              municipios={municipios}
              veredas={veredas}
              agricultores={agricultores}
              updateOrAdd={updateOrAdd}
              setUpdateOrAdd={setUpdateOrAdd}
              isLoading={isLoading}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              search={search}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
