import React, { useState } from "react";
import Modal from "../../../components/Modal";
import { MODAL_WIDTH } from "../../../utils/constants";
import SearchStep from "./SearchStep";
import AddPaymentStep from "./AddPaymentStep";
import Stepper from "./Stepper";
import { connect } from "react-redux";
import { useSpring, animated } from "react-spring";

const CreatePaymentFormInModal = ({
  searchedClient,
  searchClientByCinOrFullName,
  isSearching,
  searchError,
  addPayment,
  isAddingPayment,
  removeFoundClient,
}) => {
  const [searchText, setSearchtext] = useState("");
  const [amount, setAmount] = useState(0);
  const [step, setStep] = useState(0);

  const props = useSpring({
    left: step * -1 * (MODAL_WIDTH - 40),
  });
  const formStep1opacity = useSpring({
    opacity: step === 1 ? 0 : 1,
  });
  const formStep2opacity = useSpring({
    opacity: step === 1 ? 1 : 0,
  });

  const { clientFound } = searchedClient;
  return (
    <Modal id="ADD_PAYMENT_MODAL" width={MODAL_WIDTH} height={300}>
      <>
        <h1 className="font-bold uppercase">add new payment</h1>
        <form
          style={{
            height: 180,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            addPayment({ amount });
          }}
        >
          <div
            style={{
              height: 180,
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
                <SearchStep
                  {...{
                    setSearchtext,
                    searchText,
                  }}
                />
              </animated.div>
              <animated.div
                style={{ ...formStep2opacity }}
                className="w-full flex-shrink-0"
              >
                <AddPaymentStep {...{ setAmount, amount }} />
              </animated.div>
            </animated.div>
          </div>
          <Stepper
            {...{
              clientFound,
              amount,
              isSearching,
              isAddingPayment,
              searchClientByCinOrFullName,
              searchText,
              step,
              setStep,
            }}
          />
        </form>
      </>
    </Modal>
  );
};

export default connect(
  (state) => ({
    searchedClient: state.clients.searchedClient,
    isSearching: state.clients.isSearching,
    searchError: state.clients.searchError,
    isAddingPayment: state.register.isAddingPayment,
  }),
  (dispatch) => ({
    searchClientByCinOrFullName: dispatch.clients.searchClientByCinOrFullName,
    addPayment: dispatch.register.addPayment,
    removeFoundClient: dispatch.clients.removeFoundClient,
  })
)(CreatePaymentFormInModal);
