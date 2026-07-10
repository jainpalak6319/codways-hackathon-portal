import { useState, useEffect } from 'react';
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
    if(teamData) {
      navigator.clipboard.writeText(`https://codeways.com/join/${teamData.inviteCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return <div className="flex h-64 justify-center items-center"><Loader2 className="animate-spin text-electric" size={40} /></div>;
  }

  // --- VIEW 1: WHEN USER HAS NO TEAM ---
  if (!hasTeam) {
    return (
      <div className="max-w-4xl mx-auto mt-10">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-coolgray/30 text-center">
          <div className="w-20 h-20 bg-ice rounded-full flex items-center justify-center mx-auto mb-6 text-electric">
            <Users size={40} />
          </div>
          <h2 className="text-3xl font-bold text-navy mb-4">You don't have a team yet</h2>
          <p className="text-coolgray mb-8 max-w-md mx-auto">
            You need to complete your registration to create or join a team.
          </p>
          <button 
            onClick={() => navigate('/student/explorer')} 
            className="bg-electric text-white px-8 py-3 rounded-lg font-bold hover:bg-navy transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <UserPlus size={20} /> Go to Registration
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW 2: WHEN USER HAS A TEAM (LIVE DATA) ---
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-coolgray/30 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-navy flex items-center gap-2">
            {teamData.name} 
            {teamData.status === 'Complete' ? (
              <span className="bg-mint text-teal text-xs px-2 py-1 rounded-full font-bold">Complete</span>
            ) : (
              <span className="bg-ice text-electric text-xs px-2 py-1 rounded-full font-bold">Recruiting</span>
            )}
          </h1>
          <p className="text-coolgray text-sm mt-1">Manage your team members and roles.</p>
        </div>
        
        {/* Invite Link Generator */}
        <div className="bg-ice p-2 rounded-lg flex items-center gap-2 w-full md:w-auto border border-electric/20">
          <LinkIcon size={18} className="text-electric ml-2" />
          <input 
            type="text" 
            readOnly 
            value={`codeways.com/join/${teamData.inviteCode}`} 
            className="bg-transparent border-none text-sm text-navy w-48 focus:outline-none font-medium"
          />
          <button 
            onClick={handleCopyLink}
            className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${
              copied ? 'bg-teal text-white' : 'bg-electric text-white hover:bg-navy'
            }`}
          >
            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>

      {/* Team Members List */}
      <div className="bg-white rounded-xl border border-coolgray/30 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-coolgray/30 bg-offwhite/50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-navy">Team Members ({teamData.members.length}/{teamData.maxSize})</h3>
        </div>
        
        <div className="divide-y divide-coolgray/20">
          {teamData.members.map((member) => (
            <div key={member._id} className="p-6 flex items-center justify-between hover:bg-ice/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-navy text-white">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-navy flex items-center gap-2">
                    {member.name}
                    {teamData.leader === member._id && (
                       <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded border border-amber-200 uppercase tracking-wider font-bold">Leader</span>
                    )}
                  </h4>
                  <p className="text-sm text-coolgray flex items-center gap-1 mt-0.5">
                    <Code size={14} /> {member.participationType} {member.skills?.length > 0 ? `| ${member.skills.join(', ')}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Empty Slots */}
          {[...Array(teamData.maxSize - teamData.members.length)].map((_, i) => (
             <div key={`empty-${i}`} className="p-6 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full flex items-center justify-center text-coolgray border-2 border-dashed border-coolgray bg-offwhite">
                  ?
               </div>
               <div>
                  <h4 className="font-bold text-coolgray italic">Waiting for member...</h4>
               </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamWorkspace;