import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

const DensidadContext = createContext();

const DensidadProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "densidad";
  const [densidad, setDensidad] = useState([]);
  const [densidades, setDensidades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getDensidad = async (id) => {
    const res = await api.get(url + `${id}?`);
    setDensidad(res);
  };

  const getDensidades = async () => {
    setIsLoading(true);
    const res = await api.get(url);
    setDensidades(res);
    setIsLoading(false);
  };

  const postData = async (data) => {
    setIsLoading(true);
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    };
    await api.post(url, options).then((res) => {
      if (!res.err) {
        console.log("Registrado");
        setIsLoading(false);
      } else {
        console.log("No Registrado");
        setIsLoading(false);
      }
    });
  };

  const putData = async (data) => {
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    };
    await api.put(url, options).then((res) => {
      if (!res.err) {
        console.log("Actualizado");
      } else {
        console.log("No Actualizado");
      }
    });
  };

  const data = {
    postData,
    putData,
    getDensidad,
    getDensidades,
    setDensidades,
    setDensidad,
    densidades,
    densidad,
    isLoading,
    setIsLoading,
  };

  return (
    <DensidadContext.Provider value={data}>{children}</DensidadContext.Provider>
  );
};

export { DensidadProvider };
export default DensidadContext;
