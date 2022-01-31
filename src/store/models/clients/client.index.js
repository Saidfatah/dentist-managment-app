// map firestore date to js date
// import {fetchClients,fetchClient,addClient} from 'db'
// import { isOrthoClient, isVisitingToday } from "./client.utils";
import generateRefrence, {
  CLIENT_REF_PREFIX,
  REF_LENGTH,
} from "../../../utils/generateRefrence";

import {
  clientSchema,
  sessionSchema,
  appointmentSchema,
} from "./client.schema";
import {
  fetchClientsFromDb,
  updateClientInDb,
  addClientToDb,
  fetchTodaysClientsFromCache,
  updateTodaysClientInCheche,
} from "../../../services";

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
    //QUERIES
    getTodaysClients(args, state) {
      try {
        // get
        const todaysVisitingClientsFromCache = fetchTodaysClientsFromCache();

        // move this to when we get
        const clientsVisitingToday = todaysVisitingClientsFromCache.map((c) => {
          const client = { ...c };

          if (client.hasOwnProperty("hasAttended")) return client;
          return { ...client, hasAttended: false };
        });

        dispatch.clients.fetchedTodaysClients({ clientsVisitingToday });
      } catch (error) {
        console.log("getTodaysClients ");
        console.log(error);
      }
    },
    getClientById({ id }, state) {
      try {
        const clientsVisitingToday = state.clients.clientsVisitingToday;

        const targetClient = clientsVisitingToday.filter((c) => c.id === id)[0];
        dispatch.clients.fetchedClientByID({ visitedClient: targetClient });
      } catch (error) {
        console.log("error in : getClientById");
        console.log(error);
      }
    },
    removeFoundClient(args, state) {
      dispatch.clients.removedFoundClient();
    },
    getClientByCIN({ CIN }, state) {
      try {
        // check if CIN is valid if not throw some error to handle it
        // search for client by CIN in store if not
        // search in if exists in clients search cache if not
        // search if exists inthis weeks cache if not
        // fetch from firestore
        dispatch.clients.startedSearchingForClient();
        setTimeout(() => {
          const clientsVisitingToday = state.clients.clientsVisitingToday;

          // search in store
          let clientFound = clientsVisitingToday.filter(
            (c) => c.perosnalInfo.CIN === CIN
          )[0];

          if (clientFound) {
            const index = clientsVisitingToday.indexOf(clientFound);
            clientFound = { ...clientFound };
            delete clientFound.sessions;
            delete clientFound.payments;
            delete clientFound.appointments;
            delete clientFound.extraInfo;

            return dispatch.clients.fetchedSearchClient({
              searchedClient: {
                clientFound,
                from: "TODAYS_CLIENTS",
                index,
              },
            });
          }

          // !!clientFound get from firestore
          // clientFound = undefined; //getClientByCnFromFirestore
          if (clientFound)
            dispatch.clients.fetchedSearchClient({
              searchedClient: {
                clientFound,
                from: "FIRESTORE_CLIENTS",
                index: -1,
              },
            });

          //if client doesn exist in todaysClients nor in
          dispatch.clients.searchingForClientFailed({
            searchError: "NOT_FOUND",
          });
        }, 1000);
      } catch (error) {
        console.log("error in : getClientById");
        console.log(error);
        dispatch.clients.searchingForClientFailed({
          searchError: error.message,
        });
      }
    },

    //MUTATIONS
    //[TODO_BEKRINE] add an effect called confirmClientAttendence
    // this effect recieves the client id
    // STEPS
    // STEP 1 - update the target client's hasAttended to true
    // the target client  in this case exists in in state.clients.clientsVisitingToday
    // STEP 2 - also update the target client's appointments array  set the last appointment.attended to true
    // the target client  in this case exists in in state.clients.clients
    // why the last element ?  because logically its todays appointment is the last item in client.appointments array
    // then update the local storage by calling updateClientInDb(clients)

    confirmClientAttendance({ id }, state) {
      try {
        const clientsVisitingToday = [...state.clients.clientsVisitingToday];
        const targetClient = clientsVisitingToday.filter((c) => c.id === id)[0];
        if (targetClient) {
          targetClient.hasAttended = true;

          updateClientInDb(clientsVisitingToday);

          dispatch.clients.confirmedClientAttendance({ clientsVisitingToday });
          // window.location.reload();
        }
      } catch (error) {
        console.log("error in : confirmClientAttendance");
        console.log(error);
      }
    },
    addsession(form, state) {
      try {
        const { price, reste, received, intervention, toothNumber } = form;
        const session = sessionSchema(
          toothNumber,
          intervention,
          price,
          received,
          reste
        );

        //get client id
        const { id } = state.clients.visitedClient;
        const clientsVisitingToday = state.clients.clientsVisitingToday;
        const targetClient = clientsVisitingToday.filter((c) => c.id === id)[0];
        if (targetClient) {
          targetClient.sessions.push(session);

          updateClientInDb(clientsVisitingToday);

          dispatch.clients.addedSession({ clientsVisitingToday });
          dispatch.clients.getClientById({ id });
          if (received > 0) dispatch.register.addPayment({ amount: received });

          //const targetClientIndex = clients.indexOf(targetClient)
        }
      } catch (error) {
        console.log("error in : addsession");
        console.log(error);
      }
    },
    addNewclient(formData, state) {
      // create new appointment
      // create new client and set its appointment
      try {
        if (!formData) throw new Error("formData wasn't passed");
        dispatch.clients.startedAddingClient();
        const {
          appointmentDate,
          firstName,
          lastName,
          age,
          phone,
          profession,
          CIN,
          address,
          isOrthoClient,
        } = formData;
        const firstAppointment = appointmentSchema(appointmentDate);

        const clientsCount = state.clients.clientsCount;
        const newClientRef = generateRefrence(
          clientsCount,
          CLIENT_REF_PREFIX,
          REF_LENGTH
        );
        const newClient = clientSchema(
          newClientRef,
          firstName,
          lastName,
          CIN,
          phone,
          age,
          profession,
          address,
          [],
          undefined,
          firstAppointment,
          isOrthoClient,
          undefined
        );

        const clientsVisitingToday = state.clients.clientsVisitingToday;

        setTimeout(() => {
          updateTodaysClientInCheche([...clientsVisitingToday, newClient]);
          dispatch.clients.addedClient([...clientsVisitingToday, newClient]);
        }, 2000);
        //AddtoFirebase asyncly
      } catch (error) {
        console.log("addNewclient", error);
      }
    },

    updateShapes({ shapes }, state) {
      try {
        console.log(shapes);
        const { id } = state.clients.visitedClient;
        const clientsVisitingToday = state.clients.clientsVisitingToday;
        const targetClient = clientsVisitingToday.filter((c) => c.id === id)[0];

        if (targetClient) {
          targetClient.shapes = [...shapes];
          updateClientInDb(clientsVisitingToday);

          dispatch.clients.updatedClientShapes({ clientsVisitingToday });

          dispatch.clients.getClientById({ id });
        }
      } catch (error) {
        console.log("updateShapes", error);
      }
    },
    updateClientInfo({ updatedFields }, state) {
      try {
        const { id } = state.clients.visitedClient;
        const clientsVisitingToday = state.clients.clientsVisitingToday;
        const targetClient = clientsVisitingToday.filter((c) => c.id === id)[0];

        if (targetClient) {
          Array.from(Object.keys(updatedFields)).forEach((key) => {
            console.log({ key, value: updatedFields[key] });
            targetClient.perosnalInfo[key] = updatedFields[key];
          });
          updateClientInDb(clientsVisitingToday);

          dispatch.clients.updatedClientPersonalInfo({ clientsVisitingToday });

          dispatch.clients.getClientById({ id });
        }
      } catch (error) {
        console.log("updateClientInfo", error);
      }
    },
    updateClientExtraInfo({ updatedFields }, state) {
      try {
        const { id } = state.clients.visitedClient;
        const clientsVisitingToday = state.clients.clientsVisitingToday;
        const targetClient = clientsVisitingToday.filter((c) => c.id === id)[0];

        if (targetClient) {
          Array.from(Object.keys(updatedFields)).forEach((key) => {
            targetClient.extraInfo[key] = updatedFields[key];
          });
          updateClientInDb(clientsVisitingToday);

          dispatch.clients.updatedClientExtraInfo({ clientsVisitingToday });

          dispatch.clients.getClientById({ id });
        }
      } catch (error) {
        console.log("updateClientExtraInfo", error);
      }
    },
  }),
};
export default model;
