import React, { useState } from "react";
import { connect } from "react-redux";

const Section = ({ title, filter, clientsVisitingToday }) => {
  // filter = NORMAL_CLIENTS  NORMAL_CLIENTS_ATTENDED
  // ORTHO_CLIENTS ORTHO_CLIENTS_ATTENDED
  const [state, setstate] = useState(clientsVisitingToday.filter());

  return (
    <div>
      <h1>{title}</h1>
      <h1>{title}</h1>
    </div>
  );
};

//GET
export default connect((state) => ({
  clientsVisitingToday: state.clients.clientsVisitingToday,
}))(Section);
