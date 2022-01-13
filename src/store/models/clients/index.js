    // import {fetchClients,fetchClient,addClient} from 'db'
import  {clientSchema,sessionSchema,thootNumbers} from './client.schema'
import {fetchClientsFromDb,updateClientInDb} from "../../../db"


const model ={
    state:{
        clients:[],
        clientsVisitingToday:[],
        clientsVisitingTodayCount:0,
        visitedClient:undefined
    },
    reducers:{
        addedSession:(state,{clients})=>({
            ...state,
           clients:[...clients]
        }),
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
          visitedClient:{...visitedClient}
        }),
 
    },
    effects: (dispatch)=>({
        fetchClients(field,state){
           try {
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
                const clients = fetchClientsFromDb()
                dispatch.clients.fetchedClients({clients})
                // dispatch.clients.fetchTodaysClients({clients})
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
                 const clients =state.clients.clients

                 const targetClient = clients.filter(c=>c.id === id)[0]
                 console.log(targetClient)
                 dispatch.clients.fetchedClientByID({visitedClient:targetClient})
             } catch (error) {
                 console.log("error in : getClientById")
                 console.log(error)
             }
         },
         addsession(form,state){
            try {
             
                 const {price,reste,received,intervention,toothNumber}= form     
                 const session = sessionSchema(
                    toothNumber,
                    intervention,
                    price,
                    received,
                    reste
                )
                
                //get client id
                const {id}=state.clients.visitedClient
                const clients =state.clients.clients
                const targetClient = clients.filter(c=>c.id === id)[0]
                if(targetClient){
                    console.log(targetClient)
                    targetClient.sessions.push(session) 

                    updateClientInDb(clients)

                    dispatch.clients.addedSession({clients})
                    dispatch.clients.getClientById({id})
                }
                //const targetClientIndex = clients.indexOf(targetClient)
             } catch (error) {
                 console.log("error in : getClientById")
                 console.log(error)
             }
         }
         

    })
}
export default model