import React from 'react';
import Sidebar from '../ProtectedRoute/SideBar';
import { Outlet } from 'react-router-dom';
import logo2 from '../assets/logo2.jpg'; 

const Layout = () => {
  return (
    <>
      <header style={{
        height: '70px',
        backgroundColor: '#aaa',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem'
      }}>
        <img
          src={logo2}
          alt="Company Logo"
          style={{ height: '50px', width:'70px',objectFit: 'contain' }}
        />
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 70px)' }}>
        <Sidebar />
        <main style={{ padding: '1rem', flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
