// src/routes/dashboardRoutes.js
import { Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Brand from '../components/brand/Brand';
import Category from '../components/category/Category';

const DashboardRoute = [
    <Route index element={<Dashboard />} key="dashboard" />,
    <Route path="profile" element={<Profile />} key="profile" />,
   // <Route path="product" element={<Product />} key="product" />,
    <Route path="category" element={<Category />} key="category" />,
    <Route path="brand" element={<Brand />} key="brand" />,


];

export default DashboardRoute;