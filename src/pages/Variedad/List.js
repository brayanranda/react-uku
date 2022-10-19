import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import FormPut from "./FormPut";
import { Toaster } from "react-hot-toast";

const Index = ({ getVariedades, variedades, putData, tiposcultivos }) => {
  const [isFormPut, setIsFormPut] = useState(false);
  const [variedadData, setVariedadData] = useState({
    cultivoCollection: null,
    descripcion: "",
    idTipoCultivo: {
      id: 1,
      descripcion: "",
      variedadCollection: null,
    },
  });

  const toggleFormPut = (variedad) => {
    setVariedadData(variedad);
    setIsFormPut(!isFormPut);
  };

  useEffect(() => {
    getVariedades();
  }, []);

  const handlePut = async () => {
    await putData(variedadData);
    await getVariedades();
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
          tiposcultivos={tiposcultivos}
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
            {Object.entries(variedades).length > 0 ? (
              variedades.map((variedad, x) => (
                <tr key={x}>
                  <td>{variedad.descripcion}</td>
                  <td>{variedad.idTipoCultivo.descripcion}</td>
                  <td>
                    <FontAwesomeIcon
                      className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                      icon={faEye}
                    />
                    <FontAwesomeIcon
                      onClick={() => {
                        toggleFormPut(variedad);
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
