import { mockDelay } from './api';
import { submissions } from '../data/admin/mockSubmissions';

export async function getSubmissions() { return mockDelay(submissions); }
export async function updateSubmissionStatus(id, status) { return mockDelay({ id, status }); }
