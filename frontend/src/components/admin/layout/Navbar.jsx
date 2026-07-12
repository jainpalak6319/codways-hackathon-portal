import { MdMenu } from 'react-icons/md';
import SearchBar from '../common/SearchBar';
import NotificationMenu from './NotificationMenu';
import UserDropdown from './UserDropdown';
import { useSidebar } from "../../../features/admin/context/SidebarContext";
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const { toggleMobile, toggleCollapsed } = useSidebar();
  const [search, setSearch] = useState('');

  const handleBurgerClick = () => {
    if (window.innerWidth < 992) toggleMobile();
    else toggleCollapsed();
  };

  return (
    <header className="dd-navbar">
      <div className="dd-navbar-left">
        <button className="dd-navbar-burger" onClick={handleBurgerClick} aria-label="Toggle sidebar">
          <MdMenu />
        </button>
        <div className="dd-navbar-search">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>
      <div className="dd-navbar-right">
        <NotificationMenu />
        <UserDropdown />
      </div>
    </header>
  );
}
