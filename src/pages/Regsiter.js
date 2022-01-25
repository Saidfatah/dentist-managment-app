import React, { useEffect } from "react";
import { connect } from "react-redux";
import RegisterContainer from "../containers/Register";

const Regsiter = ({ getPayments }) => {
  useEffect(() => {
    getPayments();
  }, []);
  return (
    <div className="p-4">
      <div className="shadow-sm rounded-lg overflow-hidden border-2   border-gray-200 ">
        <RegisterContainer />
      </div>
    </div>
  );
};

export default connect(null, (dispatch) => ({
  getPayments: dispatch.register.getPayments,
}))(Regsiter);
