import { useNavigate } from 'react-router-dom';
import {
  MdOutlineCalendarMonth, MdOutlinePeopleAlt, MdOutlineGavel,
  MdOutlineBarChart, MdOutlineCampaign, MdOutlineSettings,
} from 'react-icons/md';
import './QuickActions.css';

const ICONS = {
  calendar: MdOutlineCalendarMonth,
  people: MdOutlinePeopleAlt,
  judge: MdOutlineGavel,
  chart: MdOutlineBarChart,
  announce: MdOutlineCampaign,
  settings: MdOutlineSettings,
};

const COLOR_MAP = {
  primary: { bg: 'var(--primary-tint)', fg: 'var(--primary)' },
  purple: { bg: 'var(--purple-tint)', fg: 'var(--purple)' },
  orange: { bg: 'var(--orange-tint)', fg: 'var(--orange)' },
  teal: { bg: 'var(--teal-tint)', fg: 'var(--sidebar-active)' },
  green: { bg: 'var(--green-tint)', fg: 'var(--green)' },
  slate: { bg: '#F1F5F9', fg: '#475569' },
};

export default function QuickActions({ actions = [] }) {
  const navigate = useNavigate();
  return (
    <div className="section-card h-100">
      <div className="section-card-header">
        <span className="section-card-title">Quick Actions</span>
      </div>
      <div className="row g-3">
        {actions.map((a) => {
          const Icon = ICONS[a.icon] || MdOutlineCalendarMonth;
          const palette = COLOR_MAP[a.color] || COLOR_MAP.primary;
          return (
            <div key={a.key} className="col-4">
              <div className="dd-qa-card" style={{ background: palette.bg }} onClick={() => navigate(a.route)} role="button">
                <div className="dd-qa-icon" style={{ background: '#fff', color: palette.fg }}>
                  <Icon />
                </div>
                <span className="dd-qa-label">{a.title}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
