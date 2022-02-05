import React from "react";

const Loader = ({ title, size = 20 }) => {
  return (
    <div
      style={{
        height: size,
        width: size,
      }}
      className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"
    ></div>
  );
};

export default Loader;
