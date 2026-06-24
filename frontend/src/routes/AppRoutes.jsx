import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import SignUp from "../pages/public/SignUp";

import AdminDashboard from "../pages/admin/Dashboard";
import JudgeDashboard from "../pages/judge/Dashboard";
import ParticipantDashboard from "../pages/participant/Dashboard";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Admin */}

      <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <RoleRoute allowedRole="admin">
        <AdminLayout />
      </RoleRoute>
    </ProtectedRoute>
  }
>
  <Route
    path="dashboard"
    element={<AdminDashboard />}
  />
</Route>
      {/* Judge */}

      <Route
        path="/judge/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="judge">
              <JudgeDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* Participant */}

      <Route
        path="/participant/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="participant">
              <ParticipantDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;