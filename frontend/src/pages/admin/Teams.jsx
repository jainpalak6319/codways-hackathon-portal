import { useEffect, useMemo, useState } from 'react';
import SearchBar from '../../components/admin/common/SearchBar';
import Avatar from '../../components/admin/common/Avatar';
import Loader from '../../components/admin/common/Loader';
import EmptyState from '../../components/admin/common/EmptyState';
import { getTeams } from '../../services/teamAPI';
import './Teams.css';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { getTeams().then((data) => { setTeams(data); setLoading(false); }); }, []);

  const filtered = useMemo(
    () => teams.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.project.toLowerCase().includes(search.toLowerCase())),
    [teams, search]
  );

  if (loading) return <Loader fullHeight label="Loading teams..." />;

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Teams</h1>
          <p className="page-subtitle mb-0">{teams.length} teams formed across active hackathons.</p>
        </div>
      </div>

      <div className="section-card mb-3" style={{ maxWidth: 340 }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search teams or projects..." />
      </div>

      {!filtered.length ? (
        <div className="section-card"><EmptyState title="No teams found" /></div>
      ) : (
        <div className="row g-3">
          {filtered.map((t) => (
            <div key={t.id} className="col-12 col-sm-6 col-lg-4">
              <div className="dd-team-card">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{t.hackathon}</div>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: '4px 9px', borderRadius: 999,
                    background: t.submitted ? 'var(--green-tint)' : 'var(--orange-tint)',
                    color: t.submitted ? 'var(--green)' : 'var(--orange)',
                  }}>
                    {t.submitted ? 'Submitted' : 'In Progress'}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{t.project}</div>
                <div className="dd-team-avatars">
                  {t.members.map((m) => <Avatar key={m} name={m} size={30} />)}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {t.members.length} member{t.members.length > 1 ? 's' : ''}
                  {t.score != null && <span style={{ float: 'right', fontWeight: 700, color: 'var(--sidebar-active)' }}>{t.score}/100</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
