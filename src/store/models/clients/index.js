// import {fetchClients,fetchClient,addClient} from 'db'

const model ={
    state:{
        clients:[],
        clientsVisitingToday:[],
        clientsVisitingTodayCount:0,
        visitedClient:{}
    },
    reducers:{
        fetchedClients : (state,{clients})=>({
          ...state,
          clients,
        }),
        fetchedTodaysClients : (state,{clientsVisitingToday})=>({
          ...state,
          clientsVisitingToday,
          clientsVisitingTodayCount:clientsVisitingToday.length
        }),
        fetchedClientByID : (state,{visitedClient})=>({
          ...state,
          visitedClient
        }),
 
    },
    effects: (dispatch)=>({
        fetchClients(field,state){
           try {
                console.log("fetch all clients ")
                // const clients =await fetchClients()
                const clients =[]
                
                dispatch.clients.fetchTodaysClients({clients})
                dispatch.clients.fetchedClients({clients})
            } catch (error) {
                console.log("------login------")
                console.log(error)
            }
        },
        getTodaysClients({clients},state){
           try {
                // const checkIfHasSession=(c)=>{
                //     const hasSession = true 

                //     return true 
                // }
                // const todaysClients=clients.filter(checkIfHasSession)
                dispatch.clients.fetchedTodaysClients({clientsVisitingToday:[]})
            } catch (error) {
                console.log("------logout------")
            }
        },
        getClientById({id},state){
            try {
                 // check if already visited
                 // get clients from state 
                 const clients = state.clients.clients 
                 //filter by id 
                 const visitedClient={}
                 dispatch.auth.fetchedClientByID({visitedClient})
             } catch (error) {
                 console.log("------getClientById------")
             }
         },

    })
}
export default model