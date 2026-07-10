import React, { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Users, Trophy, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExplorerPage = () => {
  const navigate = useNavigate();
  
  // State to hold the user's search input
  const [searchQuery, setSearchQuery] = useState("");

  const hackathons = [
    {
      id: 1,
      title: "CodeCrafters Global 2026",
      status: "Ongoing",
      tags: ["Web3", "GenAI"],
      date: "June 20 - 25, 2026",
      location: "Online",
      team: "2-4",
      prize: "$10,000",
      statusColor: "text-[#00C2B2] bg-[#00C2B2]/10 border-[#00C2B2]/20"
    },
    {
      id: 2,
      title: "Hackforge 3.0",
      status: "Upcoming",
      tags: ["EdTech", "Open Innovation"],
      date: "August 10 - 12, 2026",
      location: "Geeta University, Panipat",
      team: "1-4",
      prize: "₹50,000",
      statusColor: "text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/20" 
    },
    {
      id: 3,
      title: "FinTech Build Sprint",
      status: "Registration Open",
      tags: ["Finance", "Security"],
      date: "July 05 - 07, 2026",
      location: "Hybrid (Delhi/Online)",
      team: "3-5",
      prize: "₹1,00,000",
      statusColor: "text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20" 
    },
    {
      id: 4,
      title: "AI Revolution Hack",
      status: "Registration Open",
      tags: ["Machine Learning", "Vision"],
      date: "July 15 - 18, 2026",
      location: "Online",
      team: "2-5",
      prize: "₹75,000",
      statusColor: "text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20"
    },
    {
      id: 5,
      title: "GreenTech Innovate",
      status: "Upcoming",
      tags: ["Sustainability", "IoT"],
      date: "September 01 - 03, 2026",
      location: "Hybrid",
      team: "3-4",
      prize: "₹60,000",
      statusColor: "text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/20"
    },
    {
      id: 6,
      title: "CyberDefend 2026",
      status: "Ongoing",
      tags: ["Cybersecurity", "Blockchain"],
      date: "July 01 - 06, 2026",
      location: "Online",
      team: "1-3",
      prize: "$5,000",
      statusColor: "text-[#00C2B2] bg-[#00C2B2]/10 border-[#00C2B2]/20"
    }
  ];

  // Filter logic: Check if the title or any tag matches the search query (case-insensitive)
  const filteredHackathons = hackathons.filter((hack) => {
    const query = searchQuery.toLowerCase();
    const matchesTitle = hack.title.toLowerCase().includes(query);
    const matchesTags = hack.tags.some(tag => tag.toLowerCase().includes(query));
    
    return matchesTitle || matchesTags;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 pb-10 selection:bg-[#00C2B2]/30 selection:text-[#0A1220]">
      
      {/* Header Section */}
      <div className="px-2 md:px-0">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0A1220] tracking-tight">Hackathon Explorer</h1>
        <p className="text-[#7A8A9E] mt-1.5 text-sm md:text-base font-medium">Discover and register for upcoming events and coding sprints.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 px-2 md:px-0">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7A8A9E]" size={20} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by hackathon name, tech stack, or theme..." 
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C2B2]/20 focus:border-[#00C2B2] transition-all text-[#0A1220] font-medium placeholder-[#7A8A9E]/60 shadow-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-[#E2E8F0] rounded-xl text-[#0A1220] font-medium hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all shadow-sm group whitespace-nowrap">
          <Filter size={18} className="text-[#7A8A9E] group-hover:text-[#0A1220] transition-colors" />
          Filters
        </button>
      </div>

      {/* Hackathon Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 px-2 md:px-0">
        {filteredHackathons.length > 0 ? (
          filteredHackathons.map((hack) => (
            <div 
              key={hack.id} 
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-[#00C2B2]/30 transition-all duration-300 flex flex-col group"
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className={`px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-lg border ${hack.statusColor}`}>
                  {hack.status}
                </span>
                {hack.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-[11px] font-medium uppercase tracking-wider rounded-lg border border-[#E2E8F0] text-[#4F627D] bg-[#F8FAFC]">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-[#0A1220] mb-5 group-hover:text-[#00C2B2] transition-colors leading-tight">
                {hack.title}
              </h2>

              {/* Details List */}
              <div className="space-y-3.5 mb-8 flex-1">
                <div className="flex items-center gap-3 text-[#7A8A9E] text-[14px] font-medium">
                  <Calendar size={18} className="text-[#4F627D]" />
                  <span>{hack.date}</span>
                </div>
                <div className="flex items-center gap-3 text-[#7A8A9E] text-[14px] font-medium">
                  <MapPin size={18} className="text-[#4F627D]" />
                  <span className="truncate">{hack.location}</span>
                </div>
                <div className="flex items-center gap-3 text-[#7A8A9E] text-[14px] font-medium">
                  <Users size={18} className="text-[#4F627D]" />
                  <span>Team Size: {hack.team}</span>
                </div>
                <div className="flex items-center gap-3 text-[#0A1220] text-[14px] font-semibold">
                  <Trophy size={18} className="text-amber-500" />
                  <span>Prize: {hack.prize}</span>
                </div>
              </div>

              {/* Action Button - Configured to Navigate */}
              <button 
                onClick={() => navigate(`/student/hackathon/${hack.id}`)}
                className="w-full py-3.5 flex items-center justify-center gap-2 border border-[#E2E8F0] rounded-xl text-[#0A1220] font-medium hover:bg-[#00C2B2] hover:text-white hover:border-[#00C2B2] transition-all duration-300 group/btn"
              >
                View Details
                <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>
          ))
        ) : (
          /* Empty State when no results match */
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-[#E2E8F0] rounded-2xl bg-white">
            <Search size={40} className="text-[#CBD5E1] mb-4" />
            <h3 className="text-lg font-bold text-[#0A1220] mb-2">No hackathons found</h3>
            <p className="text-[#7A8A9E] font-medium">We couldn't find any results matching "{searchQuery}". Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorerPage;