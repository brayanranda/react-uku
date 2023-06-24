import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";
import { getUser } from "../hooks/useGetUser";
import { toast } from "react-hot-toast";

const FincaContext = createContext();

const FincaProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "finca";
  let urlMunicipio = REACT_APP_API_URL + "municipio";
  let urlVereda = REACT_APP_API_URL + "vereda";
  const [finca, setFinca] = useState([]);
  const [fincas, setFincas] = useState([]);
  const [corregimientos, setCorregimientos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [veredas, setVeredas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFinca = async (id) => {
    const res = await api.get(url + `${id}?`);
    setFinca(res);
  };
  
  const getFincas = async () => {
    setIsLoading(true);
    const res = await api.get(`${url}/${getUser()}`);
    setFincas(res);
    setIsLoading(false);
  }

  const getCorregimientos = async (idMunicipio) => {
    const res = await api.get(`${REACT_APP_API_URL}corregimiento/${idMunicipio}`);
    setCorregimientos(res);
  }

  const getMunicipios = async () => {
    const res = await api.get(urlMunicipio);
    setMunicipios(res);
  }

  const getVeredas = async () => {
    const res = await api.get(urlVereda);
    setVeredas(res);
  }

  const postFinca = async (data) => {
    setIsLoading(true);
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    };
    const res = await api.post(`${url}/${getUser()}`, options)

    if (!res.err) {
      setIsLoading(false);
      toast.success("Finca registrada.")
    } else {
      toast.error("Error")
      setIsLoading(false);
      return res.err
    }
  };

  const putFinca = async (data) => {
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    };
    const res = await api.put(url, options)
    if (!res.err) {
      setIsLoading(false);
      toast.success("Finca modificada.")
    } else {
      toast.error("Error")
      setIsLoading(false);
      return res.err
    }
  };

  const data = {
    postFinca,
    putFinca,
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
    isLoading,
    setIsLoading,
  };

  return <FincaContext.Provider value={data}>{children}</FincaContext.Provider>;
};

export { FincaProvider };
export default FincaContext;
