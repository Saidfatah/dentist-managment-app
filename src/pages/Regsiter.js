import React, { useEffect } from "react";
import { connect } from "react-redux";
import RegisterContainer from "../containers/Register";

const Regsiter = ({ getPayments }) => {
  useEffect(() => {
    getPayments();
  }, []);
  return (
    <div>
      <RegisterContainer />
    </div>
  );
};

export default connect(null, (dispatch) => ({
  getPayments: dispatch.register.getPayments,
}))(Regsiter);
