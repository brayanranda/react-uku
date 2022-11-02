import { helpHttp } from "../helpers/helpHttp";
import { createContext, useState } from "react";

const AbonoOrganicoContext = createContext();

const AbonoOrganicoProvider = ({ children }) => {
  let api = helpHttp();
  const { REACT_APP_API_URL } = process.env;
  let url = REACT_APP_API_URL + "abonoorganico";
  const [abonoOrganico, setAbonoOrganico] = useState([]);
  const [abonosOrganicos, setAbonosOrganicos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getabonoOrganico = async (id) => {
    const res = await api.get(url + `${id}?`);
    setAbonoOrganico(res);
  };

  const getAbonosOrganicos = async () => {
    setIsLoading(true);
    const res = await api.get(url);
    setAbonosOrganicos(res);
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
        console.log(res);
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
    getabonoOrganico,
    getAbonosOrganicos,
    setAbonosOrganicos,
    setAbonoOrganico,
    abonosOrganicos,
    abonoOrganico,
    isLoading,
    setIsLoading,
  };

  return (
    <AbonoOrganicoContext.Provider value={data}>
      {children}
    </AbonoOrganicoContext.Provider>
  );
};

export { AbonoOrganicoProvider };
export default AbonoOrganicoContext;
