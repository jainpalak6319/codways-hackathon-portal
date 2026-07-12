import React, { useState, useEffect } from 'react';
import { Users, Link as LinkIcon, Copy, CheckCircle, UserPlus, Code, Trophy, Loader2, Search, ArrowRight, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyTeams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchAllTeams = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/team/user/${userId}`);
        if (response.data.hasTeams) {
          setTeams(response.data.teams);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllTeams();
  }, [userId]);

  const handleCopyLink = () => {
    if (selectedTeam) {
      navigator.clipboard.writeText(`https://codeways.com/join/${selectedTeam.inviteCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const InviteModal = () => (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(10, 18, 32, 0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 p-4 shadow-lg">
          <div className="modal-body text-center p-4">
            <h3 className="h4 fw-black text-dark mb-2">Invite Teammates</h3>
            <p className="text-muted mb-4 small fw-medium">Share this code or link with your friends to fill this slot.</p>
            <div className="bg-light p-3 rounded-3 border mb-4">
              <p className="h3 font-monospace fw-black text-primary m-0" style={{ letterSpacing: '0.2em' }}>{selectedTeam?.inviteCode}</p>
            </div>
            <div className="d-grid gap-2">
              <button onClick={handleCopyLink} className="btn btn-primary fw-bold py-2 d-flex align-items-center justify-content-center gap-2">
                {copied ? <CheckCircle size={18} /> : <Copy size={18} />} {copied ? 'Copied' : 'Copy Code'}
              </button>
              <button onClick={() => setShowInviteModal(false)} className="btn btn-link text-muted fw-bold text-decoration-none">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <div className="d-flex vh-100 justify-content-center align-items-center"><Loader2 className="animate-spin text-primary" size={40} /></div>;
  }

  // --- EMPTY STATE ---
  if (teams.length === 0) {
    return (
      <div className="container py-5">
        <div className="bg-white rounded-4 p-5 p-md-5 border shadow-sm text-center mx-auto" style={{ maxWidth: '680px' }}>
          <div className="d-flex align-items-center justify-content-center mx-auto mb-4 rounded-circle" style={{ width: '96px', height: '96px', backgroundColor: 'rgba(0,194,178,0.1)', color: '#00C2B2' }}>
            <Users size={48} strokeWidth={1.5} />
          </div>
          <h2 className="fw-black mb-3">You haven't joined any hackathons yet</h2>
          <p className="text-muted mb-4 fs-5">Explore upcoming hackathons, form a team, and start building!</p>
          <button onClick={() => navigate('/participant/explorer')} className="btn btn-primary btn-lg rounded-3 fw-bold d-inline-flex align-items-center gap-2">
            <Search size={20} /> Explore Hackathons
          </button>
        </div>
      </div>
    );
  }

  // --- GRID VIEW ---
  if (!selectedTeam) {
    return (
      <div className="container py-4">
        <div className="mb-4">
          <h1 className="fw-bold mb-2">My Hackathons</h1>
          <p className="text-muted">Manage your teams and track your progress across all registered events.</p>
        </div>
        <div className="row g-4">
          {teams.map((team) => {
            const isLeader = team.leader === userId;
            const isFull = team.members.length === team.maxSize;
            return (
              <div key={team._id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border rounded-4 p-4 shadow-sm cursor-pointer" onClick={() => setSelectedTeam(team)} style={{ transition: '0.3s' }}>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <span className={`badge ${team.status === 'Complete' || isFull ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                      {team.status === 'Complete' || isFull ? 'Team Complete' : 'Recruiting'}
                    </span>
                    {isLeader && <span className="badge bg-primary-subtle text-primary">Team Leader</span>}
                  </div>
                  <p className="text-uppercase fw-bold text-muted small mb-1">{team.hackathonName || "Unknown Hackathon"}</p>
                  <h2 className="h5 fw-bold mb-4">{team.name}</h2>
                  <div className="mb-4 text-muted small">
                    <div className="d-flex align-items-center gap-2 mb-2"><Users size={16} /> Members: {team.members.length} / {team.maxSize}</div>
                    <div className="d-flex align-items-center gap-2"><ShieldAlert size={16} /> Invite Code: <span className="fw-bold text-dark">{team.inviteCode}</span></div>
                  </div>
                  <button className="btn btn-outline-dark w-100 rounded-3 mt-auto">Open Workspace</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- WORKSPACE VIEW ---
  return (
    <div className="container py-4">
      {showInviteModal && <InviteModal />}
      <button onClick={() => setSelectedTeam(null)} className="btn btn-link text-decoration-none mb-3 d-flex align-items-center gap-2 text-muted">
        <ArrowLeft size={20} /> Back to My Hackathons
      </button>

      <div className="card border-0 rounded-4 shadow-sm overflow-hidden">
        <div className="p-4 p-md-5 border-bottom bg-white d-flex flex-column flex-md-row justify-content-between align-items-start gap-4">
          <div>
            <p className="text-primary fw-bold text-uppercase small mb-1">{selectedTeam.hackathonName}</p>
            <h2 className="fw-black m-0">{selectedTeam.name} Workspace</h2>
          </div>
          <div className="input-group w-auto bg-light p-1 rounded-3 border">
            <span className="input-group-text bg-transparent border-0"><LinkIcon size={18} /></span>
            <input type="text" className="form-control bg-transparent border-0" readOnly value={`codeways.com/join/${selectedTeam.inviteCode}`} />
            <button onClick={handleCopyLink} className="btn btn-primary rounded-3 fw-bold">{copied ? 'Copied' : 'Copy'}</button>
          </div>
        </div>

        <div className="p-4 p-md-5 bg-light">
          <h4 className="fw-bold mb-4 d-flex align-items-center gap-2"><Users size={20} className="text-primary"/> Team Roster</h4>
          <div className="row g-3">
            {selectedTeam.members.map((member) => (
              <div key={member._id} className="col-12 col-md-6 col-lg-4">
                <div className="card border-0 p-3 rounded-4 shadow-sm d-flex flex-row align-items-center gap-3">
                  <div className="rounded-3 d-flex align-items-center justify-content-center bg-dark text-white fw-black" style={{ width: '48px', height: '48px' }}>{member.name.charAt(0)}</div>
                  <div>
                    <h6 className="fw-bold m-0">{member.name} {selectedTeam.leader === member._id && <span className="badge bg-warning text-dark ms-1">Leader</span>}</h6>
                    <small className="text-muted d-block">{member.participationType}</small>
                  </div>
                </div>
              </div>
            ))}
            {[...Array(selectedTeam.maxSize - selectedTeam.members.length)].map((_, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <button onClick={() => setShowInviteModal(true)} className="btn btn-outline-secondary w-100 h-100 rounded-4 border-dashed d-flex align-items-center p-3 gap-3">
                  <div className="rounded-3 border border-dashed d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}><UserPlus /></div>
                  <div className="text-start"><h6 className="m-0">Empty Slot</h6><small>Click to invite</small></div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeams;