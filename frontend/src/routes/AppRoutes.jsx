import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import SignUp from "../pages/public/SignUp";
import Unauthorized from "../pages/public/Unauthorized";

import AdminDashboard from "../pages/admin/Dashboard";
import JudgeDashboard from "../pages/judge/Dashboard";
import ParticipantDashboard from "../pages/participant/Dashboard";

import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />
      </Route>

      {/* ================= JUDGE ================= */}

      <Route
        path="/judge/dashboard"
        element={
          <ProtectedRoute allowedRoles={["judge"]}>
            <JudgeDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= PARTICIPANT ================= */}

      <Route
        path="/participant/dashboard"
        element={
          <ProtectedRoute allowedRoles={["participant"]}>
            <ParticipantDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;