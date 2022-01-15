import React from "react";
import Icon from "./Icon";

const Success = ({ text }) => {
  return (
    <div className="flex border-1 border-green-300 shadow-md shadow-2xl  p-2 text-center w-full  rounded-sm justify-center items-center ">
      <Icon size={25} name="CHECK" classes=" text-green-500" />
      <p className="text-green-500  "> {text}</p>
    </div>
  );
};

export default Success;
