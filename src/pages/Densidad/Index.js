import React, { useState, useContext } from "react";
import { Col, Row } from "reactstrap";
import DensidadContext from "../../context/DensidadContext";
import FormPost from "./FormPost";
import ListVariedades from "./List";

const Index = () => {
  const { getDensidades, densidades, postData, putData, isLoading } = useContext(DensidadContext);
  const [isFormPost, setIsFormPost] = useState(false);
  const [updateOrAdd, setUpdateOrAdd] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [inputsStates, setInputsStates] = useState({});
  const [densidadData, setDensidadData] = useState({
    valor: "",
    idDensidad: "",
    analisisSueloCollection: null,
  })

  const validateInput = () => {
    const arrInputs = Object.keys(inputsStates).map((key) => inputsStates[key]);
    const validateFirstInputs = arrInputs.every((key) => key);
    return validateFirstInputs;
  }

  const handleSave = async () => {
    const validate = validateInput();
    if (validate === false) {
      return;
    }
    await postData(densidadData);
    setIsFormPost(!isFormPost);
    setInputsStates({});
    setUpdateOrAdd(true);
  }

  const onSearchChange = ({ target }) => {
    setCurrentPage(0);
    setSearch(target.value);
  }

  const toggleFormPost = () => {
    setInputsStates({});
    setIsFormPost(!isFormPost);
  }

  return (
    <div className="col-10 fixed top-0 right-0 p-5 overflow-y-scroll max-h-screen">
      <div className="w-100 mt-16">
        {isFormPost ? (
          <FormPost
            isFormPost={isFormPost}
            setIsFormPost={setIsFormPost}
            data={densidadData}
            setData={setDensidadData}
            onSubmit={handleSave}
            inputsStates={inputsStates}
            setInputsStates={setInputsStates}
          />
        ) : null}
        <Row>
          <Col className="col-uku">
            <div className="flex items-center mb-4 justify-between w-100">
              <div className="flex items-center">
                <p className="text-2xl mr-2">Inicio</p>
                <p className="text-2xl">/</p>
                <p className="text-2xl ml-2 text-green-700">Lista Densidades</p>
              </div>
              <div className="md:w-25 lg:w-2/6 xl:w-50 mr-4 ml-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por valor"
                  value={search}
                  onChange={onSearchChange}
                />
              </div>
              <button
                onClick={() => toggleFormPost()}
                className="bg-green-700 rounded-md text-white hover:bg-green-700"
              >
                Agregar Densidad
              </button>
            </div>
            <ListVariedades
              getDensidades={getDensidades}
              densidades={densidades}
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
