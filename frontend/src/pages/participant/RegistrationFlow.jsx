// import { useState } from 'react';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import { UserPlus, Users, Search, ArrowRight, ArrowLeft, CheckCircle, Copy, Loader2, Mail } from 'lucide-react';
// import axios from 'axios';

// const RegistrationFlow = () => {
//   const navigate = useNavigate();
//   const { id: hackathonId } = useParams();
//   const location = useLocation();
//   const hackathonName = location.state?.hackathonName || "Unknown Hackathon";

//   // Still fetch the ID to send to the backend, but we no longer block the UI
//   const getLoggedInUser = () => {
//     let id = localStorage.getItem('userId');
//     if (id) return id;

//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         const userObj = JSON.parse(userStr);
//         id = userObj._id || userObj.id;
//         if (id) return id;
//       } catch (error) {
//         console.error("Could not parse user object from localStorage");
//       }
//     }

//     if (localStorage.getItem('token')) {
//       return "authenticated-user";
//     }
//     return null;
//   };

//   const loggedInUserId = getLoggedInUser();

//   const [step, setStep] = useState(1);
//   const [registrationType, setRegistrationType] = useState(null); 
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     college: '',
//     course: '',
//     location: '',
//     teamName: '',
//     inviteCode: '',
//     skills: '',
//     otp: ''
//   });

//   const [copied, setCopied] = useState(false);
//   const [generatedCode] = useState("CW" + Math.floor(1000 + Math.random() * 9000));

//   const handleCopy = () => {
//     navigator.clipboard.writeText(generatedCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateStep2 = () => {
//     if (!formData.name || !formData.email || !formData.college || !formData.course || !formData.location) {
//       setErrorMessage("Please fill all required fields.");
//       return false;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setErrorMessage("Please enter a valid email address.");
//       return false;
//     }
//     setErrorMessage("");
//     return true;
//   };

//   const handleSendOtp = async () => {
//     setIsLoading(true);
//     setErrorMessage('');
//     setSuccessMessage('');

//     try {
//       await axios.post('http://localhost:5000/api/send-otp', { 
//         email: formData.email,
//         hackathonId: hackathonId 
//       });
//       setSuccessMessage(`Verification code sent to ${formData.email}`);
//       setStep(4); 
//     } catch (error) {
//       setErrorMessage(error.response?.data?.error || "Failed to send OTP. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleComplete = async () => {
//     if (!formData.otp || formData.otp.length < 6) {
//       setErrorMessage("Please enter the 6-digit verification code.");
//       return;
//     }

//     setIsLoading(true);
//     setErrorMessage('');

//     try {
//       const payload = {
//         userId: loggedInUserId || "unknown-user", 
//         hackathonId: hackathonId,
//         hackathonName: hackathonName,
//         registrationType: registrationType,
//         otp: formData.otp, 
//         personalDetails: {
//           name: formData.name,
//           email: formData.email,
//           college: formData.college,
//           course: formData.course,
//           location: formData.location
//         },
//         teamDetails: {
//           teamName: formData.teamName,
//           inviteCode: registrationType === 'create' ? generatedCode : formData.inviteCode,
//           skills: formData.skills
//         }
//       };

//       await axios.post('http://localhost:5000/api/register', payload);
//       navigate('/participant/team'); 

//     } catch (error) {
//       console.error("Registration failed:", error);
//       setErrorMessage(error.response?.data?.error || "Invalid OTP or Registration Error.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container py-5 px-3 px-md-4" style={{ maxWidth: '48rem' }}>

//       <style>{`
//         :root {
//           --brand-teal: #00C2B2;
//           --brand-teal-dark: #00A89A;
//           --brand-navy: #0A1220;
//           --brand-muted: #7A8A9E;
//           --brand-label: #4F627D;
//           --brand-border: #E2E8F0;
//           --brand-bg-soft: #F8FAFC;
//           --brand-bg-softer: #F1F5F9;
//           --brand-placeholder: #94A3B8;
//         }
//         .brand-card { border-radius: 24px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); }
//         .step-circle { width: 2.5rem; height: 2.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.95rem; transition: all 0.3s ease; background-color: var(--brand-bg-softer); color: var(--brand-placeholder); border: 1px solid var(--brand-border); }
//         .step-circle.active { background-color: var(--brand-teal); color: #fff; border: none; box-shadow: 0 4px 10px rgba(0,0,0,0.08); }
//         .step-connector { height: 4px; width: 2.5rem; border-radius: 999px; background-color: var(--brand-border); transition: background-color 0.5s ease; }
//         .step-connector.active { background-color: var(--brand-teal); }
//         .brand-option-btn { display: flex; align-items: center; width: 100%; text-align: left; padding: 1.25rem 1.5rem; border-radius: 16px; border: 1px solid var(--brand-border); background-color: #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.04); transition: all 0.3s ease; }
//         .brand-option-btn:hover { border-color: rgba(0,194,178,0.5); background-color: var(--brand-bg-soft); box-shadow: 0 4px 10px rgba(0,0,0,0.06); }
//         .brand-icon-wrap { background-color: var(--brand-bg-softer); color: var(--brand-muted); border-radius: 12px; padding: 1rem; margin-right: 1.25rem; transition: all 0.3s ease; }
//         .brand-option-btn:hover .brand-icon-wrap { background-color: rgba(0,194,178,0.1); color: var(--brand-teal); }
//         .brand-option-title { color: var(--brand-navy); font-weight: 700; margin-bottom: 0.25rem; }
//         .brand-option-btn:hover .brand-option-title { color: var(--brand-teal); }
//         .brand-label { font-size: 11px; font-weight: 700; color: var(--brand-label); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; display: block; }
//         .brand-input { border: 1px solid var(--brand-border); border-radius: 12px; background-color: var(--brand-bg-soft); padding: 0.9rem 1.1rem; font-weight: 500; color: var(--brand-navy); width: 100%; }
//         .brand-input::placeholder { color: var(--brand-placeholder); }
//         .brand-input:focus { background-color: #fff; border-color: var(--brand-teal); box-shadow: 0 0 0 4px rgba(0,194,178,0.1); outline: none; }
//         .brand-btn-primary { background-color: var(--brand-teal); border: none; color: #fff; font-weight: 700; font-size: 1.05rem; padding: 0.9rem 1.5rem; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.08); transition: all 0.2s ease; }
//         .brand-btn-primary:hover:not(:disabled) { background-color: var(--brand-teal-dark); }
//         .brand-btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
//         .brand-back-link { color: var(--brand-muted); font-weight: 700; font-size: 0.9rem; background: none; border: none; display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; transition: color 0.2s ease; }
//         .brand-back-link:hover { color: var(--brand-navy); }
//         .brand-heading { color: var(--brand-navy); font-weight: 900; letter-spacing: -0.02em; }
//         .brand-subtext { color: var(--brand-muted); font-weight: 500; }
//         .code-box { background-color: var(--brand-bg-soft); border: 1px solid var(--brand-border); border-radius: 16px; padding: 2rem; }
//         .code-pill { background-color: #fff; border: 1px solid var(--brand-border); border-radius: 12px; color: var(--brand-teal); font-family: monospace; font-weight: 900; font-size: 1.5rem; letter-spacing: 0.2em; padding: 0.75rem 1.5rem; }
//         .copy-btn { background-color: var(--brand-navy); color: #fff; border: none; border-radius: 12px; padding: 0.85rem; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: background-color 0.2s ease; }
//         .copy-btn:hover { background-color: var(--brand-teal); }
//         .invite-input { text-align: center; font-family: monospace; font-weight: 900; font-size: 1.5rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--brand-teal); padding: 1.25rem; border-width: 2px; }
//         .fade-in { animation: fadeIn 0.3s ease; }
//         @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
//       `}</style>

//       <div className="bg-white p-4 p-md-5 brand-card border position-relative">

//         <div className="d-flex justify-content-center align-items-center gap-2 mb-5">
//           <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>1</div>
//           <div className={`step-connector ${step >= 2 ? 'active' : ''}`}></div>
//           <div className={`step-circle ${step >= 2 ? 'active' : ''}`}>2</div>
//           <div className={`step-connector ${step >= 3 ? 'active' : ''}`}></div>
//           <div className={`step-circle ${step >= 3 ? 'active' : ''}`}>3</div>
//           <div className={`step-connector ${step >= 4 ? 'active' : ''}`}></div>
//           <div className={`step-circle ${step >= 4 ? 'active' : ''}`}><CheckCircle size={16}/></div>
//         </div>

//         {errorMessage && <div className="alert alert-danger text-center fw-semibold rounded-3 mb-4 fade-in">{errorMessage}</div>}
//         {successMessage && <div className="alert alert-success text-center fw-semibold rounded-3 mb-4 fade-in">{successMessage}</div>}

//         {/* STEP 1 */}
//         {step === 1 && (
//           <div className="fade-in">
//             <h2 className="brand-heading text-center mb-3 display-6">How would you like to participate?</h2>
//             <p className="brand-subtext text-center mb-5 fs-5">Select your registration path for <span className="fw-bold" style={{ color: 'var(--brand-teal)' }}>{hackathonName}</span>.</p>
//             <div className="d-flex flex-column gap-3">
//               <button onClick={() => { setRegistrationType('create'); setStep(2); }} className="brand-option-btn">
//                 <div className="brand-icon-wrap"><UserPlus size={28} /></div>
//                 <div><h3 className="brand-option-title fs-4">Create a New Team</h3><p className="brand-subtext small mb-0">You will be the Team Leader and invite others.</p></div>
//               </button>
//               <button onClick={() => { setRegistrationType('join'); setStep(2); }} className="brand-option-btn">
//                 <div className="brand-icon-wrap"><Users size={28} /></div>
//                 <div><h3 className="brand-option-title fs-4">Join an Existing Team</h3><p className="brand-subtext small mb-0">I have an invite code from my Team Leader.</p></div>
//               </button>
//               {/* <button onClick={() => { setRegistrationType('solo'); setStep(2); }} className="brand-option-btn">
//                 <div className="brand-icon-wrap"><Search size={28} /></div>
//                 <div><h3 className="brand-option-title fs-4">Looking for a Team</h3><p className="brand-subtext small mb-0">Register solo and match with teams looking for skills.</p></div>
//               </button> */}
//             </div>
//           </div>
//         )}

//         {/* STEP 2: DETAILS */}
//         {step === 2 && (
//           <div className="fade-in">
//             <button onClick={() => setStep(1)} className="brand-back-link"><ArrowLeft size={16} /> Back</button>
//             <h2 className="brand-heading mb-3 display-6">Verify Your Details</h2>
//             <p className="brand-subtext mb-5 fs-5">Please confirm your participant details for this specific event.</p>

//             <div className="row g-4 mb-5">
//               <div className="col-12">
//                 <label className="brand-label">Full Name</label>
//                 <input type="text" name="name" value={formData.name} onChange={handleChange} className="brand-input" placeholder="e.g. John Doe" />
//               </div>
//               <div className="col-12">
//                 <label className="brand-label">Email Address (Requires Verification)</label>
//                 <input type="email" name="email" value={formData.email} onChange={handleChange} className="brand-input" placeholder="name@example.com" />
//               </div>
//               <div className="col-12">
//                 <label className="brand-label">College / University</label>
//                 <input type="text" name="college" value={formData.college} onChange={handleChange} className="brand-input" placeholder="e.g. Geeta University" />
//               </div>
//               <div className="col-md-6">
//                 <label className="brand-label">Course & Branch</label>
//                 <input type="text" name="course" value={formData.course} onChange={handleChange} className="brand-input" placeholder="e.g. B.Tech CSE" />
//               </div>
//               <div className="col-md-6">
//                 <label className="brand-label">Location</label>
//                 <input type="text" name="location" value={formData.location} onChange={handleChange} className="brand-input" placeholder="e.g. Haryana" />
//               </div>
//             </div>

//             <button onClick={() => { if (validateStep2()) setStep(3); }} className="brand-btn-primary w-100 d-flex justify-content-center align-items-center gap-2">
//               Continue <ArrowRight size={20} />
//             </button>
//           </div>
//         )}

//         {/* STEP 3: CONTEXTUAL ACTIONS */}
//         {step === 3 && (
//           <div className="fade-in">
//             <button onClick={() => setStep(2)} className="brand-back-link"><ArrowLeft size={16} /> Back</button>

//             {registrationType === 'create' && (
//               <>
//                 <h2 className="brand-heading mb-3 display-6">Set Up Your Team</h2>
//                 <p className="brand-subtext mb-5 fs-5">Give your team a strong name to stand out.</p>
//                 <div className="mb-4">
//                   <label className="brand-label">Team Name</label>
//                   <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} className="brand-input" placeholder="e.g. Code Crusaders" />
//                 </div>
//                 <div className="code-box text-center mb-5">
//                   <p className="brand-label text-center">Your Unique Invite Code</p>
//                   <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3">
//                     <code className="code-pill w-100 w-sm-auto">{generatedCode}</code>
//                     <button onClick={handleCopy} className="copy-btn w-100 w-sm-auto">
//                       {copied ? <><CheckCircle size={20} /> Copied</> : <><Copy size={20} /> Copy</>}
//                     </button>
//                   </div>
//                   <p className="brand-subtext small mt-4 mb-0">Share this code with your friends so they can join this team in Step 1.</p>
//                 </div>
//               </>
//             )}

//             {registrationType === 'join' && (
//               <>
//                 <h2 className="brand-heading mb-3 display-6">Join Your Squad</h2>
//                 <p className="brand-subtext mb-5 fs-5">Enter the invite code provided by your Team Leader.</p>
//                 <div className="mb-5">
//                   <label className="brand-label text-center">Invite Code</label>
//                   <input type="text" name="inviteCode" value={formData.inviteCode} onChange={handleChange} className="brand-input invite-input" placeholder="CWXXXX" />
//                 </div>
//               </>
//             )}

//             {registrationType === 'solo' && (
//               <>
//                 <h2 className="brand-heading mb-3 display-6">Let's Find You a Team</h2>
//                 <p className="brand-subtext mb-5 fs-5">Tell us what you are good at so teams can recruit you.</p>
//                 <div className="mb-5">
//                   <label className="brand-label">Your Primary Skills</label>
//                   <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="brand-input" placeholder="e.g. React, Node.js, UI/UX Design..." />
//                   <p className="brand-subtext small mt-3 mb-0">Separate skills with commas. These will be displayed on your profile in the matchmaking board.</p>
//                 </div>
//               </>
//             )}

//             <button onClick={handleSendOtp} disabled={isLoading} className="brand-btn-primary w-100 d-flex justify-content-center align-items-center gap-2">
//               {isLoading ? <><Loader2 size={20} className="spinner-border spinner-border-sm" /> Sending OTP...</> : <>Verify Email to Finish <ArrowRight size={20} /></>}
//             </button>
//           </div>
//         )}

//         {/* STEP 4: OTP VERIFICATION */}
//         {step === 4 && (
//           <div className="fade-in text-center">
//             <button onClick={() => setStep(3)} className="brand-back-link me-auto mb-4" style={{ display: 'flex' }}><ArrowLeft size={16} /> Back</button>
            
//             <div className="d-inline-flex align-items-center justify-content-center bg-light text-teal rounded-circle mb-4" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(0,194,178,0.1)' }}>
//               <Mail size={40} color="var(--brand-teal)" />
//             </div>

//             <h2 className="brand-heading mb-3 display-6">Verify Your Email</h2>
//             <p className="brand-subtext mb-5 fs-5">We sent a 6-digit verification code to <strong className="text-dark">{formData.email}</strong></p>

//             <div className="mb-5 mx-auto" style={{ maxWidth: '300px' }}>
//               <input 
//                 type="text" 
//                 name="otp" 
//                 value={formData.otp} 
//                 onChange={handleChange} 
//                 className="brand-input invite-input text-center" 
//                 placeholder="000000"
//                 maxLength="6"
//               />
//             </div>

//             <button onClick={handleComplete} disabled={isLoading} className="brand-btn-primary w-100 d-flex justify-content-center align-items-center gap-2 mb-3">
//               {isLoading ? <><Loader2 size={20} className="spinner-border spinner-border-sm" /> Verifying...</> : <>Complete Registration <CheckCircle size={20} /></>}
//             </button>

//             <button onClick={handleSendOtp} disabled={isLoading} className="btn btn-link text-muted fw-semibold text-decoration-none">
//               Didn't receive the code? Resend
//             </button>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default RegistrationFlow;


import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { UserPlus, Users, Search, ArrowRight, ArrowLeft, CheckCircle, Copy, Loader2, Mail } from 'lucide-react';
import axios from 'axios';

const RegistrationFlow = () => {
  const navigate = useNavigate();
  const { id: hackathonId } = useParams();
  const location = useLocation();
  const hackathonName = location.state?.hackathonName || "Unknown Hackathon";

  // Still fetch the ID to send to the backend, but we no longer block the UI
  const getLoggedInUser = () => {
    let id = localStorage.getItem('userId');
    if (id) return id;

    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        id = userObj._id || userObj.id;
        if (id) return id;
      } catch (error) {
        console.error("Could not parse user object from localStorage");
      }
    }

    if (localStorage.getItem('token')) {
      return "authenticated-user";
    }
    return null;
  };

  const loggedInUserId = getLoggedInUser();

  const [step, setStep] = useState(1);
  const [registrationType, setRegistrationType] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    course: '',
    location: '',
    teamName: '',
    inviteCode: '',
    skills: '',
    otp: ''
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

  const validateStep2 = () => {
    if (!formData.name || !formData.email || !formData.college || !formData.course || !formData.location) {
      setErrorMessage("Please fill all required fields.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axios.post('http://localhost:5000/api/send-otp', { 
        email: formData.email,
        hackathonId: hackathonId 
      });
      setSuccessMessage(`Verification code sent to ${formData.email}`);
      setStep(4); 
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!formData.otp || formData.otp.length < 6) {
      setErrorMessage("Please enter the 6-digit verification code.");
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const payload = {
        userId: loggedInUserId || "unknown-user", 
        hackathonId: hackathonId,
        hackathonName: hackathonName,
        registrationType: registrationType,
        otp: formData.otp, 
        personalDetails: {
          name: formData.name,
          email: formData.email,
          college: formData.college,
          course: formData.course,
          location: formData.location
        },
        teamDetails: {
          teamName: formData.teamName,
          inviteCode: registrationType === 'create' ? generatedCode : formData.inviteCode,
          skills: formData.skills
        }
      };

      await axios.post('http://localhost:5000/api/register', payload);
      navigate('/participant/team'); 

    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage(error.response?.data?.error || "Invalid OTP or Registration Error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5 px-3 px-md-4" style={{ maxWidth: '48rem' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@600;700&display=swap');

        :root {
          --brand-teal: #00A99A;
          --brand-teal-dark: #00877B;
          --brand-navy: #0F1B2D;
          --brand-muted: #64748B;
          --brand-label: #47566B;
          --brand-border: #E4E9F0;
          --brand-bg-soft: #F8FAFC;
          --brand-bg-softer: #F1F5F9;
          --brand-placeholder: #98A5B5;

          --font-display: 'Manrope', 'Segoe UI', sans-serif;
          --font-body: 'Inter', 'Segoe UI', sans-serif;
          --font-mono: 'IBM Plex Mono', 'SFMono-Regular', monospace;
        }

        .rf-root {
          font-family: var(--font-body);
          color: var(--brand-navy);
        }

        .brand-card { border-radius: 20px; box-shadow: 0 1px 2px rgba(15,27,45,0.04), 0 16px 40px rgba(15,27,45,0.06); }

        .step-circle {
          width: 2.375rem; height: 2.375rem; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display); font-weight: 700; font-size: 0.85rem;
          transition: all 0.3s ease;
          background-color: var(--brand-bg-softer); color: var(--brand-placeholder);
          border: 1px solid var(--brand-border);
        }
        .step-circle.active { background-color: var(--brand-teal); color: #fff; border: none; box-shadow: 0 4px 10px rgba(0,169,154,0.25); }
        .step-connector { height: 2px; width: 2.5rem; border-radius: 999px; background-color: var(--brand-border); transition: background-color 0.5s ease; }
        .step-connector.active { background-color: var(--brand-teal); }

        .brand-option-btn {
          display: flex; align-items: center; width: 100%; text-align: left;
          padding: 1.25rem 1.5rem; border-radius: 14px; border: 1px solid var(--brand-border);
          background-color: #fff; box-shadow: 0 1px 2px rgba(15,27,45,0.03);
          transition: all 0.2s ease;
        }
        .brand-option-btn:hover { border-color: rgba(0,169,154,0.45); background-color: var(--brand-bg-soft); box-shadow: 0 6px 16px rgba(15,27,45,0.06); transform: translateY(-1px); }
        .brand-icon-wrap { background-color: var(--brand-bg-softer); color: var(--brand-muted); border-radius: 10px; padding: 0.9rem; margin-right: 1.25rem; transition: all 0.2s ease; }
        .brand-option-btn:hover .brand-icon-wrap { background-color: rgba(0,169,154,0.1); color: var(--brand-teal); }
        .brand-option-title { font-family: var(--font-display); color: var(--brand-navy); font-weight: 700; font-size: 1.05rem; letter-spacing: -0.01em; margin-bottom: 0.2rem; }
        .brand-option-btn:hover .brand-option-title { color: var(--brand-teal-dark); }

        .brand-label {
          font-family: var(--font-body); font-size: 11px; font-weight: 600; color: var(--brand-label);
          text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.5rem; display: block;
        }
        .brand-input {
          font-family: var(--font-body); border: 1px solid var(--brand-border); border-radius: 10px;
          background-color: var(--brand-bg-soft); padding: 0.85rem 1.05rem; font-weight: 500; font-size: 0.95rem;
          color: var(--brand-navy); width: 100%;
        }
        .brand-input::placeholder { color: var(--brand-placeholder); font-weight: 400; }
        .brand-input:focus { background-color: #fff; border-color: var(--brand-teal); box-shadow: 0 0 0 3px rgba(0,169,154,0.12); outline: none; }

        .brand-btn-primary {
          background-color: var(--brand-teal); border: none; color: #fff;
          font-family: var(--font-display); font-weight: 700; font-size: 0.98rem; letter-spacing: 0.01em;
          padding: 0.85rem 1.5rem; border-radius: 10px; box-shadow: 0 1px 2px rgba(15,27,45,0.06);
          transition: all 0.2s ease;
        }
        .brand-btn-primary:hover:not(:disabled) { background-color: var(--brand-teal-dark); }
        .brand-btn-primary:disabled { opacity: 0.65; cursor: not-allowed; }

        .brand-back-link {
          color: var(--brand-muted); font-family: var(--font-body); font-weight: 600; font-size: 0.85rem;
          background: none; border: none; display: inline-flex; align-items: center; gap: 0.4rem; margin-bottom: 2rem;
          transition: color 0.2s ease;
        }
        .brand-back-link:hover { color: var(--brand-navy); }

        .brand-heading {
          font-family: var(--font-display); color: var(--brand-navy); font-weight: 800;
          letter-spacing: -0.02em; line-height: 1.15;
        }
        .brand-subtext { font-family: var(--font-body); color: var(--brand-muted); font-weight: 400; line-height: 1.5; }

        .code-box { background-color: var(--brand-bg-soft); border: 1px solid var(--brand-border); border-radius: 14px; padding: 1.75rem; }
        .code-pill {
          background-color: #fff; border: 1px solid var(--brand-border); border-radius: 10px; color: var(--brand-teal-dark);
          font-family: var(--font-mono); font-weight: 700; font-size: 1.35rem; letter-spacing: 0.18em; padding: 0.7rem 1.4rem;
        }
        .copy-btn {
          background-color: var(--brand-navy); color: #fff; border: none; border-radius: 10px; padding: 0.8rem 1rem;
          font-family: var(--font-body); font-weight: 600; font-size: 0.9rem;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: background-color 0.2s ease;
        }
        .copy-btn:hover { background-color: var(--brand-teal); }

        .invite-input {
          text-align: center; font-family: var(--font-mono); font-weight: 700; font-size: 1.35rem;
          text-transform: uppercase; letter-spacing: 0.18em; color: var(--brand-teal-dark); padding: 1.1rem; border-width: 2px;
        }

        .fade-in { animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="rf-root">
      <div className="bg-white p-4 p-md-5 brand-card border position-relative">

        <div className="d-flex justify-content-center align-items-center gap-2 mb-5">
          <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`step-connector ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step-circle ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`step-connector ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`step-circle ${step >= 3 ? 'active' : ''}`}>3</div>
          <div className={`step-connector ${step >= 4 ? 'active' : ''}`}></div>
          <div className={`step-circle ${step >= 4 ? 'active' : ''}`}><CheckCircle size={16}/></div>
        </div>

        {errorMessage && <div className="alert alert-danger text-center fw-semibold rounded-3 mb-4 fade-in">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success text-center fw-semibold rounded-3 mb-4 fade-in">{successMessage}</div>}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="fade-in">
            <h2 className="brand-heading text-center mb-3 display-6">How would you like to participate?</h2>
            <p className="brand-subtext text-center mb-5 fs-5">Select your registration path for <span className="fw-bold" style={{ color: 'var(--brand-teal-dark)' }}>{hackathonName}</span>.</p>
            <div className="d-flex flex-column gap-3">
              <button onClick={() => { setRegistrationType('create'); setStep(2); }} className="brand-option-btn">
                <div className="brand-icon-wrap"><UserPlus size={26} /></div>
                <div><h3 className="brand-option-title">Create a New Team</h3><p className="brand-subtext small mb-0">You will be the Team Leader and invite others.</p></div>
              </button>
              <button onClick={() => { setRegistrationType('join'); setStep(2); }} className="brand-option-btn">
                <div className="brand-icon-wrap"><Users size={26} /></div>
                <div><h3 className="brand-option-title">Join an Existing Team</h3><p className="brand-subtext small mb-0">I have an invite code from my Team Leader.</p></div>
              </button>
              {/* <button onClick={() => { setRegistrationType('solo'); setStep(2); }} className="brand-option-btn">
                <div className="brand-icon-wrap"><Search size={26} /></div>
                <div><h3 className="brand-option-title">Looking for a Team</h3><p className="brand-subtext small mb-0">Register solo and match with teams looking for skills.</p></div>
              </button> */}
            </div>
          </div>
        )}

        {/* STEP 2: DETAILS */}
        {step === 2 && (
          <div className="fade-in">
            <button onClick={() => setStep(1)} className="brand-back-link"><ArrowLeft size={16} /> Back</button>
            <h2 className="brand-heading mb-3 display-6">Verify Your Details</h2>
            <p className="brand-subtext mb-5 fs-5">Please confirm your participant details for this specific event.</p>

            <div className="row g-4 mb-5">
              <div className="col-12">
                <label className="brand-label">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="brand-input" placeholder="e.g. John Doe" />
              </div>
              <div className="col-12">
                <label className="brand-label">Email Address (Requires Verification)</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="brand-input" placeholder="name@example.com" />
              </div>
              <div className="col-12">
                <label className="brand-label">College / University</label>
                <input type="text" name="college" value={formData.college} onChange={handleChange} className="brand-input" placeholder="e.g. Geeta University" />
              </div>
              <div className="col-md-6">
                <label className="brand-label">Course & Branch</label>
                <input type="text" name="course" value={formData.course} onChange={handleChange} className="brand-input" placeholder="e.g. B.Tech CSE" />
              </div>
              <div className="col-md-6">
                <label className="brand-label">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="brand-input" placeholder="e.g. Haryana" />
              </div>
            </div>

            <button onClick={() => { if (validateStep2()) setStep(3); }} className="brand-btn-primary w-100 d-flex justify-content-center align-items-center gap-2">
              Continue <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* STEP 3: CONTEXTUAL ACTIONS */}
        {step === 3 && (
          <div className="fade-in">
            <button onClick={() => setStep(2)} className="brand-back-link"><ArrowLeft size={16} /> Back</button>

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
                      {copied ? <><CheckCircle size={18} /> Copied</> : <><Copy size={18} /> Copy</>}
                    </button>
                  </div>
                  <p className="brand-subtext small mt-4 mb-0">Share this code with your friends so they can join this team in Step 1.</p>
                </div>
              </>
            )}

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

            <button onClick={handleSendOtp} disabled={isLoading} className="brand-btn-primary w-100 d-flex justify-content-center align-items-center gap-2">
              {isLoading ? <><Loader2 size={20} className="spinner-border spinner-border-sm" /> Sending OTP...</> : <>Verify Email to Finish <ArrowRight size={20} /></>}
            </button>
          </div>
        )}

        {/* STEP 4: OTP VERIFICATION */}
        {step === 4 && (
          <div className="fade-in text-center">
            <button onClick={() => setStep(3)} className="brand-back-link me-auto mb-4" style={{ display: 'flex' }}><ArrowLeft size={16} /> Back</button>
            
            <div className="d-inline-flex align-items-center justify-content-center bg-light text-teal rounded-circle mb-4" style={{ width: '76px', height: '76px', backgroundColor: 'rgba(0,169,154,0.1)' }}>
              <Mail size={36} color="var(--brand-teal)" />
            </div>

            <h2 className="brand-heading mb-3 display-6">Verify Your Email</h2>
            <p className="brand-subtext mb-5 fs-5">We sent a 6-digit verification code to <strong className="text-dark">{formData.email}</strong></p>

            <div className="mb-5 mx-auto" style={{ maxWidth: '300px' }}>
              <input 
                type="text" 
                name="otp" 
                value={formData.otp} 
                onChange={handleChange} 
                className="brand-input invite-input text-center" 
                placeholder="000000"
                maxLength="6"
              />
            </div>

            <button onClick={handleComplete} disabled={isLoading} className="brand-btn-primary w-100 d-flex justify-content-center align-items-center gap-2 mb-3">
              {isLoading ? <><Loader2 size={20} className="spinner-border spinner-border-sm" /> Verifying...</> : <>Complete Registration <CheckCircle size={20} /></>}
            </button>

            <button onClick={handleSendOtp} disabled={isLoading} className="btn btn-link text-muted fw-semibold text-decoration-none" style={{ fontFamily: 'var(--font-body)' }}>
              Didn't receive the code? Resend
            </button>
          </div>
        )}

      </div>
      </div>
    </div>
  );
};

export default RegistrationFlow;