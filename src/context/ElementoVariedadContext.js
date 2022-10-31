import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

const ElementoVariedadContext = createContext();

const ElementoVariedadProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "elementovariedad";
  const [elementoVariedad, setElementoVariedad] = useState([]);
  const [elementosVariedades, setElementosVariedades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getElementoVariedad = async (id) => {
    const res = await api.get(url + `${id}?`);
    setElementoVariedad(res);
  };

  const getElementosVariedades = async () => {
    setIsLoading(true);
    const res = await api.get(url);
    setElementosVariedades(res);
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
    getElementoVariedad,
    getElementosVariedades,
    setElementosVariedades,
    setElementoVariedad,
    elementosVariedades,
    elementoVariedad,
    isLoading,
    setIsLoading,
  };

  return (
    <ElementoVariedadContext.Provider value={data}>
      {children}
    </ElementoVariedadContext.Provider>
  );
};

export { ElementoVariedadProvider };
export default ElementoVariedadContext;
