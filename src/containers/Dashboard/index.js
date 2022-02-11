import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

const LinkClasses = `nav-linkblockfont-mediumtext-xsleading-tightuppercaseborder-x-0 border-t-0 border-b-2 border-transparentpx-6py-3hover:border-transparent hover:bg-gray-100focus:border-transparentactive`;
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
