// import { Outlet } from "react-router-dom";
// import { useState } from "react";
// import { Menu } from "lucide-react";
// import Sidebar from "../components/participant/Sidebar";
// import Footer from "../components/layout/Footer/Footer";

// export default function ParticipantLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen bg-[#F4F7FE] overflow-hidden font-sans">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <main className="flex-1 overflow-y-auto w-full relative z-0 transition-all duration-400">
//         {/* Mobile menu button (sidebar has no header of its own anymore) */}
//         <div className="md:hidden flex items-center justify-between p-4 bg-[#0A1220] text-white">
//           <h2 className="text-xl font-extrabold tracking-wide">CODEWAYS</h2>
//           <button onClick={() => setSidebarOpen(true)}>
//             <Menu size={26} />
//           </button>
//         </div>

//         <div className="p-6 md:p-8">
//           <Outlet />
//         </div>

//         <Footer />
//       </main>
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
import Sidebar from "../components/participant/Sidebar";
import Footer from "../components/layout/Footer/Footer";

export default function ParticipantLayout() {
  return (
    <Sidebar>
      <Outlet />
      {/* <Footer /> */}
    </Sidebar>
  );
}