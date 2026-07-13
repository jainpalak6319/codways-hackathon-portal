// File: src/components/QuickActions.jsx
import React from "react";
import {
  Flag,
  Users,
  Upload,
  FileText,
  MessageSquare,
  BookOpen,
} from "lucide-react";

const actions = [
  { icon: Flag, colorClass: "teal", label: "View Hackathon" },
  { icon: Users, colorClass: "purple", label: "My Team" },
  { icon: Upload, colorClass: "blue", label: "Submit Project" },
  { icon: FileText, colorClass: "orange", label: "View Submissions" },
  { icon: MessageSquare, colorClass: "skyblue", label: "Messages", badge: 3 },
  { icon: BookOpen, colorClass: "indigo", label: "Resources" },
];

export default function QuickActions() {
  return (
    <div className="panel-card">
      <div className="panel-header">
        <h2>Quick Actions</h2>
      </div>

      <div className="quick-actions-grid">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button className="quick-action-card" key={action.label}>
              {action.badge ? (
                <span className="quick-action-badge">{action.badge}</span>
              ) : null}
              <div className={`quick-action-icon ${action.colorClass}`}>
                <Icon size={20} strokeWidth={2} />
              </div>
              <span className="quick-action-label">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}