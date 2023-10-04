import React from 'react';
import NavBarUser from '../Navbar/NavBarUser';
import NavbarFunctions  from '../Navbar/NavbarFunctions';
import  Sidebar from './sidebar';


function Dashboard() {
  return (
    <div>
       <div>
         <NavBarUser />
         <NavbarFunctions/>
       </div>
       <div>
         <Sidebar></Sidebar>
       </div>
     </div>
  );
}

export default Dashboard;
