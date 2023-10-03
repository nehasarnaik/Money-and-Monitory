import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBarUser from '../Navbar/NavBarUser';
import NavbarFunctions  from '../Navbar/NavbarFunctions';
import  Sidebar from './sidebar';
function Dashboard() {
  const location = useLocation();
  const { myData } = location.state; 

  return (

    <div>
       <div>
         <NavBarUser />
         <NavbarFunctions/>
       </div>
       <div>
         <Sidebar data={myData}></Sidebar>
       </div>
     </div>
  );
}

export default Dashboard;
