//dashboard page
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashboardContainer from "../containers/Dashboard/index";
import { connect } from "react-redux";

const Dashboard = ({ getTodaysClients }) => {
  useEffect(() => {
    console.log("getTodaysClients");
    getTodaysClients();
  }, []);

  return (
    <div className="p-4">
      <div className="shadow-sm rounded-lg overflow-hidden border-2   border-gray-200 ">
        <DashboardContainer />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default connect(null, (dispatch) => ({
  getTodaysClients: dispatch.clients.getTodaysClients,
}))(Dashboard);
