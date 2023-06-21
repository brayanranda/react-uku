import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";
import { getUser } from "../hooks/useGetUser";
import { toast } from "react-hot-toast";

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

  const getCultivos = async (idFinca) => {
    let endpoint = `${url}/${getUser()}/cultivos`
    if(idFinca && idFinca !== "") {
      endpoint = `${url}/${idFinca}`
    }
    setIsLoading(true);
    const res = await api.get(endpoint);
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
    const res = await api.post(url, options)
    if (!res.err) {
      setIsLoading(false);
      toast.success("Cultivo registrado")
    } else {
      toast.error("Error")
      setIsLoading(false);
      return res.err
    }
  };

  const putData = async (data) => {
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    };
    const res = await api.put(url, options)
    if (!res.err) {
      setIsLoading(false);
      toast.success("Lote modificado")
    } else {
      toast.error("Error")
      setIsLoading(false);
      return res.err
    }
  };

  const data = {
    cultivo,
    putData,
    postData,
    cultivos,
    isLoading,
    getCultivo,
    setCultivo,
    getCultivos,
    setCultivos,
    setIsLoading,
    etapasFenologicas,
    setEtapasFenologicas,
    getEtapasFenologicas,
  };

  return (
    <CultivoContext.Provider value={data}>{children}</CultivoContext.Provider>
  );
};

export { CultivoProvider };
export default CultivoContext;
