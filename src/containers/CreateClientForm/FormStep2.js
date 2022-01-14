import React from "react";
import InputGroup from "./InputGroup";
const FormStep2 = (setFormField, formData) => {
  const {
    extraInfo: { healthProblems },
  } = formData;

  return (
    <div>
      <InputGroup
        value={healthProblems}
        field="extraInfo"
        subField="healthProblems"
        placeHolder={"Avez-vous des problemes de Sante"}
        setFormField={setFormField}
        // erro={}
      />
      <div>
        <label></label>
        <label>Lequels</label>
        <label>Aver-vous deie eu une anesthésie locale!</label>
        <label>
          Etes-vous allergique aux pénicilline ou à d'autre médicaments
        </label>
        <label>Saigner-vous beaucou aprés coupure ou piguret</label>
        <label>Fres vous enceinte!</label>
      </div>
    </div>
  );
};

export default FormStep2;
