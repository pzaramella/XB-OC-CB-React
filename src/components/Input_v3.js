import React from "react";
import { Textbox } from "react-inputs-validation";

const Input = ({ name, test }) => {
  return <Textbox name={name} onChange={test} />;
};

export default Input;
