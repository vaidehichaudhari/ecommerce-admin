import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTasks, FaUser } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import {logoutAPI} from '../API/api.js'
import { toast } from "react-toastify";
const Sidebar = () => {
  const navigate = useNavigate();

 const handleLogout = async () => {
  const confirm = window.confirm("Are you sure you want to logout?");
  if (confirm) {
    await logoutAPI();
    toast.success("Logged out successfully!", {
      autoClose: 5000,       // toast stays for 5 seconds
      closeOnClick: true,    // allow click to close
      pauseOnHover: true,    // pause if hovered
      draggable: true        // can drag the toast
    });
    navigate("/login");
  }
};

  return (
    <div className="bg-light p-3 vh-100" style={{ width: "200px" }}>
      {/* <h4 className="mb-4"><img src="{icon}"></img></h4> */}
      <ul className="list-unstyled">
        <li className="mt-4">
          <NavLink to="/"className={({ isActive }) =>
              `nav-link ${isActive ? "text-primary fw-bold" : ""}`
            }>
            Dashboard
          </NavLink>
        </li>
        <li className="mt-4">
          <NavLink to="/profile"className={({ isActive }) =>
              `nav-link ${isActive ? "text-primary fw-bold" : ""}`
            }>
            Profile
          </NavLink>
        </li>
        <hr></hr>
        <li className="nav-item">
          <NavLink
            to="/dashboard/product"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-primary fw-bold" : ""}`
            }
          >
            <FaTasks className="me-2" />
            Products
          </NavLink>
        </li>

        <li className="mt-4">
        <NavLink
            to="/brand"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-primary fw-bold" : ""}`
            }
          >
            <FaUser className="me-2" />
            Brand
          </NavLink>
        </li>
                <li className="mt-4">
        <NavLink
            to="/dashboard/category"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-primary fw-bold" : ""}`
            }
          >
            <FaUser className="me-2" />
            Category
          </NavLink>
        </li>
        <li className="mt-4">
          <button onClick={handleLogout} className="nav-link">
            <RiLogoutCircleRLine className="me-2" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;