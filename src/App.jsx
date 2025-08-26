import "./App.css";
import { LoginForm } from "./pages/LoginForm";
import Employee from "./pages/Employee";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProvider from "./utilities/UserContext";
import AdminPage from "./pages/CommonParentPage";
import { Item } from "./components/Item";
import Dashboard from "./pages/Dashboard";
import StaffPage from "./pages/CommonParentPage";
import OrderForm from "./components/OrderForm";
import ItemsManagement from "./components/ItemsAvailability";
import OrdersTable from "./components/OrdersTable";
import PendingOrders from "./components/PendingOrders";
import ErrorPage from "./pages/ErrorPage";

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
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <LoginForm />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/admin",
      element: (
        <UserProvider>
          <AdminPage />
        </UserProvider>
      ),
      children: [
        {
          index: true,
          element: (
            <PrivateRoute roles={["ROLE_ADMIN"]}>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: "employee-management",
          element: (
            <PrivateRoute roles={["ROLE_ADMIN"]}>
              <Employee />
            </PrivateRoute>
          ),
        },
        {
          path: "item-management",
          element: (
            <PrivateRoute rol es={["ROLE_ADMIN"]}>
              <Item />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/staff",
      element: (
        <UserProvider>
          <StaffPage />
        </UserProvider>
      ),
      children: [
        {
          index: true,
          element: (
            <PrivateRoute roles={["ROLE_STAFF"]}>
              <PendingOrders />
            </PrivateRoute>
          ),
        },
        {
          path: "take-orders",
          element: (
            <PrivateRoute roles={["ROLE_STAFF"]}>
              <OrderForm />
            </PrivateRoute>
          ),
        },
        {
          path: "item-availability",
          element: (
            <PrivateRoute roles={["ROLE_STAFF"]}>
              <ItemsManagement />
            </PrivateRoute>
          ),
        },
        {
          path: "order-management",
          element: (
            <PrivateRoute roles={["ROLE_STAFF"]}>
              <OrdersTable />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={appRouter} />;
}
