// File: src/components/Deadlines.jsx
import React from "react";
import { FileText, Calendar, Trophy } from "lucide-react";

const deadlines = [
  {
    icon: FileText,
    colorClass: "purple",
    title: "Final Submission",
    time: "25 May 2025, 11:59 PM",
    daysLeft: 3,
  },
  {
    icon: Calendar,
    colorClass: "orange",
    title: "Presentation Round",
    time: "27 May 2025, 10:00 AM",
    daysLeft: 5,
  },
  {
    icon: Trophy,
    colorClass: "blue",
    title: "Results Announcement",
    time: "30 May 2025, 06:00 PM",
    daysLeft: 8,
  },
];

export default function Deadlines() {
  return (
    <div className="panel-card">
      <div className="panel-header">
        <h2>Upcoming Deadlines</h2>
        <a href="#" className="panel-link" onClick={(e) => e.preventDefault()}>
          View All
        </a>
      </div>

      <div className="deadline-list">
        {deadlines.map((item) => {
          const Icon = item.icon;
          return (
            <div className="deadline-item" key={item.title}>
              <div className={`deadline-icon ${item.colorClass}`}>
                <Icon size={18} strokeWidth={2} />
              </div>
              <div className="deadline-info">
                <div className="deadline-title">{item.title}</div>
                <div className="deadline-time">{item.time}</div>
              </div>
              <div className="deadline-badge">
                {item.daysLeft}
                <br />
                Days Left
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}