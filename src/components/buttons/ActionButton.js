import React from "react";

const ActionButton = ({
  children,
  title,
  onClick,
  type,
  classes,
  disabled = false,
  color = "text-white",
}) => {
  let _classes = `${disabled ? "bg-green-200" : "bg-green-400"} rounded-sm`;
  if (!classes || classes.indexOf("p-") < 0) _classes += " p-2";
  return (
    <button
      disabled={disabled}
      type={type || "button"}
      className={_classes + (disabled ? " cursor-default " : "")}
      onClick={onClick}
    >
      <div
        className={
          "flex justify-between items-center font-bold  " +
          color +
          " " +
          classes
        }
      >
        {title ? title : children}
      </div>
    </button>
  );
};

export default ActionButton;
