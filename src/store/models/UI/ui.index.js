const model = {
  state: {
    visible: false,
    appointmentModalIsOpen: false,
    paymentModalIsOpen: false,
  },
  reducers: {
    toggledSideBarVisible: (state, visible) => ({
      ...state,
      visible,
    }),
    toggledAppointmentModalIsOpen: (state, appointmentModalIsOpen) => ({
      ...state,
      appointmentModalIsOpen,
    }),
    toggledPaymentModalIsOpen: (state, paymentModalIsOpen) => ({
      ...state,
      paymentModalIsOpen,
    }),
  },
  effects: (dispatch) => ({
    showSideBar() {
      try {
        dispatch.UI.toggledSideBarVisible(true);
      } catch (error) {
        console.log("------showSidebar------");
        console.log(error);
      }
    },
    hideSideBar() {
      try {
        dispatch.UI.toggledSideBarVisible(false);
      } catch (error) {
        console.log("------hideSideBar------");
        console.log(error);
      }
    },
    hideModal() {
      try {
        dispatch.UI.toggledAppointmentModalIsOpen(false);
        dispatch.UI.toggledPaymentModalIsOpen(false);
        dispatch.clients.closedCreateNewClientModal();
      } catch (error) {
        console.log("------hideSideBar------");
        console.log(error);
      }
    },
    showModal({ modal_id }) {
      try {
        if (modal_id === "ADD_PAYMENT_MODAL")
          dispatch.UI.toggledPaymentModalIsOpen(true);
        if (modal_id === "ADD_APPOINTMENT_MODAL")
          dispatch.UI.toggledAppointmentModalIsOpen(true);
      } catch (error) {
        console.log("------hideSideBar------");
        console.log(error);
      }
    },
  }),
};
export default model;
