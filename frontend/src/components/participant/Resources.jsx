// File: src/components/Resources.jsx
import React from "react";
import { FileText, Code2, HelpCircle, Download } from "lucide-react";

const resources = [
  {
    icon: FileText,
    colorClass: "red",
    title: "Guidelines",
    sub: "PDF Document",
  },
  {
    icon: Code2,
    colorClass: "green",
    title: "API Docs",
    sub: "Documentation",
  },
  {
    icon: HelpCircle,
    colorClass: "purple",
    title: "FAQ",
    sub: "View Answers",
  },
  {
    icon: Download,
    colorClass: "orange",
    title: "Starter Kit",
    sub: "Download",
  },
];

export default function Resources() {
  return (
    <div className="panel-card">
      <div className="panel-header">
        <h2>Resources</h2>
        <a href="#" className="panel-link" onClick={(e) => e.preventDefault()}>
          View All
        </a>
      </div>

      <div className="resources-grid">
        {resources.map((item) => {
          const Icon = item.icon;
          return (
            <button className="resource-card" key={item.title}>
              <div className={`resource-icon ${item.colorClass}`}>
                <Icon size={20} strokeWidth={2} />
              </div>
              <div className="resource-info">
                <div className="resource-title">{item.title}</div>
                <div className="resource-sub">{item.sub}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}