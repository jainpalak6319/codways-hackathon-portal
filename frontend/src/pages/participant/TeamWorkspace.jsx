import React, { useState, useEffect } from 'react';
import { Users, Link as LinkIcon, Copy, CheckCircle, UserPlus, Code, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeamWorkspace = () => {
  const navigate = useNavigate();
  const [hasTeam, setHasTeam] = useState(false);
  const [teamData, setTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Fetch live data when the component loads
  useEffect(() => {
    const fetchTeamData = async () => {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        // If no user is found, force them to register/login
        setIsLoading(false);
        return; 
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/team/${userId}`);
        
        if (response.data.hasTeam) {
          setHasTeam(true);
          setTeamData(response.data.team);
        } else {
          setHasTeam(false);
        }
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const handleCopyLink = () => {
    if (teamData) {
      navigator.clipboard.writeText(`https://codeways.com/join/${teamData.inviteCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <Loader2 className="animate-spin text-electric" size={40} />
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          /* Custom Color Palette mapped from Tailwind config */
          .text-navy { color: #1e293b; }
          .bg-navy { background-color: #1e293b; color: #ffffff; }
          .text-electric { color: #3b82f6; }
          .bg-electric { background-color: #3b82f6; color: #ffffff; border: none; }
          .bg-electric:hover { background-color: #1e293b; color: #ffffff; }
          .text-coolgray { color: #64748b; }
          .border-coolgray { border-color: rgba(100, 116, 139, 0.3) !important; }
          .bg-ice { background-color: #eff6ff; }
          .hover-bg-ice:hover { background-color: rgba(239, 246, 255, 0.5); }
          .bg-offwhite { background-color: #f8fafc; }
          .text-teal { color: #0f766e; }
          .bg-mint { background-color: #ccfbf1; }
          .bg-teal { background-color: #0d9488; color: #ffffff; border: none; }
          .badge-amber { background-color: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
          
          /* Custom Utilities */
          .workspace-card { border-radius: 1rem; border: 1px solid rgba(100, 116, 139, 0.3); box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); background-color: #ffffff; }
          .invite-input { background: transparent; border: none; outline: none; width: 100%; min-width: 150px; font-weight: 500; }
          .dashed-circle { border: 2px dashed #94a3b8; }
          .animate-spin { animation: spin 1s linear infinite; }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}
      </style>

      {/* --- VIEW 1: WHEN USER HAS NO TEAM --- */}
      {!hasTeam ? (
        <div className="container py-5 mt-4" style={{ maxWidth: '900px' }}>
          <div className="workspace-card p-5 text-center">
            <div className="rounded-circle bg-ice text-electric d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
              <Users size={40} />
            </div>
            <h2 className="fs-3 fw-bold text-navy mb-3">You don't have a team yet</h2>
            <p className="text-coolgray mb-4 mx-auto" style={{ maxWidth: '400px' }}>
              You need to complete your registration to create or join a team.
            </p>
            <button 
              onClick={() => navigate('/student/explorer')} 
              className="btn bg-electric px-5 py-2 fw-bold d-inline-flex align-items-center justify-content-center gap-2 rounded-3 transition-all"
            >
              <UserPlus size={20} /> Go to Registration
            </button>
          </div>
        </div>
      ) : (
      
      /* --- VIEW 2: WHEN USER HAS A TEAM (LIVE DATA) --- */
        <div className="container py-5" style={{ maxWidth: '1000px' }}>
          
          {/* Header Section */}
          <div className="workspace-card p-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-5">
            <div>
              <h1 className="fs-4 fw-bold text-navy d-flex align-items-center gap-2 m-0 mb-1">
                {teamData.name} 
                {teamData.status === 'Complete' ? (
                  <span className="badge bg-mint text-teal rounded-pill" style={{ fontSize: '12px' }}>Complete</span>
                ) : (
                  <span className="badge bg-ice text-electric rounded-pill" style={{ fontSize: '12px' }}>Recruiting</span>
                )}
              </h1>
              <p className="text-coolgray small m-0">Manage your team members and roles.</p>
            </div>
            
            {/* Invite Link Generator */}
            <div className="bg-ice p-2 rounded-3 d-flex align-items-center gap-2 border w-100" style={{ maxWidth: '400px', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
              <LinkIcon size={18} className="text-electric ms-2 flex-shrink-0" />
              <input 
                type="text" 
                readOnly 
                value={`codeways.com/join/${teamData.inviteCode}`} 
                className="invite-input text-navy small px-1"
              />
              <button 
                onClick={handleCopyLink}
                className={`btn btn-sm fw-bold d-flex align-items-center gap-2 px-3 py-2 flex-shrink-0 transition-all ${
                  copied ? 'bg-teal' : 'bg-electric'
                }`}
              >
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Team Members List */}
          <div className="workspace-card overflow-hidden">
            <div className="p-4 border-bottom border-coolgray bg-offwhite d-flex justify-content-between align-items-center">
              <h3 className="fs-5 fw-bold text-navy m-0">Team Members ({teamData.members.length}/{teamData.maxSize})</h3>
            </div>
            
            <div className="d-flex flex-column">
              {teamData.members.map((member, index) => (
                <div key={member._id} className={`p-4 d-flex align-items-center justify-content-between hover-bg-ice transition-all ${index !== teamData.members.length - 1 || teamData.members.length < teamData.maxSize ? 'border-bottom border-coolgray' : ''}`}>
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-circle bg-navy d-flex align-items-center justify-content-center fw-bold fs-5 flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="fw-bold text-navy m-0 mb-1 d-flex align-items-center gap-2" style={{ fontSize: '1rem' }}>
                        {member.name}
                        {teamData.leader === member._id && (
                           <span className="badge-amber px-2 py-1 rounded-2 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>Leader</span>
                        )}
                      </h4>
                      <p className="text-coolgray small m-0 d-flex align-items-center gap-1">
                        <Code size={14} /> {member.participationType} {member.skills?.length > 0 ? `| ${member.skills.join(', ')}` : ''}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Empty Slots */}
              {[...Array(teamData.maxSize - teamData.members.length)].map((_, i) => (
                 <div key={`empty-${i}`} className={`p-4 d-flex align-items-center gap-3 ${i !== (teamData.maxSize - teamData.members.length) - 1 ? 'border-bottom border-coolgray' : ''}`}>
                   <div className="rounded-circle bg-offwhite dashed-circle text-coolgray d-flex align-items-center justify-content-center fw-bold flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                     ?
                   </div>
                   <div>
                     <h4 className="fw-bold text-coolgray fst-italic m-0" style={{ fontSize: '1rem' }}>Waiting for member...</h4>
                   </div>
                 </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default TeamWorkspace;