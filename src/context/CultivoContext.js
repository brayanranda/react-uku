import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";
import { getUser } from "../hooks/useGetUser";

const CultivoContext = createContext();

const CultivoProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "cultivo";
  let urlEtapa = REACT_APP_API_URL + "etapafenologica";
  const [cultivo, setCultivo] = useState([]);
  const [cultivos, setCultivos] = useState([]);
  const [etapasFenologicas, setEtapasFenologicas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCultivo = async (id) => {
    const res = await api.get(url + `${id}?`);
    setCultivo(res);
  };

  const getCultivos = async () => {
    setIsLoading(true);
    const res = await api.get(`${url}/${getUser()}/cultivos`);
    setCultivos(res);
    setIsLoading(false);
  };

  const getEtapasFenologicas = async () => {
    setIsLoading(true);
    const res = await api.get(urlEtapa);
    setEtapasFenologicas(res);
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
    getCultivo,
    getCultivos,
    getEtapasFenologicas,
    setCultivos,
    setCultivo,
    setEtapasFenologicas,
    cultivos,
    cultivo,
    etapasFenologicas,
    isLoading,
    setIsLoading,
  };

  return (
    <CultivoContext.Provider value={data}>{children}</CultivoContext.Provider>
  );
};

export { CultivoProvider };
export default CultivoContext;
