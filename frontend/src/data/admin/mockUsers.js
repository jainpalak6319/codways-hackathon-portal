export const users = [
  { id: 'u_001', name: 'Admin User', email: 'admin@devdash.io', role: 'Super Admin', status: 'Active', lastActive: '2025-06-02T08:00:00' },
  { id: 'u_002', name: 'Sarah Johnson', email: 'sarah.johnson@devdash.io', role: 'Judge', status: 'Active', lastActive: '2025-06-01T15:20:00' },
  { id: 'u_003', name: 'Michael Torres', email: 'michael.torres@devdash.io', role: 'Judge', status: 'Active', lastActive: '2025-05-30T11:05:00' },
  { id: 'u_004', name: 'Priya Nair', email: 'priya.nair@devdash.io', role: 'Moderator', status: 'Pending', lastActive: '--' },
  { id: 'u_005', name: 'Aarav Sharma', email: 'aarav.sharma@mail.com', role: 'Participant', status: 'Active', lastActive: '2025-06-02T07:40:00' },
  { id: 'u_006', name: 'Emily Chen', email: 'emily.chen@mail.com', role: 'Participant', status: 'Suspended', lastActive: '2025-05-15T10:00:00' },
];

export const roles = [
  { id: 'r_001', name: 'Super Admin', description: 'Full access to all modules and settings', users: 1, permissions: ['all'] },
  { id: 'r_002', name: 'Moderator', description: 'Manage hackathons, participants and announcements', users: 3, permissions: ['hackathons:view','hackathons:edit','participants:view','announcements:view','announcements:edit'] },
  { id: 'r_003', name: 'Judge', description: 'Review and score submissions assigned to them', users: 12, permissions: ['submissions:view','submissions:score'] },
  { id: 'r_004', name: 'Participant', description: 'Register, form teams and submit projects', users: 1248, permissions: ['profile:edit','submissions:create'] },
];

export const permissionModules = [
  { module: 'Dashboard', actions: ['view'] },
  { module: 'Hackathons', actions: ['view','create','edit','delete'] },
  { module: 'Participants', actions: ['view','edit','delete'] },
  { module: 'Judges', actions: ['view','invite','remove'] },
  { module: 'Submissions', actions: ['view','score','export'] },
  { module: 'Announcements', actions: ['view','create','edit','delete'] },
  { module: 'Users', actions: ['view','create','edit','delete'] },
  { module: 'Settings', actions: ['view','edit'] },
];
