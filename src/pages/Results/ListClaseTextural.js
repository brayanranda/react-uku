import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const Index = () => {
  const clases = [
    "Arenoso",
    "Arenoso Franco",
    "Franco Arenoso",
    "Franco Arcillo Arenoso",
    "Arcillo Arenoso",
    "Arcilloso",
    "Arcillo Limoso",
    "Franco Arcilloso",
    "Franco Arcillo Limoso",
    "Franco",
    "Franco Limoso",
    "Limoso",
  ]

  return (
    <>
      <Toaster />
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Clase textural</th>
                <th>% Arena</th>
                <th>% Limo</th>
                <th>% Arcilla</th>
              </tr>
            </thead>
            <tbody>
                {clases.map((element, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{element}</td>
                    <td>{Math.trunc(Math.random()*100)}%</td>
                    <td>{Math.trunc(Math.random()*100)}%</td>
                    <td>{Math.trunc(Math.random()*100)}%</td>
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
