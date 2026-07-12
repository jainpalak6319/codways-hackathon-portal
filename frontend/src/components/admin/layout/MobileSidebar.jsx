import Sidebar from "./Sidebar";
import { useSidebar } from "../../../features/admin/context/SidebarContext";

export default function MobileSidebar() {
  const { mobileOpen, closeMobile } = useSidebar();

  if (!mobileOpen) return null;

  return (
    <>
      <div className="dd-mobile-overlay" onClick={closeMobile} />

      <div className="dd-mobile-drawer">
        <Sidebar variant="mobile" onNavigate={closeMobile} />
      </div>
    </>
  );
}