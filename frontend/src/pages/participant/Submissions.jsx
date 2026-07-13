// import { useState } from 'react';
// import { 
//   UploadCloud, CheckCircle, Clock, GitBranch, Link as LinkIcon, 
//   Video, AlertCircle, Send, FolderKanban, History, Zap, Rocket, Compass
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const Submissions = () => {
//   const navigate = useNavigate();
  
//   // TAB STATE
//   const [activeTab, setActiveTab] = useState('active'); // 'active' | 'history'

//   // MOCK STATE: Change this to true to see the form! 
//   // In production, this will depend on your backend data.
//   // const hasActiveTask = false; 
//   const hasActiveTask = true; 


//   // MOCK DATA: Simulating past submissions and admin status
//   const [submissionHistory] = useState([
//     {
//       id: 1,
//       round: "Round 1 - Vision Craft",
//       hackathon: "Hackforge 2.0",
//       projectName: "Growtix Edu",
//       tagline: "Gamified learning ecosystem for modern developers.",
//       submittedOn: "December 15, 2025",
//       status: "Selected",
//       feedback: "Brilliant execution of the gamification aspect. Ready for Round 2."
//     },
//     {
//       id: 2,
//       round: "Final Submission",
//       hackathon: "CodeCrafters 2025",
//       projectName: "FinSync AI",
//       tagline: "AI-driven personal finance automation.",
//       submittedOn: "October 02, 2025",
//       status: "Pending",
//       feedback: null
//     }
//   ]);

//   // FORM STATE
//   const [formData, setFormData] = useState({
//     projectName: '', tagline: '', problem: '', solution: '',
//     techStack: '', frontendRepo: '', backendRepo: '', liveUrl: '', videoLink: ''
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setShowSuccess(true);
//       setTimeout(() => {
//         setShowSuccess(false);
//         setFormData({
//           projectName: '', tagline: '', problem: '', solution: '',
//           techStack: '', frontendRepo: '', backendRepo: '', liveUrl: '', videoLink: ''
//         });
//       }, 3000);
//     }, 1500);
//   };

//   return (
//     <div className="max-w-[1200px] mx-auto p-4 md:p-6 lg:p-8 min-h-screen bg-slate-50 text-slate-600 font-sans animate-fade-in pb-20">
      
//       {/* ================= PAGE HEADER & TABS ================= */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 relative z-10">
//         <div>
//           <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 flex items-center gap-3 tracking-tight">
//             Submissions <FolderKanban className="text-blue-600" size={32} />
//           </h1>
//           <p className="text-slate-500 text-lg">Manage your current tasks and view your past hackathon portfolio.</p>
//         </div>

//         {/* Premium Tab Switcher */}
//         <div className="bg-white p-1.5 rounded-2xl border border-slate-200 inline-flex shadow-sm">
//           <button 
//             onClick={() => setActiveTab('active')}
//             className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
//               activeTab === 'active' 
//               ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' 
//               : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-transparent'
//             }`}
//           >
//             <Zap size={16} /> Active Task
//           </button>
//           <button 
//             onClick={() => setActiveTab('history')}
//             className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
//               activeTab === 'history' 
//               ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm' 
//               : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-transparent'
//             }`}
//           >
//             <History size={16} /> Portfolio History
//           </button>
//         </div>
//       </div>

//       {/* ================= VIEW 1: ACTIVE TASK ================= */}
//       {activeTab === 'active' && (
//         <div className="animate-fade-in relative z-10">
          
//           {/* CONDITION A: NO ACTIVE TASK (EMPTY STATE) */}
//           {!hasActiveTask ? (
//             <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-16 flex flex-col items-center justify-center text-center">
//               <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 border-8 border-blue-100/50">
//                 <Rocket size={40} />
//               </div>
//               <h2 className="text-2xl font-bold text-slate-900 mb-3">No Active Submissions</h2>
//               <p className="text-slate-500 max-w-md mb-8">
//                 You are not currently enrolled in any active hackathons, or the submission window hasn't opened yet.
//               </p>
//               <button 
//                 onClick={() => navigate('/student/explorer')}
//                 className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-2"
//               >
//                 <Compass size={18} /> Explore Hackathons
//               </button>
//             </div>
//           ) : (

//           /* CONDITION B: HAS ACTIVE TASK (SHOW FORM) */
//           <form onSubmit={handleSubmit} className="space-y-6">
            
//             {/* Card 1: Identity */}
//             <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
//               <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-3">
//                 <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">1</span> 
//                 Project Identity
//               </h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-bold text-slate-700 mb-2">Project Name <span className="text-rose-500">*</span></label>
//                     <input type="text" name="projectName" required value={formData.projectName} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all" placeholder="e.g. AlgoYudh" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-bold text-slate-700 mb-2">Elevator Pitch (Tagline) <span className="text-rose-500">*</span></label>
//                     <input type="text" name="tagline" required maxLength="60" value={formData.tagline} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all" placeholder="Max 60 characters..." />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-bold text-slate-700 mb-2">Project Logo / Cover Image</label>
//                   <div className="w-full h-36 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
//                     <UploadCloud size={32} className="mb-3 group-hover:text-blue-500 transition-colors" />
//                     <p className="text-sm font-bold text-slate-500 group-hover:text-blue-600">Click or drag image to upload</p>
//                     <p className="text-[10px] mt-1 uppercase tracking-widest text-slate-400">PNG, JPG up to 5MB</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Card 2: Core Details */}
//             <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
//               <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-3">
//                 <span className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">2</span> 
//                 The Pitch
//               </h3>
              
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-bold text-slate-700 mb-2">The Problem It Solves <span className="text-rose-500">*</span></label>
//                   <textarea name="problem" required rows="3" value={formData.problem} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-slate-50 text-slate-900 placeholder-slate-400 resize-none transition-all" placeholder="Describe the real-world issue..."></textarea>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-bold text-slate-700 mb-2">Your Solution <span className="text-rose-500">*</span></label>
//                   <textarea name="solution" required rows="4" value={formData.solution} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-slate-50 text-slate-900 placeholder-slate-400 resize-none transition-all" placeholder="Explain how your project solves the problem..."></textarea>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-bold text-slate-700 mb-2">Tech Stack Used <span className="text-rose-500">*</span></label>
//                   <input type="text" name="techStack" required value={formData.techStack} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all" placeholder="React, Node.js, MongoDB, WebRTC..." />
//                 </div>
//               </div>
//             </div>

//             {/* Card 3: Deliverables */}
//             <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
//               <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-3">
//                 <span className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">3</span> 
//                 Deliverables
//               </h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><GitBranch size={16} className="text-slate-400"/> Frontend Repository <span className="text-rose-500">*</span></label>
//                   <input type="url" name="frontendRepo" required value={formData.frontendRepo} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all" placeholder="https://github.com/..." />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><GitBranch size={16} className="text-slate-400"/> Backend Repository</label>
//                   <input type="url" name="backendRepo" value={formData.backendRepo} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all" placeholder="https://github.com/..." />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><LinkIcon size={16} className="text-slate-400"/> Live Deployment URL</label>
//                   <input type="url" name="liveUrl" value={formData.liveUrl} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all" placeholder="https://..." />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Video size={16} className="text-slate-400"/> Demo Video Link</label>
//                   <input type="url" name="videoLink" value={formData.videoLink} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all" placeholder="YouTube, Loom, or Drive..." />
//                 </div>
//               </div>
//             </div>

//             {/* Submit Action */}
//             <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
//               {showSuccess && (
//                 <span className="text-emerald-600 font-bold flex items-center gap-2 animate-fade-in bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200">
//                   <CheckCircle size={18} /> Submission Saved!
//                 </span>
//               )}
//               <button 
//                 type="submit" 
//                 disabled={isSubmitting}
//                 className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-sm hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? 'Uploading...' : 'Submit Project'} <Send size={18} />
//               </button>
//             </div>
//           </form>
//           )}
//         </div>
//       )}

//       {/* ================= VIEW 2: PORTFOLIO / HISTORY ================= */}
//       {activeTab === 'history' && (
//         <div className="animate-fade-in space-y-6 relative z-10">
//           {submissionHistory.length === 0 ? (
//             <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-16 text-center">
//                <h3 className="text-xl font-bold text-slate-900 mb-2">No past submissions</h3>
//                <p className="text-slate-500">Your completed hackathon projects will appear here.</p>
//             </div>
//           ) : (
//             submissionHistory.map((sub) => (
//               <div key={sub.id} className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
                
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
//                       {sub.hackathon}
//                     </span>
//                     <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
//                       {sub.round}
//                     </span>
//                   </div>
//                   <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{sub.projectName}</h3>
//                   <p className="text-sm text-slate-500 mb-4">{sub.tagline}</p>
//                   <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
//                     <Clock size={14} /> Submitted on {sub.submittedOn}
//                   </p>
//                 </div>
                
//                 <div className="flex flex-col items-start md:items-end gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-200 w-full md:w-auto md:min-w-[300px]">
//                   <div className="flex items-center gap-3 w-full justify-between md:justify-end">
//                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Admin Status</span>
                    
//                     {sub.status === 'Selected' && (
//                       <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
//                         <CheckCircle size={14} /> Selected
//                       </span>
//                     )}
//                     {sub.status === 'Pending' && (
//                       <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
//                         <Clock size={14} /> Under Review
//                       </span>
//                     )}
//                     {sub.status === 'Rejected' && (
//                       <span className="bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
//                         <AlertCircle size={14} /> Not Selected
//                       </span>
//                     )}
//                   </div>
                  
//                   {sub.feedback ? (
//                     <div className="w-full mt-2">
//                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Feedback</p>
//                       <p className="text-sm text-slate-700 italic border-l-2 border-slate-300 pl-3">"{sub.feedback}"</p>
//                     </div>
//                   ) : (
//                     <p className="text-xs text-slate-400 italic mt-2">No feedback provided yet.</p>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}

//     </div>
//   );
// };

// export default Submissions;

import { useState, useEffect } from 'react';
import {
  CheckCircle, Clock, GitBranch, Link as LinkIcon,
  Video, AlertCircle, Send, FolderKanban, History, Zap, Rocket, Compass, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../../app/api/axios';

const Submissions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [isLoading, setIsLoading] = useState(true);
  const [hasActiveTask, setHasActiveTask] = useState(false);
  const [team, setTeam] = useState(null);
  const [existingSubmission, setExistingSubmission] = useState(null);
  const [history, setHistory] = useState([]);

  const [formData, setFormData] = useState({
    projectName: '', tagline: '', problem: '', solution: '',
    techStack: '', frontendRepo: '', backendRepo: '', liveUrl: '', videoLink: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeRes = await API.get('/submissions/active');
        setHasActiveTask(activeRes.data.hasActiveTask);
        setTeam(activeRes.data.team);

        if (activeRes.data.submission) {
          const sub = activeRes.data.submission;
          setExistingSubmission(sub);
          setFormData({
            projectName: sub.projectName || '',
            tagline: sub.tagline || '',
            problem: sub.problem || '',
            solution: sub.solution || '',
            techStack: sub.techStack || '',
            frontendRepo: sub.frontendRepo || '',
            backendRepo: sub.backendRepo || '',
            liveUrl: sub.liveUrl || '',
            videoLink: sub.videoLink || ''
          });
        }

        const historyRes = await API.get('/submissions/history');
        setHistory(historyRes.data.submissions || []);
      } catch (error) {
        console.error('Error fetching submissions data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await API.post('/submissions', {
        hackathonId: team.hackathonId,
        hackathonName: team.hackathonName,
        team: team._id,
        ...formData
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setErrorMsg(error.response?.data?.error || 'Something went wrong, try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 justify-center items-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-6 lg:p-8 min-h-screen bg-slate-50 text-slate-600 font-sans pb-20">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 flex items-center gap-3 tracking-tight">
            Submissions <FolderKanban className="text-blue-600" size={32} />
          </h1>
          <p className="text-slate-500 text-lg">Manage your current task and view your past hackathon portfolio.</p>
        </div>

        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 inline-flex shadow-sm">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
              activeTab === 'active'
              ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-transparent'
            }`}
          >
            <Zap size={16} /> Active Task
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
              activeTab === 'history'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-transparent'
            }`}
          >
            <History size={16} /> Portfolio History
          </button>
        </div>
      </div>

      {activeTab === 'active' && (
        <div>
          {!hasActiveTask ? (
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-16 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 border-8 border-blue-100/50">
                <Rocket size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">No Active Submissions</h2>
              <p className="text-slate-500 max-w-md mb-8">
                You're not on a team yet. Join or form one to unlock project submission.
              </p>
              <button
                onClick={() => navigate('/participant/explorer')}
                className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Compass size={18} /> Explore Hackathons
              </button>
            </div>
          ) : existingSubmission && existingSubmission.adminStatus !== 'pending' ? (
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-16 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">This submission has been graded</h2>
              <p className="text-slate-500">Check the Portfolio History tab for the result.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">1</span>
                  Project Identity
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Project Name <span className="text-rose-500">*</span></label>
                    <input type="text" name="projectName" required value={formData.projectName} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all" placeholder="e.g. AlgoYudh" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Elevator Pitch (Tagline)</label>
                    <input type="text" name="tagline" maxLength={60} value={formData.tagline} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all" placeholder="Max 60 characters..." />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">2</span>
                  The Pitch
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">The Problem It Solves <span className="text-rose-500">*</span></label>
                    <textarea name="problem" required rows="3" value={formData.problem} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-slate-50 text-slate-900 placeholder-slate-400 resize-none transition-all" placeholder="Describe the real-world issue..."></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Your Solution <span className="text-rose-500">*</span></label>
                    <textarea name="solution" required rows="4" value={formData.solution} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-slate-50 text-slate-900 placeholder-slate-400 resize-none transition-all" placeholder="Explain how your project solves the problem..."></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tech Stack Used <span className="text-rose-500">*</span></label>
                    <input type="text" name="techStack" required value={formData.techStack} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all" placeholder="React, Node.js, MongoDB, WebRTC..." />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">3</span>
                  Deliverables
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><GitBranch size={16} className="text-slate-400"/> Frontend Repository <span className="text-rose-500">*</span></label>
                    <input type="url" name="frontendRepo" required value={formData.frontendRepo} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all" placeholder="https://github.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><GitBranch size={16} className="text-slate-400"/> Backend Repository</label>
                    <input type="url" name="backendRepo" value={formData.backendRepo} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all" placeholder="https://github.com/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><LinkIcon size={16} className="text-slate-400"/> Live Deployment URL</label>
                    <input type="url" name="liveUrl" value={formData.liveUrl} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Video size={16} className="text-slate-400"/> Demo Video Link</label>
                    <input type="url" name="videoLink" value={formData.videoLink} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all" placeholder="YouTube, Loom, or Drive..." />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
                {errorMsg && (
                  <span className="text-rose-600 font-bold flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-lg border border-rose-200">
                    <AlertCircle size={18} /> {errorMsg}
                  </span>
                )}
                {showSuccess && (
                  <span className="text-emerald-600 font-bold flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200">
                    <CheckCircle size={18} /> Submission Saved!
                  </span>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-sm hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Uploading...' : existingSubmission ? 'Update Submission' : 'Submit Project'} <Send size={18} />
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-6">
          {history.length === 0 ? (
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-16 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">No past submissions</h3>
              <p className="text-slate-500">Your graded hackathon projects will appear here.</p>
            </div>
          ) : (
            history.map((sub) => (
              <div key={sub._id} className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                      {sub.hackathonName}
                    </span>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                      {sub.round}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{sub.projectName}</h3>
                  <p className="text-sm text-slate-500 mb-4">{sub.tagline}</p>
                  <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                    <Clock size={14} /> Submitted on {new Date(sub.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-200 w-full md:w-auto md:min-w-[300px]">
                  <div className="flex items-center gap-3 w-full justify-between md:justify-end">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Admin Status</span>
                    {sub.adminStatus === 'selected' && (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                        <CheckCircle size={14} /> Selected
                      </span>
                    )}
                    {sub.adminStatus === 'rejected' && (
                      <span className="bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                        <AlertCircle size={14} /> Not Selected
                      </span>
                    )}
                  </div>
                  {sub.feedback ? (
                    <div className="w-full mt-2">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Feedback</p>
                      <p className="text-sm text-slate-700 italic border-l-2 border-slate-300 pl-3">{sub.feedback}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic mt-2">No feedback provided yet.</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Submissions;