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
      statusTheme: { color: "#00C2B2", backgroundColor: "rgba(0, 194, 178, 0.1)", borderColor: "rgba(0, 194, 178, 0.2)" }
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
      statusTheme: { color: "#8B5CF6", backgroundColor: "rgba(139, 92, 246, 0.1)", borderColor: "rgba(139, 92, 246, 0.2)" }
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
      statusTheme: { color: "#3B82F6", backgroundColor: "rgba(59, 130, 246, 0.1)", borderColor: "rgba(59, 130, 246, 0.2)" }
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
      statusTheme: { color: "#3B82F6", backgroundColor: "rgba(59, 130, 246, 0.1)", borderColor: "rgba(59, 130, 246, 0.2)" }
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
      statusTheme: { color: "#8B5CF6", backgroundColor: "rgba(139, 92, 246, 0.1)", borderColor: "rgba(139, 92, 246, 0.2)" }
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
      statusTheme: { color: "#00C2B2", backgroundColor: "rgba(0, 194, 178, 0.1)", borderColor: "rgba(0, 194, 178, 0.2)" }
    }
  ];

  // Filter logic
  const filteredHackathons = hackathons.filter((hack) => {
    const query = searchQuery.toLowerCase();
    const matchesTitle = hack.title.toLowerCase().includes(query);
    const matchesTags = hack.tags.some(tag => tag.toLowerCase().includes(query));
    
    return matchesTitle || matchesTags;
  });

  return (
    <>
      <style>
        {`
          /* Custom Selection Color */
          .explorer-page ::selection {
            background-color: rgba(0, 194, 178, 0.3);
            color: #0A1220;
          }

          /* Search Input Styling */
          .search-input-wrapper .lucide {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: #7A8A9E;
          }
          .custom-search-input {
            padding-left: 2.75rem !important;
            padding-top: 0.875rem !important;
            padding-bottom: 0.875rem !important;
            border: 1px solid #E2E8F0;
            border-radius: 0.75rem;
            color: #0A1220;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          .custom-search-input::placeholder {
            color: rgba(122, 138, 158, 0.6);
          }
          .custom-search-input:focus {
            border-color: #00C2B2;
            box-shadow: 0 0 0 4px rgba(0, 194, 178, 0.15);
            outline: none;
          }

          /* Filter Button */
          .btn-custom-filter {
            background-color: #ffffff;
            border: 1px solid #E2E8F0;
            color: #0A1220;
            font-weight: 500;
            border-radius: 0.75rem;
            transition: all 0.3s ease;
          }
          .btn-custom-filter:hover {
            background-color: #F8FAFC;
            border-color: #CBD5E1;
          }
          .btn-custom-filter .lucide {
            color: #7A8A9E;
            transition: color 0.3s ease;
          }
          .btn-custom-filter:hover .lucide {
            color: #0A1220;
          }

          /* Hackathon Card Styling */
          .hackathon-card {
            background-color: #ffffff;
            border: 1px solid #E2E8F0;
            border-radius: 1rem;
            transition: all 0.3s ease;
          }
          .hackathon-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.04);
            border-color: rgba(0, 194, 178, 0.3);
          }
          .hackathon-card-title {
            color: #0A1220;
            transition: color 0.3s ease;
          }
          .hackathon-card:hover .hackathon-card-title {
            color: #00C2B2;
          }

          /* Card Badges */
          .custom-badge {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            padding: 0.25rem 0.75rem;
            border-radius: 0.5rem;
          }
          
          /* Card Details */
          .detail-row {
            font-size: 14px;
            font-weight: 500;
            color: #7A8A9E;
          }
          .detail-row .lucide {
            color: #4F627D;
          }

          /* Action Button */
          .btn-view-details {
            border: 1px solid #E2E8F0;
            color: #0A1220;
            font-weight: 500;
            border-radius: 0.75rem;
            transition: all 0.3s ease;
          }
          .btn-view-details .lucide {
            transition: transform 0.3s ease;
          }
          .btn-view-details:hover {
            background-color: #00C2B2;
            color: #ffffff;
            border-color: #00C2B2;
          }
          .btn-view-details:hover .lucide {
            transform: translateX(4px);
          }
        `}
      </style>

      <div className="container-xl explorer-page pb-5">
        
        {/* Header Section */}
        <div className="mb-4">
          <h1 className="fw-bold tracking-tight mb-2" style={{ color: '#0A1220', fontSize: '1.75rem' }}>
            Hackathon Explorer
          </h1>
          <p className="fw-medium m-0" style={{ color: '#7A8A9E', fontSize: '1rem' }}>
            Discover and register for upcoming events and coding sprints.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
          <div className="position-relative flex-grow-1 search-input-wrapper shadow-sm rounded-3">
            <Search size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by hackathon name, tech stack, or theme..." 
              className="form-control custom-search-input w-100"
            />
          </div>
          <button className="btn btn-custom-filter d-flex align-items-center justify-content-center gap-2 px-4 shadow-sm text-nowrap">
            <Filter size={18} />
            Filters
          </button>
        </div>

        {/* Hackathon Cards Grid */}
        <div className="row g-4">
          {filteredHackathons.length > 0 ? (
            filteredHackathons.map((hack) => (
              <div key={hack.id} className="col-12 col-md-6 col-lg-4">
                <div className="hackathon-card p-4 h-100 d-flex flex-column shadow-sm">
                  
                  {/* Badges */}
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <span 
                      className="custom-badge border" 
                      style={{ 
                        color: hack.statusTheme.color, 
                        backgroundColor: hack.statusTheme.backgroundColor, 
                        borderColor: hack.statusTheme.borderColor 
                      }}
                    >
                      {hack.status}
                    </span>
                    {hack.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="custom-badge border" 
                        style={{ color: '#4F627D', backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="fs-5 fw-bold hackathon-card-title mb-4 lh-sm">
                    {hack.title}
                  </h2>

                  {/* Details List */}
                  <div className="d-flex flex-column gap-3 mb-4 flex-grow-1">
                    <div className="d-flex align-items-center gap-3 detail-row">
                      <Calendar size={18} />
                      <span>{hack.date}</span>
                    </div>
                    <div className="d-flex align-items-center gap-3 detail-row">
                      <MapPin size={18} />
                      <span className="text-truncate">{hack.location}</span>
                    </div>
                    <div className="d-flex align-items-center gap-3 detail-row">
                      <Users size={18} />
                      <span>Team Size: {hack.team}</span>
                    </div>
                    <div className="d-flex align-items-center gap-3" style={{ fontSize: '14px', fontWeight: '600', color: '#0A1220' }}>
                      <Trophy size={18} className="text-warning" />
                      <span>Prize: {hack.prize}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => navigate(`/participant/hackathon/${hack.id}`)}
                    className="btn btn-view-details w-100 d-flex align-items-center justify-content-center gap-2 py-2 mt-auto"
                  >
                    View Details
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            /* Empty State when no results match */
            <div className="col-12">
              <div 
                className="d-flex flex-column align-items-center justify-content-center text-center p-5 rounded-4 bg-white"
                style={{ border: '2px dashed #E2E8F0' }}
              >
                <Search size={40} color="#CBD5E1" className="mb-3" />
                <h3 className="fs-5 fw-bold mb-2" style={{ color: '#0A1220' }}>No hackathons found</h3>
                <p className="fw-medium m-0" style={{ color: '#7A8A9E' }}>
                  We couldn't find any results matching "{searchQuery}". Try adjusting your search.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExplorerPage;