import React, { useEffect } from "react";
import { connect } from "react-redux";
import { animated, useSpring } from "react-spring";
import Icon from "./Icon";
import getConfirmation from "../utils/getConfirmation";
import { STEP_0_HEIGHT } from "../containers/CreateClientOrScheduleForm/constants";
const ModalComponent = ({
  children,
  appointmentModalIsOpen,
  imageModalIsOpen,
  paymentModalIsOpen,
  hideModal,
  width,
  height,
  title,
  submitStatus,
  setHeight,
  id,
}) => {
  const heightInterpolated = useSpring({
    height: height,
  });

  console.log({height})
  console.log(heightInterpolated.height)
  useEffect(() => {
    if (appointmentModalIsOpen && setHeight && height !== STEP_0_HEIGHT) {
      setHeight(STEP_0_HEIGHT);
    }
  }, [appointmentModalIsOpen,height,setHeight]);

  const closeModal = () => {
    if (submitStatus === "SUBMIT_SUCCESS" || id === "IMAGE_MODAL")
      return hideModal();

    if (getConfirmation()) hideModal();
  };

  const isOpen = () => {
    if (id === "ADD_PAYMENT_MODAL") return paymentModalIsOpen;
    if (id === "ADD_APPOINTMENT_MODAL") return appointmentModalIsOpen;
    if (id === "IMAGE_MODAL") return imageModalIsOpen;
  };

  if (!isOpen()) return null;
  return (
    <div
      style={{
        zIndex: 9999,
      }}
      className="h-full w-screen bg-gray-500/50 absolute top-0 left-0"
    >
      <div>
        <animated.div
          style={{
            marginRight: "-50%",
            marginTopt: "-50%",
            transform: "translate(-50%, -50%)",
            width,
            zIndex: 9999,
            height: heightInterpolated.height,
          }}
          className=" bg-white right-auto p-4 shadow-md  border-2 border-gray-200 rounded-md  left-1/2 top-1/2 absolute "
        >
          <div className="flex justify-between ">
            {title || <div></div>}
            <button onClick={closeModal}>
              <Icon
                name="CLOSE"
                size={25}
                classes="text-black cursor-pointer"
              />
            </button>
          </div>
          {children}
        </animated.div>
      </div>
    </div>
  );
};
export default connect(
  (state) => ({
    appointmentModalIsOpen: state.UI.appointmentModalIsOpen,
    paymentModalIsOpen: state.UI.paymentModalIsOpen,
    imageModalIsOpen: state.UI.imageModalIsOpen,
    submitStatus: state.clients.submitStatus,
  }),
  (dispatch) => ({
    hideModal: dispatch.UI.hideModal,
  })
)(ModalComponent);
