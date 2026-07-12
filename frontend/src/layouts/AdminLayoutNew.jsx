import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/layout/Sidebar";
import MobileSidebar from "../components/admin/layout/MobileSidebar";
import Navbar from "../components/admin/layout/Navbar";
import {
  SidebarProvider,
  useSidebar,
} from "../features/admin/context/SidebarContext";
import "./AdminLayoutNew.css";
import "../styles/admin/admin-theme.css";
function AdminLayoutContent() {
  const { mobileOpen } = useSidebar();

  return (
    <div className="admin-theme">
    <div className="dd-layout ">
      <div className="d-none d-lg-block dd-sidebar-desktop-only">
        <Sidebar variant="desktop" />
      </div>

      {mobileOpen && <MobileSidebar />}

      <div className="dd-layout-main">
        <Navbar />

        <main className="dd-layout-content">
          <Outlet />
        </main>

        <footer className="dd-layout-footer">
          © {new Date().getFullYear()} Hackathon Management Portal
        </footer>
      </div>
    </div>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminLayoutContent />
    </SidebarProvider>
  );
}