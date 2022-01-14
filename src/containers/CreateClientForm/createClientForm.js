import React, { useState, useEffect } from "react";
import { clientSchema } from "../../store/models/clients/client.schema";
import { connect } from "react-redux";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import { useSpring, animated } from "react-spring";
import { MODAL_WIDTH } from "./constants";
import { ActionButton, CancelButton, Icon } from "../../components";

const AddClient = ({ addNewclient }) => {
  const [step, setStep] = useState(0);

  const props = useSpring({ left: step * -1 * (MODAL_WIDTH - 40) });

  const [formData, setformData] = useState({
    ...clientSchema("", "", "", "", "", ""),
  });

  const setFormField = (field, subField) => (e) => {
    if (subField)
      return setformData({
        ...formData,
        [field]: { [subField]: e.target.value },
      });
    return setformData({ ...formData, [field]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const Stepper = () => {
    return (
      <div className="w-full flex justify-center ">
        {step === 0 ? (
          <ActionButton
            classes="gap-0 "
            onClick={() => {
              setStep(1);
            }}
          >
            <Icon name="RIGHT" classes="mr-2" />
            <p>Suivant</p>
          </ActionButton>
        ) : (
          <div className=" flex justify-center items-center ">
            <CancelButton
              classes1="mr-4"
              onClick={() => {
                setStep(1);
              }}
            >
              <Icon name="LEFT" classes="mr-2" />
              <p>Precedant</p>
            </CancelButton>
            <ActionButton
              classes="gap-0"
              onClick={() => {
                setStep(0);
              }}
            >
              <p>Submit</p>
            </ActionButton>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className=" max-w-5xl h-full flex flex-col justify-between  ">
      <h1 className="font-bold uppercase text-center">
        entrez les informations de patient
      </h1>
      <div className="relative overflow-hidden  h-48 ">
        <animated.div
          style={{
            ...props,
          }}
          className="absolute top-0 flex items-center flex-1  w-full "
        >
          <div className="w-full flex-shrink-0 ">
            <FormStep1 setFormField={setFormField} formData={formData} />
          </div>
          <div className="w-full flex-shrink-0">
            <FormStep2 setFormField={setFormField} formData={formData} />
          </div>
        </animated.div>
      </div>
      <Stepper />
    </div>
  );
};

export default connect(undefined, (dispatch) => ({
  addNewclient: dispatch.clients.addNewclient,
}))(AddClient);
