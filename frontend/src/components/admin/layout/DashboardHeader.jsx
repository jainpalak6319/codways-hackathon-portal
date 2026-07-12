import { MdOutlineCalendarToday, MdKeyboardArrowDown } from 'react-icons/md';
import { useSelector } from "react-redux";


export default function DashboardHeader() {
  const { user } = useSelector((state) => state.auth);

const firstName = user?.name?.split(" ")[0] || "Admin";

  return (
    <div className="page-header-row">
      <div>
        <h1 className="page-title">Welcome back, {firstName} 👋</h1>
        <p className="page-subtitle mb-0">Here's an overview of all hackathons and activities.</p>
      </div>
      <button className="btn-outline-soft" type="button">
        <MdOutlineCalendarToday />
        22 May – 29 May 2025
        <MdKeyboardArrowDown />
      </button>
    </div>
  );
}
