import React from 'react'
import Routes from './routes'
import Navbar from '../components/Navbar'
import SideNavbar  from '../components/SideNavbar';

const Layout = () => {
    return (
        <div >
             <SideNavbar/>
             <Navbar />
             <Routes />
        </div>
    )
}

export default Layout
