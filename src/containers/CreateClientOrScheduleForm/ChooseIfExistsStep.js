import React from "react";
import { ActionButton, Icon } from "../../components";
import {
  CLIENT_INFO_STEP_HEIGHT,
  DATE_STEP_HEIGHT,
  SEARCH_STEP_HEIGHT,
} from "./constants";

const STEP_1_TYPES = ["NEW", "SEARCHED"];
const FormStep0 = ({ setStep1Type, setStep, setHeight }) => {
  return (
    <div className="p2">
      <div className="flex  items-center  justify-center flex-col gap-4">
        <ActionButton
          extraStyles={{ width: 200 }}
          classes="gap-0 "
          justify="justify-center"
          onClick={() => {
            setHeight(SEARCH_STEP_HEIGHT);
            setStep(1);
            setStep1Type(STEP_1_TYPES[1]);
          }}
        >
          <div className="flex  items-center py-2 pr-4 pl-3">
            <p className="mr-2">Client Exist Deja</p>
            <Icon name="SEARCH" classes="mr-1" />
          </div>
        </ActionButton>
        <ActionButton
          extraStyles={{ width: 200 }}
          classes="gap-0 "
          justify="justify-center"
          onClick={() => {
            setHeight(CLIENT_INFO_STEP_HEIGHT);
            setStep(1);
            setStep1Type(STEP_1_TYPES[0]);
          }}
        >
          <div className="flex  items-center py-2 pr-4 pl-3">
            <p className="mr-2">Nouveau Client</p>
            <Icon name="ADD" classes="mr-1" />
          </div>
        </ActionButton>
      </div>
    </div>
  );
};

export default FormStep0;
