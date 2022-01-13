
export const fetchClientsFromDb = ( )=>{
      let fetchedClients =[]
      const clients = localStorage.getItem('CLIENTS')
      if(clients){
          fetchedClients= JSON.parse(clients)
      }

    return  fetchedClients     
}

export const addClientToDb = (clients)=>{
    localStorage.setItem('CLIENTS',JSON.stringify(clients))
}

export const updateClientInDb = (clients)=>{
    localStorage.setItem('CLIENTS',JSON.stringify(clients))
}