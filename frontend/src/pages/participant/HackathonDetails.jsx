import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Users, Trophy, ChevronLeft, 
  Clock, Mail, Phone, ExternalLink, Award, ArrowRight 
} from 'lucide-react';

const HackathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - In a real app, you would fetch this based on the 'id'
  const hackathonData = {
    id: id,
    title: "Hackforge 3.0", // Example title
    tagline: "Build the future of Open Innovation and EdTech",
    status: "Registration Open",
    overview: "Hackathon is a national-level development challenge that brings together creativity, innovation, and technical expertise. Participants will progress through stages of ideation and prototype development, showcasing their ability to design, develop, and deliver compelling web and mobile solutions.",
    objectives: [
      "Provide participants with practical exposure to the full-stack development lifecycle.",
      "Promote creativity in UI/UX design and user engagement.",
      "Foster problem-solving and interdisciplinary collaboration."
    ],
    eligibility: ["Undergraduate", "Postgraduate", "Engineering Students"],
    benefits: [
      "Top 3 teams win a share of the ₹50,000 prize pool.",
      "Top 15 teams receive official Certificates of Excellence.",
      "Direct internship interview opportunities for standout developers.",
      "Exclusive Codeways swags and cloud credits for all participants."
    ],
    quickStats: {
      teamSize: "1-4 Members",
      location: "Codeways Noida",
      prizePool: "₹50,000",
      registrationEnds: "15 Jul 2026, 11:59 PM IST"
    },
    stages: [
      {
        id: 1,
        title: "Registration & Team Formation",
        date: "20 Jun 26 - 30 Jun 26",
        description: "Register your team on the Codeways portal and invite your members. Ensure all profiles are complete."
      },
      {
        id: 2,
        title: "Round 1 - Vision Craft (Ideation)",
        date: "03 Jul 26 - 07 Jul 26",
        description: "Submit a comprehensive presentation outlining your proposed concept, tech stack, and development roadmap. Focus on originality and feasibility."
      },
      {
        id: 3,
        title: "Round 2 - Development Sprint",
        date: "09 Jul 26 - 15 Jul 26",
        description: "Top scoring teams from Round 1 will build their prototypes. Mentors will be available via the portal ticket system."
      }
    ],
    organizers: [
      { name: "Milly Jain", role: "Event Coordinator", email: "mj@codeways.com" },
    ]
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 px-2 md:px-0 selection:bg-[#00C2B2]/30 selection:text-[#0A1220]">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-[#7A8A9E] hover:text-[#00C2B2] transition-colors mb-6 font-semibold text-sm md:text-base"
      >
        <ChevronLeft size={20} /> Back to Explorer
      </button>

      {/* Upgraded Hero Section (Tech Grid & Glassmorphism) */}
      <div className="relative w-full rounded-[24px] mb-10 overflow-hidden bg-[#0A1220] border border-[#1C2B42] shadow-2xl group">
        
        {/* Subtle Tech Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1C2B42_1px,transparent_1px),linear-gradient(to_bottom,#1C2B42_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
        
        {/* Animated Gradient Orbs for Depth */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00C2B2] opacity-[0.15] blur-[100px] rounded-full group-hover:opacity-25 transition-opacity duration-700"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#3B82F6] opacity-[0.12] blur-[80px] rounded-full"></div>

        {/* Content Container */}
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-10">
          
          {/* Left: Text & Badges */}
          <div className="max-w-3xl flex-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C2B2] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00C2B2]"></span>
              </span>
              <span className="px-3 py-1 bg-[#00C2B2]/10 text-[#00C2B2] border border-[#00C2B2]/20 rounded-lg text-xs font-bold tracking-[0.15em] uppercase shadow-[0_0_15px_rgba(0,194,178,0.1)]">
                {hackathonData.status}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-5 text-white leading-[1.1] tracking-tight">
              {hackathonData.title}
            </h1>
            <p className="text-[#8A99AF] text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              {hackathonData.tagline}
            </p>

            {/* Quick Stats Banner */}
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t border-[#1C2B42]/60">
              <div className="flex items-center gap-2.5 text-[#E2E8F0] bg-[#111F33] px-4 py-2.5 rounded-xl border border-[#1C2B42]">
                <Calendar size={18} className="text-[#00C2B2]" />
                <span className="text-sm font-semibold">Jul 03 - Jul 15</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#E2E8F0] bg-[#111F33] px-4 py-2.5 rounded-xl border border-[#1C2B42]">
                <MapPin size={18} className="text-[#8B5CF6]" />
                <span className="text-sm font-semibold">Hybrid Mode</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#E2E8F0] bg-[#111F33] px-4 py-2.5 rounded-xl border border-[#1C2B42]">
                <Trophy size={18} className="text-amber-400" />
                <span className="text-sm font-semibold">₹50,000 Prize</span>
              </div>
            </div>
          </div>
          
          {/* Right: Call to Action Panel */}
          <div className="flex flex-col items-center md:items-end shrink-0 w-full md:w-auto bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <p className="text-[12px] text-[#8A99AF] font-bold uppercase tracking-widest mb-3 text-center md:text-right w-full">
              Registration Closes In
            </p>
            <div className="text-2xl font-black text-white mb-6 tracking-wider">
              12<span className="text-[#00C2B2] mx-1">:</span>45<span className="text-[#00C2B2] mx-1">:</span>30
            </div>
            
            {/* UPDATED: Button now passes hackathonName via router state */}
            <button 
              className="w-full md:w-auto bg-[#00C2B2] hover:bg-[#00A89A] transition-all duration-300 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(0,194,178,0.3)] hover:shadow-[0_0_30px_rgba(0,194,178,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2 whitespace-nowrap" 
              onClick={() => navigate(`/student/register/${hackathonData.id}`, { 
                state: { hackathonName: hackathonData.title } 
              })} 
            >
              Register Now <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Left Column (70%) - Details, Benefits & Timeline */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          
          {/* Overview & Objectives */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h2 className="text-2xl font-bold text-[#0A1220] mb-5">All that you need to know</h2>
            <div className="prose prose-navy max-w-none">
              <p className="text-[#4F627D] leading-relaxed mb-8 font-medium">{hackathonData.overview}</p>
              
              <h3 className="text-lg font-bold text-[#0A1220] mb-4">Objectives</h3>
              <ul className="list-disc pl-5 space-y-2.5 text-[#4F627D] marker:text-[#00C2B2] font-medium">
                {hackathonData.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
              <h3 className="text-lg font-bold text-[#0A1220] mb-4">Eligibility</h3>
              <div className="flex flex-wrap gap-2.5">
                {hackathonData.eligibility.map((item, i) => (
                  <span key={i} className="bg-[#F8FAFC] text-[#4F627D] px-4 py-2 rounded-xl text-sm font-semibold border border-[#E2E8F0]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits & Prizes */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h2 className="text-2xl font-bold text-[#0A1220] mb-6">Prizes & Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hackathonData.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#00C2B2]/40 hover:bg-white transition-all shadow-sm">
                  <div className="bg-[#00C2B2]/10 p-2.5 rounded-lg text-[#00C2B2] shrink-0">
                    <Award size={20} strokeWidth={2.5} />
                  </div>
                  <p className="text-[#4F627D] text-sm font-semibold leading-relaxed pt-1">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stages & Timelines */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h2 className="text-2xl font-bold text-[#0A1220] mb-8">Stages and Timelines</h2>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-[#00C2B2] before:via-[#00C2B2]/50 before:to-[#E2E8F0] before:rounded-full">
              
              {hackathonData.stages.map((stage) => (
                <div key={stage.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  {/* Timeline Dot */}
                  <div className="flex items-center justify-center w-11 h-11 rounded-full border-[4px] border-white bg-[#00C2B2] text-white shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                    <span className="font-bold text-sm">{stage.id}</span>
                  </div>
                  
                  {/* Content Card */}
                  <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-3rem)] bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0] group-hover:border-[#00C2B2]/50 group-hover:bg-white transition-all shadow-sm ml-4 md:ml-0 group-hover:-translate-y-1">
                    <div className="flex items-center gap-2 text-[#00C2B2] text-xs font-bold mb-2 uppercase tracking-wide">
                      <Clock size={14} strokeWidth={2.5} /> {stage.date}
                    </div>
                    <h4 className="text-lg font-bold text-[#0A1220] mb-2">{stage.title}</h4>
                    <p className="text-sm text-[#7A8A9E] font-medium leading-relaxed">{stage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (30%) - Quick Stats & Organizers */}
        <div className="space-y-6 md:space-y-8">
          
          {/* Quick Stats Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-bold text-[#0A1220] mb-5 border-b border-[#E2E8F0] pb-4">Event Details</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="bg-[#00C2B2]/10 p-2.5 rounded-lg text-[#00C2B2] mt-0.5"><MapPin size={20} /></div>
                <div>
                  <p className="text-[11px] text-[#7A8A9E] font-bold uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-[#0A1220] font-semibold">{hackathonData.quickStats.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#8B5CF6]/10 p-2.5 rounded-lg text-[#8B5CF6] mt-0.5"><Users size={20} /></div>
                <div>
                  <p className="text-[11px] text-[#7A8A9E] font-bold uppercase tracking-wider mb-0.5">Team Size</p>
                  <p className="text-[#0A1220] font-semibold">{hackathonData.quickStats.teamSize}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-amber-500/10 p-2.5 rounded-lg text-amber-500 mt-0.5"><Trophy size={20} /></div>
                <div>
                  <p className="text-[11px] text-[#7A8A9E] font-bold uppercase tracking-wider mb-0.5">Prize Pool</p>
                  <p className="text-[#0A1220] font-black text-lg">{hackathonData.quickStats.prizePool}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-rose-500/10 p-2.5 rounded-lg text-rose-500 mt-0.5"><Calendar size={20} /></div>
                <div>
                  <p className="text-[11px] text-[#7A8A9E] font-bold uppercase tracking-wider mb-0.5">Registration Ends</p>
                  <p className="text-[#0A1220] font-semibold">{hackathonData.quickStats.registrationEnds}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Organizers Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-bold text-[#0A1220] mb-5 border-b border-[#E2E8F0] pb-4">Contact Organizers</h3>
            <div className="space-y-6">
              {hackathonData.organizers.map((org, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00C2B2] text-white flex items-center justify-center font-black text-xl shadow-md">
                    {org.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#0A1220] font-bold text-base">{org.name}</p>
                    <p className="text-[11px] text-[#00C2B2] font-bold uppercase tracking-wider mb-1">{org.role}</p>
                    {org.email && (
                      <p className="text-sm text-[#7A8A9E] font-medium flex items-center gap-1.5 hover:text-[#0A1220] transition-colors cursor-pointer">
                        <Mail size={14} /> {org.email}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HackathonDetails;