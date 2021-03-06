import React from "react";
import { Error } from "../../components";
import InputGroup from "./InputGroup";
const FormStep1 = ({ setFormField, formData, errorMessages }) => {
  const {
    CIN,
    firstName,
    lastName,
    age,
    phone,
    profession,
    address,
    isOrthoClient,
  } = formData;

  return (
    <div className="p2">
      <h1 className="font-bold uppercase">
        entrez les informations de patient
      </h1>
      <InputGroup
        value={CIN}
        field={"CIN"}
        placeHolder={"entrer le CIN du client"}
        setFormField={setFormField}
      />
      <InputGroup
        value={lastName}
        field={"lastName"}
        placeHolder={"Prénom"}
        setFormField={setFormField}
        // erro={}
      />

      {errorMessages ? <Error text={errorMessages.lastNameError} /> : null}
      <InputGroup
        setFormField={setFormField}
        value={firstName}
        field={"firstName"}
        placeHolder={"nom"}
      />
      {errorMessages ? <Error text={errorMessages.firstNameError} /> : null}
      <InputGroup
        setFormField={setFormField}
        value={age}
        field={"age"}
        type="number"
        placeHolder={"Age"}
      />
      <InputGroup
        setFormField={setFormField}
        value={address}
        field={"address"}
        placeHolder={"Adresse"}
      />
      <InputGroup
        setFormField={setFormField}
        value={phone}
        field={"phone"}
        placeHolder={"tele"}
      />
      <InputGroup
        setFormField={setFormField}
        value={isOrthoClient}
        type="checkbox"
        field={"isOrthoClient"}
        placeHolder={"ortho"}
      />
    </div>
  );
};

export default FormStep1;
