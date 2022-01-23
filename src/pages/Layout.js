import React from "react";
import Routes from "./routes";
import Navbar from "../containers/Navbar/Navbar";
import SideNavbar from "../containers/Navbar/SideNavbar";

const Layout = () => {
  return (
    <div>
      <SideNavbar />
      <Navbar />
      <Routes />
    </div>
  );
};

export default Layout;
