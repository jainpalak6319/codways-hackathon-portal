import { mockDelay } from './api';
import { judges } from '../data/admin/mockJudges';

export async function getJudges() { return mockDelay(judges); }
export async function inviteJudge(payload) { return mockDelay({ id: `j_${Date.now()}`, status: 'Invited', ...payload }); }
export async function removeJudge(id) { return mockDelay({ success: true, id }); }
