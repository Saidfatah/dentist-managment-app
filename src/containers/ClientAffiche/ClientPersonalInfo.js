import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { ActionButton, CancelButton } from "../../components";

const CLientPersonalInfo = ({ client, updateClientInfo }) => {
  const [isEditState, setIsEditState] = useState(false);
  const [ClientInfo, setClientInfo] = useState({});
  const [updatedFields, setUpdatedFields] = useState({});
  const [canSubmit, setCanSubmit] = useState(true);
  const lastClientInfo = useRef();
  useEffect(() => {
    if (!client) return;
    const { perosnalInfo } = client;

    if (!ClientInfo) return;

    const { firstName, lastName, phone, age, profession, address } =
      perosnalInfo;
    setClientInfo({
      firstName,
      lastName,
      phone,
      age,
      profession,
      address,
    });
  }, [client]);

  const setFormField = (field) => (e) => {
    if (!canSubmit) setCanSubmit(true);
    setUpdatedFields({ ...updatedFields, [field]: e.target.value });
    setClientInfo({ ...ClientInfo, [field]: e.target.value });
  };

  const { firstName, lastName, phone, age, profession, address } = ClientInfo;

  const ClientInfoFooter = () => {
    if (isEditState)
      return (
        <div className="mt-2">
          <ActionButton
            classes="gap-0 p-2 "
            onClick={() => {
              setIsEditState(false);
              updateClientInfo({ updatedFields });
            }}
          >
            <p className="mr-2 text-sm">Sauvgarder </p>
          </ActionButton>
          <CancelButton
            classes="gap-0 p-2 "
            onClick={() => {
              setIsEditState(false);
              console.log(lastClientInfo.current);
              setClientInfo({ ...lastClientInfo.current });
            }}
          >
            <p className="mr-2 text-sm">Annuller </p>
          </CancelButton>
        </div>
      );

    return (
      <div className="mt-2">
        <ActionButton
          classes="gap-0 p-2 "
          onClick={() => {
            setIsEditState(true);
            console.log(ClientInfo);
            lastClientInfo.current = { ...ClientInfo };
          }}
        >
          <p className="mr-2 text-sm">Modifier </p>
        </ActionButton>
      </div>
    );
  };

  let inputClass =
    " appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none   focus:border-blue-500";

  if (!isEditState) inputClass += "  border-white";
  return (
    <div className="shadow-md rounded-lg p-4 mb-2 border-2 border-gray-200 ">
      <div>
        <div>
          <span>Nom et Prénom : </span>
          <span className="text-gray-400">
            <span>{firstName + " "}</span>
            <span>{lastName}</span>
          </span>
        </div>
        <div>
          <span>Age :</span>
          <br />
          <input
            disabled={!isEditState}
            value={age}
            type="number"
            onChange={setFormField("age")}
            className={inputClass}
            placeholder="Inserer L'age"
          />
        </div>
        <div>
          <span>Profession :</span>
          <input
            disabled={!isEditState}
            value={profession}
            onChange={setFormField("profession")}
            className={inputClass}
            placeholder="inserer l'a profession "
          />
        </div>
        <div className="mt-2">
          <span>Adresse :</span>
          <input
            disabled={!isEditState}
            onChange={setFormField("address")}
            className={inputClass}
            value={address}
            placeholder="inserer l'adress "
          />
        </div>
        <div className="mt-2">
          <span>Tél :</span>
          <br />
          <input
            disabled={!isEditState}
            value={phone}
            onChange={setFormField("phone")}
            className={inputClass}
            placeholder="inserer l'a profession "
          />
        </div>
      </div>
      <ClientInfoFooter />
    </div>
  );
};

export default connect(null, (dispatch) => ({
  updateClientInfo: dispatch.clients.updateClientInfo,
}))(CLientPersonalInfo);
