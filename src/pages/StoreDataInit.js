import React, { useEffect } from "react";
import { connect } from "react-redux";
const StoreDataInit = ({ getTodaysClients, children }) => {
  useEffect(() => {
    getTodaysClients();
  }, [getTodaysClients]);

  return <div>{children}</div>;
};

export default connect(undefined, (dispatch) => ({
  getTodaysClients: dispatch.clients.getTodaysClients,
}))(StoreDataInit);
