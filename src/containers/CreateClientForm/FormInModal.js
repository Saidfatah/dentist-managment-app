import React from "react";
import Modal from "../../components/Modal";
import CreateClientForm from "./createClientForm";
import { MODAL_WIDTH } from "./constants";

const FormInModal = () => {
  return (
    <Modal width={MODAL_WIDTH} height={"75%"}>
      <CreateClientForm />
    </Modal>
  );
};

export default FormInModal;
