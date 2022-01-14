import React from "react";

const ActionButton = ({ children, title, onClick, type, classes }) => {
  return (
    <button
      type={type || "button"}
      className="p-2 bg-green-400 rounded-sm"
      onClick={onClick}
    >
      <div className={"flex justify-between items-center " + classes}>
        {title ? title : children}
      </div>
    </button>
  );
};

export default ActionButton;
