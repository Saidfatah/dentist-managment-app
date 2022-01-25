import React from "react";

const REGISTER_TABLE_HEADERS = [
  "Refrence du paiment",
  "nom prénom",
  "date",
  "amount",
];
const RegisterTable = ({ payments }) => {
  console.log(payments);

  const TableHead = () => {
    return (
      <thead>
        <tr>
          {REGISTER_TABLE_HEADERS.map((header) => (
            <th
              key={header}
              className="px-5 py-3 text-left border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const TableBody = () => {
    return (
      <tbody className="w-full">
        {payments
          .map(({ amount, date, fullName, refrence }) => ({
            refrence,
            fullName,
            date,
            amount,
          }))
          .map((payment, index) => (
            <tr key={index}>
              {Array.from(Object.keys(payment)).map((key, index) => (
                <td
                  key={index}
                  className="y-2  px-5 py-3 text-left bg-white text-sm"
                >
                  <p className="text-gray-900 whitespace-no-wrap">
                    {payment[key]}
                  </p>
                </td>
              ))}
            </tr>
          ))}
        {payments.length === 0 ? (
          <tr className="p-4">
            <p className="p-4">ilya acune paiment ce jour</p>
          </tr>
        ) : null}
      </tbody>
    );
  };

  return (
    <table className="w-full shadow-md rounded-lg overflow-hidden border-2 mb-4  border-gray-200">
      <TableHead />
      <TableBody />
    </table>
  );
};

export default RegisterTable;
