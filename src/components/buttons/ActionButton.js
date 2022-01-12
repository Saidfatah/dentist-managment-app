import React from 'react'

const ActionButton = ({children,title,onClick}) => {
    return (
        <button 
        className='p-2 bg-green-400 rounded-sm'
        onClick={onClick} >
            {title ?title:children}
        </button>
    )
}

export default ActionButton
