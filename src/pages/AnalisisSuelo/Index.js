import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import AnalisisSueloContext from "../../context/AnalisisSueloContext";
import CultivoContext from "../../context/CultivoContext";
import DensidadContext from "../../context/DensidadContext";
import FormPost from "./FormPost";
import ListVariedades from "./List";

const Index = () => {
  const {
    getAnalisisSuelos,
    analisisSuelos,
    getClaseTextural,
    getProfundidad,
    claseTextural,
    profundidad,
    postData,
    putData,
    isLoading,
  } = useContext(AnalisisSueloContext);
  const { getCultivos, cultivos } = useContext(CultivoContext);
  const { getDensidades, densidades } = useContext(DensidadContext);
  const [isFormPost, setIsFormPost] = useState(false);
  const [updateOrAdd, setUpdateOrAdd] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [elementoData, setElementoData] = useState({
    porcentArena: "",
    porcentLimos: "",
    porcentArcilla: "",
    fecha: "",
    idClaseTextural: { idClaseTextural: "" },
    idCultivo: { idCultivo: "" },
    idDensidad: { idDensidad: "" },
    idProfundidad: { idProfundidadMuestra: "", profundidad: "" },
  });

  useEffect(() => {
    getCultivos();
    getDensidades();
    getClaseTextural();
    getProfundidad();
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
    <div className="col-10 fixed top-0 right-0 p-5 overflow-y-scroll max-h-screen">
      <div className="w-100 mt-16">
        {isFormPost ? (
          <FormPost
            isFormPost={isFormPost}
            setIsFormPost={setIsFormPost}
            data={elementoData}
            setData={setElementoData}
            onSubmit={handleSave}
            cultivos={cultivos}
            densidades={densidades}
            claseTextural={claseTextural}
            profundidad={profundidad}
          />
        ) : null}
        <Row>
          <Col className="col-uku">
            <div className="flex items-center mb-4 justify-between w-100">
              <div className="flex items-center">
                <p className="text-2xl mr-2">Inicio</p>
                <p className="text-2xl">/</p>
                <p className="text-2xl ml-2 text-green-700">
                  Lista Analisis Suelo
                </p>
              </div>
              <div className="md:w-25 lg:w-2/6 xl:w-50 mr-4 ml-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por clase textural"
                  value={search}
                  onChange={onSearchChange}
                />
              </div>
              <button
                onClick={() => toggleFormPost()}
                className="bg-green-700 rounded-md text-white hover:bg-green-700"
              >
                Agregar Analisis Suelo
              </button>
            </div>
            <ListVariedades
              getAnalisisSuelos={getAnalisisSuelos}
              analisisSuelos={analisisSuelos}
              putData={putData}
              updateOrAdd={updateOrAdd}
              setUpdateOrAdd={setUpdateOrAdd}
              isLoading={isLoading}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              search={search}
              cultivos={cultivos}
              densidades={densidades}
              claseTextural={claseTextural}
              profundidad={profundidad}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
