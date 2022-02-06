import React, { useState } from "react";
import { personalInfoSchema } from "../../store/models/clients/client.schema";
import { connect } from "react-redux";
import FormInfoStep from "./FormInfoStep";
import ChooseIfExistsStep from "./ChooseIfExistsStep";
import FormDateStep from "./FormDateStep";
import { useSpring, animated } from "react-spring";
import validator from "./validator";
import { MODAL_WIDTH } from "../../utils/constants";
import {
  ActionButton,
  CancelButton,
  Icon,
  Loader,
  Success,
} from "../../components";
import { parseStringToBoolean } from "./utils";
import {
  CLIENT_INFO_STEP_HEIGHT,
  DATE_STEP_HEIGHT,
  SEARCH_STEP_HEIGHT,
  STEP_0_HEIGHT,
  STEP_1_TYPES,
} from "./constants";
import SearchStep from "../Register/CreatePaymentForm/SearchStep";

const AddClient = ({
  addNewclient,
  submitStatus,
  getClientByCIN,
  setHeight,
  searchedClient,
  isSearching,
}) => {
  const [step, setStep] = useState(0);
  const [step1Type, setStep1Type] = useState(0);
  const [searchText, setSearchtext] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const [formData, setformData] = useState({
    ...personalInfoSchema("", "", "", "", "", "", false, ""),
    appointmentDate: new Date(),
  });

  const props = useSpring({
    left: step * -1 * (MODAL_WIDTH - 40),
  });
  const formStep0opacity = useSpring({
    opacity: step === 0 ? 1 : 0,
  });
  const formStep1opacity = useSpring({
    opacity: step === 1 ? 1 : 0,
  });
  const formStep2opacity = useSpring({
    opacity: step === 2 ? 1 : 0,
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
    addNewclient({ isNew: step1Type === STEP_1_TYPES[0], formData });
  };

  let result;
  const Stepper = () => {
    return (
      <div className="w-full flex justify-center ">
        {step === 1 ? (
          <div className=" flex justify-center items-center ">
            <CancelButton
              disabled={isSearching}
              classes1="mr-4"
              onClick={() => {
                setStep(0);
                setHeight(STEP_0_HEIGHT);
              }}
            >
              <Icon name="LEFT" classes="mr-2" />
              <p className="ml-1">Precedant</p>
            </CancelButton>
            <ActionButton
              classes="gap-0 "
              onClick={() => {
                if (step1Type === STEP_1_TYPES[0]) {
                  result = validator(formData);
                  const { value, message } = result;
                  if (value) {
                    setHeight(DATE_STEP_HEIGHT);
                    setStep(step - 1);
                  }
                  setErrorMessages(message);
                } else {
                  const { clientFound } = searchedClient;
                  if (clientFound) {
                    setStep(step + 1);
                    setHeight(DATE_STEP_HEIGHT);
                  } else getClientByCIN({ CIN: searchText });
                }
              }}
            >
              <div
                style={{
                  minWidth: 114,
                  minHeight: 40,
                }}
                className={
                  "flex  items-center py-2 pr-4 pl-3 " +
                  (isSearching ? " justify-center " : "")
                }
              >
                {isSearching ? (
                  <Loader />
                ) : (
                  <>
                    <p className="mr-2">Suivant</p>
                    <Icon name="RIGHT" classes="mr-1" />
                  </>
                )}
              </div>
            </ActionButton>
          </div>
        ) : (
          <div className=" flex justify-center items-center ">
            <CancelButton
              classes1="mr-4"
              onClick={() => {
                setStep(step - 1);
                if (step1Type === STEP_1_TYPES[0])
                  setHeight(CLIENT_INFO_STEP_HEIGHT);
                else setHeight(SEARCH_STEP_HEIGHT);
              }}
            >
              <Icon name="LEFT" classes="mr-2" />
              <p className="ml-1">Precedant</p>
            </CancelButton>
            <ActionButton classes="gap-0 " type="submit">
              <p className="py-2 pr-4 pl-3">Submit</p>
            </ActionButton>
          </div>
        )}
      </div>
    );
  };

  if (submitStatus === "SUBMIT_PROGRESS")
    return (
      <div
        style={{
          height: "calc(100% - 41px)",
        }}
        className="w-full flex justify-center items-center"
      >
        <Loader size={40} />
      </div>
    );

  if (submitStatus === "SUBMIT_SUCCESS")
    return (
      <div
        style={{
          height: "calc(100% - 41px)",
        }}
        className="w-full flex justify-center items-center"
      >
        <Success text="le rendez-vous est ajouté avec succès" />
      </div>
    );

  return (
    <form
      onSubmit={onSubmit}
      style={{
        height: "calc(100% - 25px)",
      }}
      className=" max-w-5xl flex flex-col  justify-between  "
    >
      <>
        <div
          style={{
            height: "inherit",
          }}
          className="relative overflow-x-hidden no-scroll-bar "
        >
          <animated.div
            style={{
              ...props,
            }}
            className="absolute top-0 flex items-center flex-1  w-full "
          >
            <animated.div
              style={{ ...formStep0opacity }}
              className="w-full flex-shrink-0 "
            >
              {step === 0 ? (
                <ChooseIfExistsStep
                  setHeight={setHeight}
                  setStep={setStep}
                  setStep1Type={setStep1Type}
                />
              ) : null}
            </animated.div>

            <animated.div
              style={{ ...formStep1opacity, paddingRight: 5 }}
              className="w-full flex-shrink-0"
            >
              {step === 1 ? (
                step1Type === STEP_1_TYPES[0] ? (
                  <FormInfoStep
                    setFormField={setFormField}
                    errorMessages={errorMessages}
                    formData={formData}
                  />
                ) : (
                  <SearchStep
                    {...{
                      setSearchtext,
                      searchText,
                    }}
                  />
                )
              ) : null}
            </animated.div>
            <animated.div
              style={{ ...formStep2opacity }}
              className="w-full flex-shrink-0"
            >
              {step === 2 ? (
                <FormDateStep setFormField={setFormField} formData={formData} />
              ) : null}
            </animated.div>
          </animated.div>
        </div>
        {step > 0 ? <Stepper /> : null}
      </>
    </form>
  );
};

export default connect(
  (state) => ({
    submitStatus: state.clients.submitStatus,
    searchedClient: state.clients.searchedClient,
    isSearching: state.clients.isSearching,
  }),
  (dispatch) => ({
    addNewclient: dispatch.clients.addNewclient,
    getClientByCIN: dispatch.clients.getClientByCIN,
  })
)(AddClient);
