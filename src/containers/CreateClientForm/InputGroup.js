import React from "react";

const InputGroup = ({
  field,
  subField,
  value,
  placeHolder,
  setFormField,
  type,
}) => {
  const inputGorupClasses = "mb-2 flex  flex-col";
  const labelClasses = "";
  const inputClasses = `
  bg-white
  appearance-none
  border-2
  border-gray-200
  bg-white
  rounded
  w-full
  py-2
  px-4
  text-gray-700
  leading-tight
  focus:outline-none
  focus:bg-white
  focus:border-purple-500
  `;

  let input;
  if (!type) {
    input = (
      <input
        value={value}
        onChange={setFormField(field, subField)}
        placeholder={placeHolder}
        name={field}
        className={inputClasses}
      />
    );
  }
  if (type === "number") {
    input = (
      <input
        value={value}
        onChange={setFormField(field, subField)}
        placeholder={placeHolder}
        name={field}
        max={100}
        type="number"
        step="1"
        min={8}
        className={inputClasses}
      />
    );
  }

  if (type === "checkbox") {
    const className =
      "form-check-input  rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-1 cursor-pointer";
    input = (
      <div className="flex ml-2">
        <div className="form-check">
          <input
            className={className}
            type="radio"
            value={true}
            id="flexCheckDefault"
            name={field}
            checked={value}
            onChange={setFormField(field, subField)}
          />
          <label
            className="form-check-label inline-block text-gray-800"
            for="flexCheckDefault"
          >
            oui
          </label>
        </div>
        <div className="form-check ml-1 ">
          <input
            className={className}
            type="radio"
            value={false}
            onChange={setFormField(field, subField)}
            id="flexCheckChecked"
            name={field}
            checked={!value}
          />
          <label
            className="form-check-label inline-block text-gray-800"
            for="flexCheckChecked"
          >
           Non 
          </label>
        </div>
      </div>
    );
  }

  if (type === "textaria") {
    input = (
      <textarea
        className={inputClasses}
        onChange={setFormField(field, subField)}
      />
    );
  }

  return (
    <div className={inputGorupClasses}>
      <label className={labelClasses} htmlFor={field}>
        {placeHolder}
      </label>
      {input}
      {/* <Error text={} /> */}
    </div>
  );
};

export default InputGroup;
