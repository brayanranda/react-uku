import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import ElementoContext from "../../context/ElementoContext";
import ElementoVariedadContext from "../../context/ElementoVariedadContext";
import VariedadContext from "../../context/VariedadContext";
import FormPost from "./FormPost";
import ListVariedades from "./List";

const Index = () => {
  const { getElementosVariedades, elementosVariedades, postData, isLoading } =
    useContext(ElementoVariedadContext);
  const { getElementos, elementos } = useContext(ElementoContext);
  const { getVariedades, variedades } = useContext(VariedadContext);
  const [isFormPost, setIsFormPost] = useState(false);
  const [updateOrAdd, setUpdateOrAdd] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [elementoData, setElementoData] = useState({
    nombre: "",
    idElemento: { id: "" },
    idVariedad: { id: "" },
    valorMaximo: "",
    valorMinimo: "",
    valorOptimo: "",
  });

  useEffect(() => {
    getElementos();
    getVariedades();
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
            variedades={variedades}
          />
        ) : null}
        <Row>
           <Col>
            <div className="flex items-center mb-4 justify-between w-100">
              <div className="flex items-center">
                
                
                <p className="text-2xl ml-2 text-green-700">
                  Lista Elementos Variedad
                </p>
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
              <button
                onClick={() => toggleFormPost()}
                className="bg-green-700 rounded-md text-white hover:bg-green-700"
              >
                Agregar Elemento Variedad
              </button>
            </div>
            <ListVariedades
              getElementosVariedades={getElementosVariedades}
              elementosVariedades={elementosVariedades}
              // elementos={elementos}
              // variedades={variedades}
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
