const model = {
  state: {
    appointments: [],
  },
  reducers: {
    fetchedAppointments: (state, { appointments }) => ({
      ...state,
      appointments,
    }),
  },
  effects: (dispatch) => ({
    fetchAppointments(field, state) {
      try {
        const appointments = [];

        dispatch.appointments.fetchedAppointments({ appointments });
      } catch (error) {
        console.log(error);
      }
    },
    confirmClientVisit(field, state) {
      try {
      } catch (error) {
        console.log(error);
      }
    },
  }),
};
export default model;
