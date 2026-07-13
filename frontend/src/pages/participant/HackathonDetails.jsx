import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Users, Trophy, ChevronLeft, 
  Clock, Mail, ArrowRight, Award, Loader2 
} from 'lucide-react';
import axios from 'axios';

const HackathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hackathon, setHackathon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/hackathons/${id}`)
      .then(res => {
        setHackathon(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching hackathon details:", err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Loader2 className="spinner-border text-primary" size={40} />
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="container text-center py-5">
        <h2 className="fw-bold">Hackathon not found</h2>
        <button onClick={() => navigate(-1)} className="btn btn-primary mt-3">Go Back</button>
      </div>
    );
  }

  // --- AUTOMATED STATUS & REGISTRATION LOGIC ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const startDate = new Date(hackathon.startDate);
  const endDate = new Date(hackathon.endDate);
  const deadlineDate = hackathon.registrationDeadline ? new Date(hackathon.registrationDeadline) : null;
  
  let dynamicStatus = 'Expired';
  if (today < startDate) dynamicStatus = 'Upcoming';
  else if (today >= startDate && today <= endDate) dynamicStatus = 'Ongoing';

  const isRegistrationClosed = deadlineDate ? today > deadlineDate : false;

  const formatDisplayDate = (start, end) => {
    if (!start || !end) return "Dates TBA";
    const sDate = new Date(start);
    const eDate = new Date(end);
    const sMonth = sDate.toLocaleString('default', { month: 'short' });
    const sDay = sDate.getDate();
    const eMonth = eDate.toLocaleString('default', { month: 'short' });
    const eDay = eDate.getDate();
    return sMonth === eMonth ? `${sMonth} ${sDay} - ${eDay}` : `${sMonth} ${sDay} - ${eMonth} ${eDay}`;
  };

  // Safe mapping arrays
  const objectives = hackathon.objectives?.length > 0 ? hackathon.objectives : ["Join us for an incredible challenge."];
  const benefits = hackathon.benefits?.length > 0 ? hackathon.benefits : ["Participation Certificates", "Networking Opportunities"];
  const stages = hackathon.stages?.length > 0 ? hackathon.stages : [];
  const organizers = hackathon.organizers?.length > 0 ? hackathon.organizers : [];

  return (
    <>
      <style>
        {`
          /* Base Selection */
          .hackathon-details ::selection { background-color: rgba(0, 194, 178, 0.3); color: #0A1220; }
          .fw-black { font-weight: 900; }
          .text-muted-custom { color: #7A8A9E; }
          .text-body-custom { color: #4F627D; }
          .text-dark-custom { color: #0A1220; }
          .border-custom { border-color: #E2E8F0 !important; }

          /* Back Button */
          .custom-back-btn { color: #7A8A9E; transition: color 0.3s ease; }
          .custom-back-btn:hover { color: #00C2B2; }

          /* Hero Section */
          .hero-section { background-color: #0A1220; border: 1px solid #1C2B42; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); transition: all 0.3s ease; }
          .tech-grid-bg { background-image: linear-gradient(to right, #1C2B42 1px, transparent 1px), linear-gradient(to bottom, #1C2B42 1px, transparent 1px); background-size: 40px 40px; opacity: 0.2; }
          .hero-orb-1 { width: 384px; height: 384px; background-color: #00C2B2; opacity: 0.15; filter: blur(100px); top: -96px; right: -96px; transition: opacity 0.7s ease; }
          .hero-section:hover .hero-orb-1 { opacity: 0.25; }
          .hero-orb-2 { width: 320px; height: 320px; background-color: #3B82F6; opacity: 0.12; filter: blur(80px); bottom: -96px; left: -96px; }
          .hero-glass-panel { background-color: rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
          .hero-stat-badge { background-color: #111F33; border: 1px solid #1C2B42; color: #E2E8F0; }

          @keyframes customPing { 75%, 100% { transform: scale(2); opacity: 0; } }
          .animate-custom-ping { animation: customPing 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; }

          /* Register Button */
          .btn-register { background-color: #00C2B2; color: white; transition: all 0.3s ease; box-shadow: 0 0 20px rgba(0, 194, 178, 0.3); }
          .btn-register:hover:not(:disabled) { background-color: #00A89A; color: white; transform: translateY(-4px); box-shadow: 0 0 30px rgba(0, 194, 178, 0.5); }
          .btn-register:disabled { background-color: #F1F5F9; color: #94A3B8; box-shadow: none; cursor: not-allowed; border: 1px solid #E2E8F0; }

          /* Main Content Cards */
          .content-card { background-color: #ffffff; border: 1px solid #E2E8F0; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
          .benefit-item { background-color: #F8FAFC; border: 1px solid #E2E8F0; transition: all 0.3s ease; }
          .benefit-item:hover { background-color: #ffffff; border-color: rgba(0, 194, 178, 0.4); }

          /* Custom Timeline */
          .custom-timeline { position: relative; }
          .custom-timeline::before { content: ''; position: absolute; top: 0; bottom: 0; left: 1.375rem; width: 4px; background: linear-gradient(to bottom, #00C2B2, rgba(0, 194, 178, 0.5), #E2E8F0); border-radius: 4px; transform: translateX(-50%); }
          .timeline-dot { width: 44px; height: 44px; border: 4px solid #ffffff; background-color: #00C2B2; color: white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease; z-index: 10; }
          .timeline-card { background-color: #F8FAFC; border: 1px solid #E2E8F0; transition: all 0.3s ease; }
          .timeline-item:hover .timeline-card { background-color: #ffffff; border-color: rgba(0, 194, 178, 0.5); transform: translateY(-4px); }
          .timeline-item:hover .timeline-dot { transform: scale(1.1); }
          
          @media (min-width: 768px) {
            .custom-timeline::before { left: 50%; }
            .timeline-item:nth-child(odd) { flex-direction: row-reverse; }
            .timeline-item:nth-child(odd) .timeline-dot { transform: translateX(-50%); }
            .timeline-item:nth-child(even) .timeline-dot { transform: translateX(50%); }
            .timeline-item:hover:nth-child(odd) .timeline-dot { transform: translateX(-50%) scale(1.1); }
            .timeline-item:hover:nth-child(even) .timeline-dot { transform: translateX(50%) scale(1.1); }
            .timeline-card-wrapper { width: calc(50% - 3rem); }
          }
          @media (max-width: 767.98px) { .timeline-card-wrapper { width: calc(100% - 3.5rem); margin-left: 1rem; } }
        `}
      </style>

      <div className="container-xl hackathon-details pb-5 pt-3">
        
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-link custom-back-btn text-decoration-none d-flex align-items-center gap-2 p-0 mb-4 fw-semibold"
          style={{ fontSize: '15px' }}
        >
          <ChevronLeft size={20} /> Back to Explorer
        </button>

        {/* HERO SECTION */}
        <div className="hero-section position-relative rounded-4 mb-5 overflow-hidden">
          <div className="tech-grid-bg position-absolute top-0 start-0 w-100 h-100"></div>
          <div className="hero-orb-1 position-absolute rounded-circle"></div>
          <div className="hero-orb-2 position-absolute rounded-circle"></div>

          <div className="position-relative z-1 py-4 px-4 px-md-5">
            <div className="row align-items-center justify-content-between g-4">
              
              <div className="col-12 col-lg-8">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div className="position-relative d-flex" style={{ width: '10px', height: '10px' }}>
                    {!isRegistrationClosed && <span className="position-absolute w-100 h-100 rounded-circle animate-custom-ping" style={{ backgroundColor: '#00C2B2', opacity: '0.75' }}></span>}
                    <span className="position-relative w-100 h-100 rounded-circle" style={{ backgroundColor: isRegistrationClosed ? '#EF4444' : '#00C2B2' }}></span>
                  </div>
                  <span 
                    className="px-3 py-1 rounded-pill fw-bold text-uppercase" 
                    style={{ fontSize: '11px', letterSpacing: '0.15em', color: isRegistrationClosed ? '#EF4444' : '#00C2B2', backgroundColor: isRegistrationClosed ? 'rgba(239,68,68,0.1)' : 'rgba(0,194,178,0.1)', border: `1px solid ${isRegistrationClosed ? 'rgba(239,68,68,0.2)' : 'rgba(0,194,178,0.2)'}` }}
                  >
                    {isRegistrationClosed ? 'Registration Closed' : dynamicStatus}
                  </span>
                </div>
                
                <h1 className="fw-black text-white mb-2 lh-1 text-nowrap" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}>
                  {hackathon.name}
                </h1>
                <p className="fw-medium mb-0" style={{ color: '#8A99AF', fontSize: 'clamp(1rem, 2vw, 1.15rem)', lineHeight: '1.5', maxWidth: '600px' }}>
                  {hackathon.tags && hackathon.tags.join(' • ')}
                </p>

                <div className="d-flex flex-wrap align-items-center gap-3 mt-4 pt-3 border-top" style={{ borderColor: 'rgba(28,43,66,0.6) !important' }}>
                  <div className="hero-stat-badge d-flex align-items-center gap-2 px-3 py-2 rounded-3">
                    <Calendar size={16} color="#00C2B2" />
                    <span className="fw-semibold" style={{ fontSize: '13px' }}>{formatDisplayDate(hackathon.startDate, hackathon.endDate)}</span>
                  </div>
                  <div className="hero-stat-badge d-flex align-items-center gap-2 px-3 py-2 rounded-3">
                    <MapPin size={16} color="#8B5CF6" />
                    <span className="fw-semibold" style={{ fontSize: '13px' }}>{hackathon.mode} Mode</span>
                  </div>
                  <div className="hero-stat-badge d-flex align-items-center gap-2 px-3 py-2 rounded-3">
                    <Trophy size={16} className="text-warning" />
                    <span className="fw-semibold" style={{ fontSize: '13px' }}>{hackathon.prize} Prize</span>
                  </div>
                </div>
              </div>
              
              <div className="col-12 col-lg-4 d-flex justify-content-lg-end">
                <div className="hero-glass-panel d-flex flex-column align-items-center p-3 px-md-4 py-md-4 rounded-4 w-100" style={{ maxWidth: '350px' }}>
                  <p className="fw-bold text-uppercase text-center mb-1 w-100" style={{ fontSize: '11px', letterSpacing: '0.15em', color: isRegistrationClosed ? '#EF4444' : '#8A99AF' }}>
                    {isRegistrationClosed ? 'Event Closed' : 'Registration Deadline'}
                  </p>
                  <div className="fw-black text-white mb-3 tracking-wider" style={{ fontSize: '1.25rem' }}>
                    {deadlineDate ? deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "TBA"}
                  </div>
                  
                  <button 
                    className="btn btn-register d-flex align-items-center justify-content-center gap-2 px-4 py-2.5 rounded-3 fw-bold fs-6 w-100 text-nowrap" 
                    onClick={() => navigate(`/participant/register/${hackathon._id}`, { state: { hackathonName: hackathon.name } })}
                    disabled={isRegistrationClosed || dynamicStatus === 'Expired'}
                  >
                    {isRegistrationClosed || dynamicStatus === 'Expired' ? 'Registration Closed' : 'Register Now'}
                    {!(isRegistrationClosed || dynamicStatus === 'Expired') && <ArrowRight size={18} />}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="row g-4 g-lg-5">
          
          <div className="col-12 col-lg-8 d-flex flex-column gap-4 gap-md-5">
            
            <div className="content-card p-4 p-md-5 rounded-4">
              <h2 className="fs-3 fw-bold text-dark-custom mb-4">All that you need to know</h2>
              <p className="text-body-custom fw-medium lh-lg mb-5">{hackathon.overview || "Overview not provided yet."}</p>
              
              <h3 className="fs-5 fw-bold text-dark-custom mb-3">Objectives</h3>
              <ul className="text-body-custom fw-medium lh-lg ps-3 mb-0" style={{ listStyleType: 'disc' }}>
                {objectives.map((obj, i) => (
                  <li key={i} className="mb-2" style={{ marker: { color: '#00C2B2' } }}>{obj}</li>
                ))}
              </ul>
            </div>

            <div className="content-card p-4 p-md-5 rounded-4">
              <h2 className="fs-3 fw-bold text-dark-custom mb-4">Prizes & Benefits</h2>
              <div className="row g-3">
                {benefits.map((benefit, i) => (
                  <div key={i} className="col-12 col-sm-6">
                    <div className="benefit-item h-100 d-flex align-items-start gap-3 p-3 rounded-4">
                      <div className="rounded-3 p-2 flex-shrink-0" style={{ backgroundColor: 'rgba(0,194,178,0.1)', color: '#00C2B2' }}>
                        <Award size={20} strokeWidth={2.5} />
                      </div>
                      <p className="text-body-custom fw-semibold mb-0 pt-1" style={{ fontSize: '14.5px', lineHeight: '1.5' }}>
                        {benefit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {stages.length > 0 && (
              <div className="content-card p-4 p-md-5 rounded-4">
                <h2 className="fs-3 fw-bold text-dark-custom mb-5">Stages and Timelines</h2>
                <div className="custom-timeline d-flex flex-column gap-4 gap-md-5">
                  {stages.map((stage, index) => (
                    <div key={index} className="timeline-item d-flex align-items-center justify-content-between justify-content-md-start position-relative">
                      <div className="timeline-dot d-flex align-items-center justify-content-center rounded-circle flex-shrink-0">
                        <span className="fw-bold fs-6">{index + 1}</span>
                      </div>
                      <div className="timeline-card-wrapper">
                        <div className="timeline-card p-4 rounded-4">
                          <div className="d-flex align-items-center gap-2 fw-bold text-uppercase mb-2" style={{ color: '#00C2B2', fontSize: '12px', letterSpacing: '0.05em' }}>
                            <Clock size={14} strokeWidth={2.5} /> {stage.date}
                          </div>
                          <h4 className="fs-5 fw-bold text-dark-custom mb-2">{stage.title}</h4>
                          <p className="text-muted-custom fw-medium mb-0" style={{ fontSize: '14.5px', lineHeight: '1.6' }}>{stage.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-12 col-lg-4 d-flex flex-column gap-4 gap-md-5">
            
            <div className="content-card p-4 p-md-5 rounded-4">
              <h3 className="fs-5 fw-bold text-dark-custom mb-4 pb-3 border-bottom border-custom">Event Details</h3>
              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 rounded-3 mt-1" style={{ backgroundColor: 'rgba(0,194,178,0.1)', color: '#00C2B2' }}><MapPin size={20} /></div>
                  <div>
                    <p className="fw-bold text-uppercase text-muted-custom mb-1" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>Location</p>
                    <p className="fw-semibold text-dark-custom mb-0">{hackathon.location || hackathon.mode}</p>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 rounded-3 mt-1" style={{ backgroundColor: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}><Users size={20} /></div>
                  <div>
                    <p className="fw-bold text-uppercase text-muted-custom mb-1" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>Team Size</p>
                    <p className="fw-semibold text-dark-custom mb-0">{hackathon.teamSize}</p>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 rounded-3 mt-1" style={{ backgroundColor: 'rgba(245,158,11,0.1)' }}><Trophy size={20} className="text-warning" /></div>
                  <div>
                    <p className="fw-bold text-uppercase text-muted-custom mb-1" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>Prize Pool</p>
                    <p className="fw-black text-dark-custom fs-5 mb-0">{hackathon.prize}</p>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 rounded-3 mt-1" style={{ backgroundColor: 'rgba(244,63,94,0.1)', color: '#F43F5E' }}><Calendar size={20} /></div>
                  <div>
                    <p className="fw-bold text-uppercase text-muted-custom mb-1" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>Registration Ends</p>
                    <p className="fw-semibold text-dark-custom mb-0">
                      {deadlineDate ? deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "TBA"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {organizers.length > 0 && (
              <div className="content-card p-4 p-md-5 rounded-4">
                <h3 className="fs-5 fw-bold text-dark-custom mb-4 pb-3 border-bottom border-custom">Contact Organizers</h3>
                <div className="d-flex flex-column gap-4">
                  {organizers.map((org, i) => (
                    <div key={i} className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center justify-content-center rounded-3 shadow-sm text-white fw-black fs-4 flex-shrink-0" style={{ width: '48px', height: '48px', backgroundColor: '#00C2B2' }}>
                        {org.name ? org.name.charAt(0).toUpperCase() : 'O'}
                      </div>
                      <div>
                        <p className="fw-bold text-dark-custom mb-0 fs-6">{org.name}</p>
                        <p className="fw-bold text-uppercase mb-1" style={{ fontSize: '11px', color: '#00C2B2', letterSpacing: '0.1em' }}>{org.role}</p>
                        {org.email && (
                          <p className="text-muted-custom fw-medium d-flex align-items-center gap-1 mb-0" style={{ fontSize: '14px', cursor: 'pointer' }}>
                            <Mail size={14} /> {org.email}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default HackathonDetails;