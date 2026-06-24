import { FaBars, FaBell, FaChevronDown, FaSun } from "react-icons/fa";
import "./Topbar.css";

function Topbar({ onMenuClick }) {
  return (
    <header className="topbar">

      {/* Hamburger — only rendered on tablet/mobile via CSS */}
      <button className="topbar-menu-btn" onClick={onMenuClick} aria-label="Open menu">
        <FaBars />
      </button>

      {/* All icons pushed to the right */}
      <div className="topbar-right">

        <FaSun className="topbar-icon teal topbar-hide-sm" />

        <div className="divider topbar-hide-sm" />

        <div className="notification">
          <FaBell className="topbar-icon" />
          <span>3</span>
        </div>

        <div className="divider" />

        <div className="profile">
          <div className="avatar">P</div>
          <div className="profile-text">
            <h5>Palak Jain</h5>
            <span>Administrator</span>
          </div>
          <FaChevronDown className="topbar-icon topbar-hide-sm" />
        </div>

      </div>

    </header>
  );
}

export default Topbar;
