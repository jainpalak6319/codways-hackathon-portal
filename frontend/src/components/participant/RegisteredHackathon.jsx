// File: src/components/RegisteredHackathon.jsx
import React from "react";
import { Calendar, Users, Globe } from "lucide-react";

export default function RegisteredHackathon() {
  return (
    <div className="panel-card">
      <div className="panel-header">
        <h2>Registered Hackathon</h2>
      </div>

      <div className="hackathon-card-body">
        <div className="hackathon-thumb">
          <div className="hackathon-thumb-glow" />
          <div className="hackathon-thumb-inner">
            <div className="thumb-title">
              CODE
              <br />
              THE FUTURE
            </div>
            <div className="thumb-year">2025</div>
          </div>
        </div>

        <div className="hackathon-info">
          <div className="hackathon-info-top">
            <h3>Code the Future 2025</h3>
            <span className="badge in-progress">In Progress</span>
          </div>

          <p className="hackathon-desc">
            Build innovative solutions for real-world problems and shape the
            future.
          </p>

          <div className="hackathon-meta">
            <div className="hackathon-meta-item">
              <Calendar size={15} strokeWidth={2} />
              <span>10 May – 25 May 2025</span>
            </div>
            <div className="hackathon-meta-item">
              <Users size={15} strokeWidth={2} />
              <span>320+ Participants</span>
            </div>
            <div className="hackathon-meta-item">
              <Globe size={15} strokeWidth={2} />
              <span>Online</span>
            </div>
          </div>

          <button className="btn-outline">View Details</button>
        </div>
      </div>
    </div>
  );
}