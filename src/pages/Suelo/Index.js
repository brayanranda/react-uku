import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import ListaSuelo from "./List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FormPost from "./FormPost";
import SuelosContext from "../../context/SuelosContext";
import { useParams } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  let { idLote } = useParams()
  const { getSuelos, suelos, postSuelo, putSuelo } = useContext(SuelosContext)
  const [isFormPost, setIsFormPost] = useState(false)
  const [idSuelo, setIdSuelo] = useState("")
  const [isFormPut, setIsFormPut] = useState(false)
  
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState("")
  const [sueloData, setSueloData] = useState({descripcion: ""})

  const clearForm = () => {
    setSueloData({descripcion: ""});
  }

  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
  }

  useEffect(() => {
    getSuelos(idLote)
  }, [])

  const handleSave = async () => {
    await postSuelo(sueloData, idLote)
    clearForm();
    setIsFormPost(!isFormPost);
    await getSuelos(idLote)
  }

  const handlePut = async () => {
    await putSuelo(sueloData, idSuelo)
    clearForm();
    setIsFormPut(!isFormPut)
    await getSuelos(idLote)
  }

  return (
    <div className="col-10 fixed top-0 right-0 p-5 overflow-y-scroll max-h-screen">
      <div className="w-100 mt-16">
      <ToastContainer />
        {
          isFormPost &&
            <FormPost
              sueloData={sueloData}
              isFormPost={isFormPost}
              handleSave={handleSave}
              setSueloData={setSueloData}
              setIsFormPost={setIsFormPost}
              toggleFormPost={toggleFormPost}
            />
        }
        <Row>
          <Col className="col-uku">
            <div className="flex items-center mb-4 justify-between w-100 mt-3">
              <div className="flex items-center">
                <p className="text-2xl mr-2">Inicio</p>
                <p className="text-2xl">/</p>
                <p className="text-2xl ml-2 text-green-700">Lista Suelos</p>
              </div>
              <div className="md:w-25 lg:w-2/6 xl:w-50 mr-4 ml-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nombre"
                />
              </div>
              <button onClick={() => toggleFormPost()} className="bg-green-700 rounded-md py-1 px-2 text-white hover:bg-green-700 flex items-center gap-2 font-sm">
                <FontAwesomeIcon
                  className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800"
                  icon={faPlus}
                />
                Agregar Suelo
              </button>
            </div>
            <ListaSuelo
              suelos={suelos}
              search={search}
              isFormPut={isFormPut}
              sueloData={sueloData}
              handlePut={handlePut}
              setIdSuelo={setIdSuelo}
              currentPage={currentPage}
              setIsFormPut={setIsFormPut}
              setSueloData={setSueloData}
              setCurrentPage={setCurrentPage}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
