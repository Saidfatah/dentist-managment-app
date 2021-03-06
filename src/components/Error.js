import React from "react";
import Icon from "./Icon";
const Error = ({ text }) => {
  if (!text || text === "") return null;
  if (text === "NO_ERROR") return null;
  return (
    <div className="flex  justify-center items-center p-2 rounded-sm mt-2 mb-2 bg-red-600">
      <Icon name="DANGER" classes=" mr-2 text-white" />
      <p className="text-white"> {text}</p>
    </div>
  );
};

export default Error;
