import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import AnalisisElementoContext from "../../context/AnalisisElementoContext";
import AnalisisSueloContext from "../../context/AnalisisSueloContext";
import ElementoContext from "../../context/ElementoContext";
import FormPost from "./FormPost";
import ListVariedades from "./List";

const Index = () => {
  const { getAnalisisElementos, analisiselementos, postData, isLoading } =
    useContext(AnalisisElementoContext);
  const { getElementos, elementos } = useContext(ElementoContext);
  const { getAnalisisSuelos, analisisSuelos } =
    useContext(AnalisisSueloContext);
  const [isFormPost, setIsFormPost] = useState(false);
  const [updateOrAdd, setUpdateOrAdd] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [elementoData, setElementoData] = useState({
    valor: "",
    idElemento: { id: "" },
    idAnalisisSuelo: { idAnalisisSuelo: "" },
    id: "",
  });

  useEffect(() => {
    getElementos();
    getAnalisisSuelos();
  }, []);

  const handleSave = async () => {
    await postData(elementoData);
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
    <div className="col-12 col-lg-10 fixed top-0 right-0 p-4 overflow-y-scroll max-h-screen">
      <div className="w-100 mt-16">
        {isFormPost ? (
          <FormPost
            isFormPost={isFormPost}
            setIsFormPost={setIsFormPost}
            data={elementoData}
            setData={setElementoData}
            onSubmit={handleSave}
            elementos={elementos}
            analisisSuelos={analisisSuelos}
          />
        ) : null}
        <Row>
           <Col>
            <div className="md:flex items-center mb-4 justify-between w-100 mt-">
              <div className="flex items-center">
                
                
                <p className="text-2xl ml-2 text-green-700">
                  Lista Análisis Elementos
                </p>
              </div>
              <div className="flex items-center mt-3 mb:mt-0">
                <div className="w-52 md:w-96 mr-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por elemento"
                    value={search}
                    onChange={onSearchChange}
                  />
                </div>
                <button
                  onClick={() => toggleFormPost()}
                  className="bg-green-700 rounded-md text-white hover:bg-green-700"
                >
                  Agregar Analisis Elemento
                </button>
              </div>
            </div>
            <ListVariedades
              getAnalisisElementos={getAnalisisElementos}
              analisiselementos={analisiselementos}
              // elementos={elementos}
              // putData={putData}
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
