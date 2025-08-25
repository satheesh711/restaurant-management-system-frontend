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
import Employee from "./pages/Employee";
import ItemsManagement from "./components/ItemsManagement";
import { Home } from "lucide-react";

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
        <Route path="/" element={<Home />} />
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

        <Route path="/items" element={<ItemsManagement />} />

        <Route path="/unauthorized" element={<h1>403 Unauthorized </h1>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
