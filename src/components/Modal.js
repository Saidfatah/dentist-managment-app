import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";

const ModalComponent = ({
  children,
  modalIsOpen,
  hideModal,
  width,
  height,
}) => {
  const afterOpenModal = () => {};

  const closeModal = () => {
    hideModal();
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
      {children}
    </Modal>
  );
};
export default connect(
  (state) => ({
    modalIsOpen: state.UI.modalIsOpen,
  }),
  (dispatch) => ({
    hideModal: dispatch.UI.hideModal,
  })
)(ModalComponent);
