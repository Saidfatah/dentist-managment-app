import getTodaysClientsEffect from "./effects/getTodaysClients.effect";
import getClientByIdEffect from "./effects/getClientById.effect";
import getClientByCINEffect from "./effects/getClientByCIN.effect";
import addNewClientEffect from "./effects/addNewClient.effect";
import addSessionEffect from "./effects/addSession.effect";
import confirmClientAttendanceEffect from "./effects/confirmClientAttendance.effect";
import updateShapesEffect from "./effects/updateShapes.effect";
import updateClientInfoEffect from "./effects/updateClientInfo.effect";
import updateClientExtraInfoEffect from "./effects/updateClientExtraInfo.effect";
import { updateClientInDb } from "../../../services";

const model = {
  state: {
    clientsVisitingToday: [],
    clientsVisitingTodayCount: 0,

    //search functionality
    searchError: "client nexist pas",
    isSearching: false,
    searchedClient: {
      clientFound: undefined,
      from: undefined, //[TODAYS_CLIENTS , FIRESTORE] can either be from todays clients or queried from firestore
      index: -1, //incase from === TODAYS_CLIENTS we need the index to use in addPayment
    },

    clientsCount: 0,
    //[FIRESTORE_TODO] store in counts collectio
    // starts with C
    lastAddedClientrefrence: 0,
    visitedClient: undefined,
    submitStatus: "SUBMIT_READY", // SUBMIT_PROGRESS SUBMIT_SUCCESS SUBMIT_ERROR
  },
  reducers: {
    addedClient: (state, clients) => ({
      ...state,
      clients,
      submitStatus: "SUBMIT_SUCCESS",
    }),
    closedCreateNewClientModal: (state, args) => ({
      ...state,
      submitStatus: "SUBMIT_READY",
    }),
    startedAddingClient: (state, args) => ({
      ...state,
      submitStatus: "SUBMIT_PROGRESS",
    }),
    addedSession: (state, { clientsVisitingToday }) => ({
      ...state,
      clientsVisitingToday: [...clientsVisitingToday],
    }),
    updatedClientShapes: (state, { clientsVisitingToday }) => ({
      ...state,
      clientsVisitingToday: [...clientsVisitingToday],
    }),
    updatedClientPersonalInfo: (state, { clientsVisitingToday }) => ({
      ...state,
      clientsVisitingToday: [...clientsVisitingToday],
    }),
    updatedClientExtraInfo: (state, { clientsVisitingToday }) => ({
      ...state,
      clientsVisitingToday: [...clientsVisitingToday],
    }),
    confirmedClientAttendance: (state, { clientsVisitingToday }) => ({
      ...state,
      clientsVisitingToday: [...clientsVisitingToday],
    }),
    fetchedTodaysClients: (state, { clientsVisitingToday }) => ({
      ...state,
      clientsVisitingToday,
      clientsVisitingTodayCount: clientsVisitingToday.length,
    }),
    fetchedClientByID: (state, { visitedClient }) => ({
      ...state,
      visitedClient: { ...visitedClient },
    }),
    removedFoundClient: (state, args) => ({
      ...state,
      searchedClient: {
        ...{
          clientFound: undefined,
          from: undefined,
          index: -1,
        },
      },
    }),
    fetchedSearchClient: (state, { searchedClient }) => ({
      ...state,
      searchedClient: { ...searchedClient },
      isSearching: false,
    }),
    startedSearchingForClient: (state, args) => ({
      ...state,
      isSearching: true,
      searchError: undefined,
    }),
    searchingForClientFailed: (state, { searchError }) => ({
      ...state,
      isSearching: false,
      searchError,
    }),
  },
  effects: (dispatch) => ({
    getTodaysClients: (args, state) =>
      getTodaysClientsEffect(dispatch, args, state),

    getClientById: (args, state) => getClientByIdEffect(dispatch, args, state),

    removeFoundClient: (args, state) => dispatch.clients.removedFoundClient(),

    getClientByCIN: (args, state) =>
      getClientByCINEffect(dispatch, args, state),

    confirmClientAttendance: (args, state) =>
      confirmClientAttendanceEffect(dispatch, args, state),

    addsession: (args, state) => addSessionEffect(dispatch, args, state),

    addNewclient: (args, state) => addNewClientEffect(dispatch, args, state),

    updateShapes: (args, state) => updateShapesEffect(dispatch, args, state),

    updateClientInfo: (args, state) =>
      updateClientInfoEffect(dispatch, args, state),

    updateClientExtraInfo: (args, state) =>
      updateClientExtraInfoEffect(dispatch, args, state),
  }),
};
export default model;
