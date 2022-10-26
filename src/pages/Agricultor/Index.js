import React, { useState, useContext } from "react";
import { Col, Row } from "reactstrap";
import AgricultorContext from "../../context/AgricultorContext";
import FormPost from "./FormPost";
import ListAgricultor from "./List";

const Index = () => {
  const {
    getAgricultores,
    agricultores,
    putData,
    postData,
    isLoading,
    setIsLoading,
  } = useContext(AgricultorContext);
  const [isFormPost, setIsFormPost] = useState(false);
  const [updateOrAdd, setUpdateOrAdd] = useState(true);
  const [agricultorData, setAgricultorData] = useState({
    nombres: "",
    apellidos: "",
    identificacion: "",
    email: "",
    telefono: "",
    password: "",
    fechaNacimiento: "",
    confirmationToken: "",
    estado: false,
    fincaCollection: null,
    passwordResetTokens: null,
    idTipoIdentificacion: {
      idTipo: 1,
      nombre: "CC",
      agricultorCollection: null,
    },
  });

  const handleSave = async () => {
    await postData(agricultorData);
    setIsFormPost(!isFormPost);
    setUpdateOrAdd(true);
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
            data={agricultorData}
            setData={setAgricultorData}
            onSubmit={handleSave}
          />
        ) : null}
        <Row>
          <Col className="col-uku">
            <div className="flex items-center mb-4 justify-between w-100">
              <div className="flex items-center">
                <p className="text-2xl mr-2">Inicio</p>
                <p className="text-2xl">/</p>
                <p className="text-2xl ml-2 text-green-700">
                  Lista Agricultores
                </p>
              </div>
              <button
                onClick={() => toggleFormPost()}
                className="bg-green-700 rounded-md text-white hover:bg-green-700"
              >
                Agregar agricultor
              </button>
            </div>
            <ListAgricultor
              getAgricultores={getAgricultores}
              agricultores={agricultores}
              putData={putData}
              updateOrAdd={updateOrAdd}
              setUpdateOrAdd={setUpdateOrAdd}
              isLoading={isLoading}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
