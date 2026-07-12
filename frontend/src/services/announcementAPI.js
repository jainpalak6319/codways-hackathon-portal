import { mockDelay } from './api';
import { announcements } from '../data/admin/mockAnnouncements';

export async function getAnnouncements() { return mockDelay(announcements); }
export async function createAnnouncement(payload) { return mockDelay({ id: `a_${Date.now()}`, status: 'Draft', ...payload }); }
export async function publishAnnouncement(id) { return mockDelay({ id, status: 'Published' }); }
export async function deleteAnnouncement(id) { return mockDelay({ success: true, id }); }
