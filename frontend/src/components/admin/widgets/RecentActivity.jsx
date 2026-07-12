import { useNavigate } from 'react-router-dom';
import {
  MdOutlineEmojiEvents, MdOutlineGavel, MdOutlineCampaign,
  MdOutlineUploadFile, MdOutlineCheckCircle,
} from 'react-icons/md';
import EmptyState from '../common/EmptyState';
import { formatRelativeTime } from '../../../utils/admin/formatDate';

const TYPE_META = {
  hackathon: { icon: MdOutlineEmojiEvents, bg: 'var(--primary-tint)', fg: 'var(--primary)' },
  judge: { icon: MdOutlineGavel, bg: 'var(--purple-tint)', fg: 'var(--purple)' },
  announcement: { icon: MdOutlineCampaign, bg: 'var(--orange-tint)', fg: 'var(--orange)' },
  submission: { icon: MdOutlineUploadFile, bg: 'var(--teal-tint)', fg: 'var(--sidebar-active)' },
  completed: { icon: MdOutlineCheckCircle, bg: 'var(--green-tint)', fg: 'var(--green)' },
};

export default function RecentActivity({ activity = [] }) {
  const navigate = useNavigate();

  return (
    <div className="section-card h-100">
      <div className="section-card-header">
        <span className="section-card-title">Recent Activities</span>
        <span className="link-teal" role="button" onClick={() => navigate('/reports')}>View All</span>
      </div>
      {!activity.length ? (
        <EmptyState title="No recent activity" />
      ) : (
        <div className="d-flex flex-column gap-3">
          {activity.map((a) => {
            const meta = TYPE_META[a.type] || TYPE_META.hackathon;
            const Icon = meta.icon;
            return (
              <div key={a.id} style={{ display: 'flex', gap: 12 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%', background: meta.bg, color: meta.fg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16,
                }}>
                  <Icon />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.4 }}>{a.text}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-soft)', marginTop: 2 }}>
                    By {a.by} · {formatRelativeTime(a.time)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
