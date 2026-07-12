import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTrophy,
  FaUsers,
  FaFolderOpen,
  FaBullhorn,
  FaChartBar,
  FaCog,
  FaUserTie,
  FaTimes,
} from "react-icons/fa";
import "./Sidebar.css";

const navItems = [
  { to: "/admin/dashboard",     icon: <FaHome />,       label: "Dashboard"     },
  { to: "/admin/hackathons",    icon: <FaTrophy />,     label: "Hackathons"    },
  { to: "/admin/participants",  icon: <FaUsers />,      label: "Participants"  },
  { to: "/admin/judges",        icon: <FaUserTie />,    label: "Judges"        },
  { to: "/admin/submissions",   icon: <FaFolderOpen />, label: "Submissions"   },
  { to: "/admin/announcements", icon: <FaBullhorn />,   label: "Announcements" },
  { to: "/admin/analytics",     icon: <FaChartBar />,   label: "Analytics"     },
  { to: "/admin/settings",      icon: <FaCog />,        label: "Settings"      },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>

      <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
        <FaTimes />
      </button>

      <div className="sidebar-logo">
        <div className="logo-icon">{"</>"}</div>
        <div>
          <h2>Codways</h2>
          <span>Hackathon Portal</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
            onClick={onClose} /* closes drawer on mobile after tap */
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="support-card">
        <div className="bot-icon">🤖</div>
        <h4>Need Help?</h4>
        <p>We're here to help you make your hackathon amazing.</p>
        <button>Contact Support →</button>
      </div>

    </aside>
  );
}

export default Sidebar;