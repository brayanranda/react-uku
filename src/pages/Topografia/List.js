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
  getTopografias,
  topografias,
  putData,
  updateOrAdd,
  setUpdateOrAdd,
  isLoading,
  currentPage,
  setCurrentPage,
  search,
}) => {
  const [isFormPut, setIsFormPut] = useState(false);
  const [topografiaData, setTopografiaData] = useState({
    descripcion: "",
    id: "",
  });

  const toggleFormPut = (topografia) => {
    setTopografiaData(topografia);
    setIsFormPut(!isFormPut);
  };

  useEffect(() => {
    if (updateOrAdd) {
      getTopografias();
      setUpdateOrAdd(false);
    }
  }, [updateOrAdd]);
  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }
  const handlePut = async () => {
    await putData(topografiaData);
    setIsFormPut(!isFormPut);
    setUpdateOrAdd(true);
  };
  const filter = () => {
    const result = topografias.filter((topografia) =>
      topografia.descripcion.toLowerCase().includes(search.toLowerCase())
    );
    return result;
  };
  const filteredTopografias = () => {
    if (search.length === 0)
      return topografias.slice(currentPage, currentPage + 5);

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
          data={topografiaData}
          setData={setTopografiaData}
          onSubmit={handlePut}
        />
      ) : null}
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Descripción</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && topografias.length > 0 ? (
                filteredTopografias().map((topografia, x) => (
                  <tr key={x}>
                    <td>{topografia.id}</td>
                    <td>{topografia.descripcion}</td>
                    <td className="text-center">
                      <FontAwesomeIcon
                        onClick={() => {
                          toggleFormPut(topografia);
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
