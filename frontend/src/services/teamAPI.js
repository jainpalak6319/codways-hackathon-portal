import { mockDelay } from './api';
import { teams } from '../data/admin/mockTeams';

export async function getTeams() { return mockDelay(teams); }
