import { useEffect, useMemo, useState } from 'react';
import { MdAdd, MdOutlineViewList, MdOutlineGridView, MdOutlineFilterList, MdDelete } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/admin/common/SearchBar';
import StatusBadge from '../../components/admin/common/StatusBadge';
import Loader from '../../components/admin/common/Loader';
import EmptyState from '../../components/admin/common/EmptyState';
import Modal from '../../components/admin/common/Modal';
import Pagination from '../../components/admin/common/Pagination';
import HackathonTable from '../../components/admin/tables/HackathonTable';
import { usePagination } from '../../hooks/admin/usePagination';
import { getHackathons, createHackathon, updateHackathon, deleteHackathon } from '../../services/hackathonAPI';
import { HACKATHON_STATUS } from '../../constants/admin/statusColors';
import { formatDateRange } from '../../utils/admin/formatDate';
import './Hackathons.css';

const STATUS_FILTERS = ['All', 'Upcoming', 'Draft', 'In Progress', 'Completed', 'Cancelled'];

const EMPTY_FORM = {
  name: '', startDate: '', endDate: '', registrationDeadline: '',
  mode: 'Online', location: '', prize: '', teamSize: '', tags: '',
  overview: '', objectives: '',
  benefits: [''],
  stages: [{ title: '', date: '', description: '' }],
  organizers: [{ name: '', role: '', email: '' }]
};

export default function Hackathons() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [view, setView] = useState('grid');
  const [modalOpen, setModalOpen] = useState(searchParams.get('new') === '1');

  // Tracks whether we're editing an existing hackathon (holds its id) or creating a new one (null)
  const [editingId, setEditingId] = useState(null);

  // DYNAMIC FORM STATE
  const [form, setForm] = useState({ ...EMPTY_FORM });

  useEffect(() => {
    getHackathons().then((data) => { setHackathons(data); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return hackathons.filter((h) => {
      const matchSearch = h.name?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === 'All' || h.status === status;
      return matchSearch && matchStatus;
    });
  }, [hackathons, search, status]);

  const { page, setPage, totalPages, paginated, totalItems, pageSize } = usePagination(filtered, 8);

  // --- DYNAMIC FIELD HANDLERS ---
  const updateArrayField = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };
  const addArrayField = (field, emptyValue) => {
    setForm({ ...form, [field]: [...form[field], emptyValue] });
  };
  const removeArrayField = (field, index) => {
    const updated = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: updated });
  };

  const closeModal = () => {
    setModalOpen(false);
    setSearchParams({});
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
  };

  // Pre-fill the form with an existing hackathon's data and open the modal in edit mode
  const handleEditClick = (h) => {
    setEditingId(h.id || h._id);
    setForm({
      name: h.name || '',
      startDate: h.startDate || '',
      endDate: h.endDate || '',
      registrationDeadline: h.registrationDeadline || '',
      mode: h.mode || 'Online',
      location: h.location || '',
      prize: h.prize || '',
      teamSize: h.teamSize || '',
      tags: Array.isArray(h.tags) ? h.tags.join(', ') : (h.tags || ''),
      overview: h.overview || '',
      objectives: Array.isArray(h.objectives) ? h.objectives.join(', ') : (h.objectives || ''),
      benefits: h.benefits && h.benefits.length ? h.benefits : [''],
      stages: h.stages && h.stages.length ? h.stages : [{ title: '', date: '', description: '' }],
      organizers: h.organizers && h.organizers.length ? h.organizers : [{ name: '', role: '', email: '' }]
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
      objectives: form.objectives ? form.objectives.split(',').map(o => o.trim()) : [],
      benefits: form.benefits.filter(b => b.trim() !== ''), // Remove empty benefits
      stages: form.stages.filter(s => s.title.trim() !== ''), // Remove empty stages
      organizers: form.organizers.filter(o => o.name.trim() !== ''), // Remove empty organizers
    };

    if (editingId) {
      // EDIT MODE: update the existing hackathon
      const updated = await updateHackathon(editingId, payload);
      setHackathons((prev) => prev.map((h) => (h.id === editingId || h._id === editingId) ? { ...h, ...updated } : h));
    } else {
      // CREATE MODE
      const created = await createHackathon({
        ...payload,
        banner: '🎯',
        color: '#2563EB',
        participants: 0,
        submissions: 0,
        status: 'Upcoming'
      });
      setHackathons((prev) => [created, ...prev]);
    }

    closeModal();
  };

  const handleDelete = async (id) => {
    await deleteHackathon(id);
    setHackathons((prev) => prev.filter((h) => h.id !== id && h._id !== id));
  };

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
            <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><MdOutlineViewList /></button>
            <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}><MdOutlineGridView /></button>
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
            <HackathonTable hackathons={paginated} onDelete={handleDelete} onEdit={handleEditClick} />
            <Pagination page={page} totalPages={totalPages} onChange={setPage} totalItems={totalItems} pageSize={pageSize} />
          </>
        ) : (
          <>
            <div className="dd-hk-grid">
              {paginated.map((h) => (
                <div key={h.id || h._id} className="dd-hk-card">
                  <div className="dd-hk-card-banner" style={{ background: `${h.color}1A` }}>{h.banner}</div>
                  <div className="dd-hk-card-body">
                    <div className="d-flex justify-content-between align-items-start gap-2">
                      <span className="dd-hk-card-title">{h.name}</span>
                      <StatusBadge status={h.status} map={HACKATHON_STATUS} />
                    </div>
                    <div className="dd-hk-card-meta">
                      <span>{formatDateRange(h.startDate, h.endDate)}</span>
                    </div>
                    <div className="d-flex gap-2 mt-1">
                      <button className="btn-outline-soft flex-fill" style={{ fontSize: 12.5, padding: '7px 10px' }} onClick={() => handleEditClick(h)}>Edit</button>
                      <button className="btn-outline-soft flex-fill" style={{ fontSize: 12.5, padding: '7px 10px' }} onClick={() => handleDelete(h.id || h._id)}>Delete</button>
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
        title={editingId ? 'Edit Hackathon' : 'Create Hackathon'}
        footer={
          <>
            <button className="btn-outline-soft" onClick={closeModal}>Cancel</button>
            <button className="btn-primary-soft" form="create-hackathon-form" type="submit">{editingId ? 'Save Changes' : 'Create Hackathon'}</button>
          </>
        }
      >
        <form id="create-hackathon-form" onSubmit={handleSubmit} className="d-flex flex-column gap-3" style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: '5px' }}>
          
          <h6 className="fw-bold mb-0 mt-2 border-bottom pb-2">Basic Info</h6>
          <input className="input-soft" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Hackathon Name" />
          
          <div className="row g-2">
            <div className="col-4"><input type="date" className="input-soft" required title="Deadline" value={form.registrationDeadline} onChange={(e) => setForm({ ...form, registrationDeadline: e.target.value })} /></div>
            <div className="col-4"><input type="date" className="input-soft" required title="Start" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></div>
            <div className="col-4"><input type="date" className="input-soft" required title="End" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} /></div>
          </div>
          
          <div className="row g-2">
            <div className="col-6">
              <select className="input-soft" value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
                <option>Online</option><option>Onsite</option><option>Hybrid</option>
              </select>
            </div>
            <div className="col-6"><input className="input-soft" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" /></div>
          </div>

          <div className="row g-2">
            <div className="col-6"><input className="input-soft" required value={form.prize} onChange={(e) => setForm({ ...form, prize: e.target.value })} placeholder="Prize Pool (e.g. ₹50,000)" /></div>
            <div className="col-6"><input className="input-soft" required value={form.teamSize} onChange={(e) => setForm({ ...form, teamSize: e.target.value })} placeholder="Team Size (e.g. 1-4)" /></div>
          </div>

          <input className="input-soft" required value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Tags (Comma separated)" />

          <h6 className="fw-bold mb-0 mt-4 border-bottom pb-2">Details</h6>
          <textarea
            className="input-soft"
            rows="3"
            required
            value={form.overview}
            onChange={(e) => setForm({ ...form, overview: e.target.value })}
            placeholder="Overview Description"
            style={{ paddingTop: '10px', paddingBottom: '10px', lineHeight: 1.5, resize: 'vertical', minHeight: '72px' }}
          ></textarea>
          <textarea
            className="input-soft"
            rows="3"
            value={form.objectives}
            onChange={(e) => setForm({ ...form, objectives: e.target.value })}
            placeholder="Objectives (Comma separated)"
            style={{ paddingTop: '10px', paddingBottom: '10px', lineHeight: 1.5, resize: 'vertical', minHeight: '72px' }}
          ></textarea>

          {/* DYNAMIC BENEFITS (MAX 4) */}
          <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label-sm fw-bold mb-0">Benefits & Prizes (Max 4)</label>
              <button type="button" className="btn btn-sm btn-outline-primary py-0 px-2" onClick={() => addArrayField('benefits', '')} disabled={form.benefits.length >= 4}>+ Add</button>
            </div>
            {form.benefits.map((benefit, i) => (
              <div key={i} className="d-flex gap-2 mb-2">
                <input className="input-soft flex-grow-1" value={benefit} onChange={(e) => updateArrayField('benefits', i, e.target.value)} placeholder={`Benefit ${i + 1}`} />
                {form.benefits.length > 1 && <button type="button" className="btn btn-sm btn-outline-danger px-2" onClick={() => removeArrayField('benefits', i)}><MdDelete /></button>}
              </div>
            ))}
          </div>

          {/* DYNAMIC STAGES */}
          <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label-sm fw-bold mb-0">Stages / Rounds</label>
              <button type="button" className="btn btn-sm btn-outline-primary py-0 px-2" onClick={() => addArrayField('stages', { title: '', date: '', description: '' })}>+ Add Round</button>
            </div>
            {form.stages.map((stage, i) => (
              <div key={i} className="border rounded-3 p-3 mb-2 bg-light">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold" style={{ fontSize: '13px' }}>Round {i + 1}</span>
                  {form.stages.length > 1 && <button type="button" className="btn btn-sm text-danger p-0 border-0 bg-transparent" onClick={() => removeArrayField('stages', i)}><MdDelete size={18} /></button>}
                </div>
                <div className="row g-2 mb-2">
                  <div className="col-7"><input className="input-soft" placeholder="Title (e.g. Ideation Phase)" value={stage.title} onChange={(e) => { const updated = [...form.stages]; updated[i].title = e.target.value; setForm({...form, stages: updated}); }} /></div>
                  <div className="col-5"><input className="input-soft" placeholder="Date/Duration" value={stage.date} onChange={(e) => { const updated = [...form.stages]; updated[i].date = e.target.value; setForm({...form, stages: updated}); }} /></div>
                </div>
                <textarea className="input-soft" rows="2" placeholder="Description of this round" value={stage.description} onChange={(e) => { const updated = [...form.stages]; updated[i].description = e.target.value; setForm({...form, stages: updated}); }}></textarea>
              </div>
            ))}
          </div>

          {/* DYNAMIC ORGANIZERS */}
          <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label-sm fw-bold mb-0">Contact Organizers</label>
              <button type="button" className="btn btn-sm btn-outline-primary py-0 px-2" onClick={() => addArrayField('organizers', { name: '', role: '', email: '' })}>+ Add</button>
            </div>
            {form.organizers.map((org, i) => (
              <div key={i} className="border rounded-3 p-3 mb-2 bg-light">
                 <div className="d-flex justify-content-end mb-1">
                  {form.organizers.length > 1 && <button type="button" className="btn btn-sm text-danger p-0 border-0 bg-transparent" onClick={() => removeArrayField('organizers', i)}><MdDelete size={18} /></button>}
                </div>
                <div className="row g-2 mb-2">
                  <div className="col-6"><input className="input-soft" placeholder="Name" value={org.name} onChange={(e) => { const updated = [...form.organizers]; updated[i].name = e.target.value; setForm({...form, organizers: updated}); }} /></div>
                  <div className="col-6"><input className="input-soft" placeholder="Role (e.g. Coordinator)" value={org.role} onChange={(e) => { const updated = [...form.organizers]; updated[i].role = e.target.value; setForm({...form, organizers: updated}); }} /></div>
                </div>
                <input className="input-soft" type="email" placeholder="Email Address" value={org.email} onChange={(e) => { const updated = [...form.organizers]; updated[i].email = e.target.value; setForm({...form, organizers: updated}); }} />
              </div>
            ))}
          </div>

        </form>
      </Modal>
    </div>
  );
} 