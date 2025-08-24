<<<<<<< HEAD
import { useState } from 'react'
import React from "react";
import './App.css'
import Navbar from './components/Navbar'

function StaffPage() {
  return <h2 className="text-center mt-10 text-xl">Staff Page</h2>;
}

function ItemsPage() {
  return <h2 className="text-center mt-10 text-xl">Items Page</h2>;
}
function App() {
  return (  
    <Router>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/items" element={<ItemsPage />} />
=======
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
// import { LoginForm } from './pages/LoginForm';
import About from "./components/About";
import AddItemForm from "./components/AddItemForm";
import { LoginForm } from "./pages/LoginForm";
import { LoginLayout } from "./components/LoginLayout";
import Landing from "./pages/Landing";
import Employee from "./pages/Employee";

function PrivateRoute({ children, roles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            <LoginLayout
              title="Welcome back"
              subtitle="Login in to your account to continue"
            >
              <LoginForm />
            </LoginLayout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={["ROLE_STAFF", "ROLE_ADMIN"]}>
              {/* <Dashboard /> */}
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute roles={["ROLE_ADMIN"]}>
              {/* <AdminPage /> */}
            </PrivateRoute>
          }
        />

        <Route
          path="/employee-management"
          element={
            <PrivateRoute roles={["ROLE_ADMIN"]}>
              <Employee />
            </PrivateRoute>
          }
        />

        <Route path="/unauthorized" element={<h1>403 Unauthorized </h1>} />
        <Route path="*" element={<Navigate to="/login" />} />
>>>>>>> a583e2c4e02a30d2a1ef9ba1413cff2a066eed1a
      </Routes>
    </Router>
  );
}
<<<<<<< HEAD
export default App;
=======
>>>>>>> a583e2c4e02a30d2a1ef9ba1413cff2a066eed1a
