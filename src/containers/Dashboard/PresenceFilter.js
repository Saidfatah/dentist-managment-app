//normalcliants
import React, { useState, useEffect } from "react";
import { isOrthoClient } from "../../store/models/clients/client.utils";
import { connect } from "react-redux";
import Table from "./Table";

const NormalClients = ({
  clientType,
  clientsVisitingToday,
  confirmClientAttendance,
}) => {
  const [notAttendedClientsVisitingToday, seNotAttendedClientsVisitingToday] =
    useState([]);
  const [
    attendedNormalClientsVisitingToday,
    setAttendedNormalClientsVisitingToday,
  ] = useState([]);

  const isOrthoClientFilter = (client) => {
    if (clientType === "NORMAL") return !isOrthoClient(client);
    if (clientType === "ORTHO") return isOrthoClient(client);
  };
  useEffect(() => {
    const notAttendedClient = [...clientsVisitingToday].filter(
      (client) => isOrthoClientFilter(client) && !client.hasAttended
    );
    const attendedNormalClients = [...clientsVisitingToday].filter(
      (client) => isOrthoClientFilter(client) && client.hasAttended
    );

    seNotAttendedClientsVisitingToday([...notAttendedClient]);
    setAttendedNormalClientsVisitingToday([...attendedNormalClients]);
  }, [clientsVisitingToday]);

  return (
    <div className="p-4">
      <h1 className=" text-lg font-bold">List D'attend</h1>
      <Table
        confirmClientAttendance={confirmClientAttendance}
        clients={notAttendedClientsVisitingToday}
        HEADERS={["Nom", "Prénom", "N°session", "présence"]}
        noClientsVisitingToday={clientsVisitingToday.length === 0}
      />
      <div className=" text-lg font-bold">
        <h1>Les clients present</h1>
        <Table
          HEADERS={["Nom", "Prénom", "N°session", "afficher"]}
          clients={attendedNormalClientsVisitingToday}
        />
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    clientsVisitingToday: state.clients.clientsVisitingToday,
  }),
  (dispatch) => ({
    confirmClientAttendance: dispatch.clients.confirmClientAttendance,
  })
)(NormalClients);
