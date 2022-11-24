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
  getCultivos,
  cultivos,
  putData,
  updateOrAdd,
  setUpdateOrAdd,
  isLoading,
  currentPage,
  setCurrentPage,
  search,
  distanciaSiembras,
  etapasFenologicas,
  fincas,
  variedades,
  topografias,
}) => {
  const [isFormPut, setIsFormPut] = useState(false);
  const [cultivoData, setCultivoData] = useState({
    descripcion: "",
    plantasPorHectarea: 0,
    idDistanciaSiembra: {},
    idEtapaFenologica: {},
    idFinca: {},
    idTopografia: {},
    idVariedad: {},
  });

  const toggleFormPut = (cultivo) => {
    setCultivoData(cultivo);
    setIsFormPut(!isFormPut);
  };

  useEffect(() => {
    if (updateOrAdd) {
      getCultivos();
      setUpdateOrAdd(false);
    }
  }, [updateOrAdd]);
  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }
  const handlePut = async () => {
    await putData(cultivoData);
    setIsFormPut(!isFormPut);
    setUpdateOrAdd(true);
  };
  const filter = () => {
    const result = cultivos.filter((cultivo) =>
      cultivo.descripcion.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  };
  const filteredcultivos = () => {
    if (search.length === 0)
      return cultivos.slice(currentPage, currentPage + 6);

    // Si hay algo en la caja de texto
    const filtered = filter();
    return filtered.slice(currentPage, currentPage + 6);
  };

  const nextPage = () => {
    if (filter().length > currentPage + 6) {
      setCurrentPage(currentPage + 6);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 6);
    }
  };
  return (
    <>
      <Toaster />
      {isFormPut ? (
        <FormPut
          isFormPut={isFormPut}
          setIsFormPut={setIsFormPut}
          data={cultivoData}
          setData={setCultivoData}
          onSubmit={handlePut}
          distanciaSiembras={distanciaSiembras}
          etapasFenologicas={etapasFenologicas}
          fincas={fincas}
          variedades={variedades}
          topografias={topografias}
        />
      ) : null}
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Descripción</th>
                <th>Plantas por Hectárea</th>
                <th>Distancia Siembra</th>
                <th>Etapa Fenológica</th>
                <th>Finca</th>
                <th>Topografía</th>
                <th>Variedad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && cultivos.length > 0 ? (
                filteredcultivos().map((cultivo, x) => (
                  <tr key={x}>
                    <td>{cultivo.idCultivo}</td>
                    <td>{cultivo.descripcion}</td>
                    <td>{cultivo.plantasPorHectarea}</td>
                    <td>{cultivo.idDistanciaSiembra.descripcion}</td>
                    <td>{cultivo.idEtapaFenologica.descripcion}</td>
                    <td>{cultivo.idFinca.nombre}</td>
                    <td>{cultivo.idTopografia.descripcion}</td>
                    <td>{cultivo.idVariedad.descripcion}</td>
                    <td>
                      <FontAwesomeIcon
                        onClick={() => {
                          toggleFormPut(cultivo);
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
