import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import "./assets/css/index.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { useState } from "react";

const isAuth = () => {
  const token = localStorage.getItem("authToken");
  return !!token;
};

function ProtectedRoute({ children }) {
  return isAuth() ? children : <Navigate to="/login" replace />;
}

function App() {
  const [contentEditable, setContentEditable] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Dashboard setContentEditable={setContentEditable} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/users/:id",
      element: (
        <ProtectedRoute>
          <Profile contentEditable={contentEditable} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
