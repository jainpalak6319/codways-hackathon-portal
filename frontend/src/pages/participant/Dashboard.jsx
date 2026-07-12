import { useState } from 'react';
import { 
  Trophy, Users, FileText, Star, Award, Calendar, Bell, 
  Clock, CheckCircle, Circle, MapPin, Laptop, 
  Megaphone, Download, HelpCircle, UploadCloud, MessageSquare, 
  Flag, ChevronRight, PlayCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
   
    <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 bg-[#f8fafc] min-h-screen font-sans animate-fade-in">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            Welcome back, Alex! <span className="animate-bounce origin-bottom-right">👋</span>
          </h1>
          <p className="text-slate-500 mt-1">Let's build something amazing today.</p>
        </div>
        <div className="bg-white border border-slate-200 px-5 py-3 rounded-xl flex items-center gap-3 shadow-sm text-sm font-semibold text-slate-700">
          <Calendar size={18} className="text-slate-400" /> 
          22 May 2025, Thursday
        </div>
      </div>

      {/* ================= STATS ROW ================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {[
          { title: "Registered Hackathons", value: "1", sub: "1 Active", icon: Trophy, color: "text-emerald-500", bg: "bg-emerald-50" },
          { title: "Team Members", value: "4", sub: "Team Size", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
          { title: "Submissions", value: "1", sub: "1 In Progress", icon: FileText, color: "text-amber-500", bg: "bg-amber-50" },
          { title: "Rank", value: "-", sub: "Not Ranked Yet", icon: Star, color: "text-teal-500", bg: "bg-teal-50" },
          { title: "Badges Earned", value: "0", sub: "Keep Going!", icon: Award, color: "text-blue-500", bg: "bg-blue-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center h-[120px] transition-transform hover:-translate-y-1 duration-300">
            <div className="flex justify-between items-start mb-2">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={22} strokeWidth={2.5} />
              </div>
              <span className="text-3xl font-extrabold text-slate-800 leading-none">{stat.value}</span>
            </div>
            <div className="mt-auto flex justify-between items-end">
              <div>
                <p className="text-sm font-bold text-slate-700">{stat.title}</p>
                <p className={`text-xs mt-0.5 font-medium ${stat.color}`}>{stat.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MAIN GRID: ROW 1 ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Registered Hackathon */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
          <h3 className="font-bold text-slate-800 mb-5">Registered Hackathon</h3>
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Hackathon Image Placeholder */}
            <div className="w-full sm:w-32 h-40 rounded-xl bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-4 flex flex-col justify-between shrink-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
              <h4 className="text-white font-extrabold text-lg leading-tight relative z-10">CODE<br/>THE FUTURE<br/><span className="text-purple-300 text-sm">2025</span></h4>
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-800 text-lg">Code the Future 2025</h4>
                <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide shrink-0">
                  In Progress
                </span>
              </div>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">Build innovative solutions for real-world problems and shape the future.</p>
              
              <div className="space-y-2 mt-auto">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <Calendar size={14} className="text-slate-400" /> 10 May - 25 May 2025
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <Users size={14} className="text-slate-400" /> 320+ Participants
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <Laptop size={14} className="text-slate-400" /> Online
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/student/explorer')} className="w-full mt-6 bg-white border border-teal-500 text-teal-600 font-bold py-2.5 rounded-xl hover:bg-teal-50 transition-colors">
            View Details
          </button>
        </div>

        {/* 2. Hackathon Timeline */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Hackathon Timeline</h3>
            <button className="text-xs text-blue-600 font-bold hover:underline">View Full Timeline</button>
          </div>
          <div className="relative border-l-2 border-slate-100 ml-3 space-y-6 flex-1">
            {[
              { title: "Registration Opened", date: "10 May 2025", status: "completed" },
              { title: "Registration Closed", date: "15 May 2025", status: "completed" },
              { title: "Hacking in Progress", date: "16 May - 24 May 2025", status: "active" },
              { title: "Final Submission", date: "25 May 2025, 11:59 PM", status: "upcoming" },
              { title: "Results Announcement", date: "30 May 2025", status: "upcoming" }
            ].map((step, i) => (
              <div key={i} className="relative pl-6">
                {step.status === 'completed' && (
                  <div className="absolute -left-[11px] top-0 bg-emerald-500 rounded-full border-4 border-white">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                )}
                {step.status === 'active' && (
                  <div className="absolute -left-[11px] top-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                  </div>
                )}
                {step.status === 'upcoming' && (
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white rounded-full border-2 border-slate-300"></div>
                )}
                <div>
                  <h4 className={`text-sm font-bold ${step.status === 'active' ? 'text-slate-800' : 'text-slate-700'}`}>{step.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Announcements */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Announcements</h3>
            <button className="text-xs text-blue-600 font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-5 flex-1">
            {[
              { icon: Megaphone, color: "text-purple-600", bg: "bg-purple-50", title: "Registration Deadline Extended!", desc: "Registration for 'Code the Future 2025' has been extended to 15 May 2025.", time: "18 May 2025", hour: "10:30 AM" },
              { icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50", title: "New Resource Added", desc: "Check out the new API documentation in the Resources section.", time: "17 May 2025", hour: "02:15 PM" },
              { icon: Clock, color: "text-amber-600", bg: "bg-amber-50", title: "Reminder: Submission in 3 Days", desc: "Don't forget to submit your project before the deadline.", time: "22 May 2025", hour: "09:00 AM" }
            ].map((ann, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className={`p-2.5 rounded-xl ${ann.bg} ${ann.color} shrink-0`}>
                  <ann.icon size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-800">{ann.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed pr-2">{ann.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-slate-400 font-medium">{ann.time}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{ann.hour}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MAIN GRID: ROW 2 ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. My Team */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800">My Team</h3>
              <button onClick={() => navigate('/student/team')} className="text-xs text-blue-600 font-bold hover:underline">View Team</button>
            </div>
            
            {/* Avatars */}
            <div className="flex items-center mb-6">
              <img src="https://i.pravatar.cc/100?img=11" alt="Member" className="w-14 h-14 rounded-full border-4 border-white shadow-sm object-cover" />
              <img src="https://i.pravatar.cc/100?img=5" alt="Member" className="w-14 h-14 rounded-full border-4 border-white shadow-sm -ml-4 object-cover" />
              <img src="https://i.pravatar.cc/100?img=8" alt="Member" className="w-14 h-14 rounded-full border-4 border-white shadow-sm -ml-4 object-cover" />
              <img src="https://i.pravatar.cc/100?img=9" alt="Member" className="w-14 h-14 rounded-full border-4 border-white shadow-sm -ml-4 object-cover" />
              <div className="w-14 h-14 rounded-full border-4 border-white shadow-sm -ml-4 bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-lg">
                +
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Team Name</p>
              <p className="font-bold text-slate-800 text-sm mt-0.5">CodeCrafters</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Team ID</p>
              <p className="font-bold text-slate-800 text-sm mt-0.5">#CC2025</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Role</p>
              <p className="font-bold text-slate-800 text-sm mt-0.5">Team Lead</p>
            </div>
          </div>
        </div>

        {/* 2. My Submission */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800">My Submission</h3>
              <button onClick={() => navigate('/student/submissions')} className="text-xs text-blue-600 font-bold hover:underline">View All Submissions</button>
            </div>
            
            <div className="flex gap-4 items-center mb-6">
              <div className="w-16 h-20 rounded-lg bg-gradient-to-br from-indigo-900 to-purple-900 p-2 flex items-center justify-center shrink-0 shadow-inner">
                <span className="text-[8px] font-extrabold text-white text-center leading-tight">CODE<br/>THE FUTURE<br/>2025</span>
              </div>
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-800 text-sm">Smart Waste Management System</h4>
                  <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200 uppercase whitespace-nowrap ml-2">In Progress</span>
                </div>
                <div className="flex justify-between items-center mt-3 mb-1">
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Submitted on</p>
                    <p className="text-xs font-bold text-slate-700">21 May 2025, 08:45 PM</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-medium">Status</p>
                    <p className="text-xs font-bold text-emerald-600">In Progress</p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-teal-500 h-1.5 rounded-full w-[70%]"></div>
                  </div>
                  <span className="text-xs font-bold text-slate-800">70%</span>
                </div>
              </div>
            </div>
          </div>
          
          <button onClick={() => navigate('/student/submissions')} className="w-full bg-white border border-teal-500 text-teal-600 font-bold py-2.5 rounded-xl hover:bg-teal-50 transition-colors">
            Continue Work
          </button>
        </div>

        {/* 3. Upcoming Deadlines */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Upcoming Deadlines</h3>
            <button className="text-xs text-blue-600 font-bold hover:underline">View All</button>
          </div>
          
          <div className="space-y-4 flex-1">
            {[
              { title: "Final Submission", date: "25 May 2025, 11:59 PM", days: "3", icon: FileText },
              { title: "Presentation Round", date: "27 May 2025, 10:00 AM", days: "5", icon: PlayCircle },
              { title: "Results Announcement", date: "30 May 2025, 06:00 PM", days: "8", icon: Trophy }
            ].map((d, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-500 shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{d.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{d.date}</p>
                  </div>
                </div>
                <div className="text-center shrink-0 ml-4">
                  <p className="text-sm font-bold text-rose-500">{d.days}</p>
                  <p className="text-[10px] font-bold text-rose-400 uppercase tracking-wide">Days Left</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MAIN GRID: ROW 3 ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Actions (Takes 2 Columns on Desktop) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { title: "View Hackathon", icon: Flag, color: "text-emerald-500", bg: "bg-emerald-50" },
              { title: "My Team", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
              { title: "Submit Project", icon: UploadCloud, color: "text-blue-500", bg: "bg-blue-50" },
              { title: "View Submissions", icon: FileText, color: "text-amber-500", bg: "bg-amber-50" },
              { title: "Messages", icon: MessageSquare, color: "text-teal-500", bg: "bg-teal-50", badge: 3 }
            ].map((action, i) => (
              <button key={i} className="flex flex-col items-center justify-center text-center group">
                <div className={`w-16 h-16 ${action.bg} ${action.color} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform relative`}>
                  <action.icon size={26} strokeWidth={2} />
                  {action.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {action.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-slate-700">{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resources (Takes 1 Column on Desktop) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Resources</h3>
            <button className="text-xs text-blue-600 font-bold hover:underline">View All</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Guidelines", sub: "PDF Document", icon: FileText, color: "text-rose-500" },
              { title: "API Docs", sub: "Documentation", icon: Laptop, color: "text-emerald-500" },
              { title: "FAQ", sub: "View Answers", icon: HelpCircle, color: "text-purple-500" },
              { title: "Starter Kit", sub: "Download", icon: Download, color: "text-amber-500" }
            ].map((res, i) => (
              <button key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-colors text-left">
                <div className={`${res.color} shrink-0`}>
                  <res.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{res.title}</h4>
                  <p className="text-[10px] text-slate-500">{res.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Text */}
      <div className="text-center pt-8 text-xs text-slate-400 font-medium">
        © 2025 Codeways Technologies. All rights reserved.
      </div>
      
    </div>
  );
};

export default Dashboard;