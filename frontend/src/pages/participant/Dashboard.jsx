import { useState } from 'react';
import {
  Trophy, Users, FileText, Star, Award, Calendar, Bell,
  Clock, CheckCircle, Circle, MapPin, Laptop,
  Megaphone, Download, HelpCircle, UploadCloud, MessageSquare,
  Flag, ChevronRight, PlayCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// NOTE: This version uses Bootstrap 5 classes instead of Tailwind.
// Make sure Bootstrap CSS is loaded, e.g. in index.html:
// <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-3 p-md-4 p-lg-5" style={{ maxWidth: '1600px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>

      {/* ================= HEADER ================= */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold text-dark d-flex align-items-center gap-2 mb-1">
            Welcome back, Alex! <span>👋</span>
          </h1>
          <p className="text-muted mb-0">Let's build something amazing today.</p>
        </div>
        <div className="bg-white border rounded-3 px-4 py-2 d-flex align-items-center gap-2 shadow-sm small fw-semibold text-dark">
          <Calendar size={18} className="text-secondary" />
          22 May 2025, Thursday
        </div>
      </div>

      {/* ================= STATS ROW ================= */}
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3 g-md-4 mb-4">
        {[
          { title: "Registered Hackathons", value: "1", sub: "1 Active", icon: Trophy, variant: "success" },
          { title: "Team Members", value: "4", sub: "Team Size", icon: Users, variant: "primary" },
          { title: "Submissions", value: "1", sub: "1 In Progress", icon: FileText, variant: "warning" },
          { title: "Rank", value: "-", sub: "Not Ranked Yet", icon: Star, variant: "info" },
          { title: "Badges Earned", value: "0", sub: "Keep Going!", icon: Award, variant: "primary" }
        ].map((stat, i) => (
          <div className="col" key={i}>
            <div className="card border-0 shadow-sm rounded-4 h-100" style={{ minHeight: '120px' }}>
              <div className="card-body d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className={`bg-${stat.variant}-subtle text-${stat.variant} rounded-3 p-2`}>
                    <stat.icon size={22} strokeWidth={2.5} />
                  </div>
                  <span className="fs-3 fw-bold text-dark lh-1">{stat.value}</span>
                </div>
                <div>
                  <p className="small fw-bold text-dark mb-0">{stat.title}</p>
                  <p className={`small mt-1 fw-semibold text-${stat.variant} mb-0`}>{stat.sub}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MAIN GRID: ROW 1 ================= */}
      <div className="row g-4 mb-4">

        {/* 1. Registered Hackathon */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body d-flex flex-column">
              <h3 className="h6 fw-bold text-dark mb-4">Registered Hackathon</h3>
              <div className="d-flex flex-column flex-sm-row gap-3">
                {/* Hackathon Image Placeholder */}
                <div
                  className="rounded-4 p-3 d-flex flex-column justify-content-between position-relative overflow-hidden flex-shrink-0"
                  style={{
                    width: '100%',
                    maxWidth: '128px',
                    height: '160px',
                    background: 'linear-gradient(to bottom right, #312e81, #581c87, #0f172a)'
                  }}
                >
                  <h4 className="text-white fw-bold lh-sm mb-0 position-relative" style={{ zIndex: 1, fontSize: '1.1rem' }}>
                    CODE<br />THE FUTURE<br /><span className="fw-normal" style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>2025</span>
                  </h4>
                </div>

                <div className="flex-fill d-flex flex-column" style={{ minWidth: 0 }}>
                  <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
                    <h4 className="fw-bold text-dark mb-0 text-break" style={{ fontSize: '1.05rem' }}>Code the Future 2025</h4>
                    <span className="badge bg-success-subtle text-success border border-success-subtle text-uppercase flex-shrink-0">
                      In Progress
                    </span>
                  </div>
                  <p className="small text-muted mb-3">Build innovative solutions for real-world problems and shape the future.</p>

                  <div className="mt-auto d-flex flex-column gap-2">
                    <div className="d-flex align-items-center gap-2 small text-dark fw-medium">
                      <Calendar size={14} className="text-secondary" /> 10 May - 25 May 2025
                    </div>
                    <div className="d-flex align-items-center gap-2 small text-dark fw-medium">
                      <Users size={14} className="text-secondary" /> 320+ Participants
                    </div>
                    <div className="d-flex align-items-center gap-2 small text-dark fw-medium">
                      <Laptop size={14} className="text-secondary" /> Online
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/student/explorer')}
                className="btn btn-outline-info fw-bold rounded-3 mt-4 w-100"
              >
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* 2. Hackathon Timeline */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="h6 fw-bold text-dark mb-0">Hackathon Timeline</h3>
                <button className="btn btn-link btn-sm text-primary fw-bold text-decoration-none p-0">View Full Timeline</button>
              </div>
              <div className="flex-fill ms-2" style={{ borderLeft: '2px solid #f1f5f9' }}>
                {[
                  { title: "Registration Opened", date: "10 May 2025", status: "completed" },
                  { title: "Registration Closed", date: "15 May 2025", status: "completed" },
                  { title: "Hacking in Progress", date: "16 May - 24 May 2025", status: "active" },
                  { title: "Final Submission", date: "25 May 2025, 11:59 PM", status: "upcoming" },
                  { title: "Results Announcement", date: "30 May 2025", status: "upcoming" }
                ].map((step, i) => (
                  <div key={i} className="position-relative ps-4 pb-4" style={{ marginLeft: '-1px' }}>
                    {step.status === 'completed' && (
                      <div className="position-absolute bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ left: '-11px', top: 0, width: '20px', height: '20px', border: '3px solid white' }}>
                        <CheckCircle size={12} className="text-white" />
                      </div>
                    )}
                    {step.status === 'active' && (
                      <div className="position-absolute bg-primary rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ left: '-11px', top: '4px', width: '20px', height: '20px', border: '3px solid white' }}>
                        <span className="bg-white rounded-circle" style={{ width: '6px', height: '6px' }}></span>
                      </div>
                    )}
                    {step.status === 'upcoming' && (
                      <div className="position-absolute bg-white rounded-circle" style={{ left: '-9px', top: '6px', width: '16px', height: '16px', border: '2px solid #cbd5e1' }}></div>
                    )}
                    <div>
                      <h4 className="small fw-bold text-dark mb-0">{step.title}</h4>
                      <p className="small text-muted mb-0 mt-1">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Announcements */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="h6 fw-bold text-dark mb-0">Announcements</h3>
                <button className="btn btn-link btn-sm text-primary fw-bold text-decoration-none p-0">View All</button>
              </div>
              <div className="flex-fill d-flex flex-column gap-4">
                {[
                  { icon: Megaphone, variant: "primary", title: "Registration Deadline Extended!", desc: "Registration for 'Code the Future 2025' has been extended to 15 May 2025.", time: "18 May 2025", hour: "10:30 AM" },
                  { icon: FileText, variant: "success", title: "New Resource Added", desc: "Check out the new API documentation in the Resources section.", time: "17 May 2025", hour: "02:15 PM" },
                  { icon: Clock, variant: "warning", title: "Reminder: Submission in 3 Days", desc: "Don't forget to submit your project before the deadline.", time: "22 May 2025", hour: "09:00 AM" }
                ].map((ann, i) => (
                  <div key={i} className="d-flex gap-3 align-items-start">
                    <div className={`bg-${ann.variant}-subtle text-${ann.variant} rounded-3 p-2 flex-shrink-0`}>
                      <ann.icon size={20} />
                    </div>
                    <div className="flex-fill">
                      <h4 className="small fw-bold text-dark mb-1">{ann.title}</h4>
                      <p className="small text-muted mb-0" style={{ lineHeight: 1.5 }}>{ann.desc}</p>
                    </div>
                    <div className="text-end flex-shrink-0">
                      <p className="text-muted mb-0" style={{ fontSize: '0.65rem' }}>{ann.time}</p>
                      <p className="text-muted mb-0" style={{ fontSize: '0.65rem' }}>{ann.hour}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN GRID: ROW 2 ================= */}
      <div className="row g-4 mb-4">

        {/* 1. My Team */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="h6 fw-bold text-dark mb-0">My Team</h3>
                  <button onClick={() => navigate('/student/team')} className="btn btn-link btn-sm text-primary fw-bold text-decoration-none p-0">View Team</button>
                </div>

                {/* Avatars */}
                <div className="d-flex align-items-center mb-4">
                  <img src="https://i.pravatar.cc/100?img=11" alt="Member" className="rounded-circle border border-3 border-white shadow-sm" style={{ width: '56px', height: '56px', objectFit: 'cover' }} />
                  <img src="https://i.pravatar.cc/100?img=5" alt="Member" className="rounded-circle border border-3 border-white shadow-sm" style={{ width: '56px', height: '56px', objectFit: 'cover', marginLeft: '-16px' }} />
                  <img src="https://i.pravatar.cc/100?img=8" alt="Member" className="rounded-circle border border-3 border-white shadow-sm" style={{ width: '56px', height: '56px', objectFit: 'cover', marginLeft: '-16px' }} />
                  <img src="https://i.pravatar.cc/100?img=9" alt="Member" className="rounded-circle border border-3 border-white shadow-sm" style={{ width: '56px', height: '56px', objectFit: 'cover', marginLeft: '-16px' }} />
                  <div className="rounded-circle border border-3 border-white shadow-sm bg-light d-flex align-items-center justify-content-center text-muted fw-bold fs-5" style={{ width: '56px', height: '56px', marginLeft: '-16px' }}>
                    +
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-3">
                <div>
                  <p className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Team Name</p>
                  <p className="fw-bold text-dark small mb-0">CodeCrafters</p>
                </div>
                <div>
                  <p className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Team ID</p>
                  <p className="fw-bold text-dark small mb-0">#CC2025</p>
                </div>
                <div>
                  <p className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Role</p>
                  <p className="fw-bold text-dark small mb-0">Team Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. My Submission */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="h6 fw-bold text-dark mb-0">My Submission</h3>
                  <button onClick={() => navigate('/student/submissions')} className="btn btn-link btn-sm text-primary fw-bold text-decoration-none p-0">View All Submissions</button>
                </div>

                <div className="d-flex gap-3 align-items-center mb-4">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                    style={{ width: '64px', height: '80px', background: 'linear-gradient(to bottom right, #312e81, #581c87)' }}
                  >
                    <span className="text-white text-center fw-bold lh-sm" style={{ fontSize: '0.5rem' }}>CODE<br />THE FUTURE<br />2025</span>
                  </div>
                  <div className="flex-fill" style={{ minWidth: 0 }}>
                    <div className="d-flex flex-wrap justify-content-between align-items-start gap-2">
                      <h4 className="fw-bold text-dark small mb-0 text-break">Smart Waste Management System</h4>
                      <span className="badge bg-warning-subtle text-warning border border-warning-subtle text-uppercase flex-shrink-0">In Progress</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3 mb-1">
                      <div>
                        <p className="text-muted mb-0" style={{ fontSize: '0.65rem' }}>Submitted on</p>
                        <p className="small fw-bold text-dark mb-0">21 May 2025, 08:45 PM</p>
                      </div>
                      <div className="text-end">
                        <p className="text-muted mb-0" style={{ fontSize: '0.65rem' }}>Status</p>
                        <p className="small fw-bold text-success mb-0">In Progress</p>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="d-flex align-items-center gap-2 mt-3">
                      <div className="progress w-100" style={{ height: '6px' }}>
                        <div className="progress-bar bg-info" role="progressbar" style={{ width: '70%' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={100}></div>
                      </div>
                      <span className="small fw-bold text-dark">70%</span>
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={() => navigate('/student/submissions')} className="btn btn-outline-info fw-bold rounded-3 w-100">
                Continue Work
              </button>
            </div>
          </div>
        </div>

        {/* 3. Upcoming Deadlines */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="h6 fw-bold text-dark mb-0">Upcoming Deadlines</h3>
                <button className="btn btn-link btn-sm text-primary fw-bold text-decoration-none p-0">View All</button>
              </div>

              <div className="flex-fill d-flex flex-column gap-3">
                {[
                  { title: "Final Submission", date: "25 May 2025, 11:59 PM", days: "3" },
                  { title: "Presentation Round", date: "27 May 2025, 10:00 AM", days: "5" },
                  { title: "Results Announcement", date: "30 May 2025, 06:00 PM", days: "8" }
                ].map((d, i) => (
                  <div key={i} className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-light border rounded-3 d-flex align-items-center justify-content-center text-secondary flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                        <Calendar size={18} />
                      </div>
                      <div>
                        <h4 className="small fw-bold text-dark mb-0">{d.title}</h4>
                        <p className="small text-muted mb-0 mt-1">{d.date}</p>
                      </div>
                    </div>
                    <div className="text-center flex-shrink-0 ms-3">
                      <p className="small fw-bold text-danger mb-0">{d.days}</p>
                      <p className="fw-bold text-danger text-uppercase mb-0" style={{ fontSize: '0.6rem' }}>Days Left</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN GRID: ROW 3 ================= */}
      <div className="row g-4 mb-4">

        {/* Quick Actions */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <h3 className="h6 fw-bold text-dark mb-4">Quick Actions</h3>
              <div className="row row-cols-2 row-cols-sm-5 g-3">
                {[
                  { title: "View Hackathon", icon: Flag, variant: "success" },
                  { title: "My Team", icon: Users, variant: "primary" },
                  { title: "Submit Project", icon: UploadCloud, variant: "info" },
                  { title: "View Submissions", icon: FileText, variant: "warning" },
                  { title: "Messages", icon: MessageSquare, variant: "info", badge: 3 }
                ].map((action, i) => (
                  <div className="col text-center" key={i}>
                    <button className="btn p-0 d-flex flex-column align-items-center border-0 bg-transparent">
                      <div className={`bg-${action.variant}-subtle text-${action.variant} rounded-4 d-flex align-items-center justify-content-center mb-2 position-relative`} style={{ width: '64px', height: '64px' }}>
                        <action.icon size={26} strokeWidth={2} />
                        {action.badge && (
                          <span className="position-absolute badge rounded-pill bg-info border border-2 border-white" style={{ top: '-4px', right: '-4px', fontSize: '0.6rem' }}>
                            {action.badge}
                          </span>
                        )}
                      </div>
                      <span className="small fw-bold text-dark">{action.title}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="h6 fw-bold text-dark mb-0">Resources</h3>
                <button className="btn btn-link btn-sm text-primary fw-bold text-decoration-none p-0">View All</button>
              </div>

              <div className="row row-cols-1 row-cols-sm-2 g-3">
                {[
                  { title: "Guidelines", sub: "PDF Document", icon: FileText, variant: "danger" },
                  { title: "API Docs", sub: "Documentation", icon: Laptop, variant: "success" },
                  { title: "FAQ", sub: "View Answers", icon: HelpCircle, variant: "primary" },
                  { title: "Starter Kit", sub: "Download", icon: Download, variant: "warning" }
                ].map((res, i) => (
                  <div className="col" key={i}>
                    <button className="btn w-100 d-flex align-items-center gap-3 p-3 rounded-3 border text-start">
                      <div className={`text-${res.variant} flex-shrink-0`}>
                        <res.icon size={24} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="small fw-bold text-dark mb-0">{res.title}</h4>
                        <p className="text-muted mb-0" style={{ fontSize: '0.65rem' }}>{res.sub}</p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Text */}
      <div className="text-center pt-4 pb-3 small text-muted fw-medium">
        © 2025 Codeways Technologies. All rights reserved.
      </div>

    </div>
  );
};

export default Dashboard;