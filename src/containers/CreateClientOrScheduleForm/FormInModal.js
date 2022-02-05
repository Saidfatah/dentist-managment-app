import React, { useState } from "react";
import Modal from "../../components/Modal";
import CreateClientForm from "./createClientForm";
import { MODAL_WIDTH } from "../../utils/constants";
import { STEP_0_HEIGHT } from "./constants";

const FormInModal = () => {
  const [height, setHeight] = useState(STEP_0_HEIGHT);

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
