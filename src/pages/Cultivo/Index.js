import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import CultivoContext from "../../context/CultivoContext";
import DistanciaSiembraContext from "../../context/DistanciaSiembraContext";
import FincaContext from "../../context/FincaContext";
import TopografiaContext from "../../context/TopografiaContext";
import VariedadContext from "../../context/VariedadContext";
import FormPost from "./FormPost";
import ListVariedades from "./List";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Index = () => {
  const {
    getCultivos,
    cultivos,
    getEtapasFenologicas,
    etapasFenologicas,
    putData,
    postData,
    isLoading,
  } = useContext(CultivoContext);
  const { getFincas, fincas } = useContext(FincaContext);
  const { getVariedades, variedades } = useContext(VariedadContext);
  const { getTopografias, topografias } = useContext(TopografiaContext);
  const { getDistanciaSiembras, distanciaSiembras } = useContext(
    DistanciaSiembraContext
  );
  const [isFormPost, setIsFormPost] = useState(false);
  const [updateOrAdd, setUpdateOrAdd] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [cultivoData, setCultivoData] = useState({
    descripcion: "",
    plantasPorHectarea: 0,
    idDistanciaSiembra: {},
    idEtapaFenologica: {},
    idFinca: {},
    idTopografia: {},
    idVariedad: {},
  });
  useEffect(() => {
    getDistanciaSiembras();
    getEtapasFenologicas();
    getFincas();
    getTopografias();
    getVariedades();
  }, []);

  const handleSave = async () => {
    await postData(cultivoData);
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
            data={cultivoData}
            setData={setCultivoData}
            onSubmit={handleSave}
            distanciaSiembras={distanciaSiembras}
            etapasFenologicas={etapasFenologicas}
            fincas={fincas}
            variedades={variedades}
            topografias={topografias}
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
                  placeholder="Buscar por descripcion"
                  value={search}
                  onChange={onSearchChange}
                />
              </div>
              <button onClick={() => toggleFormPost()} className="bg-green-700 rounded-md py-1 px-2 text-white hover:bg-green-700 flex items-center gap-2 font-sm">
                  <FontAwesomeIcon
                    className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800"
                    icon={faPlus}
                  />
                Agregar Variedad
              </button>
            </div>
            <ListVariedades
              getCultivos={getCultivos}
              cultivos={cultivos}
              putData={putData}
              updateOrAdd={updateOrAdd}
              setUpdateOrAdd={setUpdateOrAdd}
              isLoading={isLoading}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              search={search}
              distanciaSiembras={distanciaSiembras}
              etapasFenologicas={etapasFenologicas}
              fincas={fincas}
              variedades={variedades}
              topografias={topografias}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
