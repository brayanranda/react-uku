import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

const FincaContext = createContext();

const FincaProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "finca";
  let urlCorregimiento = REACT_APP_API_URL + "corregimiento";
  let urlMunicipio = REACT_APP_API_URL + "municipio";
  let urlVereda = REACT_APP_API_URL + "vereda";
  const [finca, setFinca] = useState([]);
  const [fincas, setFincas] = useState([]);
  const [corregimientos, setCorregimientos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [veredas, setVeredas] = useState([]);

  const getFinca = async (id) => {
    const res = await api.get(url + `${id}?`);
    setFinca(res);
  };

  const getFincas = async () => {
    const res = await api.get(url);
    setFincas(res);
  };
  const getCorregimientos = async () => {
    const res = await api.get(urlCorregimiento);
    setCorregimientos(res);
  };
  const getMunicipios = async () => {
    const res = await api.get(urlMunicipio);
    setMunicipios(res);
  };
  const getVeredas = async () => {
    const res = await api.get(urlVereda);
    setVeredas(res);
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
    getCorregimientos,
    getMunicipios,
    getVeredas,
    getFinca,
    getFincas,
    setFincas,
    setFinca,
    fincas,
    finca,
    corregimientos,
    municipios,
    veredas,
  };

  return <FincaContext.Provider value={data}>{children}</FincaContext.Provider>;
};

export { FincaProvider };
export default FincaContext;
