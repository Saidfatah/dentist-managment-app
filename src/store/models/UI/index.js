
const model ={
    state:{
        visible:false,
        modalIsOpen:false,
    },
    reducers:{
        toggledSideBarVisible : (state,visible)=>({
          ...state,
          visible,
        }),
        toggledModalIsOpen : (state,modalIsOpen)=>({
          ...state,
          modalIsOpen,
        }),
    },
    effects: (dispatch)=>({
        showSideBar(){
           try { 
                dispatch.UI.toggledSideBarVisible(true)
            } catch (error) {
                console.log("------showSidebar------")
                console.log(error)
            }
        },
        hideSideBar(){
           try { 
                dispatch.UI.toggledSideBarVisible(false)
            } catch (error) {
                console.log("------hideSideBar------")
                console.log(error)
            }
        },
        hideModal(){
           try { 
                dispatch.UI.toggledModalIsOpen(false)
            } catch (error) {
                console.log("------hideSideBar------")
                console.log(error)
            }
        },
        showModal(){
           try { 
                dispatch.UI.toggledModalIsOpen(true)
            } catch (error) {
                console.log("------hideSideBar------")
                console.log(error)
            }
        },
 
    })
}
export default model