import React from "react";

const Icon = ({ name, size, classes, styles = {} }) => {
  const _size = size || 16;
  const _classes = "cursor-pointer " + (classes || "");

  const Svg = ({ children, viewBox = "0 0 24 24" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={_classes}
      style={{
        height: _size,
        width: _size,
        ...styles,
      }}
      fill="none"
      viewBox={viewBox}
      stroke="currentColor"
    >
      {children}
    </svg>
  );
  if (name === "RIGHT")
    return (
      <Svg>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </Svg>
    );
  if (name === "LEFT")
    return (
      <Svg>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
        />
      </Svg>
    );
  if (name === "ADD")
    return (
      <Svg>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </Svg>
    );

  if (name === "LOGO")
    return (
      <Svg viewBox="0 0 52 72">
        <path
          d="M1.87695 53H28.7791C41.5357 53 51.877 42.7025 51.877 30H24.9748C12.2182 30 1.87695 40.2975 1.87695 53Z"
          fill="#76A9FA"
        />
        <path
          d="M0.000409561 32.1646L0.000409561 66.4111C12.8618 66.4111 23.2881 55.9849 23.2881 43.1235L23.2881 8.87689C10.9966 8.98066 1.39567 19.5573 0.000409561 32.1646Z"
          fill="#A4CAFE"
        />
        <path
          d="M50.877 5H23.9748C11.2182 5 0.876953 15.2975 0.876953 28H27.7791C40.5357 28 50.877 17.7025 50.877 5Z"
          fill="#1C64F2"
        />
      </Svg>
    );

  if (name === "CLOSE")
    return (
      <Svg>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </Svg>
    );
  if (name === "CHECK")
    return (
      <Svg>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </Svg>
    );
  return null;
};

export default Icon;
