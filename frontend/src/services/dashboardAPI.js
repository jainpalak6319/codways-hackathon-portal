import { mockDelay } from './api';
import { dashboardStats, registrationData, recentSubmissions, recentActivity } from '../data/admin/mockDashboard';
import { hackathons } from '../data/admin/mockHackathons';

// Matches documented response shape:
// GET /api/admin/dashboard -> { stats, chart, hackathons, recentSubmissions, recentActivity }
export async function getDashboardData() {
  const payload = {
    stats: dashboardStats,
    chart: registrationData,
    hackathons: hackathons.slice(0, 4),
    recentSubmissions,
    recentActivity,
  };
  return mockDelay(payload);
  // Real version:
  // const { data } = await api.get('/admin/dashboard');
  // return data;
}
