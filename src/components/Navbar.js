import React from 'react'
import Icon from './Icon'
import {connect} from 'react-redux'
import {colors,fontSizes, fontWeights} from '../utils/values'
import NavBarLinks from './NavBarLinks'


const isMobile = document.body.offsetWidth <= 766
const Navbar = ({showSideBar}) => {
    const textColor='text'+colors.black + 'hover:text'+colors.secondary
    const textClasses=textColor + fontSizes.paragraph
    const LinkClasses = textClasses + "block py-2 pr-4 pl-3  md:border-0  md:p-0 "
    
    return (
        <nav class="bg-white border-gray-200 text px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
          
          <div 
          class="hidden w-full md:block md:w-auto" 
          id="mobile-menu"
          >
            <NavBarLinks  />
          </div>
          <button
          disabled={!isMobile}
          onClick={()=>showSideBar()}
              class="flex justify-between items-center "
          >
              <Icon size={25} name="LOGO" />
              <span 
              class={"self-center whitespace-nowrap " + fontWeights.semiBold}>
                Dentist App 
              </span>
          </button>
        </div>
      </nav>
    )
}

export default connect(
  null,
  (dispatch)=>({showSideBar:dispatch.UI.showSideBar}),
)(Navbar)
