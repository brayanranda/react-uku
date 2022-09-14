import React from "react";
import Header from "../../UI/organism/Header";
import Menu from "../../UI/organism/Menu";
import { Row } from "reactstrap";
import Agricultor from "../Agricultor/Index";
// import AbonoOrganico from "../AbonoOrganico/Index";

function Index() {
  return (
    <div className="relative">
      <Header />
      <Row className="w-100">
        <Menu />
        {/* <AbonoOrganico /> */}
        <Agricultor />
      </Row>
    </div>
  );
}

export default Index;
