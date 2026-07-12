export const hackathons = [
  { id: 'hk_001', name: 'Code the Future 2025', banner: '🚀', color: '#2563EB', startDate: '2025-05-10', endDate: '2025-05-25', participants: 320, submissions: 180, status: 'In Progress', mode: 'Hybrid', location: 'San Francisco, CA' },
  { id: 'hk_002', name: 'Innovate to Elevate', banner: '💡', color: '#8B5CF6', startDate: '2025-06-01', endDate: '2025-06-20', participants: 210, submissions: 95, status: 'Upcoming', mode: 'Online', location: 'Remote' },
  { id: 'hk_003', name: 'Build Beyond Limits', banner: '🏗️', color: '#F59E0B', startDate: '2025-04-05', endDate: '2025-04-30', participants: 280, submissions: 210, status: 'Completed', mode: 'Onsite', location: 'Austin, TX' },
  { id: 'hk_004', name: 'AI Revolution Hack', banner: '🤖', color: '#22C55E', startDate: '2025-07-15', endDate: '2025-07-30', participants: 0, submissions: 0, status: 'Draft', mode: 'Online', location: 'Remote' },
  { id: 'hk_005', name: 'Green Tech Sprint', banner: '🌱', color: '#22C55E', startDate: '2025-03-01', endDate: '2025-03-15', participants: 175, submissions: 140, status: 'Completed', mode: 'Hybrid', location: 'Seattle, WA' },
  { id: 'hk_006', name: 'FinTech Forward', banner: '💳', color: '#2563EB', startDate: '2025-08-10', endDate: '2025-08-25', participants: 90, submissions: 0, status: 'Upcoming', mode: 'Online', location: 'Remote' },
  { id: 'hk_007', name: 'HealthHack Summit', banner: '🩺', color: '#EF4444', startDate: '2025-02-01', endDate: '2025-02-14', participants: 260, submissions: 199, status: 'Cancelled', mode: 'Onsite', location: 'Boston, MA' },
];

export const getHackathonById = (id) => hackathons.find((h) => h.id === id);
