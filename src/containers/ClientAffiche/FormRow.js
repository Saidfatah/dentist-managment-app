import React, { useState } from "react";
import { sessionSchema } from "../../store/models/clients/client.schema";
import { connect } from "react-redux";
import { thootNumbers } from "../../store/models/clients/client.schema.js";
const thootnbr = thootNumbers;

const DropdawnList = ({ toothNumber, setFormField }) => {
  const options = thootnbr.map((thootNumber) => (
    <option key={thootNumber} value={thootNumber}>
      {thootNumber}
    </option>
  ));
  return (
    <select
      defaultValue={toothNumber}
      className="w-full p-2 border-2 border-gray-200 "
      value={toothNumber}
      onChange={setFormField("toothNumber")}
    >
      {options}
    </select>
  );
};

const FormRow = ({ addsession }) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [formData, setformData] = useState({
    ...sessionSchema(thootNumbers[0], "", 0, 0, 0),
  });

  const setFormField = (field) => (e) => {
    if (!canSubmit) setCanSubmit(true);
    setformData({ ...formData, [field]: e.target.value });
  };

  const { date, price, reste, received, intervention, toothNumber } = formData;

  return (
    <>
      <tr>
        <td className="py-2 bg-white text-sm">
          <p className="py-2 px-4">{date}</p>
        </td>
        <td className="py-2 bg-white text-sm">
          <DropdawnList value={toothNumber} setFormField={setFormField} />
        </td>
        <td className="py-2 bg-white text-sm">
          <input
            value={intervention}
            onChange={setFormField("intervention")}
            placeholder="intervention"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </td>
        <td className="py-2 bg-white text-sm">
          <input
            value={price}
            onChange={setFormField("price")}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </td>
        <td className="y-2 bg-white text-sm">
          <input
            value={received}
            onChange={setFormField("received")}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </td>
        <td className="y-2 bg-white text-sm">
          <input
            value={reste}
            onChange={setFormField("reste")}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </td>
      </tr>
      {canSubmit && (
        <tr className="w-full">
          <td colSpan="6">
            <button
              className="w-full h-12 bg-green-400 p-2 shadow-sm text-white"
              onClick={() => addsession(formData)}
            >
              ajouter
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

export default connect(undefined, (dispatch) => ({
  addsession: dispatch.clients.addsession,
}))(FormRow);
