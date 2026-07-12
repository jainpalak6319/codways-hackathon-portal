import { useState } from 'react';
import Avatar from "../../components/admin/common/Avatar";
import { useSelector } from "react-redux";
import './Settings.css';

const TABS = ['Profile', 'General', 'Notifications', 'Security'];

function Toggle({ on, onClick, label }) {
  return (
    <button className={`dd-toggle${on ? ' on' : ''}`} onClick={onClick} role="switch" aria-checked={on} aria-label={label}>
      <span className="knob" />
    </button>
  );
}

export default function Settings() {
  const { user } = useSelector((state) => state.auth);
  const [tab, setTab] = useState('Profile');
  const [toggles, setToggles] = useState({
    emailNotif: true, submissionAlerts: true, weeklyDigest: false,
    darkMode: false, publicProfile: true, twoFactor: false,
  });
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '' });

  const setToggle = (key) => setToggles((t) => ({ ...t, [key]: !t[key] }));

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle mb-0">Manage your profile, preferences and platform configuration.</p>
        </div>
      </div>

      <div className="dd-settings-tabs">
        {TABS.map((t) => (
          <div key={t} className={`dd-settings-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)} role="tab" aria-selected={tab === t}>
            {t}
          </div>
        ))}
      </div>

      <div className="section-card" style={{ maxWidth: 640 }}>
        {tab === 'Profile' && (
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-3 mb-2">
              <Avatar name={profile.name} size={64} />
              <div>
                <button className="btn-outline-soft" style={{ fontSize: 12.5, padding: '7px 12px' }}>Change Photo</button>
              </div>
            </div>
            <div>
              <label className="form-label-sm">Full Name</label>
              <input className="input-soft" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div>
              <label className="form-label-sm">Email Address</label>
              <input className="input-soft" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </div>
            <div>
              <label className="form-label-sm">Role</label>
              <input className="input-soft" value={user?.role || ''} disabled style={{ background: 'var(--bg)', color: 'var(--text-muted)' }} />
            </div>
            <button className="btn-primary-soft align-self-start">Save Changes</button>
          </div>
        )}

        {tab === 'General' && (
          <div>
            <div className="dd-settings-row">
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Dark Mode</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>Switch the interface to a darker theme</div>
              </div>
              <Toggle on={toggles.darkMode} onClick={() => setToggle('darkMode')} label="Dark mode" />
            </div>
            <div className="dd-settings-row">
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Public Profile</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>Make your admin profile visible to judges</div>
              </div>
              <Toggle on={toggles.publicProfile} onClick={() => setToggle('publicProfile')} label="Public profile" />
            </div>
          </div>
        )}

        {tab === 'Notifications' && (
          <div>
            <div className="dd-settings-row">
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Email Notifications</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>Receive updates about hackathon activity</div>
              </div>
              <Toggle on={toggles.emailNotif} onClick={() => setToggle('emailNotif')} label="Email notifications" />
            </div>
            <div className="dd-settings-row">
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Submission Alerts</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>Get notified instantly on new submissions</div>
              </div>
              <Toggle on={toggles.submissionAlerts} onClick={() => setToggle('submissionAlerts')} label="Submission alerts" />
            </div>
            <div className="dd-settings-row">
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Weekly Digest</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>Summary email every Monday morning</div>
              </div>
              <Toggle on={toggles.weeklyDigest} onClick={() => setToggle('weeklyDigest')} label="Weekly digest" />
            </div>
          </div>
        )}

        {tab === 'Security' && (
          <div>
            <div className="dd-settings-row">
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Two-Factor Authentication</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>Add an extra layer of security to your account</div>
              </div>
              <Toggle on={toggles.twoFactor} onClick={() => setToggle('twoFactor')} label="Two factor authentication" />
            </div>
            <div className="pt-3">
              <label className="form-label-sm">Change Password</label>
              <input type="password" className="input-soft mb-2" placeholder="Current password" />
              <input type="password" className="input-soft mb-2" placeholder="New password" />
              <button className="btn-primary-soft mt-2">Update Password</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
