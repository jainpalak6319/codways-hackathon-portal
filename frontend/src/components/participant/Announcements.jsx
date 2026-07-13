// File: src/components/Announcements.jsx
import React from "react";
import { Megaphone, FileCode2, AlertCircle } from "lucide-react";

const announcements = [
  {
    icon: Megaphone,
    colorClass: "purple",
    title: "Registration Deadline Extended!",
    desc: 'Registration for "Code the Future 2025" has been extended to 15 May 2025.',
    date: "18 May 2025",
    time: "10:30 AM",
  },
  {
    icon: FileCode2,
    colorClass: "green",
    title: "New Resource Added",
    desc: "Check out the new API documentation in the Resources section.",
    date: "17 May 2025",
    time: "02:15 PM",
  },
  {
    icon: AlertCircle,
    colorClass: "orange",
    title: "Reminder: Submission in 3 Days",
    desc: "Don't forget to submit your project before the deadline.",
    date: "22 May 2025",
    time: "09:00 AM",
  },
];

export default function Announcements() {
  return (
    <div className="panel-card">
      <div className="panel-header">
        <h2>Announcements</h2>
        <a href="#" className="panel-link" onClick={(e) => e.preventDefault()}>
          View All
        </a>
      </div>

      <div className="announcement-list">
        {announcements.map((item) => {
          const Icon = item.icon;
          return (
            <div className="announcement-item" key={item.title}>
              <div className={`announcement-icon ${item.colorClass}`}>
                <Icon size={18} strokeWidth={2} />
              </div>
              <div className="announcement-body">
                <div>
                  <div className="announcement-title">{item.title}</div>
                  <div className="announcement-desc">{item.desc}</div>
                </div>
                <div className="announcement-time">
                  {item.date}
                  <br />
                  {item.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}