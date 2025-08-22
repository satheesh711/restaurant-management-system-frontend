// Perfect 👍 let’s connect the Spring Boot JWT backend with a React frontend.
// I’ll give you a simple React 19 + Axios setup to handle login, store the token, and call protected APIs.


// ---

// 🔹 React JWT Authentication Flow

// 1. User enters username & password in login form.


// 2. React calls POST /auth/login (Spring Boot backend).


// 3. Backend returns a JWT token.


// 4. React stores the token in localStorage (or sessionStorage).


// 5. For each protected API call, React attaches Authorization: Bearer <token> in the header.


// 6. If token expires, React redirects user back to login.




// ---

// 1️⃣ Install Dependencies

// npm install axios react-router-dom


// ---

// 2️⃣ Axios Setup with Interceptor

// 👉 Create a file: src/api.js

// import axios from "axios";

// // Create axios instance
// const api = axios.create({
//   baseURL: "http://localhost:8080", // Spring Boot backend URL
// });

// // Add token automatically if available
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;


// ---

// 3️⃣ Login Page (React)

// 👉 src/pages/Login.js

// import React, { useState } from "react";
// import api from "../api";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/login", { username, password });
//       localStorage.setItem("token", res.data); // save token
//       navigate("/dashboard"); // redirect
//     } catch (err) {
//       setError("Invalid credentials!");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-xl shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//         <input
//           type="text"
//           placeholder="Username"
//           className="w-full p-2 border rounded mb-3"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 border rounded mb-3"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }


// ---

// 4️⃣ Dashboard Page (Protected API Call)

// 👉 src/pages/Dashboard.js

// import React, { useEffect, useState } from "react";
// import api from "../api";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     api.get("/api/secure") // Protected endpoint from backend
//       .then((res) => setMessage(res.data))
//       .catch(() => {
//         localStorage.removeItem("token");
//         navigate("/login");
//       });
//   }, [navigate]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
//       <h1 className="text-3xl font-bold">Dashboard</h1>
//       <p className="mt-4 text-lg">{message}</p>
//       <button
//         onClick={() => {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }}
//         className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }


// ---

// 5️⃣ React Router Setup

// 👉 src/App.js

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// function PrivateRoute({ children }) {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/login" />;
// }

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }


// ---

// 6️⃣ Flow Test

// 1. Start Spring Boot backend (http://localhost:8080).


// 2. Run React (npm start).


// 3. Open http://localhost:3000/login.


// 4. Login → receive JWT → redirect to dashboard.


// 5. Dashboard makes secure API request with Authorization: Bearer <token>.




// ---

// ✅ Now you have React + Spring Boot JWT Authentication working end-to-end.
// 👉 Do you also want me to extend this with Role-based access in React (Admin vs User dashboards), or just keep it simple login/logout for now?