import React from "react";
import Agricultor from "../Agricultor/Index";
import { AgricultorProvider } from "../../context/AgricultorContext";

function Index() {
  return (
    <>
      <AgricultorProvider>
        <Agricultor />
      </AgricultorProvider>
    </>
  );
}

export default Index;
