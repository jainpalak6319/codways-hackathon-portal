import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, Compass, Users, Radio, Award, User, 
  LogOut, Menu, X 
} from 'lucide-react';

const Sidebar = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // New state for desktop mini-sidebar
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/participant/dashboard' },
    { name: 'Explorer', icon: Compass, path: '/participant/explorer' },
    { name: 'My Team', icon: Users, path: '/participant/team' },
    { name: 'Application Tracker', icon: Radio, path: '/participant/tracker' },
    { name: 'Submission', icon: Radio, path: '/participant/submissions' },
    { name: 'Certificates', icon: Award, path: '/participant/certificates' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const closeSidebar = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <style>
        {`
          /* Sidebar Base Styles & Transitions */
          .sidebar-wrapper {
            width: 240px;
            background-color: #0A1220;
            transition: width 0.3s ease-in-out, transform 0.3s ease-in-out;
            z-index: 1050;
          }
          
          /* Mini Sidebar (Collapsed Desktop State) */
          .sidebar-wrapper.collapsed {
            width: 88px;
          }
          .sidebar-wrapper.collapsed .nav-text,
          .sidebar-wrapper.collapsed .logo-text {
            display: none;
            opacity: 0;
          }

          /* Mobile Specific Styles */
          @media (max-width: 767.98px) {
            .sidebar-wrapper {
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              width: 260px !important; /* Fixed width on mobile */
              box-shadow: 4px 0 15px rgba(0,0,0,0.5);
            }
            .sidebar-closed {
              transform: translateX(-105%) !important; 
            }
          }

          /* Scrollbar Hiding */
          .hide-scroll::-webkit-scrollbar {
            display: none;
          }
          .hide-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          /* Nav Links Default */
          .nav-link-custom {
            color: #7A8A9E;
            border-radius: 12px;
            transition: all 0.2s ease-in-out;
            font-weight: 500;
            font-size: 14.5px;
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.85rem 1.25rem;
            white-space: nowrap;
            overflow: hidden;
          }

          /* Nav Links Collapsed (Icon-Only Mode) */
          .sidebar-wrapper.collapsed .nav-link-custom {
            justify-content: center;
            padding: 0;
            width: 50px;
            height: 50px;
            margin: 0 auto;
            border-radius: 16px; /* Squarish rounded corners like image 2 */
          }

          /* Nav Link Hover & Active */
          .nav-link-custom:hover {
            color: #ffffff;
            background-color: rgba(255, 255, 255, 0.05);
          }
          .nav-link-custom.active {
            background-color: #00C2B2 !important;
            color: #ffffff !important;
            box-shadow: 0 4px 15px rgba(0, 194, 178, 0.25);
          }

          /* Logout Button Specifics */
          .logout-btn {
            color: #7A8A9E;
            transition: all 0.2s ease-in-out;
          }
          .logout-btn:hover {
            color: #F87171 !important;
            background-color: rgba(248, 113, 113, 0.1) !important;
          }
          .sidebar-wrapper.collapsed .bottom-section {
            padding: 1rem 0 !important;
            display: flex;
            justify-content: center;
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
            onClick={() => setIsMobileMenuOpen(true)}
            className="btn btn-link text-white p-0 border-0"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* ================= MOBILE MENU BACKDROP ================= */}
        {isMobileMenuOpen && (
          <div 
            className="d-md-none fixed-top w-100 h-100"
            style={{ backgroundColor: 'rgba(10, 18, 32, 0.6)', backdropFilter: 'blur(4px)', zIndex: 1030 }}
            onClick={closeSidebar}
          />
        )}

        {/* ================= SIDEBAR ================= */}
        <aside className={`d-flex flex-column flex-shrink-0 sidebar-wrapper ${!isMobileMenuOpen ? 'sidebar-closed' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
          
          {/* Mobile Close Button */}
          <div className="d-flex d-md-none align-items-center justify-content-between p-4 pb-2 border-bottom border-secondary">
             <h2 className="m-0 fs-5 fw-black text-white tracking-wide">MENU</h2>
             <button onClick={closeSidebar} className="btn btn-link text-white p-0 border-0">
               <X size={28} />
             </button>
          </div>

          {/* Logo Section (Desktop) */}
          <div className={`d-none d-md-block pt-4 pb-4 ${isCollapsed ? 'px-0 text-center' : 'px-4'} overflow-hidden transition-all`}>
            <div className={`d-flex align-items-center ${isCollapsed ? 'justify-content-center' : 'gap-3'}`}>
              <div 
                className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" 
                style={{ width: '40px', height: '40px', backgroundColor: '#00C2B2', transform: 'rotate(45deg)', boxShadow: '0 0 20px rgba(0,194,178,0.25)' }}
              >
                <div style={{ width: '14px', height: '14px', border: '2.5px solid white', borderRadius: '2px', transform: 'rotate(-45deg)' }}></div>
              </div>
              <div className="d-flex flex-column justify-content-center mt-1 logo-text">
                <h2 className="m-0 fs-5 fw-black text-white lh-1 tracking-wide">CODEWAYS</h2>
                <p className="m-0 fw-bold text-uppercase mt-1" style={{ fontSize: '9px', color: '#00C2B2', letterSpacing: '0.15em' }}>
                  Hackathon Portal
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="nav flex-column flex-grow-1 px-3 gap-2 overflow-auto hide-scroll mt-2 mt-md-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                title={isCollapsed ? item.name : ""} // Adds tooltip when collapsed!
                onClick={closeSidebar}
                className={({ isActive }) => `nav-link text-decoration-none nav-link-custom ${isActive ? 'active' : ''}`}
              >
                {({ isActive }) => (
                  <>
                    <item.icon 
                      size={22} 
                      strokeWidth={isActive ? 2.5 : 2}
                      className="flex-shrink-0"
                    />
                    <span className="nav-text">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Logout Section */}
          <div className="p-3 bottom-section border-top" style={{ borderColor: '#18263A !important' }}>
            <button 
              onClick={handleLogout} 
              title={isCollapsed ? "Logout" : ""}
              className="btn w-100 border-0 nav-link-custom logout-btn m-0"
            >
              <LogOut size={22} strokeWidth={2} className="flex-shrink-0" />
              <span className="nav-text">Logout</span>
            </button>
          </div>
        </aside>

        {/* ================= MAIN CONTENT AREA ================= */}
        <main 
          className="flex-grow-1 overflow-auto position-relative z-0 w-100 d-flex flex-column"
          onClick={() => { if (isMobileMenuOpen) closeSidebar(); }}
        >
          {/* Desktop Toggle Header (Like your 1st image) */}
          <div className="d-none d-md-flex align-items-center bg-white px-4 py-3 shadow-sm" style={{ zIndex: 10 }}>
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="btn btn-link text-dark p-0 border-0 d-flex align-items-center justify-content-center"
            >
              <Menu size={28} />
            </button>
          </div>

          {/* Content Wrapper */}
          <div className="p-4 p-md-5 mt-5 mt-md-0 flex-grow-1">
            {children}
          </div>
        </main>
        
      </div>
    </>
  );
};

export default Sidebar;