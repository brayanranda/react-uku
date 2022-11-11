import React, { useEffect } from "react";

import { Toaster } from "react-hot-toast";
import { Spinner } from "reactstrap";

const Index = ({ getEtapasFenologicas, etapasFenologicas, isLoading }) => {
  useEffect(() => {
    getEtapasFenologicas();
  }, []);

  if (isLoading) {
    return <Spinner color="success">Loading...</Spinner>;
  }

  return (
    <>
      <Toaster />
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="table-responsive fs-14">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && etapasFenologicas.length > 0 ? (
                etapasFenologicas.map((elemento, x) => (
                  <tr key={x}>
                    <td>{elemento.id}</td>
                    <td>{elemento.descripcion}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No found data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Index;
