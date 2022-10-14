import React from "react";
import Header from "../../UI/organism/Header";
import Menu from "../../UI/organism/Menu";
import { Row } from "reactstrap";
import Agricultor from "../Agricultor/Index";
import { AgricultorProvider } from "../../context/AgricultorContext";

function Index() {
  return (
    <div className="relative">
      <Header />
      <Row className="w-100">
        <Menu />
        <AgricultorProvider>
          <Agricultor />
        </AgricultorProvider>
      </Row>
    </div>
  );
}

export default Index;
