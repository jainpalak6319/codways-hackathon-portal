import { useEffect, useMemo, useState } from 'react';
import { MdAdd, MdOutlineViewList, MdOutlineGridView, MdOutlineFilterList } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/admin/common/SearchBar';
import StatusBadge from '../../components/admin/common/StatusBadge';
import Loader from '../../components/admin/common/Loader';
import EmptyState from '../../components/admin/common/EmptyState';
import Modal from '../../components/admin/common/Modal';
import Pagination from '../../components/admin/common/Pagination';
import HackathonTable from '../../components/admin/tables/HackathonTable';
import { usePagination } from '../../hooks/admin/usePagination';
import { getHackathons, createHackathon, deleteHackathon } from '../../services/hackathonAPI';
import { HACKATHON_STATUS } from '../../constants/admin/statusColors';
import { formatDateRange } from '../../utils/admin/formatDate';
import './Hackathons.css';

const STATUS_FILTERS = ['All', 'Upcoming', 'Draft', 'In Progress', 'Completed', 'Cancelled'];

export default function Hackathons() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [view, setView] = useState('grid');
  const [modalOpen, setModalOpen] = useState(searchParams.get('new') === '1');
  const [form, setForm] = useState({ name: '', startDate: '', endDate: '', mode: 'Online', location: '' });

  useEffect(() => {
    getHackathons().then((data) => { setHackathons(data); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return hackathons.filter((h) => {
      const matchSearch = h.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === 'All' || h.status === status;
      return matchSearch && matchStatus;
    });
  }, [hackathons, search, status]);

  const { page, setPage, totalPages, paginated, totalItems, pageSize } = usePagination(filtered, 8);

  const handleCreate = async (e) => {
    e.preventDefault();
    const created = await createHackathon({ ...form, banner: '🎯', color: '#2563EB', participants: 0, submissions: 0, status: 'Draft' });
    setHackathons((prev) => [created, ...prev]);
    setModalOpen(false);
    setSearchParams({});
    setForm({ name: '', startDate: '', endDate: '', mode: 'Online', location: '' });
  };

  const handleDelete = async (id) => {
    await deleteHackathon(id);
    setHackathons((prev) => prev.filter((h) => h.id !== id));
  };

  const closeModal = () => { setModalOpen(false); setSearchParams({}); };

  if (loading) return <Loader fullHeight label="Loading hackathons..." />;

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Hackathons</h1>
          <p className="page-subtitle mb-0">Create, manage and track every hackathon on the platform.</p>
        </div>
        <button className="btn-primary-soft" onClick={() => setModalOpen(true)}>
          <MdAdd size={18} /> Create Hackathon
        </button>
      </div>

      <div className="section-card mb-3">
        <div className="d-flex flex-column flex-md-row gap-3 align-items-md-center justify-content-between mb-3">
          <div style={{ maxWidth: 340, width: '100%' }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search hackathons..." />
          </div>
          <div className="dd-view-toggle">
            <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="List view"><MdOutlineViewList /></button>
            <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-label="Grid view"><MdOutlineGridView /></button>
          </div>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <MdOutlineFilterList size={20} color="var(--text-soft)" style={{ marginTop: 6 }} />
          {STATUS_FILTERS.map((s) => (
            <button key={s} className={`dd-filter-chip${status === s ? ' active' : ''}`} onClick={() => setStatus(s)}>{s}</button>
          ))}
        </div>
      </div>

      <div className="section-card">
        {!filtered.length ? (
          <EmptyState title="No hackathons found" subtitle="Try adjusting your search or filters." />
        ) : view === 'list' ? (
          <>
            <HackathonTable hackathons={paginated} onDelete={handleDelete} />
            <Pagination page={page} totalPages={totalPages} onChange={setPage} totalItems={totalItems} pageSize={pageSize} />
          </>
        ) : (
          <>
            <div className="dd-hk-grid">
              {paginated.map((h) => (
                <div key={h.id} className="dd-hk-card">
                  <div className="dd-hk-card-banner" style={{ background: `${h.color}1A` }}>{h.banner}</div>
                  <div className="dd-hk-card-body">
                    <div className="d-flex justify-content-between align-items-start gap-2">
                      <span className="dd-hk-card-title">{h.name}</span>
                      <StatusBadge status={h.status} map={HACKATHON_STATUS} />
                    </div>
                    <div className="dd-hk-card-meta">
                      <span>{formatDateRange(h.startDate, h.endDate)}</span>
                    </div>
                    <div className="dd-hk-card-meta">
                      <span>{h.participants} Participants</span>
                      <span>{h.submissions} Submissions</span>
                    </div>
                    <div className="d-flex gap-2 mt-1">
                      <button className="btn-outline-soft flex-fill" style={{ fontSize: 12.5, padding: '7px 10px' }}>View</button>
                      <button className="btn-outline-soft flex-fill" style={{ fontSize: 12.5, padding: '7px 10px' }} onClick={() => handleDelete(h.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} totalItems={totalItems} pageSize={pageSize} />
          </>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title="Create Hackathon"
        footer={
          <>
            <button className="btn-outline-soft" onClick={closeModal}>Cancel</button>
            <button className="btn-primary-soft" form="create-hackathon-form" type="submit">Create Hackathon</button>
          </>
        }
      >
        <form id="create-hackathon-form" onSubmit={handleCreate} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label-sm">Hackathon Name</label>
            <input className="input-soft" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Code the Future 2026" />
          </div>
          <div className="row g-3">
            <div className="col-6">
              <label className="form-label-sm">Start Date</label>
              <input type="date" className="input-soft" required value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            </div>
            <div className="col-6">
              <label className="form-label-sm">End Date</label>
              <input type="date" className="input-soft" required value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </div>
          </div>
          <div className="row g-3">
            <div className="col-6">
              <label className="form-label-sm">Mode</label>
              <select className="input-soft" value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
                <option>Online</option>
                <option>Onsite</option>
                <option>Hybrid</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label-sm">Location</label>
              <input className="input-soft" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Remote / City" />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
