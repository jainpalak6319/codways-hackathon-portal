import { MdOutlineInbox } from 'react-icons/md';

export default function EmptyState({ icon: Icon = MdOutlineInbox, title = 'Nothing here yet', subtitle = '', action = null }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ padding: '48px 16px' }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%', background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
      }}>
        <Icon size={26} color="var(--text-soft)" />
      </div>
      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{title}</div>
      {subtitle && <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4, maxWidth: 320 }}>{subtitle}</div>}
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  );
}
