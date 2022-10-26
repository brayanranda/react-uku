import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

const AgricultorContext = createContext();

const AgricultorProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "agricultor";
  let urlPost = REACT_APP_API_URL + "auth/nuevoAgricultor";
  const [agricultor, setAgricultor] = useState([]);
  const [agricultores, setAgricultores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getAgricultor = (id) => {
    api.get(url + `${id}?`).then((res) => {
      setAgricultor(res);
    });
  };

  const getAgricultores = async () => {
    setIsLoading(true);
    await api.get(url).then((res) => {
      setAgricultores(res);
      setIsLoading(false);
    });
  };

  const postData = async (data) => {
    setIsLoading(true);
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    };
    await api.post(urlPost, options).then((res) => {
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

  const delData = async (task_id) => {
    let endpoint = url + task_id;
    let options = {
      body: "",
      headers: { "content-type": "application/json" },
    };
    await api.del(endpoint, options).then((res) => {
      if (!res.err) {
        console.log("Eliminado");
      }
    });
  };

  const data = {
    postData,
    putData,
    delData,
    getAgricultor,
    getAgricultores,
    setAgricultores,
    setAgricultor,
    agricultores,
    agricultor,
    isLoading,
    setIsLoading,
  };

  return (
    <AgricultorContext.Provider value={data}>
      {children}
    </AgricultorContext.Provider>
  );
};

export { AgricultorProvider };
export default AgricultorContext;
