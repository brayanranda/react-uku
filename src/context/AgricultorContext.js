import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

const AgricultorContext = createContext();

const AgricultorProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "agricultor";

  const [agricultor, setAgricultor] = useState([]);
  const [agricultores, setAgricultores] = useState([]);

  const getAgricultor = (id) => {
    api.get(url + `${id}?`).then((res) => {
      setAgricultor(res);
    });
  };

  const getAgricultores = () => {
    api.get(url).then((res) => {
      setAgricultores(res);
    });
  };

  const postData = async (data) => {
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    };
    await api.post(url, options).then((res) => {
      if (!res.err) {
        console.log("Registrado");
      } else {
        console.log("No Registrado");
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

  const delData =  async (task_id) => {
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
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AgricultorContext.Provider value={data}>
      {children}
    </AgricultorContext.Provider>
  );
};

export { AgricultorProvider };
export default AgricultorContext;
