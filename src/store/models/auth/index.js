

const model ={
    state:{
        authenticated:false,
    },
    reducers:{
        logged : (state,args)=>({
          ...state,
          authenticated:true
        }),
        loggedOut : (state,args)=>({
          ...state,
          authenticated:false
        }),
    },
    effects: (dispatch)=>({
        login(field,state){
           try {
                console.log("login")
                
                dispatch.auth.logged({user:null})
            } catch (error) {
                console.log("------login------")
                console.log(error)
            }
        },
        logout(field,state){
           try {
                console.log("logout")
                dispatch.auth.loggedOut()
            } catch (error) {
                console.log("------logout------")
            }
        },

    })
}
export default model