import React from "react";
import InputGroup from "./InputGroup";
const FormStep1 = ({ setFormField, formData }) => {
  const { firstName, lastName, age, phone, profession, address, CIN } =
    formData;

  return (
    <div className="p2">
      <h1 className="font-bold uppercase">
        entrez les informations de patient
      </h1>
      <InputGroup
        value={lastName}
        field={"lastName"}
        placeHolder={"Prénom"}
        setFormField={setFormField}
        // erro={}
      />
      <InputGroup
        setFormField={setFormField}
        value={firstName}
        field={"firstName"}
        placeHolder={"nom"}
      />
      <InputGroup
        setFormField={setFormField}
        value={age}
        field={"age"}
        type="number"
        placeHolder={"Age"}
      />
      <InputGroup
        setFormField={setFormField}
        value={profession}
        field={"profession"}
        placeHolder={"Profession"}
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
    </div>
  );
};

export default FormStep1;
