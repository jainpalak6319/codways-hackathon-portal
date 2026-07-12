import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdAdd, MdOutlineDeleteOutline, MdOutlineMailOutline } from 'react-icons/md';
import SearchBar from '../../components/admin/common/SearchBar';
import Avatar from '../../components/admin/common/Avatar';
import Loader from '../../components/admin/common/Loader';
import EmptyState from '../../components/admin/common/EmptyState';
import Modal from '../../components/admin/common/Modal';
import StatusBadge from '../../components/admin/common/StatusBadge';
import { getJudges, inviteJudge, removeJudge } from '../../services/judgeAPI';
import { JUDGE_STATUS } from '../../constants/admin/statusColors';
import '../../components/admin/tables/HackathonTable.css';

export default function Judges() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [judges, setJudges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(searchParams.get('invite') === '1');
  const [form, setForm] = useState({ name: '', email: '', expertise: '' });

  useEffect(() => { getJudges().then((data) => { setJudges(data); setLoading(false); }); }, []);

  const filtered = useMemo(
    () => judges.filter((j) => j.name.toLowerCase().includes(search.toLowerCase()) || j.expertise.toLowerCase().includes(search.toLowerCase())),
    [judges, search]
  );

  const closeModal = () => { setModalOpen(false); setSearchParams({}); };

  const handleInvite = async (e) => {
    e.preventDefault();
    const invited = await inviteJudge({ ...form, hackathons: [] });
    setJudges((prev) => [invited, ...prev]);
    closeModal();
    setForm({ name: '', email: '', expertise: '' });
  };

  const handleRemove = async (id) => { await removeJudge(id); setJudges((prev) => prev.filter((j) => j.id !== id)); };

  if (loading) return <Loader fullHeight label="Loading judges..." />;

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Judges</h1>
          <p className="page-subtitle mb-0">Manage judging panel and hackathon assignments.</p>
        </div>
        <button className="btn-primary-soft" onClick={() => setModalOpen(true)}><MdAdd size={18} /> Invite Judge</button>
      </div>

      <div className="section-card mb-3" style={{ maxWidth: 340 }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search judges by name or expertise..." />
      </div>

      <div className="section-card">
        {!filtered.length ? <EmptyState title="No judges found" /> : (
          <div className="scroll-x">
            <table className="dd-table">
              <thead>
                <tr><th>Judge</th><th>Expertise</th><th>Assigned Hackathons</th><th>Invited On</th><th>Status</th><th style={{ textAlign: 'right' }}>Action</th></tr>
              </thead>
              <tbody>
                {filtered.map((j) => (
                  <tr key={j.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar name={j.name} size={32} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{j.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{j.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{j.expertise}</td>
                    <td>{j.hackathons.join(', ') || '--'}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{j.invitedOn}</td>
                    <td><StatusBadge status={j.status} map={JUDGE_STATUS} /></td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="dd-row-menu-btn" onClick={() => handleRemove(j.id)} aria-label="Remove judge">
                        <MdOutlineDeleteOutline size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title="Invite Judge"
        footer={<>
          <button className="btn-outline-soft" onClick={closeModal}>Cancel</button>
          <button className="btn-primary-soft" form="invite-judge-form" type="submit"><MdOutlineMailOutline /> Send Invite</button>
        </>}
      >
        <form id="invite-judge-form" onSubmit={handleInvite} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label-sm">Full Name</label>
            <input className="input-soft" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Dr. Jane Cooper" />
          </div>
          <div>
            <label className="form-label-sm">Email Address</label>
            <input type="email" className="input-soft" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane.cooper@example.com" />
          </div>
          <div>
            <label className="form-label-sm">Area of Expertise</label>
            <input className="input-soft" required value={form.expertise} onChange={(e) => setForm({ ...form, expertise: e.target.value })} placeholder="e.g. Machine Learning" />
          </div>
        </form>
      </Modal>
    </div>
  );
}
