//normalcliants
import React, { useState, useEffect } from "react";
import { isNormalClient } from "../../store/models/clients/client.utils";
import { connect } from "react-redux";
import ActionButton from "../../components/buttons/ActionButton";
import { useNavigate } from "react-router-dom";

const NormalClients = ({ clientsVisitingToday }) => {
  let navigate = useNavigate();
  const [normalClientsVisitingToday, setNormalClientsVisitingToday] = useState(
    []
  );

  const HEADERS = ["Nom", "Prénom", "N°session", "prsence", "afficher"];
  const confirmClientAttended = (id) => (e) => {};

  const showClient = (id) => (e) => {
    navigate(`/clientPage/${id}`);
  };
  const clients = clientsVisitingToday;
  useEffect(() => {
    clients.forEach((client) => {
      if (isNormalClient(client)) {
        setNormalClientsVisitingToday((clients) => [...clients, client]);
      }
    });
  }, []);

  const TableHead = () => {
    return (
      <thead>
        <tr>
          {HEADERS.map((header) => (
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

  console.log(normalClientsVisitingToday);
  const TableBody = () => {
    return (
      <tbody className="w-full">
        {normalClientsVisitingToday
          .map(({ id, sessions, perosnalInfo: { firstName, lastName } }) => ({
            firstName,
            lastName,
            NSESSION: sessions.length,
            action1: (
              <ActionButton
                id={id}
                onClick={confirmClientAttended(id)}
                title={"confirmer l'attendance"}
              />
            ),
            action2: (
              <ActionButton
                onClick={showClient(id)}
                title={"afficher le client"}
              />
            ),
          }))
          .map((client, index) => (
            <tr key={index}>
              {Array.from(Object.keys(client)).map((key, index) => (
                <td
                  key={index}
                  className="y-2  px-5 py-3 text-left bg-white text-sm"
                >
                  {key !== "action1" && key !== "action2" ? (
                    <p className="text-gray-900 whitespace-no-wrap">
                      {client[key]}
                    </p>
                  ) : (
                    client[key]
                  )}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    );
  };

  //tale end
  //[TODO_BEKRINE] make sure this returns the right array

  //[TODO_BEKRINE] create two diffrent arrays
  //one is clientWhoHaventAttendedYet this means clients where hasAttended === false
  //two is clientWhoHaveAttended this means clients where hasAttended === true
  return (
    <table className="w-full">
      <TableHead />
      <TableBody />
    </table>
  );
};

export default connect((state) => ({
  clientsVisitingToday: state.clients.clientsVisitingToday,
}))(NormalClients);
