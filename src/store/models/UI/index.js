
const model ={
    state:{
        visible:false,
    },
    reducers:{
        showedSideBar : (state,args)=>({
          ...state,
          visible:true,
        }),
        hidedSideBar : (state,args)=>({
          ...state,
          visible:false,
        }),
    },
    effects: (dispatch)=>({
        showSideBar(field,state){
           try { 
               console.log("showsidebar")
                dispatch.UI.showedSideBar()
            } catch (error) {
                console.log("------showSidebar------")
                console.log(error)
            }
        },
        hideSideBar(field,state){
           try { 
                dispatch.UI.hidedSideBar()
            } catch (error) {
                console.log("------hideSideBar------")
                console.log(error)
            }
        },
 
    })
}
export default model