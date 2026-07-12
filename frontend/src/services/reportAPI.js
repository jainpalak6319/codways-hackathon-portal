import { mockDelay } from './api';
import { registrationData } from '../data/admin/mockDashboard';
import { hackathons } from '../data/admin/mockHackathons';

export async function getReportsOverview() {
  const submissionsByHackathon = hackathons.map((h) => ({ name: h.name, submissions: h.submissions, participants: h.participants }));
  return mockDelay({ registrationTrend: registrationData, submissionsByHackathon });
}
