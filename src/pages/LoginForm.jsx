import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { login, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [errorName, setErrorName] = useState(false);
  const [errorPass, setErrorPass] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUserDetails({ ...userDetails, username: e.target.value });
    if (/^[a-zA-Z_0-9]{3,50}$/.test(e.target.value)) {
      setUserDetails({ ...userDetails, username: e.target.value });
      setErrorName(false);
    } else {
      setErrorName(true);
    }
  };

  const handlePasswordChange = (e) => {
    setUserDetails({ ...userDetails, password: e.target.value });
    if (/^[a-zA-Z -.()0-9]{5,50}$/.test(e.target.value)) {
      setUserDetails({ ...userDetails, password: e.target.value });
      setErrorPass(false);
    } else {
      setErrorPass(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      localStorage.getItem("token") != null &&
      localStorage.getItem("role") != null
    ) {
      alert("User already Loggedin, Please Logout to login again");
      navigate("/");
    }
    if (!errorName && !errorPass) {
      login(userDetails);
      alert("User LoggedIn successfully");
    }
  };

  const handleLogout = () => {
    logout();
    alert("User Loggedout Successfully");
    navigate("/login");
  };

  return (
    <div>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="form-label">Username</label>
          <div className="input-group">
            <span className="input-group-text">
              <User size={20} className="text-muted" />
            </span>
            <input
              type="text"
              className={`form-control `}
              value={userDetails.username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
            />
          </div>
          {errorName && (
            <div className="text-danger">
              Username allows only alphanumeric characters and underscores with
              size 3 to 50.
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <div className="input-group">
            <span className="input-group-text">
              <Lock size={20} className="text-muted" />
            </span>
            <input
              type="password"
              onChange={handlePasswordChange}
              value={userDetails.password}
              className={`form-control`}
              placeholder="Enter your password"
            />
          </div>
          {errorPass && (
            <div className="text-danger">
              Password allows only alphanumeric characters and symbols with size
              5 to 50.
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="btn btn-primary w-100 mb-3"
        >
          {loading ? "Loading..." : "Log in"}
        </motion.button>

        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-danger w-100 mb-3"
        >
          Log out
        </button>
      </form>
      <style>
        {`
          .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.8);  
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }

          .spinner-border {
            width: 3rem;
            height: 3rem;
          }
        `}
      </style>
    </div>
  );
}
