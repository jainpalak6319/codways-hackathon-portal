import { MdOutlineNotificationsNone } from 'react-icons/md';
import DropdownMenu from '../common/DropdownMenu';
import {
  formatDate,
  formatRelativeTime,
} from "../../../utils/admin/formatDate";

const notifications = [
  { id: 1, text: 'Judge Sarah Johnson accepted the invitation', time: '2025-06-02T05:00:00' },
  { id: 2, text: '60 new submissions received for "Code the Future 2025"', time: '2025-06-01T08:00:00' },
  { id: 3, text: 'Hackathon "Build Beyond Limits" marked as completed', time: '2025-05-31T06:00:00' },
  { id: 4, text: 'New participant registrations spiked by 22%', time: '2025-05-30T09:00:00' },
  { id: 5, text: 'Announcement "Registration Deadline Extended" published', time: '2025-05-27T13:00:00' },
];

export default function NotificationMenu() {
  return (
    <DropdownMenu
      panelStyle={{ width: 320, maxHeight: 380, overflowY: 'auto' }}
      trigger={(open) => (
        <button className="dd-icon-btn" aria-label="Notifications" aria-expanded={open}>
          <MdOutlineNotificationsNone />
          <span className="dd-icon-badge">{notifications.length}</span>
        </button>
      )}
    >
      <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', fontWeight: 700, fontSize: 14 }}>
        Notifications
      </div>
      {notifications.map((n) => (
        <div key={n.id} className="dd-menu-item" style={{ alignItems: 'flex-start', flexDirection: 'column', gap: 2 }}>
          <span>{n.text}</span>
          <span style={{ fontSize: 11, color: 'var(--text-soft)' }}>{formatRelativeTime(n.time)}</span>
        </div>
      ))}
    </DropdownMenu>
  );
}
