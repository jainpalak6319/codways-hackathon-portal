import {
  MdOutlineCalendarMonth, MdOutlinePeopleAlt, MdOutlineDescription,
  MdOutlineGavel, MdOutlineEmojiEvents,
} from 'react-icons/md';
import './StatsCard.css';

const ICONS = {
  calendar: MdOutlineCalendarMonth,
  people: MdOutlinePeopleAlt,
  file: MdOutlineDescription,
  judge: MdOutlineGavel,
  trophy: MdOutlineEmojiEvents,
};

const COLOR_MAP = {
  primary: { bg: 'var(--primary-tint)', fg: 'var(--primary)' },
  purple: { bg: 'var(--purple-tint)', fg: 'var(--purple)' },
  orange: { bg: 'var(--orange-tint)', fg: 'var(--orange)' },
  green: { bg: 'var(--green-tint)', fg: 'var(--green)' },
  teal: { bg: 'var(--teal-tint)', fg: 'var(--sidebar-active)' },
};

// Reusable stat card. Props: title, value, subtitle, icon, color, loading, percentage
export default function StatsCard({ title, value, subtitle, icon, color = 'primary', loading = false }) {
  const Icon = ICONS[icon] || MdOutlineCalendarMonth;
  const palette = COLOR_MAP[color] || COLOR_MAP.primary;

  if (loading) {
    return (
      <div className="dd-stat-card">
        <div className="dd-skeleton" style={{ width: 46, height: 46, borderRadius: 12 }} />
        <div style={{ flex: 1 }}>
          <div className="dd-skeleton" style={{ width: '60%', height: 22, marginBottom: 8 }} />
          <div className="dd-skeleton" style={{ width: '80%', height: 12 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="dd-stat-card">
      <div className="dd-stat-icon" style={{ background: palette.bg, color: palette.fg }}>
        <Icon />
      </div>
      <div style={{ minWidth: 0 }}>
        <div className="dd-stat-value">{typeof value === 'number' ? value.toLocaleString() : value}</div>
        <div className="dd-stat-title">{title}</div>
        {subtitle && <div className="dd-stat-subtitle" style={{ color: palette.fg }}>{subtitle}</div>}
      </div>
    </div>
  );
}
