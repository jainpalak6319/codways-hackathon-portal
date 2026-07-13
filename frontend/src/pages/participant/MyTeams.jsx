


import React, { useState, useEffect } from 'react';
import { Users, ShieldAlert, Loader2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyTeams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  if (isLoading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
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
              <div 
                className="card h-100 border rounded-4 p-4 shadow-sm cursor-pointer" 
                onClick={() => navigate(`/participant/team/${team._id}`)} 
                style={{ transition: '0.3s' }}
              >
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <span className={`badge ${team.status === 'Complete' || isFull ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                    {team.status === 'Complete' || isFull ? 'Team Complete' : 'Recruiting'}
                  </span>
                  {isLeader && <span className="badge bg-primary-subtle text-primary">Team Leader</span>}
                </div>
                
                <p className="text-uppercase fw-bold text-muted small mb-1">{team.hackathonName || "Unknown Hackathon"}</p>
                <h2 className="h5 fw-bold mb-4">{team.name}</h2>
                
                <div className="mb-4 text-muted small">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Users size={16} /> Members: {team.members.length} / {team.maxSize}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <ShieldAlert size={16} /> Invite Code: <span className="fw-bold text-dark">{team.inviteCode}</span>
                  </div>
                </div>
                
                <button 
                  className="btn btn-outline-dark w-100 rounded-3 mt-auto"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents click event from bubbling up to the card
                    navigate(`/participant/team/${team._id}`);
                  }}
                >
                  Open Workspace
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyTeams;
