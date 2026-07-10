import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { UserPlus, Users, Search, ArrowRight, ArrowLeft, CheckCircle, Copy, Loader2 } from 'lucide-react';
import axios from 'axios';

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
  
  // Form State
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
    <div className="max-w-3xl mx-auto py-12 px-4 md:px-6 selection:bg-[#00C2B2]/30 selection:text-[#0A1220]">
      
      {/* Clean, Light Container */}
      <div className="bg-white p-8 md:p-12 rounded-[24px] border border-[#E2E8F0] shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative">
        
        {/* Progress Indicator */}
        <div className="relative z-10 mb-12 flex justify-center items-center gap-2 md:gap-4">
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 ${step >= 1 ? 'bg-[#00C2B2] text-white shadow-md' : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0]'}`}>1</div>
          <div className={`h-1 w-12 md:w-20 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-[#00C2B2]' : 'bg-[#E2E8F0]'}`}></div>
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 ${step >= 2 ? 'bg-[#00C2B2] text-white shadow-md' : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0]'}`}>2</div>
          <div className={`h-1 w-12 md:w-20 rounded-full transition-all duration-500 ${step >= 3 ? 'bg-[#00C2B2]' : 'bg-[#E2E8F0]'}`}></div>
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 ${step >= 3 ? 'bg-[#00C2B2] text-white shadow-md' : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0]'}`}>3</div>
        </div>

        {/* Error Message Display */}
        {errorMessage && (
          <div className="relative z-10 mb-8 p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl font-medium text-sm text-center animate-fade-in">
            {errorMessage}
          </div>
        )}

        {/* ================= STEP 1: CHOOSE PATH ================= */}
        {step === 1 && (
          <div className="relative z-10 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-black text-[#0A1220] mb-3 text-center tracking-tight">How would you like to participate?</h2>
            <p className="text-[#7A8A9E] text-center mb-10 font-medium text-lg">Select your registration path for <span className="font-bold text-[#00C2B2]">{hackathonName}</span>.</p>
            
            <div className="space-y-4">
              {/* Option: Create Team */}
              <button onClick={() => { setRegistrationType('create'); setStep(2); }} className="w-full flex items-center p-5 md:p-6 rounded-2xl border border-[#E2E8F0] hover:border-[#00C2B2]/50 hover:bg-[#F8FAFC] transition-all duration-300 group text-left shadow-sm hover:shadow-md">
                <div className="bg-[#F1F5F9] p-4 rounded-xl text-[#7A8A9E] group-hover:bg-[#00C2B2]/10 group-hover:text-[#00C2B2] transition-colors duration-300 mr-5 md:mr-6"><UserPlus size={28} /></div>
                <div>
                  <h3 className="text-xl font-bold text-[#0A1220] mb-1.5 group-hover:text-[#00C2B2] transition-colors">Create a New Team</h3>
                  <p className="text-sm text-[#7A8A9E] font-medium">You will be the Team Leader and invite others.</p>
                </div>
              </button>

              {/* Option: Join Team */}
              <button onClick={() => { setRegistrationType('join'); setStep(2); }} className="w-full flex items-center p-5 md:p-6 rounded-2xl border border-[#E2E8F0] hover:border-[#00C2B2]/50 hover:bg-[#F8FAFC] transition-all duration-300 group text-left shadow-sm hover:shadow-md">
                <div className="bg-[#F1F5F9] p-4 rounded-xl text-[#7A8A9E] group-hover:bg-[#00C2B2]/10 group-hover:text-[#00C2B2] transition-colors duration-300 mr-5 md:mr-6"><Users size={28} /></div>
                <div>
                  <h3 className="text-xl font-bold text-[#0A1220] mb-1.5 group-hover:text-[#00C2B2] transition-colors">Join an Existing Team</h3>
                  <p className="text-sm text-[#7A8A9E] font-medium">I have an invite code from my Team Leader.</p>
                </div>
              </button>

              {/* Option: Solo */}
              <button onClick={() => { setRegistrationType('solo'); setStep(2); }} className="w-full flex items-center p-5 md:p-6 rounded-2xl border border-[#E2E8F0] hover:border-[#00C2B2]/50 hover:bg-[#F8FAFC] transition-all duration-300 group text-left shadow-sm hover:shadow-md">
                <div className="bg-[#F1F5F9] p-4 rounded-xl text-[#7A8A9E] group-hover:bg-[#00C2B2]/10 group-hover:text-[#00C2B2] transition-colors duration-300 mr-5 md:mr-6"><Search size={28} /></div>
                <div>
                  <h3 className="text-xl font-bold text-[#0A1220] mb-1.5 group-hover:text-[#00C2B2] transition-colors">Looking for a Team</h3>
                  <p className="text-sm text-[#7A8A9E] font-medium">Register solo and match with teams looking for skills.</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: PERSONAL DETAILS ================= */}
        {step === 2 && (
          <div className="relative z-10 animate-fade-in">
            <button onClick={() => setStep(1)} className="text-[#7A8A9E] hover:text-[#0A1220] flex items-center gap-2 mb-8 text-sm font-bold transition-colors">
              <ArrowLeft size={16} /> Back
            </button>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A1220] mb-3 tracking-tight">Your Personal Details</h2>
            <p className="text-[#7A8A9E] mb-10 text-lg font-medium">Let's get to know you first.</p>

            <div className="space-y-6 mb-10">
              <div>
                <label className="block text-[11px] font-bold text-[#4F627D] mb-2 uppercase tracking-wider">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#00C2B2] focus:ring-4 focus:ring-[#00C2B2]/10 bg-[#F8FAFC] focus:bg-white text-[#0A1220] font-medium placeholder-[#94A3B8] transition-all" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#4F627D] mb-2 uppercase tracking-wider">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#00C2B2] focus:ring-4 focus:ring-[#00C2B2]/10 bg-[#F8FAFC] focus:bg-white text-[#0A1220] font-medium placeholder-[#94A3B8] transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#4F627D] mb-2 uppercase tracking-wider">College / University</label>
                <input type="text" name="college" value={formData.college} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#00C2B2] focus:ring-4 focus:ring-[#00C2B2]/10 bg-[#F8FAFC] focus:bg-white text-[#0A1220] font-medium placeholder-[#94A3B8] transition-all" placeholder="e.g. Geeta University" />
              </div>
            </div>

            <button 
              onClick={() => {
                if(!formData.name || !formData.email || !formData.college) {
                  setErrorMessage("Please fill all required fields.");
                  return;
                }
                setErrorMessage("");
                setStep(3);
              }} 
              className="w-full bg-[#00C2B2] hover:bg-[#00A89A] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 group"
            >
              Continue <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {/* ================= STEP 3: CONTEXTUAL ACTIONS ================= */}
        {step === 3 && (
          <div className="relative z-10 animate-fade-in">
            <button onClick={() => setStep(2)} className="text-[#7A8A9E] hover:text-[#0A1220] flex items-center gap-2 mb-8 text-sm font-bold transition-colors">
              <ArrowLeft size={16} /> Back
            </button>

            {/* IF CREATE TEAM */}
            {registrationType === 'create' && (
              <>
                <h2 className="text-3xl md:text-4xl font-black text-[#0A1220] mb-3 tracking-tight">Set Up Your Team</h2>
                <p className="text-[#7A8A9E] mb-10 text-lg font-medium">Give your team a strong name to stand out.</p>
                
                <div className="mb-8">
                  <label className="block text-[11px] font-bold text-[#4F627D] mb-2 uppercase tracking-wider">Team Name</label>
                  <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#00C2B2] focus:ring-4 focus:ring-[#00C2B2]/10 bg-[#F8FAFC] focus:bg-white text-[#0A1220] font-medium placeholder-[#94A3B8] transition-all" placeholder="e.g. Code Crusaders" />
                </div>
                
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-2xl mb-10 text-center relative overflow-hidden">
                  <p className="text-[11px] text-[#4F627D] font-bold uppercase tracking-wider mb-4">Your Unique Invite Code</p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <code className="bg-white px-6 py-3 rounded-xl text-[#00C2B2] font-mono text-2xl font-black border border-[#E2E8F0] tracking-[0.2em] shadow-sm w-full sm:w-auto">
                      {generatedCode}
                    </code>
                    <button onClick={handleCopy} className="w-full sm:w-auto p-3.5 bg-[#0A1220] text-white rounded-xl hover:bg-[#00C2B2] transition-colors flex items-center justify-center gap-2 font-semibold shadow-sm">
                      {copied ? <><CheckCircle size={20} /> Copied</> : <><Copy size={20} /> Copy</>}
                    </button>
                  </div>
                  <p className="text-sm text-[#7A8A9E] font-medium mt-5">Share this code with your friends so they can join this team in Step 1.</p>
                </div>
              </>
            )}

            {/* IF JOIN TEAM */}
            {registrationType === 'join' && (
              <>
                <h2 className="text-3xl md:text-4xl font-black text-[#0A1220] mb-3 tracking-tight">Join Your Squad</h2>
                <p className="text-[#7A8A9E] mb-10 text-lg font-medium">Enter the invite code provided by your Team Leader.</p>
                <div className="mb-10">
                  <label className="block text-[11px] font-bold text-[#4F627D] mb-2 uppercase tracking-wider text-center">Invite Code</label>
                  <input type="text" name="inviteCode" value={formData.inviteCode} onChange={handleChange} className="w-full px-5 py-5 rounded-xl border-2 border-[#E2E8F0] focus:outline-none focus:border-[#00C2B2] focus:ring-4 focus:ring-[#00C2B2]/10 bg-[#F8FAFC] focus:bg-white text-[#00C2B2] font-mono font-black text-2xl uppercase tracking-[0.2em] text-center transition-all placeholder-[#CBD5E1]" placeholder="CWXXXX" />
                </div>
              </>
            )}

            {/* IF SOLO / MATCHMAKING */}
            {registrationType === 'solo' && (
              <>
                <h2 className="text-3xl md:text-4xl font-black text-[#0A1220] mb-3 tracking-tight">Let's Find You a Team</h2>
                <p className="text-[#7A8A9E] mb-10 text-lg font-medium">Tell us what you are good at so teams can recruit you.</p>
                <div className="mb-10">
                  <label className="block text-[11px] font-bold text-[#4F627D] mb-2 uppercase tracking-wider">Your Primary Skills</label>
                  <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#00C2B2] focus:ring-4 focus:ring-[#00C2B2]/10 bg-[#F8FAFC] focus:bg-white text-[#0A1220] font-medium placeholder-[#94A3B8] transition-all" placeholder="e.g. React, Node.js, UI/UX Design..." />
                  <p className="text-sm text-[#7A8A9E] font-medium mt-3">Separate skills with commas. These will be displayed on your profile in the matchmaking board.</p>
                </div>
              </>
            )}

            <button 
              onClick={handleComplete} 
              disabled={isLoading}
              className="w-full bg-[#00C2B2] hover:bg-[#00A89A] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <><Loader2 size={20} className="animate-spin" /> Processing...</>
              ) : (
                <>Complete Registration <CheckCircle size={20} className="transition-transform duration-300 group-hover:scale-110" /></>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default RegistrationFlow;