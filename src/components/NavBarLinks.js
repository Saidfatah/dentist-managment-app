import React from 'react'
import {colors,fontSizes} from '../utils/values'
import ActionButton from './buttons/ActionButton'
import Icon from './Icon'
import {Link} from 'react-router-dom'


const NavBarLinks = ({direction,hideSideBar}) => {
    const textColor='text'+colors.black + 'hover:text'+colors.secondary
    const textClasses=textColor + fontSizes.paragraph
    const classForNoneMobile=direction !=="flex-col"?"md:border-0  md:p-0 py-2 pr-4 pl-3":""
    const LinkClasses = textClasses + "block    " + classForNoneMobile
    

    return (
        <ul 
        onClick={()=>hideSideBar && hideSideBar()}
        className={"flex items-center mt-4 md:space-x-8 md:mt-0 md:text-sm md:font-medium "+direction}>
        <li className='p-4' >
           <Link className={LinkClasses} to="/">Les Client D'aujhordui</Link>
        </li>
        <li className='p-4' >
           <Link className={LinkClasses} to="/register">Register</Link>
        </li>
        <ActionButton   >
           <div className={'flex justify-between items-center '   }>
           <Icon name="ADD" classes="mr-2"  />
           <p className={LinkClasses} > ajouter un rendez vous </p>
           </div>
        </ActionButton>
      </ul>
    )
}

export default NavBarLinks
