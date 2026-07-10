import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import SignUp from "../pages/public/SignUp";
import Unauthorized from "../pages/public/Unauthorized";
import AdminDashboard from "../pages/admin/Dashboard";
import JudgeDashboard from "../pages/judge/Dashboard";
import ParticipantDashboard from "../pages/participant/Dashboard";
import Explorer from "../pages/participant/Explorer";
import HackathonDetails from "../pages/participant/HackathonDetails";
import RegistrationFlow from "../pages/participant/RegistrationFlow";
import MyTeams from "../pages/participant/MyTeams";
import Submissions from "../pages/participant/Submissions";
import ApplicationTracker from "../pages/participant/ApplicationTracker";
import Profile from "../pages/participant/Profile";
import Certificate from "../features/certificates/Certificate";
import AdminLayout from "../layouts/AdminLayout";
import PublicLayout from "../layouts/PublicLayout";
import ParticipantLayout from "../layouts/ParticipantLayout";
import ProtectedRoute from "./ProtectedRoute";
function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route element={<PublicLayout />}>
         <Route path="/" element={<Home />} />
      </Route>
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
  path="/participant"
  element={
    <ProtectedRoute allowedRoles={["participant"]}>
      <ParticipantLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<ParticipantDashboard />} />
  <Route path="dashboard" element={<ParticipantDashboard />} />
  <Route path="explorer" element={<Explorer />} />
  <Route path="hackathon/:id" element={<HackathonDetails />} />
  <Route path="register/:id" element={<RegistrationFlow />} />
  <Route path="team" element={<MyTeams />} />
  <Route path="submissions" element={<Submissions />} />
  <Route path="tracker" element={<ApplicationTracker />} />
  <Route path="certificates" element={<Certificate />} />
  <Route path="profile" element={<Profile />} />
</Route>
    </Routes>
  );
}
export default AppRoutes;