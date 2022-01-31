import { PaymentSchema } from "./payment.schema";
import { isSameDate } from "../../../utils/formatDate";
import {
  fetchTodaysClientsFromCache,
  updateTodaysClientInCheche,
} from "../../../services/index";
import generateRefrence, {
  PAYMENT_REF_PREFIX,
  REF_LENGTH,
} from "../../../utils/generateRefrence";

const model = {
  state: {
    payments: [],
    totalCountOfPayments: 0,
    isAddingPayment: false,
    addPaymentError: undefined,
    totalCountOfTodaysPayments: 0,
    // [FIRESTORE_TODO] make a collection in firestore that keeps track of rencrnces and counters
    // P
    lastAddedPaymentReference: 0,
  },
  reducers: {
    gotPayments: (state, { payments }) => ({
      ...state,
      payments,
      totalCountOfPayments: payments.length,
    }),
    addedPayment: (state, { payments, visitedClients }) => ({
      ...state,
      payments,
      isAddingPayment: false,
      visitedClients,
    }),
    startedAddingPayment: (state, args) => ({
      ...state,
      isAddingPayment: true,
    }),
  },
  effects: (dispatch) => ({
    getPayments(field, state) {
      try {
        const clientsVisitingToday = state.clients.clientsVisitingToday;

        // const clientsVisitingToday = [
        //   {
        //     id: "902db771-6bdf-4d21-a375-b7db5ced8d9b",
        //     perosnalInfo: {
        //       firstName: "bamoussa",
        //       lastName: "hamza",
        //       phone: "09896876653",
        //       age: "gha taykhra",
        //       profession: "Morroco / warzazate / tabount /tarmight",
        //       CIN: "19",
        //       isOrthoClient: false,
        //     },
        //     extraInfo: {
        //       healthProblems: "",
        //       anesthesia: false,
        //       péncilineAllergie: false,
        //       bleeding: false,
        //       pregnant: false,
        //       observation: "",
        //     },
        //     initialBalance: 0,
        //     sessions: [],
        //     created_at: "2022-01-01T22:52:54.891Z",
        //     updated_at: "2022-01-12T22:52:54.891Z",
        //     appointments: [
        //       {
        //         date: "2022-01-15T22:48:23.000Z",
        //       },
        //     ],
        //     payments: [
        //       PaymentSchema(
        //         "P0001",
        //         100,
        //         "bamoussa hamza",
        //         new Date("2022-01-15T10:52:54.891Z"),
        //         0,
        //         "C0001"
        //       ),
        //       PaymentSchema(
        //         "P0002",
        //         300,
        //         "bamoussa hamza",
        //         new Date("2022-01-12T10:52:54.891Z"),
        //         0,
        //         "C0001"
        //       ),
        //     ],
        //   },
        //   {
        //     id: "e2e681b6-60a0-4a8d-b694-c1612a5af1c5",
        //     perosnalInfo: {
        //       firstName: "fatah",
        //       lastName: "said",
        //       phone: "malzkemlkazme",
        //       age: "azlmjelkazj",
        //       profession: "azekamzlek",
        //       CIN: "20",
        //       isOrthoClient: false,
        //     },
        //     extraInfo: {
        //       healthProblems: "",
        //       anesthesia: false,
        //       péncilineAllergie: false,
        //       bleeding: false,
        //       pregnant: false,
        //       observation: "",
        //     },
        //     initialBalance: 0,
        //     sessions: [],
        //     created_at: "2022-01-15T22:55:21.503Z",
        //     updated_at: "2022-01-15T22:55:21.503Z",
        //     appointments: [
        //       {
        //         date: "2022-01-15T22:53:12.000Z",
        //       },
        //     ],
        //     payments: [
        //       PaymentSchema(
        //         "P0003",
        //         100,
        //         "said fatah",
        //         new Date("2022-01-16T10:52:54.891Z"),
        //         0,
        //         "C0002"
        //       ),
        //       PaymentSchema(
        //         "P0004",
        //         500,
        //         "said fatah",
        //         new Date("2022-01-16T10:52:54.891Z"),
        //         0,
        //         "C0002"
        //       ),
        //     ],
        //   },
        // ];
        const todaysPaimentsFilter = (payment) => isSameDate(payment.date);
        const payments = clientsVisitingToday.reduce(
          (a, c) => [...a, ...c.payments.filter(todaysPaimentsFilter)],
          []
        );

        dispatch.register.gotPayments({ payments });
      } catch (error) {
        console.log("------getPayments------");
        console.log(error);
      }
    },
    // [MIGHT_DO] fetch payments for today , this week , this month , time interval
    // getTodaysPayments({ payments }, state)
    // getThisPayments({ payments }, state)

    addPayment({ amount }, state) {
      // should be called from addSession when a session is added with a recieved
      // update payment's correspoding client in firestore
      try {
        dispatch.register.startedAddingPayment();
        const searchedClient = state.clients.searchedClient;
        console.log(searchedClient);
        if (searchedClient) {
          const clientsVisitingToday = [...state.clients.clientsVisitingToday];
          const { clientFound, from, index } = searchedClient;
          if (clientFound) {
            const paymentsCount = state.register.totalCountOfPayments;
            const paymentRef = generateRefrence(
              paymentsCount,
              PAYMENT_REF_PREFIX,
              REF_LENGTH
            );
            const newPayment = PaymentSchema(
              paymentRef,
              amount,
              clientFound.perosnalInfo.firstName +
                clientFound.perosnalInfo.lastName,
              new Date()
            );

            if (from === "TODAYS_CLIENTS") {
              console.log(clientsVisitingToday[index]);
              const newBalance =
                clientsVisitingToday[index].initialBalance - amount;
              clientsVisitingToday[index].payments.push(newPayment);
              clientsVisitingToday[index].initialBalance = newBalance;
              updateTodaysClientInCheche(clientsVisitingToday);
            }

            // perform update query to firestore to update the target client
            // pass {balance,payments}

            const payments = [newPayment, ...state.register.payments];

            dispatch.UI.hideModal();
            dispatch.register.addedPayment({
              visitedClients: clientsVisitingToday,
              payments,
            });
            console.log(newPayment);
          }
        }
      } catch (error) {
        console.log("------addPayment------");
        console.log(error);
      }
    },
  }),
};
export default model;
