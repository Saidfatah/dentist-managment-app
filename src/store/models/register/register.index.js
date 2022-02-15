import { PaymentSchema } from "./payment.schema";
import { isSameDate } from "../../../utils/formatDate";

import updateClientAddPayment from "../../../services/updateClient.addPayment";
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
              const newBalance =
                clientsVisitingToday[index].initialBalance - amount;
              clientsVisitingToday[index].payments.push(newPayment);
              clientsVisitingToday[index].initialBalance = newBalance;
              updateClientAddPayment(
                clientFound.id,
                newPayment,
                clientsVisitingToday
              );
            } else {
              updateClientAddPayment(clientFound.id, newPayment);
            }

            const payments = [newPayment, ...state.register.payments];

            dispatch.UI.hideModal();
            dispatch.register.addedPayment({
              visitedClients: clientsVisitingToday,
              payments,
            });
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
