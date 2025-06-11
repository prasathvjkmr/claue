import "./assets/css/index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import authService from "./services/authServices";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";

const ProtectedRoute = ({ children }) => {
  const currentUser = authService.getCurrentUser();
  if (!currentUser || !currentUser.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/users/:id",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
