import React from "react";
import InputGroup from "./InputGroup";
const FormStep2 = ({ setFormField, formData }) => {
  const {
    extraInfo: {
      healthProblems,
      anesthesia,
      péncilineAllergie,
      bleeding,
      pregnant,
      observation,
    },
  } = formData;

  return (
    <div className="p-2">
      <InputGroup
        value={healthProblems}
        field="extraInfo"
        subField="healthProblems"
        placeHolder={"Avez-vous des problemes de Sante"}
        setFormField={setFormField}
      />
      <InputGroup
        value={anesthesia}
        field="extraInfo"
        subField="anesthesia"
        placeHolder={"Avez-vous deie eu une anesthésie locale!"}
        setFormField={setFormField}
        type="checkbox"
      />
      <InputGroup
        value={péncilineAllergie}
        field="extraInfo"
        subField="péncilineAllergie"
        placeHolder={
          "Etes-vous allergique aux pénicilline ou à d'autre médicaments!"
        }
        setFormField={setFormField}
        type="checkbox"
      />
      <InputGroup
        value={bleeding}
        field="extraInfo"
        subField="bleeding"
        placeHolder={"Saigner-vous beaucou aprés coupure ou piguret"}
        setFormField={setFormField}
        type="checkbox"
      />
      <InputGroup
        value={pregnant}
        field="extraInfo"
        subField="pregnant"
        placeHolder={"etais vous enceinte!"}
        setFormField={setFormField}
        type="checkbox"
      />
      <InputGroup
        value={observation}
        field="extraInfo"
        subField="observation"
        placeHolder={"observation"}
        setFormField={setFormField}
        type="textaria"
      />
    </div>
  );
};

export default FormStep2;
