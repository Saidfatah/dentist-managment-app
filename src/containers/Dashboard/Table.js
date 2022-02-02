//normalcliants
import React from "react";
import ActionButton from "../../components/buttons/ActionButton";
import { useNavigate } from "react-router-dom";

const Table = ({ confirmClientAttendance, clients, HEADERS }) => {
  let navigate = useNavigate();
  const confirmClientAttended = (id) => () => {
    confirmClientAttendance({ id });
  };

  const showClient = (id) => () => {
    navigate(`/clientPage/${id}`);
  };

  const TableHead = () => {
    return (
      <thead>
        <tr>
          {[...HEADERS].map((header) => (
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
        {clients
          .map(({ id, sessions, perosnalInfo: { firstName, lastName } }) => {
            const cellsObj = {
              firstName,
              lastName,
              NSESSION: sessions.length,
            };
            if (!confirmClientAttendance)
              cellsObj.action1 = (
                <ActionButton
                  classes=" w-40 text-center"
                  onClick={showClient(id)}
                >
                  <p className=" w-full text-center">afficher le client</p>
                </ActionButton>
              );
            if (confirmClientAttendance)
              cellsObj.action2 = (
                <ActionButton
                  classes=" w-40"
                  id={id}
                  onClick={confirmClientAttended(id)}
                >
                  <p className=" w-full text-center">confirmer l'attendance</p>
                </ActionButton>
              );
            return cellsObj;
          })
          .map((client, index) => (
            <tr key={index}>
              {Array.from(Object.keys(client)).map((key, index) => (
                <td
                  key={index}
                  className="y-2  px-5 py-3 text-left bg-white text-sm"
                >
                  {key !== "action1" && key !== "action2" ? (
                    <p className=" text-base font-normal  text-gray-900 whitespace-no-wrap">
                      {client[key]}
                    </p>
                  ) : (
                    client[key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        {clients.length === 0 && confirmClientAttendance ? (
          <tr className="p-4">
            <p className="p-4">tous les clients sont présents</p>
          </tr>
        ) : null}
      </tbody>
    );
  };

  return (
    <table className="w-full mb-2 shadow-md rounded-lg overflow-hidden border-2 mb-4  border-gray-200">
      <TableHead />
      <TableBody />
    </table>
  );
};

export default Table;
