import { useEffect, useMemo, useState } from 'react';
import { MdOutlineFileDownload, MdOutlineDeleteOutline } from 'react-icons/md';
import SearchBar from '../../components/admin/common/SearchBar';
import Avatar from '../../components/admin/common/Avatar';
import Loader from '../../components/admin/common/Loader';
import EmptyState from '../../components/admin/common/EmptyState';
import Pagination from '../../components/admin/common/Pagination';
import StatusBadge from '../../components/admin/common/StatusBadge';
import { usePagination } from '../../hooks/admin/usePagination';
import { getParticipants, deleteParticipant } from '../../services/participantAPI';
import { USER_STATUS } from '../../constants/admin/statusColors';
import '../../components/admin/tables/HackathonTable.css';

export default function Participants() {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [hackathonFilter, setHackathonFilter] = useState('All');

  useEffect(() => {
    getParticipants().then((data) => { setParticipants(data); setLoading(false); });
  }, []);

  const hackathonOptions = useMemo(
    () => ['All', ...new Set(participants.map((p) => p.hackathon))],
    [participants]
  );

  const filtered = useMemo(() => participants.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase());
    const matchHk = hackathonFilter === 'All' || p.hackathon === hackathonFilter;
    return matchSearch && matchHk;
  }), [participants, search, hackathonFilter]);

  const { page, setPage, totalPages, paginated, totalItems, pageSize } = usePagination(filtered, 8);
  const handleDelete = async (id) => { await deleteParticipant(id); setParticipants((prev) => prev.filter((p) => p.id !== id)); };

  if (loading) return <Loader fullHeight label="Loading participants..." />;

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Participants</h1>
          <p className="page-subtitle mb-0">{participants.length} people registered across all hackathons.</p>
        </div>
        <button className="btn-outline-soft"><MdOutlineFileDownload /> Export CSV</button>
      </div>

      <div className="section-card mb-3">
        <div className="d-flex flex-column flex-md-row gap-3 align-items-md-center justify-content-between">
          <div style={{ maxWidth: 340, width: '100%' }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search by name or email..." />
          </div>
          <select className="input-soft" style={{ maxWidth: 220 }} value={hackathonFilter} onChange={(e) => setHackathonFilter(e.target.value)}>
            {hackathonOptions.map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
      </div>

      <div className="section-card">
        {!filtered.length ? <EmptyState title="No participants found" /> : (
          <>
            <div className="scroll-x">
              <table className="dd-table">
                <thead>
                  <tr>
                    <th>Participant</th><th>College</th><th>Hackathon</th><th>Team</th><th>Registered</th><th>Status</th><th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Avatar name={p.name} size={32} />
                          <div>
                            <div style={{ fontWeight: 600 }}>{p.name}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{p.college}</td>
                      <td>{p.hackathon}</td>
                      <td>{p.team}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{p.registeredOn}</td>
                      <td><StatusBadge status={p.status} map={USER_STATUS} /></td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="dd-row-menu-btn" onClick={() => handleDelete(p.id)} aria-label="Delete participant">
                          <MdOutlineDeleteOutline size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} totalItems={totalItems} pageSize={pageSize} />
          </>
        )}
      </div>
    </div>
  );
}
