import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import ListaSuelo from "./List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FormPost from "./FormPost";
import SuelosContext from "../../context/SuelosContext";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
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
    if(sueloData.descripcion !== "") {
      await postSuelo(sueloData, idLote)
      clearForm();
      setIsFormPost(!isFormPost);
      await getSuelos(idLote)
    } else {
      toast.error("Oops! Error, por favor revisa los campos");
    }
  }

  const handlePut = async () => {
    if(sueloData.descripcion !== "") {
      await putSuelo(sueloData, idSuelo)
      clearForm();
      setIsFormPut(!isFormPut)
      await getSuelos(idLote)
    } else {
      toast.error("Oops! Error, por favor revisa los campos");
    }
  }

  const onSearchChange = ({ target }) => {
    setCurrentPage(0);
    setSearch(target.value);
  }

  return (
    <>
      <Toaster />
      <div className="col-12 col-lg-10 fixed top-0 right-0 p-4 overflow-y-scroll max-h-screen">
        <div className="w-100 mt-16">
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
             <Col>
              <div className="md:flex gap-3 items-center mb-6 justify-between w-100 mt-3">
                <p className="text-2xl ml-2 text-green-700">Lista Suelos</p>
                <div className="flex items-center mt-3 mb:mt-0">
                  <div className="w-52 md:w-96 mr-4">
                    <input
                      type="text"
                      onChange={onSearchChange}
                      placeholder="Buscar..."
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
                    Agregar
                  </button>
                </div>
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
    </>
  );
};

export default Index;
