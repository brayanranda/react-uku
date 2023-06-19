import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

const SuelosContext = createContext();

const SuelosProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "suelo/";
  const [suelos, setSuelos] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const getSuelos = async (idLote) => {
    setIsLoading(true)
    const res = await api.get(`${REACT_APP_API_URL}lote/${idLote}/suelos`)
    setSuelos(res)
    setIsLoading(false)
  }

  const postSuelo = async (data, idLote) => {
    setIsLoading(true);
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    }
    await api.post(`${url}${idLote}`, options).then((res) => {
      if (!res.err) {
        console.log("Registrado");
        setIsLoading(false);
      } else {
        console.log("No Registrado");
        setIsLoading(false);
      }
    })
  }

  const putSuelo = async (data, idSuelo) => {
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    }
    await api.put(`${url}${idSuelo}`, options).then((res) => {
      if (!res.err) {
        console.log("Actualizado");
      } else {
        console.log("No Actualizado");
      }
    })
  }

  const data = {
    suelos,
    putSuelo,
    postSuelo,
    setSuelos,
    getSuelos,
    isLoading,
    setIsLoading,
  };

  return (
    <SuelosContext.Provider value={data}>{children}</SuelosContext.Provider>
  );
};

export { SuelosProvider };
export default SuelosContext;
