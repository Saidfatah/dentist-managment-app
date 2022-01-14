import React from "react";
import Icon from "./Icon";
const Error = ({ text }) => {
  return (
    <div className="flex  justify-between items-center bg-red-600">
      <Icon classes=" text-white" />
      <p className="text-white"> {text}</p>
    </div>
  );
};

export default Error;
