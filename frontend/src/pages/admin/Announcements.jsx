import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdAdd, MdOutlineDeleteOutline, MdOutlineSend } from 'react-icons/md';
import SearchBar from '../../components/admin/common/SearchBar';
import Loader from '../../components/admin/common/Loader';
import EmptyState from '../../components/admin/common/EmptyState';
import Modal from '../../components/admin/common/Modal';
import StatusBadge from '../../components/admin/common/StatusBadge';
import { getAnnouncements, createAnnouncement, publishAnnouncement, deleteAnnouncement } from '../../services/announcementAPI';
import { ANNOUNCEMENT_STATUS } from '../../constants/admin/statusColors';
import { formatRelativeTime } from '../../utils/admin/formatDate';

export default function Announcements() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(searchParams.get('new') === '1');
  const [form, setForm] = useState({ title: '', body: '', audience: 'All Participants', hackathon: '' });

  useEffect(() => { getAnnouncements().then((data) => { setAnnouncements(data); setLoading(false); }); }, []);

  const filtered = useMemo(
    () => announcements.filter((a) => a.title.toLowerCase().includes(search.toLowerCase())),
    [announcements, search]
  );

  const closeModal = () => { setModalOpen(false); setSearchParams({}); };

  const handleCreate = async (e) => {
    e.preventDefault();
    const created = await createAnnouncement(form);
    setAnnouncements((prev) => [created, ...prev]);
    closeModal();
    setForm({ title: '', body: '', audience: 'All Participants', hackathon: '' });
  };

  const handlePublish = async (id) => {
    await publishAnnouncement(id);
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'Published', publishedOn: new Date().toISOString() } : a)));
  };

  const handleDelete = async (id) => { await deleteAnnouncement(id); setAnnouncements((prev) => prev.filter((a) => a.id !== id)); };

  if (loading) return <Loader fullHeight label="Loading announcements..." />;

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Announcements</h1>
          <p className="page-subtitle mb-0">Broadcast updates to participants, teams and judges.</p>
        </div>
        <button className="btn-primary-soft" onClick={() => setModalOpen(true)}><MdAdd size={18} /> Create Announcement</button>
      </div>

      <div className="section-card mb-3" style={{ maxWidth: 340 }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search announcements..." />
      </div>

      {!filtered.length ? (
        <div className="section-card"><EmptyState title="No announcements yet" /></div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {filtered.map((a) => (
            <div key={a.id} className="section-card">
              <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                <div style={{ flex: 1, minWidth: 220 }}>
                  <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{a.title}</span>
                    <StatusBadge status={a.status} map={ANNOUNCEMENT_STATUS} />
                  </div>
                  <p style={{ fontSize: 13.5, color: 'var(--text-muted)', margin: '4px 0 8px' }}>{a.body}</p>
                  <div style={{ fontSize: 12, color: 'var(--text-soft)' }}>
                    {a.audience} · {a.hackathon}{a.publishedOn ? ` · ${formatRelativeTime(a.publishedOn)}` : ''}
                  </div>
                </div>
                <div className="d-flex gap-2">
                  {a.status !== 'Published' && (
                    <button className="btn-outline-soft" style={{ padding: '7px 12px', fontSize: 12.5 }} onClick={() => handlePublish(a.id)}>
                      <MdOutlineSend size={14} /> Publish
                    </button>
                  )}
                  <button className="btn-outline-soft" style={{ padding: '7px 10px' }} onClick={() => handleDelete(a.id)} aria-label="Delete">
                    <MdOutlineDeleteOutline size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title="Create Announcement"
        size="lg"
        footer={<>
          <button className="btn-outline-soft" onClick={closeModal}>Cancel</button>
          <button className="btn-primary-soft" form="create-announcement-form" type="submit">Save as Draft</button>
        </>}
      >
        <form id="create-announcement-form" onSubmit={handleCreate} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label-sm">Title</label>
            <input className="input-soft" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Submission deadline reminder" />
          </div>
          <div>
            <label className="form-label-sm">Message</label>
            <textarea className="input-soft" rows={4} required value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Write your announcement..." />
          </div>
          <div className="row g-3">
            <div className="col-6">
              <label className="form-label-sm">Audience</label>
              <select className="input-soft" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })}>
                <option>All Participants</option>
                <option>Judges & Participants</option>
                <option>Teams</option>
                <option>Judges Only</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label-sm">Hackathon</label>
              <input className="input-soft" value={form.hackathon} onChange={(e) => setForm({ ...form, hackathon: e.target.value })} placeholder="e.g. Code the Future 2025" />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
