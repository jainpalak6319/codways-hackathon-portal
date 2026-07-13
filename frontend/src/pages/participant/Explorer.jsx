import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, MapPin, Users, Trophy, ArrowRight, Loader2, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExplorerPage = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [hackathons, setHackathons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/hackathons')
      .then(res => {
        setHackathons(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching hackathons:", err);
        setIsLoading(false);
      });
  }, []);

  const filteredHackathons = hackathons.filter((hack) => {
    const query = searchQuery.toLowerCase();
    const nameToSearch = hack.name || hack.title || '';
    const matchesTitle = nameToSearch.toLowerCase().includes(query);
    const matchesTags = hack.tags && hack.tags.some(tag => tag.toLowerCase().includes(query));
    
    return matchesTitle || matchesTags;
  });

  // --- AUTOMATED STATUS LOGIC ---
  const getDynamicStatus = (startDate, endDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight for accurate day comparison
    
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today < start) return 'Upcoming';
    if (today >= start && today <= end) return 'Ongoing';
    return 'Expired';
  };

  const getStatusTheme = (status) => {
    switch(status) {
      case 'Ongoing':
        return { color: "#00C2B2", backgroundColor: "rgba(0, 194, 178, 0.1)", borderColor: "rgba(0, 194, 178, 0.2)" };
      case 'Upcoming':
        return { color: "#8B5CF6", backgroundColor: "rgba(139, 92, 246, 0.1)", borderColor: "rgba(139, 92, 246, 0.2)" };
      case 'Expired':
        return { color: "#EF4444", backgroundColor: "rgba(239, 68, 68, 0.1)", borderColor: "rgba(239, 68, 68, 0.2)" };
      default:
        return { color: "#3B82F6", backgroundColor: "rgba(59, 130, 246, 0.1)", borderColor: "rgba(59, 130, 246, 0.2)" };
    }
  };

  // --- CLEAN DATE FORMATTER ---
  const formatDisplayDate = (start, end) => {
    if (!start || !end) return "Dates TBA";
    const sDate = new Date(start);
    const eDate = new Date(end);
    
    const sMonth = sDate.toLocaleString('default', { month: 'short' });
    const sDay = sDate.getDate();
    const eMonth = eDate.toLocaleString('default', { month: 'short' });
    const eDay = eDate.getDate();
    const year = eDate.getFullYear();

    if (sMonth === eMonth) {
      return `${sMonth} ${sDay} - ${eDay}, ${year}`; // e.g. Sep 12 - 15, 2026
    }
    return `${sMonth} ${sDay} - ${eMonth} ${eDay}, ${year}`; // e.g. Sep 28 - Oct 02, 2026
  };

  return (
    <>
      <style>
        {`
          .explorer-page ::selection { background-color: rgba(0, 194, 178, 0.3); color: #0A1220; }
          .search-input-wrapper .lucide { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #7A8A9E; }
          .custom-search-input { padding-left: 2.75rem !important; padding-top: 0.875rem !important; padding-bottom: 0.875rem !important; border: 1px solid #E2E8F0; border-radius: 0.75rem; color: #0A1220; font-weight: 500; transition: all 0.3s ease; }
          .custom-search-input::placeholder { color: rgba(122, 138, 158, 0.6); }
          .custom-search-input:focus { border-color: #00C2B2; box-shadow: 0 0 0 4px rgba(0, 194, 178, 0.15); outline: none; }
          .btn-custom-filter { background-color: #ffffff; border: 1px solid #E2E8F0; color: #0A1220; font-weight: 500; border-radius: 0.75rem; transition: all 0.3s ease; }
          .btn-custom-filter:hover { background-color: #F8FAFC; border-color: #CBD5E1; }
          .btn-custom-filter .lucide { color: #7A8A9E; transition: color 0.3s ease; }
          .btn-custom-filter:hover .lucide { color: #0A1220; }
          .hackathon-card { background-color: #ffffff; border: 1px solid #E2E8F0; border-radius: 1rem; transition: all 0.3s ease; }
          .hackathon-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.04); border-color: rgba(0, 194, 178, 0.3); }
          .hackathon-card-title { color: #0A1220; transition: color 0.3s ease; }
          .hackathon-card:hover .hackathon-card-title { color: #00C2B2; }
          .custom-badge { font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; padding: 0.25rem 0.75rem; border-radius: 0.5rem; }
          .detail-row { font-size: 14px; font-weight: 500; color: #7A8A9E; }
          .detail-row .lucide { color: #4F627D; }
          .btn-view-details { border: 1px solid #E2E8F0; color: #0A1220; font-weight: 500; border-radius: 0.75rem; transition: all 0.3s ease; }
          .btn-view-details .lucide { transition: transform 0.3s ease; }
          .btn-view-details:hover:not(:disabled) { background-color: #00C2B2; color: #ffffff; border-color: #00C2B2; }
          .btn-view-details:hover:not(:disabled) .lucide { transform: translateX(4px); }
          .btn-view-details:disabled { background-color: #F1F5F9; color: #94A3B8; cursor: not-allowed; border-color: #E2E8F0; }
        `}
      </style>

      <div className="container-xl explorer-page pb-5">
        
        <div className="mb-4">
          <h1 className="fw-bold tracking-tight mb-2" style={{ color: '#0A1220', fontSize: '1.75rem' }}>
            Hackathon Explorer
          </h1>
          <p className="fw-medium m-0" style={{ color: '#7A8A9E', fontSize: '1rem' }}>
            Discover and register for upcoming events and coding sprints.
          </p>
        </div>

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

        <div className="row g-4">
          {isLoading ? (
            <div className="col-12 d-flex justify-content-center p-5">
              <Loader2 className="spinner-border text-primary" size={40} />
            </div>
          ) : filteredHackathons.length > 0 ? (
            filteredHackathons.map((hack) => {
              
              // Compute dynamic real-time data
              const dynamicStatus = getDynamicStatus(hack.startDate, hack.endDate);
              const theme = getStatusTheme(dynamicStatus);
              
              // Registration Deadline logic
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const isRegistrationClosed = hack.registrationDeadline ? today > new Date(hack.registrationDeadline) : false;

              return (
                <div key={hack._id || hack.id} className="col-12 col-md-6 col-lg-4">
                  <div className="hackathon-card p-4 h-100 d-flex flex-column shadow-sm">
                    
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      <span 
                        className="custom-badge border" 
                        style={{ color: theme.color, backgroundColor: theme.backgroundColor, borderColor: theme.borderColor }}
                      >
                        {dynamicStatus}
                      </span>
                      {hack.tags && hack.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="custom-badge border" 
                          style={{ color: '#4F627D', backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="fs-5 fw-bold hackathon-card-title mb-4 lh-sm">
                      {hack.name || hack.title}
                    </h2>

                    <div className="d-flex flex-column gap-3 mb-4 flex-grow-1">
                      <div className="d-flex align-items-center gap-3 detail-row">
                        <Calendar size={18} />
                        <span>{formatDisplayDate(hack.startDate, hack.endDate)}</span>
                      </div>
                      <div className="d-flex align-items-center gap-3 detail-row">
                        <MapPin size={18} />
                        <span className="text-truncate">{hack.location || hack.mode}</span>
                      </div>
                      <div className="d-flex align-items-center gap-3 detail-row">
                        <Users size={18} />
                        <span>Team Size: {hack.teamSize || hack.team}</span>
                      </div>
                      <div className="d-flex align-items-center gap-3 detail-row">
                        <Clock size={18} className={isRegistrationClosed ? "text-danger" : ""} />
                        <span className={isRegistrationClosed ? "text-danger fw-semibold" : ""}>
                          {isRegistrationClosed ? 'Registration Closed' : `Deadline: ${new Date(hack.registrationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-3 mt-1" style={{ fontSize: '14px', fontWeight: '600', color: '#0A1220' }}>
                        <Trophy size={18} className="text-warning" />
                        <span>Prize: {hack.prize}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => navigate(`/participant/hackathon/${hack._id || hack.id}`, { state: { hackathonName: hack.name || hack.title }})}
                      className="btn btn-view-details w-100 d-flex align-items-center justify-content-center gap-2 py-2 mt-auto"
                      disabled={isRegistrationClosed || dynamicStatus === 'Expired'}
                    >
                      {isRegistrationClosed || dynamicStatus === 'Expired' ? 'Registration Closed' : 'Register Now'}
                      {!(isRegistrationClosed || dynamicStatus === 'Expired') && <ArrowRight size={18} />}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
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