import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTasks, FaTags, FaThList } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { logoutAPI } from '../API/api.js';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      await logoutAPI();
      toast.success("Logged out successfully!", {
        autoClose: 8000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/login");
    }
  };

  return (
    <div className="bg-light p-3 vh-100" style={{ width: "200px" }}>
      <ul className="list-unstyled">
        <li className="mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-primary fw-bold" : ""}`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li className="mt-4">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-primary fw-bold" : ""}`
            }
          >
            Profile
          </NavLink>
        </li>

        <hr />

        <li className="nav-item mt-4">
          <NavLink
            to="/product"
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
            <FaTags className="me-2" />
            Brand
          </NavLink>
        </li>

        <li className="mt-4">
          <NavLink
            to="/category"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-primary fw-bold" : ""}`
            }
          >
            <FaThList className="me-2" />
            Category
          </NavLink>
        </li>

        <li className="mt-4">
          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-link nav-link text-start"
            style={{ paddingLeft: 0 }}
          >
            <RiLogoutCircleRLine className="me-2" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
