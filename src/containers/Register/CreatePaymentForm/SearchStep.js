import React from "react";
import { connect } from "react-redux";
import { Error, Icon } from "../../../components";

const inputClasses = `bg-white appearance-none border-2 border-gray-200 bg-white rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500`;

const SearchresultItem = ({ clientFound, removeFoundClient }) => {
  if (clientFound === undefined) return null;

  const {
    perosnalInfo: { firstName, lastName },
  } = clientFound;

  return (
    <div className="flex  justify-between my-2 p-2    border-2 border-green-200 shadow-sm rounded-sm">
      <p className="text-green-400">{firstName + " " + lastName}</p>
      <button
        type="button"
        onClick={() => {
          removeFoundClient();
        }}
      >
        <Icon name="CLOSE" size={25} classes="text-red-400 cursor-pointer" />
      </button>
    </div>
  );
};

const SearchStep = ({
  setSearchtext,
  searchText,
  searchedClient,
  searchError,
  removeFoundClient,
}) => {
  const { clientFound } = searchedClient;

  return (
    <div>
      <input
        value={searchText}
        onChange={(e) => setSearchtext(e.target.value)}
        placeholder={"entrer le CIN du client"}
        name="searchText"
        className={inputClasses}
      />
      <SearchresultItem
        removeFoundClient={removeFoundClient}
        clientFound={clientFound}
      />
      <Error text={searchError} />
    </div>
  );
};

export default connect(
  (state) => ({
    searchedClient: state.clients.searchedClient,
    searchError: state.clients.searchError,
  }),
  (dispatch) => ({
    removeFoundClient: dispatch.clients.removeFoundClient,
  })
)(SearchStep);
