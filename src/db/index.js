//[TODO] get data from db only once a day
//susbscuint fetches are from cache

//make one fucntion for each querier and check for cache
// if chae exists and create date is equal to current day use cach
export const fetchClientsFromDb = () => {
  let fetchedClients = [];
  const clients = localStorage.getItem("TODAYS_CLIENTS_LOCAL_STORAGE");
  if (clients) {
    fetchedClients = JSON.parse(clients);
  }

  return fetchedClients;
};

export const addClientToDb = (clients) => {
  localStorage.setItem("TODAYS_CLIENTS_LOCAL_STORAGE", JSON.stringify(clients));
};

export const updateClientInDb = (clients) => {
  localStorage.setItem("TODAYS_CLIENTS_LOCAL_STORAGE", JSON.stringify(clients));
};

export const updateTodaysClientInCheche = (clients) => {
  localStorage.setItem("TODAYS_CLIENTS_LOCAL_STORAGE", JSON.stringify(clients));
};
export const fetchTodaysClientsFromCache = () => {
  let todaysClients = [];
  const todaysClientsResponseFromCache = localStorage.getItem(
    "TODAYS_CLIENTS_LOCAL_STORAGE"
  );
  console.log();
  if (todaysClientsResponseFromCache) {
    todaysClients = JSON.parse(todaysClientsResponseFromCache);
  }

  return todaysClients;
};
