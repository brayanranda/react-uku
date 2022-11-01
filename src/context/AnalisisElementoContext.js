import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

const AnalisisElementoContext = createContext();

const AnalisisElementoProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "analisiselemento";
  const [analisiselemento, setAnalisisElemento] = useState([]);
  const [analisiselementos, setAnalisisElementos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAnalisisElemento = async (id) => {
    const res = await api.get(url + `${id}?`);
    setAnalisisElemento(res);
  };

  const getAnalisisElementos = async () => {
    setIsLoading(true);
    const res = await api.get(url);
    setAnalisisElementos(res);
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
    getAnalisisElemento,
    getAnalisisElementos,
    setAnalisisElementos,
    setAnalisisElemento,
    analisiselementos,
    analisiselemento,
    isLoading,
    setIsLoading,
  };

  return (
    <AnalisisElementoContext.Provider value={data}>
      {children}
    </AnalisisElementoContext.Provider>
  );
};

export { AnalisisElementoProvider };
export default AnalisisElementoContext;
