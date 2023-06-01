import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

const AnalisisSueloContext = createContext();

const AnalisisSueloProvider = ({ children }) => {
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
  const [resPost, setResPost] = useState({});

  const getAnalisisSuelo = async (id) => {
    if(id !== "") {
      const res = await api.get(url + `/${id}`);
      setAnalisisSuelo(res);
    }
  };

  const getAnalisisSuelos = async () => {
    setIsLoading(true);
    const res = await api.get(url);
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
    await api.post(url, options).then((res) => {
      console.log(res);
      setResPost(res)
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
    resPost,
  };

  return (
    <AnalisisSueloContext.Provider value={data}>
      {children}
    </AnalisisSueloContext.Provider>
  );
};

export { AnalisisSueloProvider };
export default AnalisisSueloContext;
