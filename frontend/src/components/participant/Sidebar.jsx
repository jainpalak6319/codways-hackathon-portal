import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Compass, Users, Radio, Award, User, 
  LogOut, Menu, X 
} from 'lucide-react';

const Sidebar = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/participant/dashboard' },
    { name: 'Explorer', icon: Compass, path: '/participant/explorer' },
    { name: 'My Team', icon: Users, path: '/participant/team' },
    { name: 'Application Tracker', icon: Radio, path: '/participant/tracker' },
    { name: 'Submission', icon: Radio, path: '/participant/submissions' },
    { name: 'Certificates', icon: Award, path: '/participant/certificates' },
    { name: 'Profile', icon: User, path: '/participant/profile' }, 
  ];

  return (
    <>
      {/* Custom Scoped CSS for strict brand colors and mobile sliding behavior */}
      <style>
        {`
          .sidebar-wrapper {
            width: 230px;
            background-color: #0A1220;
            transition: transform 0.4s ease-in-out;
            z-index: 1050;
          }
          @media (max-width: 767.98px) {
            .sidebar-wrapper {
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
            }
            .sidebar-closed {
              transform: translateX(-100%);
            }
          }
          .hide-scroll::-webkit-scrollbar {
            display: none;
          }
          .hide-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .nav-link-custom {
            color: #7A8A9E;
            border-radius: 12px;
            transition: all 0.3s ease-in-out;
            font-weight: 500;
            font-size: 14.5px;
          }
          .nav-link-custom:hover {
            color: #ffffff;
            background-color: rgba(255, 255, 255, 0.05);
          }
          .nav-link-custom.active {
            background-color: #00C2B2 !important;
            color: #ffffff !important;
            box-shadow: 0 4px 15px rgba(0, 194, 178, 0.25);
          }
          .logout-btn:hover {
            color: #F87171 !important;
            background-color: rgba(248, 113, 113, 0.1) !important;
          }
        `}
      </style>

      <div className="d-flex vh-100 overflow-hidden font-sans" style={{ backgroundColor: '#F4F7FE' }}>
        
        {/* ================= MOBILE HEADER ================= */}
        <div 
          className="d-md-none fixed-top w-100 shadow-sm d-flex align-items-center justify-content-between p-3" 
          style={{ backgroundColor: '#0A1220', zIndex: 1040 }}
        >
          <div className="d-flex align-items-center gap-2">
            <div className="d-flex align-items-center justify-content-center rounded" style={{ width: '32px', height: '32px', backgroundColor: '#00C2B2', transform: 'rotate(45deg)' }}>
              <div style={{ width: '14px', height: '14px', border: '2px solid white', borderRadius: '2px', transform: 'rotate(-45deg)' }}></div>
            </div>
            <h2 className="m-0 fs-5 fw-bolder text-white tracking-wide">CODEWAYS</h2>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-link text-white p-0 border-0"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* ================= MOBILE MENU BACKDROP ================= */}
        {isMobileMenuOpen && (
          <div 
            className="d-md-none fixed-top w-100 h-100"
            style={{ backgroundColor: 'rgba(10, 18, 32, 0.6)', backdropFilter: 'blur(4px)', zIndex: 1030 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* ================= SIDEBAR ================= */}
        <aside className={`d-flex flex-column flex-shrink-0 sidebar-wrapper ${!isMobileMenuOpen ? 'sidebar-closed' : ''}`}>
          
          {/* Logo Section (Desktop Only) */}
          <div className="d-none d-md-block pt-5 pb-4 px-4 overflow-hidden">
            <div className="d-flex align-items-center gap-3 text-nowrap">
              {/* Logo Icon */}
              <div 
                className="d-flex align-items-center justify-content-center rounded-3" 
                style={{ width: '40px', minWidth: '40px', height: '40px', backgroundColor: '#00C2B2', transform: 'rotate(45deg)', boxShadow: '0 0 20px rgba(0,194,178,0.25)' }}
              >
                <div style={{ width: '14px', height: '14px', border: '2.5px solid white', borderRadius: '2px', transform: 'rotate(-45deg)' }}></div>
              </div>
              
              {/* Logo Text */}
              <div className="d-flex flex-column justify-content-center mt-1">
                <h2 className="m-0 fs-5 fw-black text-white lh-1 tracking-wide">CODEWAYS</h2>
                <p className="m-0 fw-bold text-uppercase mt-1" style={{ fontSize: '9px', color: '#00C2B2', letterSpacing: '0.15em' }}>
                  Hackathon Portal
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="nav flex-column flex-grow-1 px-3 gap-2 overflow-auto hide-scroll mt-4 mt-md-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `nav-link d-flex align-items-center gap-3 px-3 py-2 text-decoration-none nav-link-custom ${isActive ? 'active' : ''}`}
              >
                {({ isActive }) => (
                  <>
                    <item.icon 
                      size={20} 
                      strokeWidth={isActive ? 2.5 : 2}
                      style={{ minWidth: '20px' }} 
                    />
                    <span className="text-nowrap">
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Logout Section */}
          <div className="p-4 mt-auto border-top" style={{ borderColor: '#18263A !important' }}>
            <button className="btn w-100 d-flex align-items-center gap-3 px-3 py-2 text-decoration-none border-0 nav-link-custom logout-btn">
              <LogOut size={20} strokeWidth={2} style={{ minWidth: '20px' }} />
              <span className="text-nowrap">Logout</span>
            </button>
          </div>
        </aside>

        {/* ================= MAIN CONTENT AREA ================= */}
        <main className="flex-grow-1 overflow-auto position-relative z-0 w-100">
          <div className="p-4 p-md-5 mt-5 mt-md-0">
            {children}
          </div>
        </main>
        
      </div>
    </>
  );
};

export default Sidebar;