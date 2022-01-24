import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const DashboardContainer = ({ clientsVisitingToday }) => {
  // let { pathname, pathnameBase } = useMatch({end});
  // console.log({ pathname, pathnameBase });

  const Tabs = () => {
    const LinkClasses = `
        nav-link
        block
        font-medium
        text-xs
        leading-tight
        uppercase
        border-x-0 border-t-0 border-b-2 border-transparent
        px-6
        py-3
        my-2
        hover:border-transparent hover:bg-gray-100
        focus:border-transparent
        active
      `;
    return (
      <ul
        class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
        id="tabs-tab"
        role="tablist"
      >
        <li role="presentation" >
          <Link to="/NormalClients" className={LinkClasses}>
            Clients normal
          </Link>
        </li>
        <li role="presentation">
          <Link to="/OrthoClients" className={LinkClasses}>
            Clients ortho
          </Link>
        </li>
      </ul>
    );
  };
  // [TODO_BEKRINE] when you're done with other tasks figure out how to do nested routing in v6
  return (
    <div>
      <Tabs/>
    </div>
  );
};

export default connect((state) => ({
  clientsVisitingToday: state.clients.clientsVisitingToday,
}))(DashboardContainer);
