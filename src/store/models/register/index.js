
const model ={
    state:{
        payments:[],
        totalCountOfPayments:0
    },
    reducers:{
        mappedPaymentsFromClient : (state,{payments})=>({
          ...state,
          payments,
          totalCountOfPayments:payments.length
        }),
        addedPayment : (state,{payment})=>({
          ...state,
          payments:[payment,...state.payments.payments],
        }),
    },
    effects: (dispatch)=>({
        getPayments(field,state){
           try { 
                //get clients from state
                //map  clients to payments  
                const payments =[]  
                dispatch.register.gotPayments({payments})
            } catch (error) {
                console.log("------getPayments------")
                console.log(error)
            }
        },
        addPayment({id},state){
            try {
                 const payment = {}

                 dispatch.register.addedPayment({payment})
             } catch (error) {
                 console.log("------addPayment------")
             }
        },
    })
}
export default model