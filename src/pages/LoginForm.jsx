import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { motion } from 'framer-motion';

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({ username: "", password: "" })
  const [errorName, setErrorName] = useState(false)
  const [errorPass, setErrorPass] = useState(false)

  const handleUsernameChange = (e) => {
    let username = e.target.value;
    if (/[a-zA-Z -.()0-9]{3,50}/.test(name)) {
      setUserDetails(...userDetails, username);
      setErrorName(false);
    } else {
      setErrorName(true)
    }
  }

  const handlePasswordChange = (e) => {
    let password = e.target.value;
    if (/[a-zA-Z -.()0-9]{0,50}/.test(password)) {
      setUserDetails(...userDetails, password);
      setErrorPass(false);
    } else {
      setErrorPass(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
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
          <label className="form-label">Email</label>
          <div className="input-group">
            <span className="input-group-text">
              <Mail size={20} className="text-muted" />
            </span>
            <input
              type="email"
              className={`form-control `}
              value={userDetails.username}
              onChange={handleUsernameChange}
              placeholder="Enter your email"
            />
            {errorName && (
              <div className="text-danger">error</div>
            )}
          </div>
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
            {errorPass && (
              <div className="text-danger">error</div>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="btn btn-primary w-100 mb-3"
        >
          {loading ? 'Loading...' : 'Log in'}
        </motion.button>


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

  )
}