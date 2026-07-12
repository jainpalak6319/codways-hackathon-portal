import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import './DataTable.css';

export default function Pagination({ page, totalPages, onChange, totalItems, pageSize }) {
  if (totalPages <= 1) return null;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <div className="dd-pagination">
      <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
        Showing {start}-{end} of {totalItems}
      </span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <button className="dd-page-btn" disabled={page === 1} onClick={() => onChange(page - 1)}>
          <MdChevronLeft />
        </button>
        {pages.map((p, i) => (
          <span key={p} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && pages[i - 1] !== p - 1 && <span style={{ padding: '0 4px', color: 'var(--text-soft)' }}>…</span>}
            <button className={`dd-page-btn${p === page ? ' active' : ''}`} onClick={() => onChange(p)}>{p}</button>
          </span>
        ))}
        <button className="dd-page-btn" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
          <MdChevronRight />
        </button>
      </div>
    </div>
  );
}
