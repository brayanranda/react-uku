import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import FormPut from "./FormPut";
import { Toaster } from "react-hot-toast";

const Index = ({ getTiposCultivos, tiposcultivos, putData }) => {
  const [isFormPut, setIsFormPut] = useState(false);
  const [tipoCultivoData, setTipoCultivoData] = useState({
    descripcion: "",
  });

  const toggleFormPut = (tipocultivo) => {
    setTipoCultivoData(tipocultivo);
    setIsFormPut(!isFormPut);
  };

  useEffect(() => {
    getTiposCultivos();
  }, []);

  const handlePut = async () => {
    await putData(tipoCultivoData);
    await getTiposCultivos();
    setIsFormPut(!isFormPut);
  };

  return (
    <>
      <Toaster />
      {isFormPut ? (
        <FormPut
          isFormPut={isFormPut}
          setIsFormPut={setIsFormPut}
          data={tipoCultivoData}
          setData={setTipoCultivoData}
          onSubmit={handlePut}
        />
      ) : null}
      <div className="table-responsive fs-14">
        <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(tiposcultivos).length > 0 ? (
              tiposcultivos.map((tipocultivo, x) => (
                <tr key={x}>
                  <td>{x}</td>
                  <td>{tipocultivo.descripcion}</td>
                  <td>
                    <FontAwesomeIcon
                      className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800 p-2"
                      icon={faEye}
                    />
                    <FontAwesomeIcon
                      onClick={() => {
                        toggleFormPut(tipocultivo);
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
