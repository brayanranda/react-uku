import React, { useState, useContext } from "react";
import { Col, Row } from "reactstrap";
import VariedadContext from "../../context/VariedadContext";
import FormPost from "./FormPost";
import ListVariedades from "./List";

const Index = () => {
  const { getVariedades, variedades, putData, postData } =
    useContext(VariedadContext);
  const [isFormPost, setIsFormPost] = useState(false);
  const [variedadData, setVariedadData] = useState({
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
    await postData(variedadData);
    await getVariedades();
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
            data={variedadData}
            setData={setVariedadData}
            onSubmit={handleSave}
          />
        ) : null}
        <Row>
          <Col className="col-uku">
            <div className="flex items-center mb-4 justify-between w-100">
              <div className="flex items-center">
                <p className="text-2xl mr-2">Inicio</p>
                <p className="text-2xl">/</p>
                <p className="text-2xl ml-2 text-green-700">Lista Variedades</p>
              </div>
              <button
                onClick={() => toggleFormPost()}
                className="bg-green-700 rounded-md text-white hover:bg-green-700"
              >
                Agregar Variedad
              </button>
            </div>
            <div className="rounded-2xl bg-white shadow-sm">
              <ListVariedades
                getVariedades={getVariedades}
                variedades={variedades}
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
