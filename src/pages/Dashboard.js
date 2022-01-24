//dashboard page
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashboardContainer from "../containers/Dashboard/index";
import { connect } from "react-redux";

const Dashboard = ({ getTodaysClients }) => {
  useEffect(() => {
    getTodaysClients();
  }, []);

  return (
    <div>
      <DashboardContainer />
      <div>
      <Outlet/>
      </div>
      
    </div>
  );
};

export default connect(null, (dispatch) => ({
  getTodaysClients: dispatch.clients.getTodaysClients,
}))(Dashboard);
