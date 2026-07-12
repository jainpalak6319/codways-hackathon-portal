import React, { useState } from 'react';
import { 
  MapPin, Mail, Globe, GitBranch, Link as LinkIcon, Briefcase, 
  GraduationCap, Edit2, Camera, Check, Award, Code
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    role: "Full-Stack Developer",
    location: "Haryana, India",
    email: "alex.j@example.com",
    bio: "Passionate builder and Generative AI enthusiast. I specialize in the MERN stack and love creating gamified educational platforms. Always looking for the next big hackathon to test my limits.",
    skills: ["React.js", "Node.js", "MongoDB", "Express", "WebRTC", "Three.js", "Python"],
    education: {
      degree: "B.Tech Computer Science Engineering",
      college: "Geeta University",
      year: "2023 - 2027"
    },
    socials: {
      github: "github.com/alexj",
      linkedin: "linkedin.com/in/alexj",
      portfolio: "alexbuilds.dev"
    }
  });

  const handleSave = () => setIsEditing(false);

  return (
    <>
      <style>
        {`
          .profile-page { background-color: #f8fafc; min-height: 100vh; padding-bottom: 3rem; }
          .card-custom { border-radius: 2rem; border: 1px solid #e2e8f0; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
          .banner-gradient { height: 8rem; background: linear-gradient(to right, #2563eb, #14b8a6); position: relative; }
          .avatar-container { width: 112px; height: 112px; background: #fff; padding: 6px; border-radius: 50%; margin-top: -56px; margin-bottom: 1rem; position: relative; z-index: 1; }
          .edit-input { border: none; border-bottom: 1px solid #cbd5e1; background: transparent; width: 100%; text-align: center; }
          .edit-input:focus { outline: none; border-color: #3b82f6; }
          .skill-pill { background: #f8fafc; border: 1px solid #e2e8f0; font-weight: 700; padding: 0.5rem 1rem; border-radius: 0.75rem; font-size: 0.875rem; transition: 0.2s; }
          .skill-pill:hover { border-color: #bfdbfe; color: #2563eb; }
          .stat-card { background: linear-gradient(135deg, #0f172a, #1e3a8a); color: #fff; border-radius: 2rem; padding: 2rem; }
        `}
      </style>

      <div className="container-xl py-4 py-md-5 profile-page">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h1 className="fw-black text-dark mb-1">My Profile</h1>
            <p className="text-muted m-0">Manage your personal details and public developer portfolio.</p>
          </div>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`btn px-4 py-2 fw-bold d-flex align-items-center gap-2 ${isEditing ? 'btn-success' : 'btn-outline-secondary'}`}
          >
            {isEditing ? <><Check size={16} /> Save</> : <><Edit2 size={16} /> Edit</>}
          </button>
        </div>

        <div className="row g-4">
          {/* Left Column */}
          <div className="col-12 col-lg-4">
            <div className="card-custom overflow-hidden mb-4">
              <div className="banner-gradient"></div>
              <div className="d-flex flex-column align-items-center px-4 pb-4 text-center">
                <div className="avatar-container">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="rounded-circle w-100 h-100 object-fit-cover" />
                </div>
                
                {isEditing ? (
                  <div className="w-100">
                    <input className="edit-input h4 fw-bold" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                    <input className="edit-input text-primary fw-bold small" value={profile.role} onChange={(e) => setProfile({...profile, role: e.target.value})} />
                  </div>
                ) : (
                  <>
                    <h2 className="h4 fw-black m-0">{profile.name}</h2>
                    <p className="text-primary fw-bold text-uppercase small mt-1">{profile.role}</p>
                  </>
                )}
                
                <div className="w-100 mt-4 pt-4 border-top text-start">
                  <p className="d-flex align-items-center gap-2 small text-muted mb-3"><MapPin size={18}/> {isEditing ? <input className="edit-input text-start" value={profile.location} onChange={(e) => setProfile({...profile, location: e.target.value})}/> : profile.location}</p>
                  <p className="d-flex align-items-center gap-2 small text-muted"><Mail size={18}/> {isEditing ? <input className="edit-input text-start" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})}/> : profile.email}</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="card-custom p-4">
              <h5 className="fw-bold mb-4">Social Links</h5>
              <div className="d-flex flex-column gap-3">
                {[ { icon: GitBranch, label: 'GitHub', val: 'github' }, { icon: LinkIcon, label: 'LinkedIn', val: 'linkedin' }, { icon: Globe, label: 'Portfolio', val: 'portfolio' } ].map(s => (
                  <div key={s.label} className="d-flex align-items-center gap-3">
                    <div className="bg-light p-2 rounded-3 text-muted"><s.icon size={20} /></div>
                    <div className="flex-grow-1">
                      <small className="d-block text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>{s.label}</small>
                      {isEditing ? <input className="edit-input text-start small fw-bold" value={profile.socials[s.val]} onChange={(e) => setProfile({...profile, socials: {...profile.socials, [s.val]: e.target.value}})} /> : <small className="fw-bold">{profile.socials[s.val]}</small>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-12 col-lg-8">
            <div className="card-custom p-4 p-md-5 mb-4">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2"><Briefcase size={20} className="text-primary"/> About Me</h5>
              {isEditing ? <textarea className="form-control" rows="4" value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} /> : <p className="text-muted lh-lg">{profile.bio}</p>}
            </div>

            <div className="card-custom p-4 p-md-5 mb-4">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2"><Code size={20} className="text-info"/> Tech Stack</h5>
              {isEditing ? <input className="form-control" value={profile.skills.join(', ')} onChange={(e) => setProfile({...profile, skills: e.target.value.split(',').map(s => s.trim())})} /> : <div className="d-flex flex-wrap gap-2">{profile.skills.map(s => <span key={s} className="skill-pill">{s}</span>)}</div>}
            </div>

            <div className="row g-4">
              <div className="col-12 col-md-6">
                <div className="card-custom p-4 h-100">
                  <h5 className="fw-bold mb-3 d-flex align-items-center gap-2"><GraduationCap size={20} className="text-purple"/> Education</h5>
                  {isEditing ? <div className="d-flex flex-column gap-2"><input className="edit-input" value={profile.education.degree} onChange={(e) => setProfile({...profile, education: {...profile.education, degree: e.target.value}})}/> <input className="edit-input" value={profile.education.college} onChange={(e) => setProfile({...profile, education: {...profile.education, college: e.target.value}})}/></div> : <><p className="fw-bold m-0">{profile.education.degree}</p><p className="text-muted small">{profile.education.college}</p><small className="text-muted fw-bold">{profile.education.year}</small></>}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="stat-card h-100 d-flex flex-column justify-content-center">
                  <h5 className="fw-bold mb-3">Hackathon Stats</h5>
                  <div className="d-flex align-items-end gap-3 mb-2"><span className="display-6 fw-black text-warning">3</span> <span className="small">Events Participated</span></div>
                  <div className="d-flex align-items-end gap-3"><span className="display-6 fw-black text-success">1</span> <span className="small">Hackathons Won</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;