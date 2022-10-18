import React, { useState, useContext } from "react";
import { Col, Row } from "reactstrap";
import TipoCultivoContext from "../../context/TipoCultivoContext";
import FormPost from "./FormPost";
import ListTipoCultivo from "./List";

const Index = () => {
  const { getTiposCultivos, tiposcultivos, putData, postData } =
    useContext(TipoCultivoContext);
  const [isFormPost, setIsFormPost] = useState(false);
  const [tipoCultivoData, setTipoCultivoData] = useState({
    descripcion: "",
    variedadCollection: null,
  });

  const handleSave = async () => {
    await postData(tipoCultivoData);
    await getTiposCultivos();
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
            data={tipoCultivoData}
            setData={setTipoCultivoData}
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
                  Lista de tipo de cultivos
                </p>
              </div>
              <button
                onClick={() => toggleFormPost()}
                className="bg-green-700 rounded-md text-white hover:bg-green-700"
              >
                Agregar Tipo cultivo
              </button>
            </div>
            <div className="rounded-2xl bg-white shadow-sm">
              <ListTipoCultivo
                getTiposCultivos={getTiposCultivos}
                tiposcultivos={tiposcultivos}
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
