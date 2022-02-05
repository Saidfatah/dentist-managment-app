import React from "react";

const ActionButton = ({
  children,
  title,
  onClick,
  type,
  classes,
  extraStyles = {},
  disabled = false,
  color = "text-white",
  justify = "justify-between",
}) => {
  let _classes = `${disabled ? "bg-green-200" : "bg-green-400"} rounded-sm`;
  if (!classes || classes.indexOf("p-") < 0) _classes += " p-2";
  return (
    <button
      style={{ ...extraStyles }}
      disabled={disabled}
      type={type || "button"}
      className={_classes + (disabled ? " cursor-default " : "")}
      onClick={onClick}
    >
      <div
        className={
          "flex  items-center font-bold  " +
          justify +
          " " +
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
