import { Link } from 'react-router-dom';
import { MdMoreHoriz, MdOutlineVisibility, MdOutlineEdit, MdOutlineDeleteOutline, MdOutlineAnalytics } from 'react-icons/md';
import StatusBadge from '../common/StatusBadge';
import DropdownMenu from '../common/DropdownMenu';
import EmptyState from '../common/EmptyState';
import { HACKATHON_STATUS } from '../../../constants/admin/statusColors';
import { formatDate } from '../../../utils/admin/formatDate';
import './HackathonTable.css';

export default function HackathonTable({ hackathons = [], onDelete }) {
  if (!hackathons.length) {
    return <EmptyState title="No hackathons yet" subtitle="Create your first hackathon to see it listed here." />;
  }

  return (
    <div className="scroll-x">
      <table className="dd-table">
        <thead>
          <tr>
            <th>Hackathon</th>
            <th>Dates</th>
            <th>Participants</th>
            <th>Submissions</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {hackathons.map((h) => (
            <tr key={h.id}>
              <td>
                <div className="dd-hk-name-cell">
                  <div className="dd-hk-banner" style={{ background: `${h.color}1A` }}>{h.banner}</div>
                  <Link to={`/admin/hackathons/${h.id}`} style={{ color: 'var(--text)' }}>{h.name}</Link>
                </div>
              </td>
              <td style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {formatDate(h.startDate)} – {formatDate(h.endDate)}
              </td>
              <td>{h.participants || '--'}</td>
              <td>{h.submissions || '--'}</td>
              <td><StatusBadge status={h.status} map={HACKATHON_STATUS} /></td>
              <td style={{ textAlign: 'right' }}>
                <DropdownMenu
                  align="right"
                  trigger={() => (
                    <button className="dd-row-menu-btn" aria-label="Row actions"><MdMoreHoriz size={18} /></button>
                  )}
                >
                  <div className="dd-menu-item"><MdOutlineVisibility /> View</div>
                  <div className="dd-menu-item"><MdOutlineEdit /> Edit</div>
                  <div className="dd-menu-item"><MdOutlineAnalytics /> Analytics</div>
                  <div className="dd-menu-divider" />
                  <div className="dd-menu-item" style={{ color: 'var(--red)' }} onClick={() => onDelete?.(h.id)}>
                    <MdOutlineDeleteOutline /> Delete
                  </div>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
