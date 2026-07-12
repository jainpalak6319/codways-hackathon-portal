import React from 'react';
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

  // Helper function to render the calendar node matching the reference UI
  const renderCalendarNode = (dateString, status) => {
    const [day, month] = dateString.split(' ');

    const styles = {
      completed: {
        container: "border shadow-sm",
        borderColor: "#a7f3d0", // emerald-200
        top: "bg-success text-white", // emerald-600 equivalent
        bottom: "text-success", // emerald-800 equivalent
        bottomBg: "#ecfdf5" // emerald-50
      },
      active: {
        container: "border shadow scale-110",
        borderColor: "#bfdbfe", // blue-200
        boxShadow: "0 0 0 4px #eff6ff", // ring-4 ring-blue-50
        top: "text-white", 
        topBg: "#0d59a7", // Deep blue from reference
        bottom: "text-dark", 
        bottomBg: "#e2f0fb" // Light blue from reference
      },
      upcoming: {
        container: "border shadow-sm",
        borderColor: "#e2e8f0", // slate-200
        top: "text-secondary", 
        topBg: "#e2e8f0", // slate-200
        bottom: "text-secondary", 
        bottomBg: "#f8fafc" // slate-50
      }
    };

    const currentStyle = styles[status];

    return (
      <div 
        className={`d-flex flex-column rounded-3 overflow-hidden ${currentStyle.container}`}
        style={{ 
          width: '3.5rem', 
          borderColor: currentStyle.borderColor,
          boxShadow: currentStyle.boxShadow || '',
          transition: 'all 0.3s'
        }}
      >
        <div 
          className={`w-100 text-center py-1 fw-black lh-1 ${currentStyle.top}`} 
          style={{ fontSize: '1.125rem', backgroundColor: currentStyle.topBg || '' }}
        >
          {day}
        </div>
        <div 
          className={`w-100 text-center py-1 fw-bold text-uppercase ${currentStyle.bottom}`}
          style={{ fontSize: '11px', letterSpacing: '0.1em', backgroundColor: currentStyle.bottomBg || '' }}
        >
          {month}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>
        {`
          .tracker-page { background-color: #f8fafc; min-height: 100vh; color: #475569; }
          .tracker-card { border-radius: 2rem; border: 1px solid #e2e8f0; transition: box-shadow 0.3s; }
          .tracker-card:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
          .timeline-line { border-top: 3px solid #00b368; }
          .timeline-dashed { border-top: 3px dashed rgba(0, 179, 104, 0.4); }
          .custom-scrollbar::-webkit-scrollbar { height: 8px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        `}
      </style>

      <div className="container-fluid py-4 py-lg-5 tracker-page" style={{ maxWidth: '1400px' }}>
        
        {/* ================= HEADER ================= */}
        <div className="mb-5">
          <h1 className="display-6 fw-bolder text-dark mb-2 d-flex align-items-center gap-3" style={{ letterSpacing: '-0.025em' }}>
            Application Tracker <Target className="text-primary" size={32} />
          </h1>
          <p className="fs-5 text-secondary">Track your progress and upcoming deadlines across all registered hackathons.</p>
        </div>

        {/* ================= TRACKER CARDS ================= */}
        <div className="d-flex flex-column gap-4">
          {trackedApplications.map((app) => (
            <div key={app.id} className="card tracker-card shadow-sm bg-white overflow-hidden">

              {/* Card Header */}
              <div className="card-header bg-white border-bottom p-4 p-md-5 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                <div>
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="rounded-3 d-flex align-items-center justify-content-center bg-primary-subtle border border-primary-subtle" style={{ width: '40px', height: '40px' }}>
                      <LayoutTemplate size={20} className="text-primary" />
                    </div>
                    <h2 className="h4 fw-bold text-dark m-0">{app.name}</h2>
                  </div>
                  <div className="d-flex align-items-center gap-3 small mt-2 ms-1 text-secondary">
                    <span className="d-flex align-items-center gap-1 fw-medium text-dark">
                      <Zap size={16} className="text-warning" /> {app.role}
                    </span>
                    <span className="rounded-circle bg-secondary" style={{ width: '6px', height: '6px', opacity: '0.3' }}></span>
                    <span className="fw-medium">Team: <strong className="text-dark">{app.teamName}</strong></span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/participant/team')}
                  className="btn btn-outline-secondary rounded-3 px-4 py-2 fw-bold text-dark d-flex align-items-center gap-2"
                >
                  Go to Workspace <ChevronRight size={16} />
                </button>
              </div>

              {/* Card Body: The Horizontal Timeline */}
              <div className="card-body p-4 p-md-5 overflow-auto custom-scrollbar" style={{ backgroundColor: 'rgba(248, 250, 252, 0.5)' }}>
                <div className="d-flex align-items-start justify-content-between position-relative pt-3 pb-2" style={{ minWidth: '700px' }}>
                  
                  {app.steps.map((step, index) => (
                    <div key={index} className="d-flex flex-column align-items-center position-relative" style={{ width: '8rem' }}>
                      
                      {/* The Connecting Line */}
                      {index !== 0 && (
                        <div 
                          className={`position-absolute w-100 ${index <= app.currentStepIndex ? 'timeline-line' : 'timeline-dashed'}`}
                          style={{ top: '24px', right: '50%', zIndex: 0 }}
                        ></div>
                      )}

                      {/* The Node (Calendar Style) */}
                      <div className="position-relative mb-3 bg-white rounded-3" style={{ zIndex: 1 }}>
                        {renderCalendarNode(step.date, step.status)}
                      </div>

                      {/* Step Title & Status Text */}
                      <h6 className={`small fw-bold text-center mb-2 ${
                        step.status === 'active' ? 'text-primary' : 
                        step.status === 'completed' ? 'text-dark' : 'text-secondary'
                      }`}>
                        {step.title}
                      </h6>
                      
                      <div className="d-flex align-items-center gap-1 fw-bold text-uppercase" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>
                        {step.status === 'completed' && <><CheckCircle size={12} className="text-success"/> <span className="text-success">Done</span></>}
                        {step.status === 'active' && <><Clock size={12} className="text-primary"/> <span className="text-primary">Current</span></>}
                        {step.status === 'upcoming' && <span className="text-secondary opacity-75">Pending</span>}
                      </div>

                    </div>
                  ))}

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default ApplicationTracker;