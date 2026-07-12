import { mockDelay } from './api';
import { users, roles, permissionModules } from '../data/admin/mockUsers';

export async function getUsers() { return mockDelay(users); }
export async function getRoles() { return mockDelay(roles); }
export async function getPermissionModules() { return mockDelay(permissionModules); }
export async function updateUserStatus(id, status) { return mockDelay({ id, status }); }
