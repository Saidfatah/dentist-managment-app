// eslint-disable-next-line import/no-anonymous-default-export
export default (dispatch, { CIN }, state) => {
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
        searchError: "client nexist pas",
      });
    }, 1000);
  } catch (error) {
    console.log("error in : getClientById");
    console.log(error);
    dispatch.clients.searchingForClientFailed({
      searchError: error.message,
    });
  }
};
