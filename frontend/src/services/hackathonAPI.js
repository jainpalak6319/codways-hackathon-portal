import { mockDelay } from './api';
import { hackathons } from '../data/admin/mockHackathons';

export async function getHackathons() {
  return mockDelay(hackathons);
}
export async function getHackathonById(id) {
  return mockDelay(hackathons.find((h) => h.id === id));
}
export async function createHackathon(payload) {
  return mockDelay({ id: `hk_${Date.now()}`, ...payload });
}
export async function updateHackathon(id, payload) {
  return mockDelay({ id, ...payload });
}
export async function deleteHackathon(id) {
  return mockDelay({ success: true, id });
}
