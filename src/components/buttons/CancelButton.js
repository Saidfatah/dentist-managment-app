import React from "react";

const CancelButton = ({
  children,
  title,
  onClick,
  type,
  classes1 = "",
  classes2 = "",
}) => {
  return (
    <button
      type={type || "button"}
      className={"p-2 bg-gray-400 rounded-sm " + classes1}
      onClick={onClick}
    >
      <div className={"flex justify-between items-center " + classes2}>
        {title ? title : children}
      </div>
    </button>
  );
};

export default CancelButton;
