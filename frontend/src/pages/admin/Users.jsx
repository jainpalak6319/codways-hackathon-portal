import { useEffect, useMemo, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import SearchBar from "../../components/admin/common/SearchBar";
import Avatar from '../../components/admin/common/Avatar';
import Loader from '../../components/admin/common/Loader';
import EmptyState from '../../components/admin/common/EmptyState';
import StatusBadge from '../../components/admin/common/StatusBadge';
import { getUsers, updateUserStatus } from '../../services/userAPI';
import { USER_STATUS } from '../../constants/admin/statusColors';
import { formatRelativeTime } from '../../utils/admin/formatDate';
import '../../components/admin/tables/HackathonTable.css';

const ROLE_FILTERS = ['All', 'Super Admin', 'Moderator', 'Judge', 'Participant'];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All');

  useEffect(() => { getUsers().then((data) => { setUsers(data); setLoading(false); }); }, []);

  const filtered = useMemo(() => users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = role === 'All' || u.role === role;
    return matchSearch && matchRole;
  }), [users, search, role]);

  const toggleStatus = async (u) => {
    const next = u.status === 'Active' ? 'Suspended' : 'Active';
    await updateUserStatus(u.id, next);
    setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, status: next } : x)));
  };

  if (loading) return <Loader fullHeight label="Loading users..." />;

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Users</h1>
          <p className="page-subtitle mb-0">{users.length} accounts across every role on the platform.</p>
        </div>
        <button className="btn-primary-soft"><MdAdd size={18} /> Add User</button>
      </div>

      <div className="section-card mb-3">
        <div className="d-flex flex-column flex-md-row gap-3 align-items-md-center justify-content-between mb-3">
          <div style={{ maxWidth: 340, width: '100%' }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search by name or email..." />
          </div>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          {ROLE_FILTERS.map((r) => (
            <button key={r} className={`dd-filter-chip${role === r ? ' active' : ''}`} onClick={() => setRole(r)}>{r}</button>
          ))}
        </div>
      </div>

      <div className="section-card">
        {!filtered.length ? <EmptyState title="No users found" /> : (
          <div className="scroll-x">
            <table className="dd-table">
              <thead><tr><th>User</th><th>Role</th><th>Last Active</th><th>Status</th><th style={{ textAlign: 'right' }}>Action</th></tr></thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar name={u.name} size={32} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{u.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{u.role}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{u.lastActive === '--' ? '--' : formatRelativeTime(u.lastActive)}</td>
                    <td><StatusBadge status={u.status} map={USER_STATUS} /></td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn-outline-soft" style={{ fontSize: 12, padding: '6px 10px' }} onClick={() => toggleStatus(u)}>
                        {u.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
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
