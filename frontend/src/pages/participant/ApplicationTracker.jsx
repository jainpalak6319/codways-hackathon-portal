import { useState, useEffect } from 'react';
import { Target, CheckCircle, Clock, XCircle, Search, Loader2, LayoutTemplate } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../../app/api/axios';

const statusConfig = {
  applied: { label: 'Applied', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock },
  in_review: { label: 'In Review', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock },
  shortlisted: { label: 'Shortlisted', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle },
  rejected: { label: 'Not Selected', color: 'bg-rose-50 text-rose-700 border-rose-200', icon: XCircle },
};

const ApplicationTracker = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get('/applications/my');
        setApplications(res.data.applications || []);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 justify-center items-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-6 lg:p-8 min-h-screen bg-slate-50 text-slate-600 font-sans">

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 flex items-center gap-3 tracking-tight">
          Application Tracker <Target className="text-blue-600" size={32} />
        </h1>
        <p className="text-slate-500 text-lg">Track the status of every hackathon you've applied to.</p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-16 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 border-8 border-blue-100/50">
            <Target size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">No applications yet</h2>
          <p className="text-slate-500 max-w-md mb-8">
            You haven't applied to any hackathons. Browse what's open and get started.
          </p>
          <button
            onClick={() => navigate('/student/explorer')}
            className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Search size={18} /> Explore Hackathons
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {applications.map((app) => {
            const config = statusConfig[app.status] || statusConfig.applied;
            const StatusIcon = config.icon;

            return (
              <div key={app._id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <LayoutTemplate size={22} className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{app.hackathonName}</h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Applied on {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <span className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${config.color}`}>
                  <StatusIcon size={14} /> {config.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ApplicationTracker;