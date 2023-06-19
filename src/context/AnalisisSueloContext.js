import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AnalisisSueloContext = createContext();

const AnalisisSueloProvider = ({ children }) => {
  const navigate = useNavigate();

  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "analisissuelo";
  let urlClase = REACT_APP_API_URL + "clasetextural";
  let urlProfundidad = REACT_APP_API_URL + "profundidad";
  const [analisisSuelo, setAnalisisSuelo] = useState({});
  const [analisisSuelos, setAnalisisSuelos] = useState([]);
  const [claseTextural, setClaseTextural] = useState([]);
  const [profundidad, setProfundidad] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAnalisisSuelo = async (id) => {
    if(id !== "") {
      const res = await api.get(url + `/${id}`);
      setAnalisisSuelo(res);
    }
  };

  const getAnalisisSuelos = async (idLote) => {
    setIsLoading(true);
    const res = await api.get(`${url}/${idLote}/analisisLotes`);
    setAnalisisSuelos(res);
    setIsLoading(false);
  };

  const getClaseTextural = async () => {
    const res = await api.get(urlClase);
    setClaseTextural(res);
  };

  const getProfundidad = async () => {
    const res = await api.get(urlProfundidad);
    setProfundidad(res);
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
      if(res && Object.entries(res).length !== 0 && res.idAnalisisSuelo !== "") {
        navigate(`/results/${res.data.idAnalisisSuelo}`)
      }
      toast.success("Success")
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
      toast.success("Success")
    } else {
      toast.error("Error")
      setIsLoading(false);
      return res.err
    }
  };

  const data = {
    postData,
    putData,
    getAnalisisSuelo,
    getAnalisisSuelos,
    getClaseTextural,
    getProfundidad,
    setAnalisisSuelos,
    setAnalisisSuelo,
    analisisSuelos,
    analisisSuelo,
    claseTextural,
    profundidad,
    isLoading,
    setIsLoading,
  };

  return (
    <AnalisisSueloContext.Provider value={data}>
      {children}
    </AnalisisSueloContext.Provider>
  );
};

export { AnalisisSueloProvider };
export default AnalisisSueloContext;
