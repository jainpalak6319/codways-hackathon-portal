// File: src/components/Welcome.jsx
import React from "react";
import { Calendar } from "lucide-react";

export default function Welcome() {
  return (
    <div className="welcome-row">
      <div className="welcome-text">
        <h1>Welcome back, Alex! 👋</h1>
        <p>Let's build something amazing today.</p>
      </div>

      <div className="date-card">
        <div className="date-icon">
          <Calendar size={18} strokeWidth={2} />
        </div>
        <div>
          <div className="date-main">22 May 2025</div>
          <div className="date-sub">Thursday</div>
        </div>
      </div>
    </div>
  );
}