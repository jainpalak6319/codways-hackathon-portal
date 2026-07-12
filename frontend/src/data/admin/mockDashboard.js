export const dashboardStats = [
  { key: 'hackathons', title: 'Total Hackathons', value: 12, subtitle: '4 Upcoming', color: 'primary', icon: 'calendar' },
  { key: 'participants', title: 'Total Participants', value: 1248, subtitle: '+127 this week', color: 'purple', icon: 'people' },
  { key: 'submissions', title: 'Total Submissions', value: 642, subtitle: '+58 this week', color: 'orange', icon: 'file' },
  { key: 'judges', title: 'Total Judges', value: 48, subtitle: '8 Active', color: 'green', icon: 'judge' },
  { key: 'completed', title: 'Completed Hackathons', value: 6, subtitle: 'This Year', color: 'teal', icon: 'trophy' },
];

export const registrationData = [
  { month: 'Jan', participants: 120 },
  { month: 'Feb', participants: 190 },
  { month: 'Mar', participants: 260 },
  { month: 'Apr', participants: 400 },
  { month: 'May', participants: 1248 },
  { month: 'Jun', participants: 700 },
  { month: 'Jul', participants: 610 },
  { month: 'Aug', participants: 760 },
  { month: 'Sep', participants: 880 },
  { month: 'Oct', participants: 820 },
  { month: 'Nov', participants: 900 },
  { month: 'Dec', participants: 960 },
];

export const recentSubmissions = [
  { id: 's_001', team: 'CodeCrafters', hackathon: 'Code the Future 2025', submittedAt: '2025-06-02T06:00:00', status: 'Submitted' },
  { id: 's_002', team: 'Tech Titans', hackathon: 'Innovate to Elevate', submittedAt: '2025-06-02T03:00:00', status: 'Submitted' },
  { id: 's_003', team: 'Innovative Minds', hackathon: 'Build Beyond Limits', submittedAt: '2025-06-01T08:00:00', status: 'Submitted' },
  { id: 's_004', team: 'Binary Builders', hackathon: 'Code the Future 2025', submittedAt: '2025-05-31T09:00:00', status: 'Submitted' },
  { id: 's_005', team: 'Dev Dynasty', hackathon: 'Innovate to Elevate', submittedAt: '2025-05-30T07:00:00', status: 'Submitted' },
];

export const recentActivity = [
  { id: 'ac_001', type: 'hackathon', text: 'New hackathon "AI Revolution Hack" created', by: 'Admin User', time: '2025-06-02T07:00:00' },
  { id: 'ac_002', type: 'judge', text: 'Judge Sarah Johnson accepted the invitation', by: 'System', time: '2025-06-02T05:00:00' },
  { id: 'ac_003', type: 'announcement', text: 'Announcement "Registration Deadline Extended" published', by: 'Admin User', time: '2025-06-02T03:00:00' },
  { id: 'ac_004', type: 'submission', text: '60 new submissions received for "Code the Future 2025"', by: 'System', time: '2025-06-01T08:00:00' },
  { id: 'ac_005', type: 'hackathon', text: 'Hackathon "Build Beyond Limits" marked as completed', by: 'Admin User', time: '2025-05-31T06:00:00' },
];

export const quickActions = [
  { key: 'create-hackathon', title: 'Create Hackathon', icon: 'calendar', color: 'primary', route: '/admin/hackathons?new=1' },
  { key: 'manage-users', title: 'Manage Users', icon: 'people', color: 'purple', route: '/admin/users' },
  { key: 'invite-judge', title: 'Invite Judges', icon: 'judge', color: 'orange', route: '/admin/judges?invite=1' },
  { key: 'view-reports', title: 'View Reports', icon: 'chart', color: 'teal', route: '/admin/reports' },
  { key: 'announcements', title: 'Announcements', icon: 'announce', color: 'green', route: '/admin/announcements?new=1' },
  { key: 'settings', title: 'Settings', icon: 'settings', color: 'slate', route: '/admin/settings' },
];
