import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

const TipoCultivoContext = createContext();

const TipoCultivoProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "tipocultivo";
  const [tipocultivo, setTipoCultivo] = useState([]);
  const [tiposcultivos, setTiposCultivos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTipoCultivo = async (id) => {
    const res = await api.get(url + `${id}?`);
    setTipoCultivo(res);
  };

  const getTiposCultivos = async () => {
    setIsLoading(true);
    const res = await api.get(url);
    setTiposCultivos(res);
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
    getTipoCultivo,
    getTiposCultivos,
    setTiposCultivos,
    setTipoCultivo,
    tiposcultivos,
    tipocultivo,
    isLoading,
    setIsLoading,
  };

  return (
    <TipoCultivoContext.Provider value={data}>
      {children}
    </TipoCultivoContext.Provider>
  );
};

export { TipoCultivoProvider };
export default TipoCultivoContext;
