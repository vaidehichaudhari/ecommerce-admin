import React from 'react';
import Sidebar from '../ProtectedRoute/SideBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
    <header style={{"height":"70px","backgroundColor":"#aaa"}}>
      <img src=""></img><span>Company Name</span>
    </header>
    <div style={{ display: 'flex', }}>
      <Sidebar />
      <div style={{ padding: '1rem', flex: 1 }}>
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default Layout;