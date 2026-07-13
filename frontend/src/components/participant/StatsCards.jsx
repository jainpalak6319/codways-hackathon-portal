// File: src/components/StatsCards.jsx
import React from "react";
import { Trophy, Users, FileText, Star, Award } from "lucide-react";

const stats = [
  {
    icon: Trophy,
    colorClass: "green",
    value: "1",
    label: "Registered Hackathons",
    sub: "1 Active",
    subClass: "green-text",
  },
  {
    icon: Users,
    colorClass: "purple",
    value: "4",
    label: "Team Members",
    sub: "Team Size",
    subClass: "purple-text",
  },
  {
    icon: FileText,
    colorClass: "orange",
    value: "1",
    label: "Submissions",
    sub: "1 In Progress",
    subClass: "orange-text",
  },
  {
    icon: Star,
    colorClass: "teal",
    value: "-",
    label: "Rank",
    sub: "Not Ranked Yet",
    subClass: "gray-text",
  },
  {
    icon: Award,
    colorClass: "blue",
    value: "0",
    label: "Badges Earned",
    sub: "Keep Going!",
    subClass: "blue-text",
  },
];

export default function StatsCards() {
  return (
    <div className="stats-grid">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div className="stat-card" key={stat.label}>
            <div className={`stat-icon ${stat.colorClass}`}>
              <Icon size={22} strokeWidth={2} />
            </div>
            <div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
            <div className={`stat-sub ${stat.subClass}`}>{stat.sub}</div>
          </div>
        );
      })}
    </div>
  );
}