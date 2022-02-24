import React from "react";
import { ActionButton, Loader, Icon, CancelButton } from "../../../components";

const Stepper = ({
  clientFound,
  isSearching,
  isAddingPayment,
  getClientByCIN,
  searchText,
  step,
  setStep,
  amount,
}) => {
  let step1ButtonHtml = <p className="mr-2">Cherhcer</p>;

  if (isSearching)
    step1ButtonHtml = (
      <div className="w-full  flex justify-center items-center h-full mb-1">
        <Loader title="searching" />
      </div>
    );
  if (!isSearching && clientFound)
    step1ButtonHtml = (
      <>
        <Icon name="RIGHT" classes="mr-1" />
        <p className="mr-2">Suivant</p>
      </>
    );

  let step2ButtonHtml = <p className="mr-2">ajouter le payment</p>;
  if (isAddingPayment)
    step2ButtonHtml = <Loader title="entrain d'ajouter le payment ..." />;

  return (
    <div className="w-full flex justify-center  ">
      {step === 0 ? (
        <ActionButton
          classes="gap-0 p-2  w-24 flex items-center justify-center"
          disabled={isSearching}
          onClick={() => {
            if (clientFound) {
              setStep(1);
            } else getClientByCIN({ CIN: searchText });
          }}
        >
          {step1ButtonHtml}
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

          <ActionButton
            classes="gap-0 p-2 "
            type="submit"
            disabled={amount <= 0}
          >
            {step2ButtonHtml}
          </ActionButton>
        </div>
      )}
    </div>
  );
};

export default Stepper;
