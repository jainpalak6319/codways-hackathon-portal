import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Compass, Users, Radio, Award, User, 
  LogOut, Menu, X 
} from 'lucide-react';

const StudentSidebar = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Added Profile to the main menu list
  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/student/dashboard' },
    { name: 'Explorer', icon: Compass, path: '/student/explorer' },
    { name: 'My Team', icon: Users, path: '/student/team' },
    { name: 'Application Tracker', icon: Radio, path: '/student/tracker' },
    { name: 'Submission', icon: Radio, path: '/student/submissions' },
    { name: 'Certificates', icon: Award, path: '/student/certificates' },
    { name: 'Profile', icon: User, path: '/student/profile' }, 
  ];

  return (
    <div className="flex h-screen bg-[#F4F7FE] overflow-hidden font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-[#0A1220] z-50 flex items-center justify-between p-4 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00C2B2] rounded-lg flex items-center justify-center transform rotate-45">
            <div className="w-3.5 h-3.5 border-2 border-white rounded-sm -rotate-45"></div>
          </div>
          <h2 className="text-xl font-extrabold tracking-wide text-white">CODEWAYS</h2>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white transition-colors duration-300"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-[#0A1220]/60 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Width reduced to 230px */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col bg-[#0A1220] 
          transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-all duration-400 ease-in-out md:w-[230px] w-[230px]`}
      >
        
        {/* Logo Section */}
        <div className="pt-10 pb-10 px-6 hidden md:block overflow-hidden">
          <div className="flex items-center gap-3.5 whitespace-nowrap">
            {/* Logo Icon */}
            <div className="min-w-[40px] w-[40px] h-[40px] bg-[#00C2B2] rounded-xl flex items-center justify-center transform rotate-45 shadow-[0_0_20px_rgba(0,194,178,0.25)]">
              <div className="w-3.5 h-3.5 border-[2.5px] border-white rounded-sm -rotate-45"></div>
            </div>
            
            {/* Logo Text */}
            <div className="flex flex-col justify-center mt-1">
              <h2 className="text-[20px] font-black tracking-wide text-white leading-tight">CODEWAYS</h2>
              <p className="text-[9px] font-bold text-[#00C2B2] uppercase tracking-[0.15em] mt-0.5">Hackathon Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation - Hidden Scrollbar */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3.5 rounded-[12px] transition-all duration-300 ease-in-out group ${
                  isActive
                    ? 'bg-[#00C2B2] text-white shadow-[0_4px_15px_rgba(0,194,178,0.25)]'
                    : 'text-[#7A8A9E] hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    size={20} 
                    strokeWidth={isActive ? 2.5 : 2}
                    className={`min-w-[20px] transition-transform duration-300 ${!isActive && 'group-hover:scale-110'}`} 
                  />
                  
                  <span className="font-medium text-[14.5px] whitespace-nowrap">
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Logout Section */}
        <div className="p-5 mt-auto border-t border-[#18263A]">
          <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-[12px] transition-all duration-300 ease-in-out group text-[#7A8A9E] hover:text-[#F87171] hover:bg-[#F87171]/10">
            <LogOut 
              size={20} 
              strokeWidth={2}
              className="min-w-[20px] transition-transform duration-300 group-hover:-translate-x-1" 
            />
            <span className="font-medium text-[14.5px] whitespace-nowrap">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pt-20 md:pt-0 w-full relative z-0 transition-all duration-400">
        <div className="p-6 md:p-8">
           {children}
        </div>
      </main>
    </div>
  );
};

export default StudentSidebar;