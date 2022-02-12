import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

const LinkClasses = `nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 hover:border-transparent hover:bg-gray-100 focus:border-transparent active`;
const DashboardContainer = () => {
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigation("/NormalClients");
  }, []);

  const Tabs = () => {
    const NormalClientsIsFocused =
      location.pathname.indexOf("NormalClients") > -1;
    return (
      <ul className="flex      mb-4">
        <li>
          <Link to="/NormalClients" className={LinkClasses}>
            Clients normal
          </Link>
          <div
            style={{
              opacity: NormalClientsIsFocused ? 1 : 0,
              height: 3,
            }}
            className="w-full  bg-green-400 "
          ></div>
        </li>
        <li>
          <Link to="/OrthoClients" className={LinkClasses}>
            Clients ortho
          </Link>
          <div
            style={{
              opacity: NormalClientsIsFocused ? 0 : 1,
              height: 3,
            }}
            className="w-full  bg-green-400 "
          ></div>
        </li>
      </ul>
    );
  };

  return (
    <div className="p-4">
      <Tabs />
    </div>
  );
};

export default connect((state) => ({
  clientsVisitingToday: state.clients.clientsVisitingToday,
}))(DashboardContainer);
