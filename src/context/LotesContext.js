import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";
import { toast } from 'react-toastify';

const LotesContext = createContext();

const LotesProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "finca/";
  const [lotes, setLotes] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const getLotes = async (idFinca) => {
    setIsLoading(true)
    const res = await api.get(`${url}${idFinca}/lotes`)
    setLotes(res)
    setIsLoading(false)
  }

  const postLote = async (data, idFinca) => {
    setIsLoading(true);
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    }
    const res = await api.post(`${REACT_APP_API_URL}lote/${idFinca}`, options)
    if (!res.err) {
      setIsLoading(false);
      toast.success("Success")
    } else {
      // toast.error(res.statusText)
      toast.error("Error")
      setIsLoading(false);
      return res.err
    }
  }

  const putLote = async (data, idLote) => {
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    }
    const res = await api.put(`${REACT_APP_API_URL}lote/${idLote}`, options)
    if (!res.err) {
      setIsLoading(false);
      toast.success("Success")
    } else {
      toast.error("Error")
      setIsLoading(false);
      return res.err
    }
  }

    
  const deleteLote = async (idLote) => {
    let endpoint = `${REACT_APP_API_URL}lote/${idLote}`
    let options = {body: "", headers: { "content-type": "application/json" }}
    
    const res = await api.del(endpoint, options)
    if (!res.err) {
      setIsLoading(false);
      toast.success("Success")
    } else {
      toast.error("Error")
      setIsLoading(false);
      return res.err
    }
  }

  const data = {
    lotes,
    putLote,
    postLote,
    setLotes,
    getLotes,
    isLoading,
    deleteLote,
    setIsLoading,
  };

  return (
    <LotesContext.Provider value={data}>{children}</LotesContext.Provider>
  );
};

export { LotesProvider };
export default LotesContext;
