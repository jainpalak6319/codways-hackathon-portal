import {
  MdDashboard, MdOutlineEmojiEvents, MdOutlinePeople, MdOutlineGavel,
  MdOutlineGroups, MdOutlineUploadFile, MdOutlineCampaign, MdOutlineAnalytics,
  MdOutlinePersonOutline, MdOutlineAdminPanelSettings, MdOutlineSettings
} from 'react-icons/md';

export const MAIN_MENU = [
  {
    title: "Dashboard",
    icon: MdDashboard,
    route: "/admin/dashboard",
    permission: "dashboard:view",
  },
  {
    title: "Hackathons",
    icon: MdOutlineEmojiEvents,
    route: "/admin/hackathons",
    permission: "hackathons:view",
  },
  {
    title: "Participants",
    icon: MdOutlinePeople,
    route: "/admin/participants",
    permission: "participants:view",
  },
  {
    title: "Judges",
    icon: MdOutlineGavel,
    route: "/admin/judges",
    permission: "judges:view",
  },
  {
    title: "Teams",
    icon: MdOutlineGroups,
    route: "/admin/teams",
    permission: "teams:view",
  },
  {
    title: "Submissions",
    icon: MdOutlineUploadFile,
    route: "/admin/submissions",
    permission: "submissions:view",
  },
  {
    title: "Announcements",
    icon: MdOutlineCampaign,
    route: "/admin/announcements",
    permission: "announcements:view",
  },
  {
    title: "Reports & Analytics",
    icon: MdOutlineAnalytics,
    route: "/admin/reports",
    permission: "reports:view",
  },
];

export const SYSTEM_MENU = [
  {
    title: "Users",
    icon: MdOutlinePersonOutline,
    route: "/admin/users",
    permission: "users:view",
  },
  {
    title: "Roles & Permissions",
    icon: MdOutlineAdminPanelSettings,
    route: "/admin/roles",
    permission: "roles:view",
  },
  {
    title: "Settings",
    icon: MdOutlineSettings,
    route: "/admin/settings",
    permission: "settings:view",
  },
];

