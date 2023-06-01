import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const Index = () => {
  const interpretacion = [
    {name: "Ultra acido", value: "2.4"},
    {name: "Extremadamente acido", value: "3.7"},
    {name: "Muy fuertemente acido", value: "4.8"},
    {name: "Fuertemente acido", value: "5.3"},
    {name: "Moderadamente acido", value: "5.8"},
    {name: "Ligeramente acido ", value: "6.3"},
    {name: "Neutro", value: "7.0"},
    {name: "Ligeramente alcalino", value: "7.6"},
    {name: "Moderadamente alcalino", value: "8.2"},
    {name: "Fuertemente alcalino", value: "9.0"},
    {name: "Muy fuertemente alcalino", value: "10.4"},
  ]

  return (
    <>
      <Toaster />
      <div className="rounded-2xl bg-white shadow-sm w-1/2">
        <div className="table-responsive fs-14">
          <table className="table bg-white">
            <thead>
              <tr>
                <th>Interpretación</th>
                <th className="text-center">Rango del pH</th>
              </tr>
            </thead>
            <tbody>
                {interpretacion.map((element, index) => (
                  <tr key={index}>
                    <td>{element.name}</td>
                    <td className="text-center">{element.value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Index;
