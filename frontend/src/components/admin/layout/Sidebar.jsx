import { NavLink, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";

import { MAIN_MENU, SYSTEM_MENU } from "../../../constants/admin/menuItems";
import { useSidebar } from "../../../features/admin/context/SidebarContext";
import { logout } from "../../../features/auth/authSlice";

import "./Sidebar.css";

function MenuSection({ label, items, collapsed, onNavigate }) {
  return (
    <>
      {!collapsed && (
        <div className="dd-sidebar-section-label">{label}</div>
      )}

      {items.map((item) => (
        <NavLink
          key={item.route}
          to={item.route}
          onClick={onNavigate}
          className={({ isActive }) =>
            `dd-sidebar-link${isActive ? " active" : ""}`
          }
          title={collapsed ? item.title : undefined}
        >
          <span className="icon">
            <item.icon />
          </span>

          <span className="label">{item.title}</span>
        </NavLink>
      ))}
    </>
  );
}

export default function Sidebar({
  variant = "desktop",
  onNavigate,
}) {
  console.log(MAIN_MENU);
console.log(SYSTEM_MENU);
  const { collapsed } = useSidebar();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isCollapsed =
    variant === "desktop" && collapsed;

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

 return (
  <aside className={`dd-sidebar${isCollapsed ? " collapsed" : ""}`}>

    <div className="dd-sidebar-logo">
      <div className="mark">DD</div>

      <div className="text-block">
        <div className="brand">DEVDASH</div>
        <div className="tagline">Hackathon Portal</div>
      </div>
    </div>

    <nav className="dd-sidebar-nav">
      <MenuSection
        label="Main"
        items={MAIN_MENU}
        collapsed={isCollapsed}
        onNavigate={onNavigate}
      />

      <MenuSection
        label="System"
        items={SYSTEM_MENU}
        collapsed={isCollapsed}
        onNavigate={onNavigate}
      />
    </nav>

    <div className="dd-sidebar-footer">
      <button
        className="dd-sidebar-link"
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        <span className="icon">
          <MdLogout />
        </span>

        <span className="label">Logout</span>
      </button>
    </div>

  </aside>
);
}