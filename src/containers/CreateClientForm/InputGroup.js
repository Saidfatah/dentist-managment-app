import React from "react";
import { Error } from "../../components";

const InputGroup = ({
  field,
  subField,
  value,
  placeholder,
  setFormField,
  type,
}) => {
  const labelClasses = "";
  const inputClasses =
    "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500";

  return (
    <div className="mb-2">
      <label className={labelClasses} htmlFor="firstName">
        {placeholder}
      </label>
      <input
        value={value}
        onChange={setFormField(field, subField)}
        placeholder={placeholder}
        name={field}
        className={inputClasses}
      />
      {/* <Error text={} /> */}
    </div>
  );
};

export default InputGroup;
