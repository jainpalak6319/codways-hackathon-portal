import { useEffect, useState } from 'react';
import { MdAdd, MdCheck } from 'react-icons/md';
import Loader from "../../components/admin/common/Loader";
import { getRoles, getPermissionModules } from '../../services/userAPI';
import './Roles.css';

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);
  const [grid, setGrid] = useState({});

  useEffect(() => {
    Promise.all([getRoles(), getPermissionModules()]).then(([r, m]) => {
      setRoles(r);
      setModules(m);
      setSelectedRole(r[0]?.id);
      // seed a simple demo permission grid
      const seeded = {};
      r.forEach((role) => {
        seeded[role.id] = {};
        m.forEach((mod) => {
          seeded[role.id][mod.module] = role.name === 'Super Admin' ? mod.actions : mod.actions.slice(0, role.name === 'Judge' ? 1 : 2);
        });
      });
      setGrid(seeded);
      setLoading(false);
    });
  }, []);

  const toggle = (mod, action) => {
    if (!selectedRole) return;
    setGrid((prev) => {
      const current = prev[selectedRole]?.[mod] || [];
      const has = current.includes(action);
      const updated = has ? current.filter((a) => a !== action) : [...current, action];
      return { ...prev, [selectedRole]: { ...prev[selectedRole], [mod]: updated } };
    });
  };

  if (loading) return <Loader fullHeight label="Loading roles..." />;

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Roles & Permissions</h1>
          <p className="page-subtitle mb-0">Control what each role can see and do across DevDash.</p>
        </div>
        <button className="btn-primary-soft"><MdAdd size={18} /> Create Role</button>
      </div>

      <div className="row g-3 mb-3">
        {roles.map((r) => (
          <div key={r.id} className="col-6 col-lg-3">
            <div
              className="dd-role-card"
              style={{ cursor: 'pointer', borderColor: selectedRole === r.id ? 'var(--sidebar-active)' : 'var(--border)', borderWidth: selectedRole === r.id ? 2 : 1 }}
              onClick={() => setSelectedRole(r.id)}
              role="button"
            >
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>{r.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', margin: '6px 0 10px' }}>{r.description}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sidebar-active)' }}>{r.users.toLocaleString()} users</div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-card">
        <div className="section-card-header">
          <span className="section-card-title">Permissions — {roles.find((r) => r.id === selectedRole)?.name}</span>
        </div>
        <div className="scroll-x">
          <table className="dd-table dd-perm-table">
            <thead>
              <tr>
                <th>Module</th><th>View</th><th>Create</th><th>Edit</th><th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((m) => (
                <tr key={m.module}>
                  <td style={{ fontWeight: 600 }}>{m.module}</td>
                  {['view', 'create', 'edit', 'delete'].map((action) => {
                    const applicable = m.actions.includes(action) || m.actions.some((a) => a === action) || (action === 'view' && true);
                    const has = m.actions.includes(action);
                    const on = grid[selectedRole]?.[m.module]?.includes(action);
                    return (
                      <td key={action}>
                        {has ? (
                          <span className={`dd-perm-check${on ? ' on' : ''}`} onClick={() => toggle(m.module, action)} role="checkbox" aria-checked={on}>
                            {on && <MdCheck size={13} />}
                          </span>
                        ) : <span style={{ color: 'var(--text-soft)' }}>—</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
