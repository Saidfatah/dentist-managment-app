import React from "react";
import Loader from "../../components/Loader";
import Table from "./Table";
import ClientPersonalInfo from "./ClientPersonalInfo";
import ToothCanvas from "./toothCanvas/toothCanvas";
import ClientExtraInfo from "./ClientExtraInfo";
import ImagesGallery from "./ImagesGallery";

const ClientAffiche = ({ client }) => {
  if (client == undefined || client == null || JSON.stringify(client) == "{}")
    return (
      <div
        style={{
          height: "calc(100vh - 72px)",
        }}
        className=" w-screen flex justify-center items-center "
      >
        <Loader size={40} />;
      </div>
    );

  return (
    <div className="p-4 ">
      <ClientPersonalInfo client={client} />

      <div className="flex  inline-block min-w-full ">
        <div className="mr-2" style={{ width: 300 }}>
          <ToothCanvas client={client} />
          <ClientExtraInfo client={client} />
          <ImagesGallery client={client} />
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
