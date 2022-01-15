// import {fetchClients,fetchClient,addClient} from 'db'
import {
  clientSchema,
  sessionSchema,
  appointmentSchema,
} from "./client.schema";
import {
  fetchClientsFromDb,
  updateClientInDb,
  addClientToDb,
} from "../../../db";

const model = {
  state: {
    clients: [],
    clientsVisitingToday: [],
    clientsVisitingTodayCount: 0,
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
    addedSession: (state, { clients }) => ({
      ...state,
      clients: [...clients],
    }),
    fetchedClients: (state, { clients }) => ({
      ...state,
      clients,
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
  },
  effects: (dispatch) => ({
    fetchClients(field, state) {
      try {
        const clients = fetchClientsFromDb();
        dispatch.clients.fetchedClients({ clients });
        // dispatch.clients.fetchTodaysClients({clients})
      } catch (error) {
        console.log("error in :fetchClients ");
        console.log(error);
      }
    },
    getTodaysClients({ clients }, state) {
      try {
        // const checkIfHasSession=(c)=>{
        //     const hasSession = true

        //     return true
        // }
        // const todaysClients=clients.filter(checkIfHasSession)
        dispatch.clients.fetchedTodaysClients({ clientsVisitingToday: [] });
      } catch (error) {
        console.log("error in :getTodaysClients ");
        console.log(error);
      }
    },
    getClientById({ id }, state) {
      try {
        const clients = state.clients.clients;

        const targetClient = clients.filter((c) => c.id === id)[0];
        console.log(targetClient);
        dispatch.clients.fetchedClientByID({ visitedClient: targetClient });
      } catch (error) {
        console.log("error in : getClientById");
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
        const clients = state.clients.clients;
        const targetClient = clients.filter((c) => c.id === id)[0];
        if (targetClient) {
          console.log(targetClient);
          targetClient.sessions.push(session);

          updateClientInDb(clients);

          dispatch.clients.addedSession({ clients });
          dispatch.clients.getClientById({ id });
          //const targetClientIndex = clients.indexOf(targetClient)
        }
      } catch (error) {
        console.log("error in : getClientById");
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
          address,
        } = formData;
        const firstAppointment = appointmentSchema(appointmentDate);

        const newClient = clientSchema(
          firstName,
          lastName,
          age,
          phone,
          profession,
          address,
          undefined,
          [],
          undefined,
          firstAppointment
        );

        const clients = state.clients.clients;

        setTimeout(() => {
          addClientToDb([...clients, newClient]);
          dispatch.clients.addedClient([...clients, newClient]);
        }, 2000);
        //AddtoFirebase asyncly
      } catch (error) {
        console.log("addNewclient", error);
      }
    },
  }),
};
export default model;
