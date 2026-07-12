import { useEffect, useMemo, useState } from 'react';
import { MdOutlineFileDownload, MdOutlineOpenInNew } from 'react-icons/md';
import SearchBar from '../../components/admin/common/SearchBar';
import Loader from '../../components/admin/common/Loader';
import EmptyState from '../../components/admin/common/EmptyState';
import StatusBadge from '../../components/admin/common/StatusBadge';
import { getSubmissions } from '../../services/submissionAPI';
import { SUBMISSION_STATUS } from '../../constants/admin/statusColors';
import { formatDate } from '../../utils/admin/formatDate';
import '../../components/admin/tables/HackathonTable.css';

const STATUS_FILTERS = ['All', 'Submitted', 'Pending', 'Under Review', 'Shortlisted', 'Rejected'];

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');

  useEffect(() => { getSubmissions().then((data) => { setSubmissions(data); setLoading(false); }); }, []);

  const filtered = useMemo(() => submissions.filter((s) => {
    const matchSearch = s.team.toLowerCase().includes(search.toLowerCase()) || s.project.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === 'All' || s.status === status;
    return matchSearch && matchStatus;
  }), [submissions, search, status]);

  if (loading) return <Loader fullHeight label="Loading submissions..." />;

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Submissions</h1>
          <p className="page-subtitle mb-0">{submissions.length} projects submitted across all hackathons.</p>
        </div>
        <button className="btn-outline-soft"><MdOutlineFileDownload /> Export CSV</button>
      </div>

      <div className="section-card mb-3">
        <div className="d-flex flex-column flex-md-row gap-3 align-items-md-center justify-content-between mb-3">
          <div style={{ maxWidth: 340, width: '100%' }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search by team or project..." />
          </div>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          {STATUS_FILTERS.map((s) => (
            <button key={s} className={`dd-filter-chip${status === s ? ' active' : ''}`} onClick={() => setStatus(s)}>{s}</button>
          ))}
        </div>
      </div>

      <div className="section-card">
        {!filtered.length ? <EmptyState title="No submissions found" /> : (
          <div className="scroll-x">
            <table className="dd-table">
              <thead>
                <tr><th>Team</th><th>Project</th><th>Hackathon</th><th>Submitted</th><th>Status</th><th>Repo</th></tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 600 }}>{s.team}</td>
                    <td>{s.project}</td>
                    <td>{s.hackathon}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{formatDate(s.submittedAt, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                    <td><StatusBadge status={s.status} map={SUBMISSION_STATUS} /></td>
                    <td>
                      {s.repo !== '--' ? (
                        <a href={`https://${s.repo}`} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12.5 }}>
                          View <MdOutlineOpenInNew size={13} />
                        </a>
                      ) : '--'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
