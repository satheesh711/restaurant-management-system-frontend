import "./App.css";
import About from "./components/About";
import AddItemForm from "./components/AddItemForm";
import { LoginForm } from "./pages/LoginForm";
import { LoginLayout } from "./components/LoginLayout";
import Landing from "./pages/Landing";
import Employee from "./pages/Employee";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import UserProvider from "./utilities/UserContext";
function PrivateRoute({ children, roles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <UserProvider>{children}</UserProvider>;
}

export default function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <LoginForm />,
    },
    {
      path: "/admin",
      children: [
        {
          path: "employee-management",
          element: (
            <PrivateRoute roles={["ROLE_ADMIN"]}>
              <Employee />
            </PrivateRoute>
          ),
        },
        // {
        //   path: "item-management",
        //   element: (
        //     <PrivateRoute roles={["ROLE_ADMIN"]}>
        //       <Item />
        //     </PrivateRoute>
        //   ),
        // }
      ],
    },
    {
      path: "/staff",
      element: <Landing />,
    },
  ]);

  return <RouterProvider router={appRouter} />;

    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Landing />} />
    //     <Route
    //       path="/login"
    //       element={
    //         <LoginLayout
    //           title="Welcome back"
    //           subtitle="Login in to your account to continue"
    //         >
    //           <LoginForm />
    //         </LoginLayout>
    //       }
    //     />

    //     <Route
    //       path="/dashboard"
    //       element={
    //         <PrivateRoute roles={["ROLE_STAFF", "ROLE_ADMIN"]}>
    //           {/* <Dashboard /> */}
    //         </PrivateRoute>
    //       }
    //     />

    //     <Route
    //       path="/admin"
    //       element={
    //         <PrivateRoute roles={["ROLE_ADMIN"]}>
    //           {/* <AdminPage /> */}
    //         </PrivateRoute>
    //       }
    //     />

    //     <Route
    //       path="/employee-management"
    //       element={
    //         <PrivateRoute roles={["ROLE_ADMIN"]}>
    //           <Employee />
    //         </PrivateRoute>
    //       }
    //     />

    //     <Route path="/unauthorized" element={<h1>403 Unauthorized </h1>} />
    //     <Route path="*" element={<Navigate to="/login" />} />
    //   </Routes>
    // </Router>
  // );
}
