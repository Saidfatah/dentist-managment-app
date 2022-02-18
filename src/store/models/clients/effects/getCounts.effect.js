import getCounts from "../../../../services/getCounts";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (dispatch, args, state) => {
  try {
    const counts = await getCounts();
    if (counts) {
      const { clientsCount, paymentsCount } = counts;
      dispatch.clients.fetchedCounts({
        clientsCount,
        paymentsCount,
      });
    }
  } catch (error) {
    console.log("error in : getClientById");
    console.log(error);
  }
};
