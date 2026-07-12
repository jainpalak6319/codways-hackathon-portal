import { getStatusStyle } from '../../../constants/admin/statusColors';

export default function StatusBadge({ status, map }) {
  const style = getStatusStyle(status, map);
  return (
    <span
      style={{
        background: style.bg, color: style.text, fontSize: 12, fontWeight: 600,
        padding: '4px 10px', borderRadius: 999, display: 'inline-block', whiteSpace: 'nowrap',
      }}
    >
      {status}
    </span>
  );
}
