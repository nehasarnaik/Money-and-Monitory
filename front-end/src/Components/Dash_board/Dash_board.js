import React from 'react';
import NavBarUser from '../Navbar/NavBarUser';
import NavbarFunctions  from '../Navbar/NavbarFunctions';
import  Sidebar from './sidebar';
import SidebarFunctions from '../Navbar/SidebarFunctions';
import HeaderBar from '../Header/header';


function Dashboard() {
  return (
    <div>
       <div>
         <HeaderBar/>
         <SidebarFunctions/>
       </div>
       <div className='container'>
         <Sidebar></Sidebar>
       </div>
     </div>
  );
}

export default Dashboard;
