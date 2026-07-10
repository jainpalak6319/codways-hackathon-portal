import { useState } from 'react';
import { 
  MapPin, Mail, Globe, GitBranch, Link as LinkIcon, Briefcase, 
  GraduationCap, Edit2, Camera, Check, Award, Code
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // MOCK DATA: Student Profile
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    role: "Full-Stack Developer",
    location: "Haryana, India",
    email: "alex.j@example.com",
    bio: "Passionate builder and Generative AI enthusiast. I specialize in the MERN stack and love creating gamified educational platforms. Always looking for the next big hackathon to test my limits.",
    skills: ["React.js", "Node.js", "MongoDB", "Express", "WebRTC", "Three.js", "Python"],
    education: {
      degree: "B.Tech Computer Science Engineering",
      college: "Geeta University",
      year: "2023 - 2027"
    },
    socials: {
      github: "github.com/alexj",
      linkedin: "linkedin.com/in/alexj",
      portfolio: "alexbuilds.dev"
    }
  });

  const handleSave = () => {
    // In production, trigger an API call to MongoDB here
    setIsEditing(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-6 lg:p-8 min-h-screen bg-slate-50 text-slate-600 font-sans animate-fade-in pb-20">
      
      {/* ================= PAGE HEADER ================= */}
      <div className="flex justify-between items-end mb-8 relative z-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
            My Profile
          </h1>
          <p className="text-slate-500">Manage your personal details and public developer portfolio.</p>
        </div>
        
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm ${
            isEditing 
            ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
          }`}
        >
          {isEditing ? <><Check size={16} /> Save Changes</> : <><Edit2 size={16} /> Edit Profile</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ================= LEFT COLUMN: IDENTITY ================= */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Identity Card */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            {/* Banner Gradient */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-teal-500 relative">
              {isEditing && (
                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-colors">
                  <Camera size={18} />
                </button>
              )}
            </div>
            
            <div className="p-8 pt-0 flex flex-col items-center text-center relative">
              {/* Overlapping Avatar */}
              <div className="w-28 h-28 bg-white p-1.5 rounded-full -mt-14 mb-4 relative group">
                <div className="w-full h-full bg-slate-100 rounded-full border border-slate-200 overflow-hidden">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                {isEditing && (
                  <div className="absolute inset-1.5 rounded-full bg-slate-900/40 flex items-center justify-center text-white cursor-pointer hover:bg-slate-900/50 transition-colors">
                    <Camera size={24} />
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="w-full space-y-3">
                  <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full text-center text-xl font-bold text-slate-900 border-b border-slate-300 focus:border-blue-500 focus:outline-none pb-1 bg-transparent" />
                  <input type="text" value={profile.role} onChange={(e) => setProfile({...profile, role: e.target.value})} className="w-full text-center text-sm font-semibold text-blue-600 border-b border-slate-300 focus:border-blue-500 focus:outline-none pb-1 bg-transparent" />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-extrabold text-slate-900">{profile.name}</h2>
                  <p className="text-sm font-bold text-blue-600 mt-1 uppercase tracking-wider">{profile.role}</p>
                </>
              )}
              
              <div className="w-full mt-6 pt-6 border-t border-slate-100 space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <MapPin size={18} className="text-slate-400" />
                  {isEditing ? <input type="text" value={profile.location} onChange={(e) => setProfile({...profile, location: e.target.value})} className="flex-1 border-b border-slate-300 focus:border-blue-500 focus:outline-none pb-1 bg-transparent" /> : <span>{profile.location}</span>}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail size={18} className="text-slate-400" />
                  {isEditing ? <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="flex-1 border-b border-slate-300 focus:border-blue-500 focus:outline-none pb-1 bg-transparent" /> : <span>{profile.email}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links Card */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8">
            <h3 className="font-bold text-slate-900 mb-6">Social Links</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <GitBranch size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GitHub</p>
                  {isEditing ? <input type="text" value={profile.socials.github} onChange={(e) => setProfile({...profile, socials: {...profile.socials, github: e.target.value}})} className="w-full text-sm font-semibold text-slate-700 border-b border-slate-300 focus:border-blue-500 focus:outline-none pb-1 bg-transparent" /> : <p className="text-sm font-semibold text-slate-700">{profile.socials.github}</p>}
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <LinkIcon size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LinkedIn</p>
                  {isEditing ? <input type="text" value={profile.socials.linkedin} onChange={(e) => setProfile({...profile, socials: {...profile.socials, linkedin: e.target.value}})} className="w-full text-sm font-semibold text-slate-700 border-b border-slate-300 focus:border-blue-500 focus:outline-none pb-1 bg-transparent" /> : <p className="text-sm font-semibold text-slate-700">{profile.socials.linkedin}</p>}
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <Globe size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Portfolio</p>
                  {isEditing ? <input type="text" value={profile.socials.portfolio} onChange={(e) => setProfile({...profile, socials: {...profile.socials, portfolio: e.target.value}})} className="w-full text-sm font-semibold text-slate-700 border-b border-slate-300 focus:border-blue-500 focus:outline-none pb-1 bg-transparent" /> : <p className="text-sm font-semibold text-slate-700">{profile.socials.portfolio}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: DETAILS ================= */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Bio Section */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Briefcase size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">About Me</h3>
            </div>
            
            {isEditing ? (
              <textarea 
                value={profile.bio} 
                onChange={(e) => setProfile({...profile, bio: e.target.value})} 
                className="w-full h-32 p-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none text-slate-700 transition-all outline-none"
              ></textarea>
            ) : (
              <p className="text-slate-600 leading-relaxed">{profile.bio}</p>
            )}
          </div>

          {/* Skills Grid */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 md:p-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <Code size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Tech Stack</h3>
              </div>
              {isEditing && <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-lg">Comma separated</span>}
            </div>
            
            {isEditing ? (
              <input 
                type="text" 
                value={profile.skills.join(", ")} 
                onChange={(e) => setProfile({...profile, skills: e.target.value.split(",").map(s => s.trim())})} 
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-700 transition-all outline-none"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, idx) => (
                  <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-sm shadow-sm hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Education & Achievements (Bento Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <GraduationCap size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Education</h3>
              </div>
              <div className="space-y-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <input type="text" value={profile.education.degree} onChange={(e) => setProfile({...profile, education: {...profile.education, degree: e.target.value}})} className="w-full font-bold text-slate-900 border-b border-slate-300 focus:border-blue-500 outline-none pb-1 bg-transparent" />
                    <input type="text" value={profile.education.college} onChange={(e) => setProfile({...profile, education: {...profile.education, college: e.target.value}})} className="w-full text-sm font-medium text-slate-500 border-b border-slate-300 focus:border-blue-500 outline-none pb-1 bg-transparent" />
                    <input type="text" value={profile.education.year} onChange={(e) => setProfile({...profile, education: {...profile.education, year: e.target.value}})} className="w-full text-xs font-bold text-slate-400 border-b border-slate-300 focus:border-blue-500 outline-none pb-1 bg-transparent" />
                  </div>
                ) : (
                  <>
                    <h4 className="font-bold text-slate-900">{profile.education.degree}</h4>
                    <p className="text-sm font-medium text-slate-500">{profile.education.college}</p>
                    <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">{profile.education.year}</p>
                  </>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-[2rem] border border-slate-800 shadow-xl p-8 text-white h-full relative overflow-hidden flex flex-col justify-center">
              <div className="absolute -right-4 -top-4 text-white/5">
                <Award size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Hackathon Stats</h3>
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-5xl font-black text-amber-400">3</span>
                  <span className="text-sm text-slate-300 font-medium mb-1.5">Events Participated</span>
                </div>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-black text-emerald-400">1</span>
                  <span className="text-sm text-slate-300 font-medium mb-1">Hackathons Won</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;