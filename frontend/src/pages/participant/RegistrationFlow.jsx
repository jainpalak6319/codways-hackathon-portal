import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { UserPlus, Users, Search, ArrowRight, ArrowLeft, CheckCircle, Copy, Loader2 } from 'lucide-react';
import axios from 'axios';

// NOTE: Make sure Bootstrap CSS is imported once in your app entry point, e.g.:
// import 'bootstrap/dist/css/bootstrap.min.css';

const RegistrationFlow = () => {
  const navigate = useNavigate();

  // --- DYNAMIC DATA FETCHING ---
  const { id: hackathonId } = useParams(); // Extracts the ID from the URL (e.g., /register/1)
  const location = useLocation();
  // Extracts the real name passed from HackathonDetails.jsx, with a fallback
  const hackathonName = location.state?.hackathonName || "Unknown Hackathon";

  const [step, setStep] = useState(1);
  const [registrationType, setRegistrationType] = useState(null); // 'create', 'join', 'solo'
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    teamName: '',
    inviteCode: '',
    skills: ''
  });

  const [copied, setCopied] = useState(false);
  const [generatedCode] = useState("CW" + Math.floor(1000 + Math.random() * 9000));

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleComplete = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // --- REAL PAYLOAD USING DYNAMIC DATA ---
      const payload = {
        hackathonId: hackathonId,       // Dynamically fetched from URL
        hackathonName: hackathonName,   // Dynamically fetched from Router state
        registrationType: registrationType,
        personalDetails: {
          name: formData.name,
          email: formData.email,
          college: formData.college
        },
        teamDetails: {
          teamName: formData.teamName,
          inviteCode: registrationType === 'create' ? generatedCode : formData.inviteCode,
          skills: formData.skills
        }
      };

      const response = await axios.post('http://localhost:5000/api/register', payload);
      console.log("Registration Success:", response.data);
      localStorage.setItem('userId', response.data.user._id);
      navigate('/student/team');

    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage(error.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5 px-3 px-md-4" style={{ maxWidth: '48rem' }}>

      {/* Local brand styling — Bootstrap has no utility for custom hex palettes */}
      <style>{`
        :root {
          --brand-teal: #00C2B2;
          --brand-teal-dark: #00A89A;
          --brand-navy: #0A1220;
          --brand-muted: #7A8A9E;
          --brand-label: #4F627D;
          --brand-border: #E2E8F0;
          --brand-bg-soft: #F8FAFC;
          --brand-bg-softer: #F1F5F9;
          --brand-placeholder: #94A3B8;
        }
        .brand-card {
          border-radius: 24px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.04);
        }
        .step-circle {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          background-color: var(--brand-bg-softer);
          color: var(--brand-placeholder);
          border: 1px solid var(--brand-border);
        }
        .step-circle.active {
          background-color: var(--brand-teal);
          color: #fff;
          border: none;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }
        .step-connector {
          height: 4px;
          width: 3rem;
          border-radius: 999px;
          background-color: var(--brand-border);
          transition: background-color 0.5s ease;
        }
        .step-connector.active {
          background-color: var(--brand-teal);
        }
        .brand-option-btn {
          display: flex;
          align-items: center;
          width: 100%;
          text-align: left;
          padding: 1.25rem 1.5rem;
          border-radius: 16px;
          border: 1px solid var(--brand-border);
          background-color: #fff;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
          transition: all 0.3s ease;
        }
        .brand-option-btn:hover {
          border-color: rgba(0,194,178,0.5);
          background-color: var(--brand-bg-soft);
          box-shadow: 0 4px 10px rgba(0,0,0,0.06);
        }
        .brand-icon-wrap {
          background-color: var(--brand-bg-softer);
          color: var(--brand-muted);
          border-radius: 12px;
          padding: 1rem;
          margin-right: 1.25rem;
          transition: all 0.3s ease;
        }
        .brand-option-btn:hover .brand-icon-wrap {
          background-color: rgba(0,194,178,0.1);
          color: var(--brand-teal);
        }
        .brand-option-title {
          color: var(--brand-navy);
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .brand-option-btn:hover .brand-option-title {
          color: var(--brand-teal);
        }
        .brand-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--brand-label);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          display: block;
        }
        .brand-input {
          border: 1px solid var(--brand-border);
          border-radius: 12px;
          background-color: var(--brand-bg-soft);
          padding: 0.9rem 1.1rem;
          font-weight: 500;
          color: var(--brand-navy);
          width: 100%;
        }
        .brand-input::placeholder { color: var(--brand-placeholder); }
        .brand-input:focus {
          background-color: #fff;
          border-color: var(--brand-teal);
          box-shadow: 0 0 0 4px rgba(0,194,178,0.1);
          outline: none;
        }
        .brand-btn-primary {
          background-color: var(--brand-teal);
          border: none;
          color: #fff;
          font-weight: 700;
          font-size: 1.05rem;
          padding: 0.9rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          transition: all 0.2s ease;
        }
        .brand-btn-primary:hover:not(:disabled) {
          background-color: var(--brand-teal-dark);
        }
        .brand-btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
        .brand-back-link {
          color: var(--brand-muted);
          font-weight: 700;
          font-size: 0.9rem;
          background: none;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          transition: color 0.2s ease;
        }
        .brand-back-link:hover { color: var(--brand-navy); }
        .brand-heading {
          color: var(--brand-navy);
          font-weight: 900;
          letter-spacing: -0.02em;
        }
        .brand-subtext { color: var(--brand-muted); font-weight: 500; }
        .code-box {
          background-color: var(--brand-bg-soft);
          border: 1px solid var(--brand-border);
          border-radius: 16px;
          padding: 2rem;
        }
        .code-pill {
          background-color: #fff;
          border: 1px solid var(--brand-border);
          border-radius: 12px;
          color: var(--brand-teal);
          font-family: monospace;
          font-weight: 900;
          font-size: 1.5rem;
          letter-spacing: 0.2em;
          padding: 0.75rem 1.5rem;
        }
        .copy-btn {
          background-color: var(--brand-navy);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background-color 0.2s ease;
        }
        .copy-btn:hover { background-color: var(--brand-teal); }
        .invite-input {
          text-align: center;
          font-family: monospace;
          font-weight: 900;
          font-size: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--brand-teal);
          padding: 1.25rem;
          border-width: 2px;
        }
        .fade-in { animation: fadeIn 0.3s ease; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Clean, Light Container */}
      <div className="bg-white p-4 p-md-5 brand-card border position-relative">

        {/* Progress Indicator */}
        <div className="d-flex justify-content-center align-items-center gap-2 gap-md-3 mb-5">
          <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`step-connector ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step-circle ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`step-connector ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`step-circle ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        {/* Error Message Display */}
        {errorMessage && (
          <div className="alert alert-danger text-center fw-semibold rounded-3 mb-4 fade-in" role="alert">
            {errorMessage}
          </div>
        )}

        {/* ================= STEP 1: CHOOSE PATH ================= */}
        {step === 1 && (
          <div className="fade-in">
            <h2 className="brand-heading text-center mb-3 display-6">How would you like to participate?</h2>
            <p className="brand-subtext text-center mb-5 fs-5">
              Select your registration path for{' '}
              <span className="fw-bold" style={{ color: 'var(--brand-teal)' }}>{hackathonName}</span>.
            </p>

            <div className="d-flex flex-column gap-3">
              {/* Option: Create Team */}
              <button onClick={() => { setRegistrationType('create'); setStep(2); }} className="brand-option-btn">
                <div className="brand-icon-wrap"><UserPlus size={28} /></div>
                <div>
                  <h3 className="brand-option-title fs-4">Create a New Team</h3>
                  <p className="brand-subtext small mb-0">You will be the Team Leader and invite others.</p>
                </div>
              </button>

              {/* Option: Join Team */}
              <button onClick={() => { setRegistrationType('join'); setStep(2); }} className="brand-option-btn">
                <div className="brand-icon-wrap"><Users size={28} /></div>
                <div>
                  <h3 className="brand-option-title fs-4">Join an Existing Team</h3>
                  <p className="brand-subtext small mb-0">I have an invite code from my Team Leader.</p>
                </div>
              </button>

              {/* Option: Solo */}
              <button onClick={() => { setRegistrationType('solo'); setStep(2); }} className="brand-option-btn">
                <div className="brand-icon-wrap"><Search size={28} /></div>
                <div>
                  <h3 className="brand-option-title fs-4">Looking for a Team</h3>
                  <p className="brand-subtext small mb-0">Register solo and match with teams looking for skills.</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: PERSONAL DETAILS ================= */}
        {step === 2 && (
          <div className="fade-in">
            <button onClick={() => setStep(1)} className="brand-back-link">
              <ArrowLeft size={16} /> Back
            </button>
            <h2 className="brand-heading mb-3 display-6">Your Personal Details</h2>
            <p className="brand-subtext mb-5 fs-5">Let's get to know you first.</p>

            <div className="d-flex flex-column gap-4 mb-5">
              <div>
                <label className="brand-label">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="brand-input" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="brand-label">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="brand-input" placeholder="john@example.com" />
              </div>
              <div>
                <label className="brand-label">College / University</label>
                <input type="text" name="college" value={formData.college} onChange={handleChange} className="brand-input" placeholder="e.g. Geeta University" />
              </div>
            </div>

            <button
              onClick={() => {
                if (!formData.name || !formData.email || !formData.college) {
                  setErrorMessage("Please fill all required fields.");
                  return;
                }
                setErrorMessage("");
                setStep(3);
              }}
              className="brand-btn-primary w-100 d-flex justify-content-center align-items-center gap-2"
            >
              Continue <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* ================= STEP 3: CONTEXTUAL ACTIONS ================= */}
        {step === 3 && (
          <div className="fade-in">
            <button onClick={() => setStep(2)} className="brand-back-link">
              <ArrowLeft size={16} /> Back
            </button>

            {/* IF CREATE TEAM */}
            {registrationType === 'create' && (
              <>
                <h2 className="brand-heading mb-3 display-6">Set Up Your Team</h2>
                <p className="brand-subtext mb-5 fs-5">Give your team a strong name to stand out.</p>

                <div className="mb-4">
                  <label className="brand-label">Team Name</label>
                  <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} className="brand-input" placeholder="e.g. Code Crusaders" />
                </div>

                <div className="code-box text-center mb-5">
                  <p className="brand-label text-center">Your Unique Invite Code</p>

                  <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3">
                    <code className="code-pill w-100 w-sm-auto">{generatedCode}</code>
                    <button onClick={handleCopy} className="copy-btn w-100 w-sm-auto">
                      {copied ? <><CheckCircle size={20} /> Copied</> : <><Copy size={20} /> Copy</>}
                    </button>
                  </div>
                  <p className="brand-subtext small mt-4 mb-0">Share this code with your friends so they can join this team in Step 1.</p>
                </div>
              </>
            )}

            {/* IF JOIN TEAM */}
            {registrationType === 'join' && (
              <>
                <h2 className="brand-heading mb-3 display-6">Join Your Squad</h2>
                <p className="brand-subtext mb-5 fs-5">Enter the invite code provided by your Team Leader.</p>
                <div className="mb-5">
                  <label className="brand-label text-center">Invite Code</label>
                  <input type="text" name="inviteCode" value={formData.inviteCode} onChange={handleChange} className="brand-input invite-input" placeholder="CWXXXX" />
                </div>
              </>
            )}

            {/* IF SOLO / MATCHMAKING */}
            {registrationType === 'solo' && (
              <>
                <h2 className="brand-heading mb-3 display-6">Let's Find You a Team</h2>
                <p className="brand-subtext mb-5 fs-5">Tell us what you are good at so teams can recruit you.</p>
                <div className="mb-5">
                  <label className="brand-label">Your Primary Skills</label>
                  <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="brand-input" placeholder="e.g. React, Node.js, UI/UX Design..." />
                  <p className="brand-subtext small mt-3 mb-0">Separate skills with commas. These will be displayed on your profile in the matchmaking board.</p>
                </div>
              </>
            )}

            <button
              onClick={handleComplete}
              disabled={isLoading}
              className="brand-btn-primary w-100 d-flex justify-content-center align-items-center gap-2"
            >
              {isLoading ? (
                <><Loader2 size={20} className="spinner-border spinner-border-sm" /> Processing...</>
              ) : (
                <>Complete Registration <CheckCircle size={20} /></>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default RegistrationFlow;