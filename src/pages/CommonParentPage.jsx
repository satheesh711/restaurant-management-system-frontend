import React, { useContext } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { logout } from "../services/authService";
import { UserContext } from "../utilities/UserContext";

export default function AdminDashboard() {

  const navigate=useNavigate();

  const userContext=useContext(UserContext);

  const isAdmin = userContext?.user?.role === "ROLE_ADMIN";
  const isStaff = userContext?.user?.role === "ROLE_STAFF";

  const logoutHandler = () => {
    logout();
    navigate("/");
  }

  return (
    <div className="d-flex flex-column vh-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 border-bottom">
        <span className="navbar-brand fw-bold">{isAdmin && <span>Admin</span>}{isStaff && <span>Staff</span>} Dashboard</span>
        <div className="ms-auto">
          <button className="btn btn-primary" onClick={logoutHandler}>Logout</button>
        </div>
      </nav>

      <div className="d-flex flex-grow-1">

        <div className="bg-light border-end p-3" style={{ width: "220px" }}>
          <h5 className="fw-bold mb-4">Menu</h5>
          <ul className="nav flex-column gap-2">
            {isAdmin && <li className="nav-item">
              <Link className="nav-link text-dark" to="/admin">
                Dashboard
              </Link>
            </li>}
            {isStaff && <li className="nav-item">
              <Link className="nav-link text-dark" to="/staff">
                Pending Orders
              </Link>
            </li>}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/admin/employee-management">
                  Employee Management
                </Link>
              </li>
            )}
            {isAdmin && <li className="nav-item">
              <Link className="nav-link text-dark" to="/admin/item-management">
                Item Management
              </Link>
            </li>}
            {isStaff && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/staff/take-orders">
                  Take Orders
                </Link>
              </li>
            )}
          </ul>
        </div>  

        <div className="flex-grow-1 p-4">
          {/* <h2 className="fw-bold">Welcome, {userContext?.user?.sub}(Admin)!</h2>
          <p className="text-muted">Select an option from the sidebar.</p> 
          */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
