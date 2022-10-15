import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import FormPut from "./FormPut";
import { Toaster } from "react-hot-toast";

const Index = ({ getAgricultores, agricultores, putData }) => {
  const [isFormPut, setIsFormPut] = useState(false);
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
    getAgricultores();
  }, []);

  const handlePut = async () => {
    await putData(agricultorData);
    await getAgricultores();
    setIsFormPut(!isFormPut);
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
            {Object.entries(agricultores).length > 0 ? (
              agricultores.map((agricultor, x) => (
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
    </>
  );
};

export default Index;
