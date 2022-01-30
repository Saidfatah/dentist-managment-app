import React, { useState } from "react";
import Modal from "../../components/Modal";
import CreateClientForm from "./createClientForm";
import { MODAL_WIDTH } from "../../utils/constants";

const FormInModal = () => {
  const [height, setHeight] = useState(740);

  return (
    <Modal
      id="ADD_APPOINTMENT_MODAL"
      width={MODAL_WIDTH}
      height={height}
      setHeight={setHeight}
    >
      <CreateClientForm {...{ height, setHeight }} />
    </Modal>
  );
};

export default FormInModal;
