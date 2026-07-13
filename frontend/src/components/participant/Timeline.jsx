// File: src/components/participant/Timeline.jsx
import React from "react";
import { CheckCircle2, Circle } from "lucide-react";

const timelineData = [
  {
    title: "Registration Opened",
    date: "10 May 2025",
    status: "completed",
  },
  {
    title: "Registration Closed",
    date: "15 May 2025",
    status: "completed",
  },
  {
    title: "Hacking in Progress",
    date: "16 May – 24 May 2025",
    status: "active",
  },
  {
    title: "Final Submission",
    date: "25 May 2025, 11:59 PM",
    status: "pending",
  },
  {
    title: "Results Announcement",
    date: "30 May 2025",
    status: "pending",
  },
];

export default function Timeline() {
  return (
    <div className="panel-card">
      <div className="panel-header">
        <h2>Hackathon Timeline</h2>
        <a href="#" className="panel-link" onClick={(e) => e.preventDefault()}>
          View Full Timeline
        </a>
      </div>

      <div className="timeline-list">
        {timelineData.map((item, index) => (
          <div className={`timeline-item ${item.status}`} key={item.title}>
            <div className="timeline-marker-col">
              <div className={`timeline-dot ${item.status}`}>
                {item.status === "pending" ? (
                  <Circle size={20} strokeWidth={2} />
                ) : (
                  <CheckCircle2
                    size={22}
                    strokeWidth={2}
                    fill={item.status === "completed" ? "#16a34a" : "#ffffff"}
                    color={item.status === "completed" ? "#ffffff" : "#2563eb"}
                  />
                )}
              </div>
              {index !== timelineData.length - 1 && (
                <div className="timeline-line" />
              )}
            </div>
            <div className="timeline-content">
              <div className="timeline-title">{item.title}</div>
              <div className="timeline-date">{item.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}