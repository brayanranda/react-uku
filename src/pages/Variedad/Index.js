import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import TipoCultivoContext from "../../context/TipoCultivoContext";
import VariedadContext from "../../context/VariedadContext";
import FormPost from "./FormPost";
import ListVariedades from "./List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  const { getVariedades, variedades, putData, postData, isLoading } = useContext(VariedadContext);
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
  })

  useEffect(() => {
    getTiposCultivos();
  }, [])

  const handleSave = async () => {
    await postData(variedadData);
    setIsFormPost(!isFormPost);
    setUpdateOrAdd(true);
  }

  const onSearchChange = ({ target }) => {
    setCurrentPage(0)
    setSearch(target.value)
  }

  const toggleFormPost = () => {
    setIsFormPost(!isFormPost)
  }

  return (
    <div className="col-10 fixed top-0 right-0 p-5 overflow-y-scroll max-h-screen">
      <div className="w-100 mt-16">
        {isFormPost ? (
          <FormPost
            data={variedadData}
            onSubmit={handleSave}
            isFormPost={isFormPost}
            setData={setVariedadData}
            setIsFormPost={setIsFormPost}
            tiposcultivos={tiposcultivos}
          />
        ) : null}
        <Row>
          <Col className="col-uku">
            <div className="flex items-center mb-4 justify-between w-100">
              <div className="flex items-center">
                <p className="text-2xl mr-2">Inicio</p>
                <p className="text-2xl ml-2 text-green-700">Lista Variedades</p>
              </div>
              <div className="md:w-25 lg:w-2/6 xl:w-50 mr-4 ml-auto">
                <input
                  type="text"
                  value={search}
                  className="form-control"
                  onChange={onSearchChange}
                  placeholder="Buscar por nombre"
                />
              </div>
              <button onClick={() => toggleFormPost()} className="bg-green-700 rounded-md py-1 px-2 text-white hover:bg-green-700 flex items-center gap-2 font-sm">
                <FontAwesomeIcon
                  className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800"
                  icon={faPlus}
                />
                Agregar Cultivo
              </button>
            </div>
            <ListVariedades
              search={search}
              putData={putData}
              isLoading={isLoading}
              variedades={variedades}
              currentPage={currentPage}
              updateOrAdd={updateOrAdd}
              tiposcultivos={tiposcultivos}
              getVariedades={getVariedades}
              setUpdateOrAdd={setUpdateOrAdd}
              setCurrentPage={setCurrentPage}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
