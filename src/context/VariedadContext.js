import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

const VariedadContext = createContext();

const VariedadProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "variedad";
  const [variedad, setVariedad] = useState([]);
  const [variedades, setVariedades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getVariedad = async (id) => {
    const res = await api.get(url + `${id}?`);
    setVariedad(res);
  };

  const getVariedades = async () => {
    setIsLoading(true);
    const res = await api.get(url);
    setVariedades(res);
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
    getVariedad,
    getVariedades,
    setVariedades,
    setVariedad,
    variedades,
    variedad,
    isLoading,
    setIsLoading,
  };

  return (
    <VariedadContext.Provider value={data}>{children}</VariedadContext.Provider>
  );
};

export { VariedadProvider };
export default VariedadContext;
