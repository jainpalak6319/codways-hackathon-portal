// File: src/components/TeamCard.jsx
import React from "react";
import { Plus } from "lucide-react";

const avatars = [
  "https://i.pravatar.cc/100?img=13",
  "https://i.pravatar.cc/100?img=45",
  "https://i.pravatar.cc/100?img=33",
  "https://i.pravatar.cc/100?img=47",
];

export default function TeamCard() {
  return (
    <div className="panel-card">
      <div className="panel-header">
        <h2>My Team</h2>
        <a href="#" className="panel-link" onClick={(e) => e.preventDefault()}>
          View Team
        </a>
      </div>

      <div className="team-avatars">
        {avatars.map((src, i) => (
          <img key={i} src={src} alt={`Team member ${i + 1}`} className="team-avatar" />
        ))}
        <button className="team-avatar-add" aria-label="Add team member">
          <Plus size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="team-meta-row">
        <div className="team-meta-block">
          <span className="team-meta-label">Team Name</span>
          <span className="team-meta-value">CodeCrafters</span>
        </div>
        <div className="team-meta-block">
          <span className="team-meta-label">Team ID</span>
          <span className="team-meta-value">#CC2025</span>
        </div>
        <div className="team-meta-block">
          <span className="team-meta-label">Role</span>
          <span className="team-meta-value">Team Lead</span>
        </div>
      </div>
    </div>
  );
}