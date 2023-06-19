import React, { useState, useContext } from "react";
import { Col, Row } from "reactstrap";
import DistanciaSiembraContext from "../../context/DistanciaSiembraContext";
import FormPost from "./FormPost";
import ListVariedades from "./List";

const Index = () => {
  const {
    putData,
    postData,
    isLoading,
    distanciaSiembras,
    getDistanciaSiembras,
  } = useContext(DistanciaSiembraContext);
  const [isFormPost, setIsFormPost] = useState(false);
  const [updateOrAdd, setUpdateOrAdd] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [distanciaSiembrasData, setDistanciaSiembrasData] = useState({
    descripcion: "",
    id: "",
  })

  const handleSave = async () => {
    await postData(distanciaSiembrasData);
    setIsFormPost(!isFormPost);
    setUpdateOrAdd(true);
  }

  const onSearchChange = ({ target }) => {
    setCurrentPage(0);
    setSearch(target.value);
  }

  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
  }
  
  return (
    <div className="col-10 fixed top-0 right-0 p-5 overflow-y-scroll max-h-screen">
      <div className="w-100 mt-16">
        {isFormPost ? (
          <FormPost
          onSubmit={handleSave}
            isFormPost={isFormPost}
            data={distanciaSiembrasData}
            setIsFormPost={setIsFormPost}
            setData={setDistanciaSiembrasData}
          />
        ) : null}
        <Row>
          <Col className="col-uku">
            <div className="flex items-center mb-4 justify-between w-100">
              <div className="flex items-center">
                <p className="text-2xl mr-2">Inicio</p>
                <p className="text-2xl">/</p>
                <p className="text-2xl ml-2 text-green-700">Lista Distancia Siembras</p>
              </div>
              <div className="md:w-25 lg:w-2/6 xl:w-50 mr-4 ml-auto">
                <input
                  type="text"
                  value={search}
                  className="form-control"
                  onChange={onSearchChange}
                  placeholder="Buscar por descripcion"
                />
              </div>
              <button
                onClick={() => toggleFormPost()}
                className="bg-green-700 rounded-md text-white hover:bg-green-700"
              >
                Agregar Distancia Siembras
              </button>
            </div>
            <ListVariedades
              search={search}
              putData={putData}
              isLoading={isLoading}
              updateOrAdd={updateOrAdd}
              currentPage={currentPage}
              setUpdateOrAdd={setUpdateOrAdd}
              setCurrentPage={setCurrentPage}
              getDistanciaSiembras={getDistanciaSiembras}
              distanciaSiembras={distanciaSiembras}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
