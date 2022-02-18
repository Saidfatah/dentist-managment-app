import getTodaysClientsService from "../../../../services/getTodaysClients";

const func = async (dispatch, args, state) => {
  try {
    // get
    const todaysVisitingClientsFromCache = await getTodaysClientsService();
    console.log(todaysVisitingClientsFromCache);
    // move this to when we get
    if (todaysVisitingClientsFromCache) {
      const clientsVisitingToday = todaysVisitingClientsFromCache.map((c) => {
        const client = { ...c };

        if (client.hasOwnProperty("hasAttended")) return client;
        return { ...client, hasAttended: false };
      });

      dispatch.clients.fetchedTodaysClients({ clientsVisitingToday });
    }
  } catch (error) {
    console.log("getTodaysClients error ");
    console.log(error);
  }
};

export default func;
