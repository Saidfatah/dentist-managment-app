import React from "react";
import { connect } from "react-redux";
import { fontWeights } from "../../utils/values";
import NavBarLinks from "./NavBarLinks";
import Logo from "../../images/logo.png";

const isMobile = document.body.offsetWidth <= 766;
const Navbar = ({ showSideBar }) => {
  return (
    <nav className="bg-white border-gray-200 text px-2 sm:px-4 py-2.5 rounded shadow-md ">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          <NavBarLinks direction="col-row" />
        </div>
        <button
          className="cursor-pointer"
          disabled={!isMobile}
          onClick={() => showSideBar()}
          className="flex justify-between items-center "
        >
          <img
            src={Logo}
            alt="logo"
            style={{
              height: 30,
              width: 30 * 1.3,
            }}
          />
          <span
            className={"self-center whitespace-nowrap " + fontWeights.semiBold}
          >
            Smile dente
          </span>
        </button>
      </div>
    </nav>
  );
};

export default connect(null, (dispatch) => ({
  showSideBar: dispatch.UI.showSideBar,
}))(Navbar);
