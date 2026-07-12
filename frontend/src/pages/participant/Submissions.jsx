import React, { useState } from 'react';
import { 
  UploadCloud, CheckCircle, Clock, GitBranch, Link as LinkIcon, 
  Video, AlertCircle, Send, FolderKanban, History, Zap, Rocket, Compass
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Submissions = () => {
  const navigate = useNavigate();
  
  // TAB STATE
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'history'

  // MOCK STATE
  const hasActiveTask = true; 

  // MOCK DATA
  const [submissionHistory] = useState([
    {
      id: 1,
      round: "Round 1 - Vision Craft",
      hackathon: "Hackforge 2.0",
      projectName: "Growtix Edu",
      tagline: "Gamified learning ecosystem for modern developers.",
      submittedOn: "December 15, 2025",
      status: "Selected",
      feedback: "Brilliant execution of the gamification aspect. Ready for Round 2."
    },
    {
      id: 2,
      round: "Final Submission",
      hackathon: "CodeCrafters 2025",
      projectName: "FinSync AI",
      tagline: "AI-driven personal finance automation.",
      submittedOn: "October 02, 2025",
      status: "Pending",
      feedback: null
    }
  ]);

  // FORM STATE
  const [formData, setFormData] = useState({
    projectName: '', tagline: '', problem: '', solution: '',
    techStack: '', frontendRepo: '', backendRepo: '', liveUrl: '', videoLink: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          projectName: '', tagline: '', problem: '', solution: '',
          techStack: '', frontendRepo: '', backendRepo: '', liveUrl: '', videoLink: ''
        });
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <style>
        {`
          /* Base Page Styles */
          .submissions-page { background-color: #f8fafc; color: #475569; min-height: 100vh; padding-bottom: 5rem; }
          .submissions-page ::selection { background-color: rgba(37, 99, 235, 0.2); color: #0f172a; }
          
          /* Custom Cards */
          .card-custom { border-radius: 2rem; border: 1px solid #e2e8f0; background-color: #ffffff; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
          
          /* Typography Colors */
          .text-slate-400 { color: #94a3b8 !important; }
          .text-slate-500 { color: #64748b !important; }
          .text-slate-700 { color: #334155 !important; }
          .text-slate-900 { color: #0f172a !important; }
          
          /* Form Controls */
          .custom-input { 
            background-color: #f8fafc; 
            border: 1px solid #e2e8f0; 
            border-radius: 0.75rem; 
            padding: 0.875rem 1rem; 
            color: #0f172a; 
            transition: all 0.2s;
          }
          .custom-input::placeholder { color: #94a3b8; }
          .custom-input:focus { outline: none; background-color: #ffffff; }
          
          /* Section Specific Focus Rings */
          .focus-ring-blue:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25); }
          .focus-ring-teal:focus { border-color: #14b8a6; box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.25); }
          .focus-ring-purple:focus { border-color: #a855f7; box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.25); }

          /* Upload Box */
          .upload-box { 
            border: 2px dashed #e2e8f0; 
            background-color: #f8fafc; 
            border-radius: 1rem; 
            height: 9rem; 
            transition: all 0.3s ease; 
            cursor: pointer; 
          }
          .upload-box:hover { border-color: #60a5fa; background-color: rgba(239, 246, 255, 0.5); }
          .upload-box:hover .upload-icon { color: #3b82f6; }
          .upload-box:hover .upload-text { color: #2563eb; }

          /* Tabs */
          .tab-wrapper { background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 0.375rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
          .tab-btn { padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 700; font-size: 0.875rem; transition: all 0.3s; border: 1px solid transparent; }
          .tab-active-blue { background-color: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); }
          .tab-active-emerald { background-color: #ecfdf5; color: #047857; border-color: #a7f3d0; box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); }
          .tab-inactive { color: #64748b; background-color: transparent; }
          .tab-inactive:hover { color: #334155; background-color: #f8fafc; }

          /* Badges & Tags */
          .badge-custom { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; padding: 0.375rem 0.75rem; border-radius: 9999px; }
          .tag-custom { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; padding: 0.25rem 0.75rem; border-radius: 0.375rem; border: 1px solid #e2e8f0; }

          /* Animations */
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        `}
      </style>

      <div className="container-fluid py-4 py-lg-5 submissions-page" style={{ maxWidth: '1200px' }}>
        
        {/* ================= PAGE HEADER & TABS ================= */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end gap-4 mb-5 position-relative z-1">
          <div>
            <h1 className="display-6 fw-bolder text-slate-900 mb-2 d-flex align-items-center gap-3" style={{ letterSpacing: '-0.025em' }}>
              Submissions <FolderKanban className="text-primary" size={32} />
            </h1>
            <p className="fs-5 text-slate-500 m-0">Manage your current tasks and view your past hackathon portfolio.</p>
          </div>

          {/* Premium Tab Switcher */}
          <div className="tab-wrapper d-inline-flex">
            <button 
              onClick={() => setActiveTab('active')}
              className={`btn d-flex align-items-center gap-2 tab-btn ${activeTab === 'active' ? 'tab-active-blue' : 'tab-inactive'}`}
            >
              <Zap size={16} /> Active Task
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`btn d-flex align-items-center gap-2 tab-btn ${activeTab === 'history' ? 'tab-active-emerald' : 'tab-inactive'}`}
            >
              <History size={16} /> Portfolio History
            </button>
          </div>
        </div>

        {/* ================= VIEW 1: ACTIVE TASK ================= */}
        {activeTab === 'active' && (
          <div className="animate-fade-in position-relative z-1">
            
            {/* CONDITION A: NO ACTIVE TASK (EMPTY STATE) */}
            {!hasActiveTask ? (
              <div className="card-custom p-5 p-md-5 d-flex flex-column align-items-center justify-content-center text-center">
                <div className="rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: '96px', height: '96px', backgroundColor: '#eff6ff', color: '#3b82f6', border: '8px solid rgba(219, 234, 254, 0.5)' }}>
                  <Rocket size={40} />
                </div>
                <h2 className="h3 fw-bold text-slate-900 mb-3">No Active Submissions</h2>
                <p className="text-slate-500 mb-5" style={{ maxWidth: '400px' }}>
                  You are not currently enrolled in any active hackathons, or the submission window hasn't opened yet.
                </p>
                <button 
                  onClick={() => navigate('/student/explorer')}
                  className="btn btn-primary px-5 py-3 rounded-3 fw-bold d-flex align-items-center gap-2 shadow-sm"
                >
                  <Compass size={18} /> Explore Hackathons
                </button>
              </div>
            ) : (

            /* CONDITION B: HAS ACTIVE TASK (SHOW FORM) */
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
              
              {/* Card 1: Identity */}
              <div className="card-custom p-4 p-md-5">
                <h3 className="h5 fw-bold text-slate-900 mb-4 pb-3 border-bottom d-flex align-items-center gap-3">
                  <span className="rounded-3 d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', backgroundColor: '#eff6ff', border: '1px solid #dbeafe', color: '#2563eb' }}>1</span> 
                  Project Identity
                </h3>
                
                <div className="row g-4">
                  <div className="col-12 col-md-6 d-flex flex-column gap-4">
                    <div>
                      <label className="form-label small fw-bold text-slate-700">Project Name <span className="text-danger">*</span></label>
                      <input type="text" name="projectName" required value={formData.projectName} onChange={handleChange} className="form-control custom-input focus-ring-blue w-100" placeholder="e.g. AlgoYudh" />
                    </div>
                    <div>
                      <label className="form-label small fw-bold text-slate-700">Elevator Pitch (Tagline) <span className="text-danger">*</span></label>
                      <input type="text" name="tagline" required maxLength="60" value={formData.tagline} onChange={handleChange} className="form-control custom-input focus-ring-blue w-100" placeholder="Max 60 characters..." />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-slate-700">Project Logo / Cover Image</label>
                    <div className="upload-box d-flex flex-column align-items-center justify-content-center text-slate-400 w-100">
                      <UploadCloud size={32} className="mb-3 upload-icon transition-colors" />
                      <p className="small fw-bold text-slate-500 upload-text m-0 mb-1 transition-colors">Click or drag image to upload</p>
                      <p className="m-0 text-slate-400" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Core Details */}
              <div className="card-custom p-4 p-md-5">
                <h3 className="h5 fw-bold text-slate-900 mb-4 pb-3 border-bottom d-flex align-items-center gap-3">
                  <span className="rounded-3 d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', backgroundColor: '#f0fdfa', border: '1px solid #ccfbf1', color: '#0d9488' }}>2</span> 
                  The Pitch
                </h3>
                
                <div className="d-flex flex-column gap-4">
                  <div>
                    <label className="form-label small fw-bold text-slate-700">The Problem It Solves <span className="text-danger">*</span></label>
                    <textarea name="problem" required rows="3" value={formData.problem} onChange={handleChange} className="form-control custom-input focus-ring-teal w-100" style={{ resize: 'none' }} placeholder="Describe the real-world issue..."></textarea>
                  </div>
                  <div>
                    <label className="form-label small fw-bold text-slate-700">Your Solution <span className="text-danger">*</span></label>
                    <textarea name="solution" required rows="4" value={formData.solution} onChange={handleChange} className="form-control custom-input focus-ring-teal w-100" style={{ resize: 'none' }} placeholder="Explain how your project solves the problem..."></textarea>
                  </div>
                  <div>
                    <label className="form-label small fw-bold text-slate-700">Tech Stack Used <span className="text-danger">*</span></label>
                    <input type="text" name="techStack" required value={formData.techStack} onChange={handleChange} className="form-control custom-input focus-ring-teal w-100" placeholder="React, Node.js, MongoDB, WebRTC..." />
                  </div>
                </div>
              </div>

              {/* Card 3: Deliverables */}
              <div className="card-custom p-4 p-md-5">
                <h3 className="h5 fw-bold text-slate-900 mb-4 pb-3 border-bottom d-flex align-items-center gap-3">
                  <span className="rounded-3 d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', backgroundColor: '#faf5ff', border: '1px solid #f3e8ff', color: '#9333ea' }}>3</span> 
                  Deliverables
                </h3>
                
                <div className="row g-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-slate-700 d-flex align-items-center gap-2"><GitBranch size={16} className="text-slate-400"/> Frontend Repository <span className="text-danger">*</span></label>
                    <input type="url" name="frontendRepo" required value={formData.frontendRepo} onChange={handleChange} className="form-control custom-input focus-ring-purple w-100" placeholder="https://github.com/..." />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-slate-700 d-flex align-items-center gap-2"><GitBranch size={16} className="text-slate-400"/> Backend Repository</label>
                    <input type="url" name="backendRepo" value={formData.backendRepo} onChange={handleChange} className="form-control custom-input focus-ring-purple w-100" placeholder="https://github.com/..." />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-slate-700 d-flex align-items-center gap-2"><LinkIcon size={16} className="text-slate-400"/> Live Deployment URL</label>
                    <input type="url" name="liveUrl" value={formData.liveUrl} onChange={handleChange} className="form-control custom-input focus-ring-purple w-100" placeholder="https://..." />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-slate-700 d-flex align-items-center gap-2"><Video size={16} className="text-slate-400"/> Demo Video Link</label>
                    <input type="url" name="videoLink" value={formData.videoLink} onChange={handleChange} className="form-control custom-input focus-ring-purple w-100" placeholder="YouTube, Loom, or Drive..." />
                  </div>
                </div>
              </div>

              {/* Submit Action */}
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-end gap-3 pt-3">
                {showSuccess && (
                  <span className="fw-bold d-flex align-items-center gap-2 animate-fade-in px-3 py-2 rounded-3 border" style={{ color: '#059669', backgroundColor: '#ecfdf5', borderColor: '#a7f3d0' }}>
                    <CheckCircle size={18} /> Submission Saved!
                  </span>
                )}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn btn-primary px-5 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm w-100"
                  style={{ maxWidth: '250px' }}
                >
                  {isSubmitting ? 'Uploading...' : 'Submit Project'} <Send size={18} />
                </button>
              </div>
            </form>
            )}
          </div>
        )}

        {/* ================= VIEW 2: PORTFOLIO / HISTORY ================= */}
        {activeTab === 'history' && (
          <div className="animate-fade-in d-flex flex-column gap-4 position-relative z-1">
            {submissionHistory.length === 0 ? (
              <div className="card-custom p-5 text-center">
                 <h3 className="h5 fw-bold text-slate-900 mb-2">No past submissions</h3>
                 <p className="text-slate-500 m-0">Your completed hackathon projects will appear here.</p>
              </div>
            ) : (
              submissionHistory.map((sub) => (
                <div key={sub.id} className="card-custom p-4 p-md-5 d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-4 transition-all" style={{ '&:hover': { borderColor: '#cbd5e1', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' } }}>
                  
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <span className="tag-custom bg-light text-slate-500">
                        {sub.hackathon}
                      </span>
                      <span className="fw-black text-primary text-uppercase" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>
                        {sub.round}
                      </span>
                    </div>
                    <h3 className="h4 fw-bold text-slate-900 mb-2 transition-colors" style={{ cursor: 'pointer' }}>{sub.projectName}</h3>
                    <p className="small text-slate-500 mb-3">{sub.tagline}</p>
                    <p className="text-slate-400 d-flex align-items-center gap-1 mb-0 fw-medium" style={{ fontSize: '12px' }}>
                      <Clock size={14} /> Submitted on {sub.submittedOn}
                    </p>
                  </div>
                  
                  <div className="d-flex flex-column align-items-start align-items-lg-end gap-3 p-4 rounded-4 border w-100" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0', maxWidth: '400px' }}>
                    <div className="d-flex align-items-center justify-content-between justify-content-lg-end w-100 gap-3">
                      <span className="fw-bold text-slate-500 text-uppercase" style={{ fontSize: '12px', letterSpacing: '0.05em' }}>Admin Status</span>
                      
                      {sub.status === 'Selected' && (
                        <span className="badge-custom d-flex align-items-center gap-1 border" style={{ backgroundColor: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' }}>
                          <CheckCircle size={14} /> Selected
                        </span>
                      )}
                      {sub.status === 'Pending' && (
                        <span className="badge-custom d-flex align-items-center gap-1 border" style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe' }}>
                          <Clock size={14} /> Under Review
                        </span>
                      )}
                      {sub.status === 'Rejected' && (
                        <span className="badge-custom d-flex align-items-center gap-1 border" style={{ backgroundColor: '#fff1f2', color: '#be123c', borderColor: '#fecdd3' }}>
                          <AlertCircle size={14} /> Not Selected
                        </span>
                      )}
                    </div>
                    
                    {sub.feedback ? (
                      <div className="w-100 mt-2">
                        <p className="text-slate-400 fw-bold text-uppercase mb-1" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>Feedback</p>
                        <p className="small text-slate-700 fst-italic border-start border-2 ps-3 m-0" style={{ borderColor: '#cbd5e1' }}>"{sub.feedback}"</p>
                      </div>
                    ) : (
                      <p className="text-slate-400 fst-italic mt-2 mb-0" style={{ fontSize: '12px' }}>No feedback provided yet.</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </>
  );
};

export default Submissions;