import React, { useState } from "react";
import { personalInfoSchema } from "../../store/models/clients/client.schema";
import { connect } from "react-redux";
import FormInfoStep from "./FormInfoStep";
import FormDateStep from "./FormDateStep";
import { useSpring, animated } from "react-spring";
import { MODAL_WIDTH } from "../../utils/constants";
import {
  ActionButton,
  CancelButton,
  Icon,
  Loader,
  Success,
} from "../../components";
import { parseStringToBoolean } from "./utils";

const AddClient = ({ addNewclient, submitStatus }) => {
  const [step, setStep] = useState(0);
  const [formData, setformData] = useState({
    ...personalInfoSchema("", "", "", "", "", ""),
    appointmentDate: new Date(),
  });

  const props = useSpring({
    left: step * -1 * (MODAL_WIDTH - 40),
  });
  const formStep1opacity = useSpring({
    opacity: step === 1 ? 0 : 1,
  });
  const formStep2opacity = useSpring({
    opacity: step === 1 ? 1 : 0,
  });
  const setFormField = (field, subField) => (e) => {
    let value = e.target.value;
    if (value === "true" || value === "false")
      value = parseStringToBoolean(e.target.value);

    if (subField) {
      const extraInfo = formData.extraInfo;
      extraInfo[subField] = value;
      return setformData({
        ...formData,
        extraInfo: { ...extraInfo },
      });
    }
    return setformData({ ...formData, [field]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addNewclient(formData);
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
            <p className="mr-2">Suivant</p>
            <Icon name="RIGHT" classes="mr-1" />
          </ActionButton>
        ) : (
          <div className=" flex justify-center items-center ">
            <CancelButton
              classes1="mr-4"
              onClick={() => {
                setStep(0);
              }}
            >
              <Icon name="LEFT" classes="mr-2" />
              <p className="ml-1">Precedant</p>
            </CancelButton>
            <ActionButton classes="gap-0 " type="submit">
              <p>Submit</p>
            </ActionButton>
          </div>
        )}
      </div>
    );
  };

  const formContent = () => {
    switch (submitStatus) {
      case "SUBMIT_SUCCESS":
        return <Success text="added client sucessfully" />;
      case "SUBMIT_PROGRESS":
        return <Loader title="entriene de creere le rendevouz" />;
      case "SUBMIT_READY":
        return (
          <>
            <div
              style={{
                height: "inherit",
              }}
              className="relative overflow-x-hidden  "
            >
              <animated.div
                style={{
                  ...props,
                }}
                className="absolute top-0 flex items-center flex-1  w-full "
              >
                <animated.div
                  style={{ ...formStep1opacity }}
                  className="w-full flex-shrink-0 "
                >
                  <FormInfoStep
                    setFormField={setFormField}
                    formData={formData}
                  />
                </animated.div>
                <animated.div
                  style={{ ...formStep2opacity }}
                  className="w-full flex-shrink-0"
                >
                  <FormDateStep
                    setFormField={setFormField}
                    formData={formData}
                  />
                </animated.div>
              </animated.div>
            </div>
            <Stepper />
          </>
        );
        break;

      default:
        return null;
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      className=" max-w-5xl h-full flex flex-col  justify-between  "
    >
      {formContent()}
    </form>
  );
};

export default connect(
  (state) => ({
    submitStatus: state.clients.submitStatus,
  }),
  (dispatch) => ({
    addNewclient: dispatch.clients.addNewclient,
  })
)(AddClient);
