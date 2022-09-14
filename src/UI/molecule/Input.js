import React from "react";
import Input from "reactstrap";

const input = (props) => {
  return (
    <Input
      name={props.name}
      onChange={props.handleChange}
      value={props.value}
      className=""
    />
  );
};

export default input;
