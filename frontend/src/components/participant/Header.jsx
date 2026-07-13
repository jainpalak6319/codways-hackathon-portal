// File: src/components/Header.jsx
import React from "react";
import { Menu, Bell, ChevronDown } from "lucide-react";
import "../../styles/header.css";
export default function Header({ onMenuClick }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button className="hamburger-btn" onClick={onMenuClick} aria-label="Toggle sidebar">
          <Menu size={24} strokeWidth={2} />
        </button>
      </div>

      <div className="header-right">
        <button className="notif-btn" aria-label="Notifications">
          <Bell size={22} strokeWidth={2} />
          <span className="notif-badge">4</span>
        </button>

        <div className="profile-block">
          <img
            className="profile-avatar"
            src="https://i.pravatar.cc/100?img=12"
            alt="Alex Johnson"
          />
          <div className="profile-info">
            <span className="profile-name">Alex Johnson</span>
            <span className="profile-role">Participant</span>
          </div>
          <ChevronDown size={18} className="profile-caret" />
        </div>
      </div>
    </header>
  );
}