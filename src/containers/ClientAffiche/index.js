import React from "react";
import Loader from "../../components/Loader";
import Table from "./Table";
import ClientPersonalInfo from "./ClientPersonalInfo";
import ToothCanvas from "./toothCanvas";
import ClientExtraInfo from "./ClientExtraInfo";

const ClientAffiche = ({ client }) => {
  if (client == undefined || client == null)
    return <Loader title="Attendez S'il vous plaît." />;

  return (
    <div className="p-4 flex  inline-block min-w-full ">
      <div className="mr-2" style={{ width: 300 }}>
        <ClientPersonalInfo client={client} />
        <ClientExtraInfo client={client} />
        <ToothCanvas client={client} />
      </div>
      <div
        style={{
          height: "calc(100vh - 104px)",
        }}
        className=" flex-1"
      >
        <Table sessions={client.sessions} />
      </div>
    </div>
  );
};

export default ClientAffiche;
