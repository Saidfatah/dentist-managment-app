import React from "react";

const Loader = ({ title, size = 20 }) => {
  return (
    <div className="  w-full h-full z-50 overflow-hidden opacity-75 flex  items-center ">
      <div
        style={{
          height: size,
          width: size,
        }}
        className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"
      ></div>
      <span className="w-1/3 text-center text-balck">{title}</span>
    </div>
  );
};

export default Loader;
