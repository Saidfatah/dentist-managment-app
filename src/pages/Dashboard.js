import React, { useEffect } from "react";
import DashboardContainer from "../containers/Dashboard/index";
import { connect } from "react-redux";

const Dashboard = ({ fetchClients }) => {
  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div>
      <DashboardContainer />
    </div>
  );
};

export default connect(null, (dispatch) => ({
  fetchClients: dispatch.clients.fetchClients,
}))(Dashboard);
