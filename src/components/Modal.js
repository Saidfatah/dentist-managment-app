import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import Icon from "./Icon";
import getConfirmation from "../utils/getConfirmation";
const ModalComponent = ({
  children,
  modalIsOpen,
  hideModal,
  width,
  height,
  title,
  submitStatus,
}) => {
  const afterOpenModal = () => {};

  const closeModal = () => {
    if (submitStatus === "SUBMIT_SUCCESS") return
     hideModal();
    if (getConfirmation()) hideModal();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          marginTopt: "-50%",
          transform: "translate(-50%, -50%)",
          width,
          height,
        },
      }}
      contentLabel="Ajouter un rendevous"
    >
      <div className="flex justify-between ">
        {title || <div></div>}
        <button onClick={closeModal}>
          <Icon name="CLOSE" size={25} classes="text-black cursor-pointer" />
        </button>
      </div>
      {children}
    </Modal>
  );
};
export default connect(
  (state) => ({
    modalIsOpen: state.UI.modalIsOpen,
    submitStatus: state.clients.submitStatus,
  }),
  (dispatch) => ({
    hideModal: dispatch.UI.hideModal,
  })
)(ModalComponent);
