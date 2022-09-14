import React from "react";
import { Button } from "reactstrap";

const button = (props) => {
  return <Button color={props.color}>{props.title}</Button>;
};

export default button;
