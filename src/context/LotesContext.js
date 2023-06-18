import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

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

  const postLote = async (data) => {
    setIsLoading(true);
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    }
    await api.post(url, options).then((res) => {
      if (!res.err) {
        console.log("Registrado");
        setIsLoading(false);
      } else {
        console.log("No Registrado");
        setIsLoading(false);
      }
    })
  }

  const pusLote = async (data) => {
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    }
    await api.put(url, options).then((res) => {
      if (!res.err) {
        console.log("Actualizado");
      } else {
        console.log("No Actualizado");
      }
    })
  }

  const data = {
    lotes,
    pusLote,
    postLote,
    setLotes,
    getLotes,
    isLoading,
    setIsLoading,
  };

  return (
    <LotesContext.Provider value={data}>{children}</LotesContext.Provider>
  );
};

export { LotesProvider };
export default LotesContext;
