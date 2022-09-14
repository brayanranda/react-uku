import React from "react";
import Button from "../UI/atom/button";
import Input from "./input";

const button = (props) => {
  return (
    <>
      <Input name="search" placeholder="Search..." />
      <Button color="warning" title="title"></Button>
    </>
  );
};

export default button;
