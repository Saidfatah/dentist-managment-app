import React from "react";
import Loader from "../../components/Loader";
import Table from "./Table";
import ClientPersonalInfo from "./ClientPersonalInfo";
import ToothCanvas from "./toothCanvas";
import ClientExtraInfo from "./ClientExtraInfo";
import { Heading } from "../../components";

const ClientAffiche = ({ client }) => {
  if (client == undefined || client == null)
    return <Loader title="Attendez S'il vous plaît." />;

  return (
    <div className="p-4 ">
      <ClientPersonalInfo client={client} />

      <div className="flex  inline-block min-w-full ">
        <div className="mr-2" style={{ width: 300 }}>
          <ToothCanvas client={client} />
          <ClientExtraInfo client={client} />
        </div>
        <div
          style={{
            height: "calc(100vh - 200px)",
          }}
          className=" flex-1"
        >
          <Table sessions={client.sessions} />
        </div>
      </div>
    </div>
  );
};

export default ClientAffiche;
