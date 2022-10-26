import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import FormPut from "./FormPut";
import { Toaster } from "react-hot-toast";
import { Spinner } from "reactstrap";

const Index = ({
  getAgricultores,
  agricultores,
  putData,
  updateOrAdd,
  setUpdateOrAdd,
  isLoading,
  setIsLoading,
}) => {
  const [isFormPut, setIsFormPut] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [agricultorData, setAgricultorData] = useState({
    nombres: "",
    apellidos: "",
    identificacion: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
  });

  const toggleFormPut = (agricultor) => {
    setAgricultorData(agricultor);
    setIsFormPut(!isFormPut);
  };
  useEffect(() => {
    if (updateOrAdd) {
      getAgricultores();
    }
  }, [updateOrAdd]);

  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }
  const handlePut = async () => {
    await putData(agricultorData);
    setUpdateOrAdd(!updateOrAdd);
    setIsFormPut(!isFormPut);
  };
  const filter = () => {
    const result = agricultores.filter((agricultor) =>
      agricultor.nombres.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  };
  const filteredAgricultores = () => {
    if (search.length === 0)
      return agricultores.slice(currentPage, currentPage + 5);

    // Si hay algo en la caja de texto
    const filtered = filter();
    return filtered.slice(currentPage, currentPage + 5);
  };

  const nextPage = () => {
    if (filter().length > currentPage + 5) {
      setCurrentPage(currentPage + 5);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 5);
    }
  };

  const onSearchChange = ({ target }) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  return (
    <>
      <Toaster />
      {isFormPut ? (
        <FormPut
          isFormPut={isFormPut}
          setIsFormPut={setIsFormPut}
          data={agricultorData}
          setData={setAgricultorData}
          onSubmit={handlePut}
        />
      ) : null}
      <div className="w-50 mb-4 ml-auto">
        <input
          type="text"
          className="mb-2 form-control"
          placeholder="Buscar por nombre"
          value={search}
          onChange={onSearchChange}
        />
      </div>
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table">
            <thead>
              <tr>
                <th>Identificacion</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Fecha nacimiento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && agricultores.length > 0 ? (
                filteredAgricultores().map((agricultor, x) => (
                  <tr key={x}>
                    <td>{agricultor.identificacion}</td>
                    <td>{agricultor.nombres}</td>
                    <td>{agricultor.apellidos}</td>
                    <td>{agricultor.telefono}</td>
                    <td>{agricultor.email}</td>
                    <td>{agricultor.fechaNacimiento}</td>
                    <td>
                      <FontAwesomeIcon
                        className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                        icon={faEye}
                      />
                      <FontAwesomeIcon
                        onClick={() => {
                          toggleFormPut(agricultor);
                        }}
                        className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                        icon={faEdit}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No found data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex mt-3">
        <div
          className="mr-2 w-7 h-7 bg-green-700 rounded-md text-white hover:bg-green-900 cursor-pointer flex items-center justify-center"
          onClick={prevPage}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div
          className="w-7 h-7 bg-green-700 rounded-md text-white hover:bg-green-900 cursor-pointer flex items-center justify-center"
          onClick={nextPage}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </>
  );
};

export default Index;
