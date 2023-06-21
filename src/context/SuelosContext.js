import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";
import { toast } from "react-hot-toast";

const SuelosContext = createContext();

const SuelosProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "suelo/";
  const [suelos, setSuelos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getSuelos = async (idLote) => {
    setIsLoading(true)
    if(idLote) {
      const res = await api.get(`${REACT_APP_API_URL}lote/${idLote}/suelos`)
      setSuelos(res)
    }
    setIsLoading(false)
  }

  const postSuelo = async (data, idLote) => {
    setIsLoading(true);
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    }
    const res = await api.post(`${url}${idLote}`, options)
    if (!res.err) {
      setIsLoading(false);
      toast.success("Suelo registrado")
    } else {
      toast.error("Error")
      setIsLoading(false);
      return res.err
    }
  }

  const putSuelo = async (data, idSuelo) => {
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    }
    const res = await api.put(`${url}${idSuelo}`, options)
    if (!res.err) {
      setIsLoading(false);
      toast.success("Suelo modificado")
    } else {
      toast.error("Error")
      setIsLoading(false);
      return res.err
    }
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
