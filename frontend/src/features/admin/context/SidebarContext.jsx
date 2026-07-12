import { createContext, useContext, useEffect, useState } from 'react';

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);   // tablet icon-only mode
  const [mobileOpen, setMobileOpen] = useState(false);  // mobile drawer

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w < 992) {
        setMobileOpen(false);
      }
      if (w >= 992 && w < 1200) {
        setCollapsed(true);
      } else if (w >= 1200) {
        setCollapsed(false);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapsed = () => setCollapsed((c) => !c);
  const toggleMobile = () => setMobileOpen((o) => !o);
  const closeMobile = () => setMobileOpen(false);

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed, mobileOpen, toggleMobile, closeMobile }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
}
