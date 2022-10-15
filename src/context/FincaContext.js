import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

const FincaContext = createContext();

const FincaProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "finca";
  const [finca, setFinca] = useState([]);
  const [fincas, setFincas] = useState([]);

  const getFinca = async (id) => {
    const res = await api.get(url + `${id}?`);
    setFinca(res);
  };

  const getFincas = async () => {
    const res = await api.get(url);
    setFincas(res);
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

  const data = {
    postData,
    putData,
    getFinca,
    getFincas,
    setFincas,
    setFinca,
    fincas,
    finca,
  };

  return <FincaContext.Provider value={data}>{children}</FincaContext.Provider>;
};

export { FincaProvider };
export default FincaContext;
