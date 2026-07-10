import { useState, useEffect } from 'react';
import { Users, Link as LinkIcon, Copy, CheckCircle, UserPlus, Code, Trophy, Loader2, Search, ArrowRight, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyTeams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null); // null = show grid, object = show workspace
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false); // Added modal state
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
    if(selectedTeam) {
      navigator.clipboard.writeText(`https://codeways.com/join/${selectedTeam.inviteCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --- INVITE MODAL COMPONENT ---
  const InviteModal = () => (
    <div className="fixed inset-0 bg-[#0A1220]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full border border-[#E2E8F0] shadow-2xl animate-fade-in">
        <h3 className="text-xl font-black text-[#0A1220] mb-2">Invite Teammates</h3>
        <p className="text-[#7A8A9E] mb-6 font-medium text-sm">Share this code or link with your friends to fill this slot.</p>
        
        <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-center mb-6">
            <p className="text-2xl font-mono font-black text-[#00C2B2] tracking-[0.2em]">{selectedTeam?.inviteCode}</p>
        </div>

        <div className="flex flex-col gap-3">
          <button onClick={handleCopyLink} className="w-full py-3 bg-[#00C2B2] text-white rounded-xl font-bold hover:bg-[#00A89A] flex items-center justify-center gap-2 transition-colors">
            {copied ? <CheckCircle size={18} /> : <Copy size={18} />} {copied ? 'Copied' : 'Copy Code'}
          </button>
          <button onClick={() => setShowInviteModal(false)} className="w-full py-3 font-bold text-[#7A8A9E] hover:text-[#0A1220] transition-colors">Close</button>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <div className="flex h-64 justify-center items-center"><Loader2 className="animate-spin text-[#00C2B2]" size={40} /></div>;
  }

  // --- VIEW 1: EMPTY STATE ---
  if (teams.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-10 animate-fade-in px-4 selection:bg-[#00C2B2]/30 selection:text-[#0A1220]">
        <div className="bg-white rounded-[24px] p-8 md:p-14 shadow-sm border border-[#E2E8F0] text-center">
          <div className="w-24 h-24 bg-[#00C2B2]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00C2B2]">
            <Users size={48} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-black text-[#0A1220] mb-4 tracking-tight">You haven't joined any hackathons yet</h2>
          <p className="text-[#7A8A9E] mb-8 max-w-md mx-auto font-medium text-lg">
            Explore upcoming hackathons, form a team, and start building!
          </p>
          <button 
            onClick={() => navigate('/student/explorer')} 
            className="bg-[#00C2B2] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#00A89A] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 mx-auto group"
          >
            <Search size={20} className="transition-transform duration-300 group-hover:scale-110" /> Explore Hackathons
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW 2: GRID OF REGISTERED HACKATHONS (EXPLORER STYLE) ---
  if (!selectedTeam) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 animate-fade-in px-2 md:px-0 selection:bg-[#00C2B2]/30 selection:text-[#0A1220]">
        
        {/* Header Section */}
        <div className="px-2 md:px-0">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0A1220] tracking-tight">My Hackathons</h1>
          <p className="text-[#7A8A9E] mt-1.5 text-sm md:text-base font-medium">Manage your teams and track your progress across all registered events.</p>
        </div>

        {/* Hackathon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 px-2 md:px-0">
          {teams.map((team) => {
            const isLeader = team.leader === userId;
            const isFull = team.members.length === team.maxSize;

            return (
              <div 
                key={team._id} 
                className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-[#00C2B2]/30 transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={() => setSelectedTeam(team)}
              >
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className={`px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-lg border ${
                    team.status === 'Complete' || isFull
                    ? 'bg-[#00C2B2]/10 text-[#00C2B2] border-[#00C2B2]/20'
                    : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                  }`}>
                    {team.status === 'Complete' || isFull ? 'Team Complete' : 'Recruiting'}
                  </span>
                  {isLeader && (
                    <span className="px-3 py-1 text-[11px] font-medium uppercase tracking-wider rounded-lg border border-[#8B5CF6]/20 text-[#8B5CF6] bg-[#8B5CF6]/10">
                      Team Leader
                    </span>
                  )}
                </div>

                {/* Title (Real Hackathon Name & Team Name) */}
                <p className="text-xs font-bold text-[#7A8A9E] uppercase tracking-widest mb-1 truncate">
                  {team.hackathonName || "Unknown Hackathon"}
                </p>
                <h2 className="text-xl font-bold text-[#0A1220] mb-5 group-hover:text-[#00C2B2] transition-colors leading-tight">
                  {team.name}
                </h2>

                {/* Details List */}
                <div className="space-y-3.5 mb-8 flex-1">
                  <div className="flex items-center gap-3 text-[#7A8A9E] text-[14px] font-medium">
                    <Users size={18} className="text-[#4F627D]" />
                    <span>Members: {team.members.length} / {team.maxSize}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#7A8A9E] text-[14px] font-medium">
                    <ShieldAlert size={18} className="text-[#4F627D]" />
                    <span>Invite Code: <span className="font-mono text-[#0A1220] font-bold">{team.inviteCode}</span></span>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  className="w-full py-3.5 flex items-center justify-center gap-2 border border-[#E2E8F0] rounded-xl text-[#0A1220] font-medium hover:bg-[#00C2B2] hover:text-white hover:border-[#00C2B2] transition-all duration-300 group/btn"
                >
                  Open Workspace
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- VIEW 3: DETAILED TEAM WORKSPACE (DRILL-DOWN) ---
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in px-4 md:px-6 selection:bg-[#00C2B2]/30 selection:text-[#0A1220]">
      
      {/* Invite Modal rendered when state is true */}
      {showInviteModal && <InviteModal />}
      
      {/* Back Button */}
      <button 
        onClick={() => setSelectedTeam(null)} 
        className="flex items-center gap-2 text-[#7A8A9E] hover:text-[#00C2B2] transition-colors font-semibold text-sm md:text-base mt-2 mb-2"
      >
        <ArrowLeft size={20} /> Back to My Hackathons
      </button>

      <div className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 md:p-10 border-b border-[#E2E8F0] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C2B2] opacity-[0.03] blur-[80px] rounded-full pointer-events-none"></div>

          <div className="relative z-10">
            <p className="text-xs font-bold text-[#00C2B2] uppercase tracking-widest mb-1.5">
               {selectedTeam.hackathonName || "Unknown Hackathon"}
            </p>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-black text-[#0A1220] tracking-tight">{selectedTeam.name} Workspace</h2>
              <span className={`text-[11px] px-3.5 py-1 rounded-lg font-bold uppercase tracking-wider ${
                selectedTeam.members.length === selectedTeam.maxSize 
                ? 'bg-[#00C2B2]/10 text-[#00C2B2] border border-[#00C2B2]/20' 
                : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
              }`}>
                {selectedTeam.members.length === selectedTeam.maxSize ? 'Complete' : 'Recruiting'}
              </span>
            </div>
            <p className="text-[#7A8A9E] font-medium text-lg">Manage your roster and get ready to build.</p>
          </div>

          {/* Invite Link Generator */}
          <div className="relative z-10 bg-[#F8FAFC] p-1.5 rounded-xl flex items-center gap-2 w-full md:w-auto border border-[#E2E8F0] shadow-sm">
            <LinkIcon size={18} className="text-[#7A8A9E] ml-3 shrink-0" />
            <input 
              type="text" 
              readOnly 
              value={`codeways.com/join/${selectedTeam.inviteCode}`} 
              className="bg-transparent border-none text-sm text-[#0A1220] w-full md:w-56 focus:outline-none font-semibold px-2 truncate"
            />
            <button 
              onClick={handleCopyLink}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
                copied 
                ? 'bg-[#0A1220] text-white' 
                : 'bg-[#00C2B2] text-white hover:bg-[#00A89A]'
              }`}
            >
              {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Members List */}
        <div className="p-6 md:p-10 bg-[#F8FAFC]">
          <h3 className="text-xl font-bold text-[#0A1220] mb-6 border-b border-[#E2E8F0] pb-4 flex items-center gap-2">
            <Users size={20} className="text-[#00C2B2]" /> Team Roster ({selectedTeam.members.length}/{selectedTeam.maxSize})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {selectedTeam.members.map((member) => (
              <div key={member._id} className="bg-white p-5 rounded-2xl border border-[#E2E8F0] flex items-center gap-4 shadow-sm hover:border-[#00C2B2]/30 transition-colors group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl bg-[#0A1220] text-white shadow-sm group-hover:bg-[#00C2B2] transition-colors">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-bold text-[#0A1220] flex items-center gap-2 truncate">
                    {member.name}
                    {selectedTeam.leader === member._id && (
                      <span className="bg-amber-500/10 text-amber-600 text-[9px] px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-widest font-bold shrink-0">Leader</span>
                    )}
                  </h4>
                  <p className="text-[13px] text-[#7A8A9E] flex items-center gap-1.5 mt-1 font-medium truncate">
                    <Code size={14} className="shrink-0" /> {member.participationType} {member.skills?.length > 0 ? `| ${member.skills.join(', ')}` : ''}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Functional Empty Slots */}
            {[...Array(selectedTeam.maxSize - selectedTeam.members.length)].map((_, i) => (
              <button 
                key={`empty-${i}`}
                onClick={() => setShowInviteModal(true)} 
                className="w-full text-left bg-transparent p-5 rounded-2xl border-2 border-dashed border-[#CBD5E1] flex items-center gap-4 hover:border-[#00C2B2]/50 hover:bg-white transition-all group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#94A3B8] border-2 border-dashed border-[#CBD5E1] bg-white group-hover:text-[#00C2B2] group-hover:border-[#00C2B2]/50 transition-colors">
                  <UserPlus size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-bold text-[#7A8A9E] group-hover:text-[#0A1220] transition-colors">Empty Slot</h4>
                  <p className="text-xs text-[#94A3B8] mt-1 font-medium group-hover:text-[#7A8A9E] transition-colors">Click to invite member</p>
                </div>
              </button>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeams;