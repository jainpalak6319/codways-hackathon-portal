const names = ['Aarav Sharma','Emily Chen','Liam Johnson','Sofia Garcia','Noah Kim','Ava Patel','Ethan Wright','Maya Rodriguez','Lucas Brown','Isla Thompson','Ryan Mehta','Grace Lee','Daniel Okafor','Zara Ahmed','Mason Clark'];
const colleges = ['MIT','Stanford University','UC Berkeley','IIT Bombay','Georgia Tech','CMU','University of Toronto','NUS','ETH Zurich','UCLA'];

export const participants = names.map((name, i) => ({
  id: `p_${String(i + 1).padStart(3, '0')}`,
  name,
  email: name.toLowerCase().replace(/ /g, '.') + '@mail.com',
  college: colleges[i % colleges.length],
  hackathon: ['Code the Future 2025','Innovate to Elevate','Build Beyond Limits'][i % 3],
  team: i % 4 === 0 ? '--' : ['CodeCrafters','Tech Titans','Innovative Minds','Binary Builders','Dev Dynasty'][i % 5],
  registeredOn: `2025-0${(i % 5) + 1}-${(i % 27) + 1}`,
  status: ['Active','Active','Pending','Active'][i % 4],
}));
