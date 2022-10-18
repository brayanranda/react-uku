import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import FincaContext from "../../context/FincaContext";
import FormPost from "./FormPost";
import ListVariedad from "./List";
import AgricultorContext from "../../context/AgricultorContext";
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
  } = useContext(FincaContext);
  const { getAgricultores, agricultores } = useContext(AgricultorContext);
  const [isFormPost, setIsFormPost] = useState(false);
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
    await getFincas();
    clearForm();
    setIsFormPost(!isFormPost);
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
            <div className="flex items-center mb-4 justify-between w-100">
              <div className="flex items-center">
                <p className="text-2xl mr-2">Inicio</p>
                <p className="text-2xl">/</p>
                <p className="text-2xl ml-2 text-green-700">Lista Fincas</p>
              </div>
              <button
                onClick={() => toggleFormPost()}
                className="bg-green-700 rounded-md text-white hover:bg-green-700"
              >
                Agregar Finca
              </button>
            </div>
            <div className="rounded-2xl bg-white shadow-sm">
              <ListVariedad
                getFincas={getFincas}
                fincas={fincas}
                putData={putData}
                corregimientos={corregimientos}
                municipios={municipios}
                veredas={veredas}
                agricultores={agricultores}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
