import React from "react";

const Loader = ({ title }) => {
  return (
    <div className="  w-full h-full z-50 overflow-hidden opacity-75 flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      <h2 className="text-center text-white text-xl font-semibold">
        Chargement...
      </h2>
      <p className="w-1/3 text-center text-balck">{title}</p>
    </div>
  );
};

export default Loader;
