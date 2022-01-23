import React from "react";
import Modal from "../../components/Modal";
import CreateClientForm from "./createClientForm";
import { MODAL_WIDTH } from "../../utils/constants";

const FormInModal = () => {
  return (
    <Modal id="ADD_APPOINTMENT_MODAL" width={MODAL_WIDTH} height={"80%"}>
      <CreateClientForm />
    </Modal>
  );
};

export default FormInModal;
