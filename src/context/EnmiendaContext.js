import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

const EnmiendaContext = createContext();

const EnmiendaProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "enmienda";
  const [enmienda, setEnmienda] = useState([]);
  const [enmiendas, setEnmiendas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getEnmienda = async (id) => {
    const res = await api.get(url + `${id}?`);
    setEnmienda(res);
  };

  const getEnmiendas = async () => {
    setIsLoading(true);
    const res = await api.get(url);
    setEnmiendas(res);
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
    getEnmienda,
    getEnmiendas,
    setEnmiendas,
    setEnmienda,
    enmiendas,
    enmienda,
    isLoading,
    setIsLoading,
  };

  return (
    <EnmiendaContext.Provider value={data}>{children}</EnmiendaContext.Provider>
  );
};

export { EnmiendaProvider };
export default EnmiendaContext;
