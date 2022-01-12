    // import {fetchClients,fetchClient,addClient} from 'db'
import  {clientSchema,sessionSchema,thootNumbers} from './client.schema'

const model ={
    state:{
        clients:[],
        clientsVisitingToday:[],
        clientsVisitingTodayCount:0,
        visitedClient:undefined
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
                console.log("error in :fetchClients ")
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
                console.log("error in :getTodaysClients ")
                 console.log(error)
            }
        },
        getClientById({id},state){
            try {
                 // check if already visited
                 // filter by id 
                 // get clients from state 
                 const session = sessionSchema(
                    thootNumbers[0],
                    "intevention",
                    1000,
                    500,
                    500
                )

                 const client = clientSchema(
                     'said',
                     'fatah',
                     'CINO9809',
                     [
                         session
                     ]
                 )
                 console.log(client )
                 dispatch.clients.fetchedClientByID({visitedClient:client})
             } catch (error) {
                 console.log("error in : getClientById")
                 console.log(error)
             }
         },

    })
}
export default model