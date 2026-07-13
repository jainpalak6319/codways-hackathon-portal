// File: src/components/SubmissionCard.jsx
import React from "react";

export default function SubmissionCard() {
  return (
    <div className="panel-card">
      <div className="panel-header">
        <h2>My Submission</h2>
        <a href="#" className="panel-link" onClick={(e) => e.preventDefault()}>
          View All Submissions
        </a>
      </div>

      <div className="submission-body">
        <div className="submission-thumb">
          <div className="submission-thumb-inner">
            CODE
            <br />
            THE FUTURE
          </div>
        </div>

        <div className="submission-info">
          <div className="submission-info-top">
            <h3>Smart Waste Management System</h3>
            <span className="badge in-progress">In Progress</span>
          </div>

          <div className="submission-meta-row">
            <div className="submission-meta-block">
              <span className="submission-meta-label">Submitted on</span>
              <span className="submission-meta-value">
                21 May 2025, 08:45 PM
              </span>
            </div>
            <div className="submission-meta-block">
              <span className="submission-meta-label">Status</span>
              <span className="submission-meta-value status-inprogress">
                In Progress
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="progress-row">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: "70%" }} />
        </div>
        <span className="progress-percent">70%</span>
      </div>

      <button className="btn-filled">Continue Work</button>
    </div>
  );
}