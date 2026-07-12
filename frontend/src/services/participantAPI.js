import { mockDelay } from './api';
import { participants } from '../data/admin/mockParticipants';

export async function getParticipants() { return mockDelay(participants); }
export async function deleteParticipant(id) { return mockDelay({ success: true, id }); }
