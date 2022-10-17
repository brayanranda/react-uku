import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import FormPut from "./FormPut";
import { Toaster } from "react-hot-toast";

const Index = ({ getAgricultores, agricultores, putData }) => {
  const [isFormPut, setIsFormPut] = useState(false);
  const [variedadData, setVariedadData] = useState({
    descripcion: "",
    idTipoCultivo: {
      id: 1,
    },
  });

  const toggleFormPut = (agricultor) => {
    setVariedadData(agricultor);
    setIsFormPut(!isFormPut);
  };

  useEffect(() => {
    getAgricultores();
  }, []);

  const handlePut = async () => {
    await putData(variedadData);
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
          data={variedadData}
          setData={setVariedadData}
          onSubmit={handlePut}
        />
      ) : null}
      <div className="table-responsive fs-14">
        <table className="table">
          <thead>
            <tr>
              <th>Descripcion</th>
              <th>Tipo cultivo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(agricultores).length > 0 ? (
              agricultores.map((agricultor, x) => (
                <tr key={x}>
                  <td>{agricultor.descripcion}</td>
                  <td>{agricultor.idTipoCultivo}</td>
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