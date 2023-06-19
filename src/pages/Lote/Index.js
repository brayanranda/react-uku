import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import ListaLote from "./List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FormPost from "./FormPost";
import LotesContext from "../../context/LotesContext";
import { useParams } from "react-router-dom";
import FormPut from "./FormPut";

const Index = () => {
  let { idFinca } = useParams()
  const { getLotes, lotes, postLote, putLote } = useContext(LotesContext)
  const [isFormPost, setIsFormPost] = useState(false)
  const [isFormPut, setIsFormPut] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState("")
  const [loteData, setLoteData] = useState({descripcion: ""})

  const clearForm = () => {
    setLoteData({descripcion: ""});
  }

  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
  }

  const toggleFormPut = () => {
    setIsFormPut(!isFormPut);
  }

  useEffect(() => {
    getLotes(idFinca)
  }, [])

  const handleSave = async () => {
    await postLote(loteData, idFinca)
    clearForm();
    setIsFormPost(!isFormPost);
    await getLotes(idFinca)
  }

  const handlePut = async (idLote) => {
    await putLote(loteData, idLote)
    clearForm();
    setIsFormPost(!isFormPost);
    await getLotes(idFinca)
  }

  return (
    <div className="col-10 fixed top-0 right-0 p-5 overflow-y-scroll max-h-screen">
      <div className="w-100 mt-16">
        {
          isFormPost &&
            <FormPost
              loteData={loteData}
              isFormPost={isFormPost}
              handleSave={handleSave}
              setLoteData={setLoteData}
              setIsFormPost={setIsFormPost}
              toggleFormPost={toggleFormPost}
            />
        }
        {
          isFormPut &&
            <FormPut
              loteData={loteData}
              isFormPut={isFormPut}
              handlePut={handlePut}
              setLoteData={setLoteData}
              setIsFormPut={setIsFormPut}
              toggleFormPut={toggleFormPut}
            />
        }
        <Row>
          <Col className="col-uku">
            <div className="flex items-center mb-4 justify-between w-100 mt-3">
              <div className="flex items-center">
                <p className="text-2xl mr-2">Inicio</p>
                <p className="text-2xl">/</p>
                <p className="text-2xl ml-2 text-green-700">Lista Lotes</p>
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
                Agregar Lote
              </button>
            </div>
            <ListaLote
              lotes={lotes}
              search={search}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
