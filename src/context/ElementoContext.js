import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

const ElementoContext = createContext();

const ElementoProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "elemento";
  const [elemento, setElemento] = useState([]);
  const [elementos, setElementos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getElemento = async (id) => {
    const res = await api.get(url + `${id}?`);
    setElemento(res);
  };

  const getElementos = async () => {
    setIsLoading(true);
    const res = await api.get(url);
    setElementos(res);
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
    getElemento,
    getElementos,
    setElementos,
    setElemento,
    elementos,
    elemento,
    isLoading,
    setIsLoading,
  };

  return (
    <ElementoContext.Provider value={data}>{children}</ElementoContext.Provider>
  );
};

export { ElementoProvider };
export default ElementoContext;
