import React, { useState, useContext } from "react";
import { Col, Row } from "reactstrap";
import TipoCultivoContext from "../../context/TipoCultivoContext";
import FormPost from "./FormPost";
import ListTipoCultivo from "./List";

const Index = () => {
  const { getTiposCultivos, tiposcultivos, putData, postData, isLoading } =
    useContext(TipoCultivoContext);
  const [isFormPost, setIsFormPost] = useState(false);
  const [updateOrAdd, setUpdateOrAdd] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [tipoCultivoData, setTipoCultivoData] = useState({
    descripcion: "",
    variedadCollection: null,
  });

  const handleSave = async () => {
    await postData(tipoCultivoData);
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
            data={tipoCultivoData}
            setData={setTipoCultivoData}
            onSubmit={handleSave}
          />
        ) : null}
        <Row>
           <Col>
            <div className="flex items-center mb-4 justify-between w-100">
              <div className="flex items-center">
                
                
                <p className="text-2xl ml-2 text-green-700">
                  Lista de tipo de cultivos
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
                Agregar Tipo cultivo
              </button>
            </div>

            <ListTipoCultivo
              getTiposCultivos={getTiposCultivos}
              tiposcultivos={tiposcultivos}
              putData={putData}
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
