import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import ListaLote from "./List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FormPost from "./FormPost";
import LotesContext from "../../context/LotesContext";
import { useParams } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from "react-hot-toast";

const Index = () => {
  let { idFinca } = useParams()
  const { getLotes, lotes, postLote, putLote, deleteLote } = useContext(LotesContext)
  const [isFormPost, setIsFormPost] = useState(false)
  const [isFormPut, setIsFormPut] = useState(false)
  const [idLote, setIdLote] = useState("")
  
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState("")
  const [loteData, setLoteData] = useState({descripcion: ""})

  const clearForm = () => {
    setLoteData({descripcion: ""});
  }

  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
  }


  useEffect(() => {
    getLotes(idFinca)
  }, [])

  const handleSave = async () => {
    if(loteData.descripcion !== "") {
      await postLote(loteData, idFinca)
      clearForm();
      setIsFormPost(!isFormPost);
      await getLotes(idFinca)
    } else {
      toast.error("Oops! Error, por favor revisa los campos.");
    }
  }

  const handlePut = async () => {
    if(loteData.descripcion !== "") {
      await putLote(loteData, idLote)
      clearForm();
      setIsFormPut(!isFormPut);
      await getLotes(idFinca)
    } else {
      toast.error("Oops! Error, por favor revisa los campos.");
    }
  }

  const handleDelete = async (id) => {
    await deleteLote(id)
    clearForm();
    await getLotes(idFinca)
  }

  const onSearchChange = ({ target }) => {
    setCurrentPage(0);
    setSearch(target.value);
  }

  return (
    <>
      <Toaster />
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
                    onChange={onSearchChange}
                    placeholder="Buscar por nombre"
                    className="form-control rounded-full"
                  />
                </div>
                <button
                  onClick={() => toggleFormPost()}
                  className="btn bg-green-700 hover:bg-green-800 rounded-full text-white duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <FontAwesomeIcon
                    className="duration-300 transform text-white hover:text-green-800"
                    icon={faPlus}
                  />
                  Agregar Lote
                </button>
              </div>
              <ListaLote
                lotes={lotes}
                search={search}
                idLote={idLote}
                loteData={loteData}
                isFormPut={isFormPut}
                setIdLote={setIdLote}
                handlePut={handlePut}
                setLoteData={setLoteData}
                currentPage={currentPage}
                setIsFormPut={setIsFormPut}
                handleDelete={handleDelete}
                setCurrentPage={setCurrentPage}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Index;
