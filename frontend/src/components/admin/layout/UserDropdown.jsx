import {
  MdKeyboardArrowDown,
  MdOutlinePerson,
  MdOutlineSettings,
  MdLogout,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DropdownMenu from "../common/DropdownMenu";
import Avatar from "../common/Avatar";

import { logout } from "../../../features/auth/authSlice";

export default function UserDropdown() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <DropdownMenu
      panelStyle={{ width: 200 }}
      trigger={(open) => (
        <div className="dd-user-trigger" aria-expanded={open}>
          <Avatar
            name={user?.name || "Admin"}
            size={36}
          />

          <div style={{ lineHeight: 1.2 }}>
            <div className="dd-user-name">
              {user?.name || "Admin"}
            </div>

            <div className="dd-user-role">
              {user?.role || "Admin"}
            </div>
          </div>

          <MdKeyboardArrowDown color="var(--text-muted)" />
        </div>
      )}
    >
      <div
        className="dd-menu-item"
        onClick={() => navigate("/admin/profile")}
      >
        <MdOutlinePerson />
        My Profile
      </div>

      <div
        className="dd-menu-item"
        onClick={() => navigate("/admin/settings")}
      >
        <MdOutlineSettings />
        Settings
      </div>

      <div className="dd-menu-divider" />

      <div
        className="dd-menu-item"
        style={{ color: "var(--red)" }}
        onClick={handleLogout}
      >
        <MdLogout />
        Logout
      </div>
    </DropdownMenu>
  );
}