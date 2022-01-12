import React from 'react'
import {connect} from 'react-redux'
import NavBarLinks from './NavBarLinks'
const WIDTH=300
const SideNavbar = ({visible,hideSideBar}) => {
    return (    
        <div>
           <div 
             style={{
                 zIndex:999,
                 width:WIDTH,
                 left:!visible?-WIDTH:0,
                 transition:'left .3s   cubic-bezier(.02,.65,.32,1.38)'
             }}
            class="absolute z-50 shadow bg-white h-screen top-0 ">
                <NavBarLinks hideSideBar={hideSideBar} direction="flex-col" />
           </div>

          <div 
          onClick={()=>hideSideBar()}
          style={{
              opacity:visible?1:0,
              display:visible ?"block":"none",
              transition:'left .3s   cubic-bezier(.02,.65,.32,1.38)'
          }} 
          className='w-full z-40 bg-gray-900/[.3] h-screen w-screen absolute top-0 left-0' ></div>
        </div>
    )
}

export default connect(
    (state)=>({visible:state.UI.visible}),
    (dispatch)=>({hideSideBar:dispatch.UI.hideSideBar}),
)(SideNavbar)
