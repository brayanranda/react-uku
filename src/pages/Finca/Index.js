import React, { useState, useContext } from "react";
import { Col, Row } from "reactstrap";
import FincaContext from "../../context/FincaContext";
import FormPost from "./FormPost";
import ListAgricultor from "./List";

const Index = () => {
  const { getFincas, fincas, putData, postData } = useContext(FincaContext);
  const [isFormPost, setIsFormPost] = useState(false);
  const [fincaData, setFincaData] = useState({
    nombre: "",
    areaTotal: "",
    areaEnUso: "",
    geolocalizacion: "",
    ideAgricultor: { identificacion: 0 },
    idCorregimiento: { idCorregimiento: 1 },
    idMunicipio: { idMunicipio: 1 },
    idVereda: { idVereda: 1 },
  });

  const handleSave = async () => {
    await postData(fincaData);
    await getFincas();
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
              <ListAgricultor
                getFincas={getFincas}
                fincas={fincas}
                putData={putData}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
