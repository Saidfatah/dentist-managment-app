import React, { useState } from "react";
import { isOrthoClient } from "../../store/models/clients/utils";

const OrthoClients = ({ clientsVisitingToday }) => {
  const [orthoClientsVisitingToday, setOrthoClientsVisitingToday] = useState([
    ...clientsVisitingToday.filter(isOrthoClient),
  ]);
  console.log(orthoClientsVisitingToday);

  return <div>ortho clients</div>;
};

export default OrthoClients;
