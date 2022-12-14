import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import TipoCultivoContext from "../../context/TipoCultivoContext";
import VariedadContext from "../../context/VariedadContext";
import FormPost from "./FormPost";
import ListVariedades from "./List";

const Index = () => {
  const { getVariedades, variedades, putData, postData, isLoading } =
    useContext(VariedadContext);
  const { getTiposCultivos, tiposcultivos } = useContext(TipoCultivoContext);
  const [isFormPost, setIsFormPost] = useState(false);
  const [updateOrAdd, setUpdateOrAdd] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [variedadData, setVariedadData] = useState({
    cultivoCollection: null,
    descripcion: "",
    idTipoCultivo: {
      id: 1,
      descripcion: "",
      variedadCollection: null,
    },
  });
  useEffect(() => {
    getTiposCultivos();
  }, []);

  const handleSave = async () => {
    await postData(variedadData);
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
            data={variedadData}
            setData={setVariedadData}
            onSubmit={handleSave}
            tiposcultivos={tiposcultivos}
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
                Agregar Variedad
              </button>
            </div>
            <ListVariedades
              getVariedades={getVariedades}
              variedades={variedades}
              putData={putData}
              tiposcultivos={tiposcultivos}
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
