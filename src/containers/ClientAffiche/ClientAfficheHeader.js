import React, { useState } from "react";

const ClientAfficheHeader = ({ client }) => {
  const { perosnalInfo } = client;
  if (!perosnalInfo) return null;
  const { firstName, lastName, phone, age, profession, address } = perosnalInfo;
  return (
    <div className="shadow-md rounded-lg p-4 mb-4 border-2 border-gray-200 ">
      <div>
        <span>Nom et Prénom : </span>
        <span>{firstName + " "}</span>
        <span>{lastName}</span>
      </div>
      <div>
        <span>Age :</span>
        <input
          disabled={age !== ""}
          value={age}
          style={{
            width: 50,
          }}
          type="number"
          className={age !== "" ? "bg-white" : "bg-gray-100"}
          placeholder=""
        />
        <span>Profession :</span>
        <input
          disabled={profession !== ""}
          value={profession}
          className={profession !== "" ? "bg-white" : "bg-gray-100"}
          placeholder=".........."
        />
      </div>
      <div>
        <span>Adresse :</span>
        <input
          disabled={address !== ""}
          className={profession !== "" ? "bg-white" : "bg-gray-100"}
          value={address}
          placeholder=".........."
        />
      </div>
      <div>
        <span>Tél :</span>
        <span>{phone}</span>
      </div>
    </div>
  );
};

export default ClientAfficheHeader;
