import { useState } from 'react'
import Login from './pages/login'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import DashboardRoute from './Routes/DashboaredRoute';
import Layout from './pages/Layout';
function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Login />} ></Route>
        <Route path='/' element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>

          {DashboardRoute}
        </Route>




      </Routes>

    </BrowserRouter>
  )
}

export default App