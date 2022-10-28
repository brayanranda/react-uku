import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

const TopografiaContext = createContext();

const TopografiaProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "topografia";
  const [topografia, setTopografia] = useState([]);
  const [topografias, setTopografias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTopografia = async (id) => {
    const res = await api.get(url + `${id}?`);
    setTopografia(res);
  };

  const getTopografias = async () => {
    setIsLoading(true);
    const res = await api.get(url);
    setTopografias(res);
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
    getTopografia,
    getTopografias,
    setTopografia,
    setTopografias,
    topografias,
    topografia,
    isLoading,
    setIsLoading,
  };

  return (
    <TopografiaContext.Provider value={data}>
      {children}
    </TopografiaContext.Provider>
  );
};

export { TopografiaProvider };
export default TopografiaContext;
