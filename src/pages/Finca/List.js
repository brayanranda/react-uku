import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import FormPut from "./FormPut";
import { Toaster } from "react-hot-toast";
import { Spinner } from "reactstrap";
const Index = ({
  getFincas,
  fincas,
  putData,
  corregimientos,
  municipios,
  veredas,
  agricultores,
  updateOrAdd,
  setUpdateOrAdd,
  isLoading,
  currentPage,
  setCurrentPage,
  search,
}) => {
  const [isFormPut, setIsFormPut] = useState(false);
  const [fincaData, setFincaData] = useState({
    nombre: "",
    areaTotal: 0,
    areaEnUso: 0,
    geolocalizacion: "",
    ideAgricultor: { identificacion: 0 },
    idCorregimiento: { idCorregimiento: 1 },
    idMunicipio: { idMunicipio: 1 },
    idVereda: { idVereda: 1 },
  });

  const toggleFormPut = (finca) => {
    setFincaData(finca);
    setIsFormPut(!isFormPut);
  };
  useEffect(() => {
    if (updateOrAdd) {
      getFincas();
      setUpdateOrAdd(false);
    }
  }, [updateOrAdd]);
  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }
  const handlePut = async () => {
    await putData(fincaData);
    setIsFormPut(!isFormPut);
    setUpdateOrAdd(true);
  };
  const filter = () => {
    const result = fincas.filter((finca) =>
      finca.nombre.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  };
  const filteredFincas = () => {
    if (search.length === 0) return fincas.slice(currentPage, currentPage + 5);

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

  return (
    <>
      <Toaster />
      {isFormPut ? (
        <FormPut
          isFormPut={isFormPut}
          setIsFormPut={setIsFormPut}
          data={fincaData}
          setData={setFincaData}
          onSubmit={handlePut}
          corregimientos={corregimientos}
          municipios={municipios}
          veredas={veredas}
          agricultores={agricultores}
        />
      ) : null}

      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Area total</th>
                <th>Area en uso</th>
                <th>Geolocalización</th>
                <th>Agricultor</th>
                <th>Corregimiento</th>
                <th>Municipio</th>
                <th>Vereda</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && fincas.length > 0 ? (
                filteredFincas().map((finca, x) => (
                  <tr key={x}>
                    <td>{finca.idFinca}</td>
                    <td>{finca.nombre}</td>
                    <td>{finca.areaTotal}</td>
                    <td>{finca.areaEnUso}</td>
                    <td>{finca.geolocalizacion}</td>
                    <td>
                      {finca.idAgricultor.nombres +
                        " " +
                        finca.idAgricultor.apellidos}
                    </td>
                    <td>{finca.idCorregimiento.nombre}</td>
                    <td>{finca.idMunicipio.nombre}</td>
                    <td>{finca.idVereda.nombre}</td>
                    <td>
                      <FontAwesomeIcon
                        onClick={() => {
                          toggleFormPut(finca);
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
