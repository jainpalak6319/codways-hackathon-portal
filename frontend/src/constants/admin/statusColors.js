// Central status -> color mapping so every page/component stays visually consistent
export const HACKATHON_STATUS = {
  Upcoming:  { bg: '#EFF3FF', text: '#2563EB' },
  Draft:     { bg: '#FEF6E7', text: '#B45309' },
  'In Progress': { bg: '#E6FAFB', text: '#0E7C86' },
  Running:   { bg: '#E6FAFB', text: '#0E7C86' },
  Completed: { bg: '#E9FBF0', text: '#15803D' },
  Cancelled: { bg: '#FDECEC', text: '#B91C1C' },
};

export const SUBMISSION_STATUS = {
  Submitted: { bg: '#E9FBF0', text: '#15803D' },
  Pending:   { bg: '#FEF6E7', text: '#B45309' },
  'Under Review': { bg: '#EFF3FF', text: '#2563EB' },
  Rejected:  { bg: '#FDECEC', text: '#B91C1C' },
  Shortlisted: { bg: '#F2EEFE', text: '#6D28D9' },
};

export const JUDGE_STATUS = {
  Active:   { bg: '#E9FBF0', text: '#15803D' },
  Invited:  { bg: '#FEF6E7', text: '#B45309' },
  Inactive: { bg: '#F3F4F6', text: '#6B7280' },
};

export const USER_STATUS = {
  Active:   { bg: '#E9FBF0', text: '#15803D' },
  Suspended:{ bg: '#FDECEC', text: '#B91C1C' },
  Pending:  { bg: '#FEF6E7', text: '#B45309' },
};

export const ANNOUNCEMENT_STATUS = {
  Published: { bg: '#E9FBF0', text: '#15803D' },
  Scheduled: { bg: '#EFF3FF', text: '#2563EB' },
  Draft:     { bg: '#F3F4F6', text: '#6B7280' },
};

export function getStatusStyle(status, map) {
  return map[status] || { bg: '#F3F4F6', text: '#6B7280' };
}
