import { useNavigate } from 'react-router-dom';
import Avatar from '../common/Avatar';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';
import { SUBMISSION_STATUS } from '../../../constants/admin/statusColors';
import { formatRelativeTime } from '../../../utils/admin/formatDate';

export default function RecentSubmission({ submissions = [] }) {
  const navigate = useNavigate();

  return (
    <div className="section-card h-100">
      <div className="section-card-header">
        <span className="section-card-title">Recent Submissions</span>
        <span className="link-teal" role="button" onClick={() => navigate('/admin/submissions')}>View All</span>
      </div>
      {!submissions.length ? (
        <EmptyState title="No submissions yet" />
      ) : (
        <div className="d-flex flex-column gap-3">
          {submissions.map((s) => (
            <div
              key={s.id}
              onClick={() => navigate('/admin/submissions')}
              role="button"
              style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
            >
              <Avatar name={s.team} size={36} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {s.team}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.hackathon}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <StatusBadge status={s.status} map={SUBMISSION_STATUS} />
                <div style={{ fontSize: 11, color: 'var(--text-soft)', marginTop: 4 }}>{formatRelativeTime(s.submittedAt)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
