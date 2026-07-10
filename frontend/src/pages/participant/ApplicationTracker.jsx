import { useState } from 'react';
import { Target, CheckCircle, Clock, ChevronRight, LayoutTemplate, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// MOCK DATA: Simulating the user's registered hackathons
const trackedApplications = [
  {
    id: 1,
    name: "Hackforge 3.0",
    role: "Team Lead",
    teamName: "CodeCrafters",
    currentStepIndex: 2, // 0-indexed: Step 2 (Round 1) is currently active
    steps: [
      { title: "Registration", date: "20 Jun", status: "completed" },
      { title: "Team Formation", date: "25 Jun", status: "completed" },
      { title: "Round 1: Ideation", date: "05 Jul", status: "active" },
      { title: "Round 2: Dev Sprint", date: "10 Jul", status: "upcoming" },
      { title: "Final Pitch", date: "15 Jul", status: "upcoming" }
    ]
  },
  {
    id: 2,
    name: "FinTech Build Sprint",
    role: "Solo Participant",
    teamName: "Looking for team",
    currentStepIndex: 0, // Registration is active
    steps: [
      { title: "Registration", date: "05 Jul", status: "active" },
      { title: "Matchmaking", date: "07 Jul", status: "upcoming" },
      { title: "Hacking Begins", date: "10 Jul", status: "upcoming" },
      { title: "Submission", date: "15 Jul", status: "upcoming" }
    ]
  }
];

const ApplicationTracker = () => {
  const navigate = useNavigate();

  // Helper function to render the calendar node matching your reference image
  const renderCalendarNode = (dateString, status) => {
    const [day, month] = dateString.split(' ');

    // Styling based on status - accurately matching the reference image's color palette
    const styles = {
      completed: {
        container: "border-emerald-200 shadow-sm",
        top: "bg-emerald-600 text-white",
        bottom: "bg-emerald-50 text-emerald-800"
      },
      active: {
        container: "border-blue-200 shadow-md scale-110 ring-4 ring-blue-50",
        top: "bg-[#0d59a7] text-white", // Deep blue from reference
        bottom: "bg-[#e2f0fb] text-[#333]" // Light blue from reference
      },
      upcoming: {
        container: "border-slate-200 shadow-sm",
        top: "bg-slate-200 text-slate-500",
        bottom: "bg-slate-50 text-slate-400"
      }
    };

    const currentStyle = styles[status];

    return (
      <div className={`flex flex-col w-12 md:w-14 rounded-[12px] overflow-hidden border ${currentStyle.container} transition-all duration-300`}>
        <div className={`w-full text-center py-1 md:py-1.5 text-lg font-black leading-none tracking-tight ${currentStyle.top}`}>
          {day}
        </div>
        <div className={`w-full text-center py-1 text-[11px] font-semibold uppercase tracking-widest ${currentStyle.bottom}`}>
          {month}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 min-h-screen bg-slate-50 text-slate-600 font-sans animate-fade-in">
      
      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 flex items-center gap-3 tracking-tight">
          Application Tracker <Target className="text-blue-600" size={32} />
        </h1>
        <p className="text-slate-500 text-lg">Track your progress and upcoming deadlines across all registered hackathons.</p>
      </div>

      {/* ================= TRACKER CARDS ================= */}
      <div className="space-y-8">
        {trackedApplications.map((app) => (
          <div key={app.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">

            {/* Card Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <LayoutTemplate size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{app.name}</h2>
                </div>
                <div className="flex items-center gap-4 text-sm mt-3 ml-1">
                  <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <Zap size={16} className="text-amber-500" /> {app.role}
                  </span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                  <span className="text-slate-500 font-medium">Team: <span className="text-slate-800 font-bold">{app.teamName}</span></span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/student/team')}
                className="bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center gap-2"
              >
                Go to Workspace <ChevronRight size={16} />
              </button>
            </div>

            {/* Card Body: The Horizontal Timeline */}
            <div className="p-6 md:p-10 relative z-10 overflow-x-auto custom-scrollbar bg-slate-50/50">
              <div className="min-w-[700px] flex items-start justify-between relative pt-4 pb-2">
                
                {app.steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center relative w-32 group">
                    
                    {/* The Connecting Line */}
                    {index !== 0 && (
                      <div className={`absolute top-6 right-1/2 w-full -z-10 ${
                        index <= app.currentStepIndex 
                        // SOLID GREEN LINE for completed paths
                        ? 'border-t-[3px] border-[#00b368]' 
                        // DOTTED GREEN LINE for upcoming paths (matching reference)
                        : 'border-t-[3px] border-dashed border-[#00b368]/40'
                      }`}></div>
                    )}

                    {/* The Node (Calendar Style) */}
                    <div className="relative z-10 mb-4 bg-white rounded-[12px]">
                      {renderCalendarNode(step.date, step.status)}
                    </div>

                    {/* Step Title & Status Text */}
                    <h4 className={`text-sm font-bold text-center mb-1.5 ${
                      step.status === 'active' ? 'text-blue-700' : 
                      step.status === 'completed' ? 'text-slate-900' : 'text-slate-500'
                    }`}>
                      {step.title}
                    </h4>
                    
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
                      {step.status === 'completed' && <><CheckCircle size={12} className="text-emerald-600"/> <span className="text-emerald-600">Done</span></>}
                      {step.status === 'active' && <><Clock size={12} className="text-blue-600"/> <span className="text-blue-600">Current</span></>}
                      {step.status === 'upcoming' && <span className="text-slate-400">Pending</span>}
                    </div>

                  </div>
                ))}

              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Global CSS for scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
};

export default ApplicationTracker;