import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

const DistanciaSiembraContext = createContext();

const DistanciaSiembraProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "distanciasiembra";
  const [distanciaSiembra, setDistanciaSiembra] = useState([]);
  const [distanciaSiembras, setDistanciaSiembras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getDistanciaSiembra = async (id) => {
    const res = await api.get(url + `${id}?`);
    setDistanciaSiembra(res);
  };

  const getDistanciaSiembras = async () => {
    setIsLoading(true);
    const res = await api.get(url);
    setDistanciaSiembras(res);
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
    getDistanciaSiembra,
    getDistanciaSiembras,
    setDistanciaSiembras,
    setDistanciaSiembra,
    distanciaSiembras,
    distanciaSiembra,
    isLoading,
    setIsLoading,
  };

  return (
    <DistanciaSiembraContext.Provider value={data}>
      {children}
    </DistanciaSiembraContext.Provider>
  );
};

export { DistanciaSiembraProvider };
export default DistanciaSiembraContext;
