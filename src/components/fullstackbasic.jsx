// Great 👍 Let’s extend your Spring Boot + React JWT Authentication to support role-based authorization.

// We’ll handle it in two layers:

// 1. Backend (Spring Boot) → assign roles, embed them in JWT, and secure endpoints by role.


// 2. Frontend (React) → decode token, show/hide pages/components based on role.




// ---

// 🔹 1. Backend: Role-Based JWT Authentication

// 1️⃣ Add Roles to User Entity

// If you’re using database with JPA:

// @Entity
// public class User {
//     @Id
//     private String username;
//     private String password;
//     private String role;  // e.g. ROLE_USER, ROLE_ADMIN
// }


// ---

// 2️⃣ Modify JwtUtil to Add Roles in Token

// public String generateToken(String username, String role) {
//     return Jwts.builder()
//             .setSubject(username)
//             .claim("role", role) // 👈 include role in claims
//             .setIssuedAt(new Date())
//             .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//             .signWith(getSigningKey(), SignatureAlgorithm.HS256)
//             .compact();
// }

// public String extractRole(String token) {
//     return Jwts.parserBuilder()
//             .setSigningKey(getSigningKey())
//             .build()
//             .parseClaimsJws(token)
//             .getBody()
//             .get("role", String.class);
// }


// ---

// 3️⃣ Authentication Controller Returns Both Token & Role

// @PostMapping("/login")
// public AuthResponse login(@RequestBody LoginRequest request) {
//     Authentication authentication = authenticationManager.authenticate(
//             new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
//     );

//     String role = authentication.getAuthorities().iterator().next().getAuthority();
//     String token = jwtUtil.generateToken(request.getUsername(), role);

//     return new AuthResponse(token, role);
// }

// class AuthResponse {
    // private String token;
    // private String role;

    // public AuthResponse(String token, String role) {
    //     this.token = token;
    //     this.role = role;
    // }

//     // getters
// }


// ---

// 4️⃣ Spring Security Config with Role Restrictions

// @Bean
// public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//     return http.csrf(csrf -> csrf.disable())
//             .authorizeHttpRequests(auth -> auth
//                     .requestMatchers("/auth/**").permitAll()
//                     .requestMatchers("/api/admin/**").hasRole("ADMIN")  // 👈 only ADMIN
//                     .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN") // 👈 USER or ADMIN
//                     .anyRequest().authenticated()
//             )
//             .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
//             .build();
// }


// ---

// 🔹 2. Frontend (React) Role-Based Authentication

// 1️⃣ Modify Login to Store Role

// 👉 In Login.js

// const handleLogin = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await api.post("/auth/login", { username, password });

//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("role", res.data.role);

//     navigate("/dashboard");
//   } catch (err) {
//     setError("Invalid credentials!");
//   }
// };


// ---

// 2️⃣ Role-Based Route Protection

// 👉 App.js

// function PrivateRoute({ children, roles }) {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   if (roles && !roles.includes(role)) {
//     return <Navigate to="/unauthorized" />; // 🚫 if role not allowed
//   }

//   return children;
// }

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />

//         {/* USER or ADMIN */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute roles={["ROLE_USER", "ROLE_ADMIN"]}>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />

//         {/* ADMIN ONLY */}
//         <Route
//           path="/admin"
//           element={
//             <PrivateRoute roles={["ROLE_ADMIN"]}>
//               <AdminPage />
//             </PrivateRoute>
//           }
//         />

//         <Route path="/unauthorized" element={<h1>403 Unauthorized 🚫</h1>} />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }


// ---

// 3️⃣ Example Admin Page

// 👉 src/pages/AdminPage.js

// import React, { useEffect, useState } from "react";
// import api from "../api";

// export default function AdminPage() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     api.get("/api/admin/secret")
//       .then((res) => setMessage(res.data))
//       .catch((err) => setMessage("Access denied!"));
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
//       <h1 className="text-3xl font-bold">Admin Page</h1>
//       <p className="mt-4">{message}</p>
//     </div>
//   );
// }


// ---

// 🔹 3. Final Flow

// 1. Login as USER → stored role = ROLE_USER → can access /dashboard, not /admin.


// 2. Login as ADMIN → stored role = ROLE_ADMIN → can access both /dashboard and /admin.


// 3. Unauthorized users are redirected to /unauthorized.




// ---

// ✅ Now you have Role-based JWT Authentication working in both Spring Boot (backend) and React (frontend).

// Would you like me to also show you how to decode the role directly from the token in React (instead of storing it separately)? That way frontend depends only on the token, not extra storage.