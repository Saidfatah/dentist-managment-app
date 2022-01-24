import React from "react";
import Loader from "../../components/Loader";
import Table from "./Table";
import ClientAfficheHeader from "./ClientAfficheHeader";

const ClientAffiche = ({ client }) => {
  if (client == undefined || client == null)
    return <Loader title="Attendez S'il vous plaît." />;

  console.log(client);
  return (
    <div className="p-4 min-h-screen flex  inline-block min-w-full ">
      <div
        className="bg-gray-500 h-screen shadow-xl rounded-lg overflow-hidden border-2   border-gray-200 mr-2 "
        style={{ width: 300 }}
      >
        azez
      </div>
      <div className=" flex-1">
        <ClientAfficheHeader client={client} />
        <Table sessions={client.sessions} />
      </div>
    </div>
  );
};

export default ClientAffiche;
