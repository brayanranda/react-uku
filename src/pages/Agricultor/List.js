import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
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
      setUpdateOrAdd(false);
    }
  }, [updateOrAdd]);
  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }
  const handlePut = async () => {
    await putData(agricultorData);
    setIsFormPut(!isFormPut);
    setUpdateOrAdd(true);
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
      <div className="w-50 mb-2">
        <input
          type="text"
          className="mb-2 form-control"
          placeholder="Buscar por nombre"
          value={search}
          onChange={onSearchChange}
        />
        <button
          className="bg-green-700 rounded-md text-white hover:bg-green-700 mr-1"
          onClick={prevPage}
        >
          Anterior
        </button>
        &nbsp;
        <button
          className="bg-green-700 rounded-md text-white hover:bg-green-700 ml-1"
          onClick={nextPage}
        >
          Siguiente
        </button>
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
    </>
  );
};

export default Index;
