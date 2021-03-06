import React from "react";

const CancelButton = ({
  children,
  title,
  onClick,
  type,
  disabled = false,
  classes1 = "",
  classes2 = "",
  color = "text-gray-500",
}) => {
  return (
    <button
      type={type || "button"}
      className={"p-2 rounded-sm " + classes1}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className={
          "flex justify-between items-center " + classes2 + " " + color
        }
      >
        {title ? title : children}
      </div>
    </button>
  );
};

export default CancelButton;
