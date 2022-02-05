import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
const FormDateStep = ({ setFormField, formData }) => {
  const { appointmentDate } = formData;
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
  return (
    <div className="p-2 flex flex-col justify-center items-center ">
      <h1 className="font-bold uppercase">Choisr la date du rendevouz</h1>
      <DatePicker
        className={inputClasses}
        selected={appointmentDate}
        onChange={(date) => {
          console.log(date);
          setFormField("appointmentDate")({ target: { value: date } });
        }}
      />
    </div>
  );
};

export default FormDateStep;
