import getClientByCIN from "../../../../services/getCLientByCIN";
import getClientByFullName from "../../../../services/getClientByFullName";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (dispatch, { searchText }, state) => {
  try {
    dispatch.clients.startedSearchingForClient();
    console.log({searchText})
    let clientFound;

    clientFound = await getClientByCIN(searchText);

    if (!clientFound) clientFound = await getClientByFullName(searchText);

    // !!clientFound get from firestore
    // clientFound = undefined; //getClientByCnFromFirestore
    if (clientFound)
      return dispatch.clients.fetchedSearchClient({
        searchedClient: {
          clientFound,
          from: "FIRESTORE_CLIENTS",
          index: -1,
        },
      });

    dispatch.clients.searchingForClientFailed({
      searchError: "client nexist pas",
    });
  } catch (error) {
    console.log("error in : getClientByCINorFullName");
    console.log(error);
  }
};
