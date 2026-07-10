import { Check } from 'lucide-react';

const steps = [
  { id: 1, name: 'Registered', status: 'complete' },
  { id: 2, name: 'Team Verified', status: 'complete' },
  { id: 3, name: 'Round 1: Idea', status: 'current' },
  { id: 4, name: 'Round 2: Prototype', status: 'upcoming' },
  { id: 5, name: 'Final Evaluation', status: 'upcoming' },
];

const StatusTracker = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-coolgray/30 w-full max-w-4xl">
      <h3 className="text-xl font-bold text-navy mb-8">Application Status</h3>
      
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-ice z-0 rounded-full">
          <div className="absolute top-0 left-0 h-1 bg-teal transition-all duration-500 rounded-full" style={{ width: '50%' }}></div>
        </div>

        <div className="relative z-10 flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-colors ${
                  step.status === 'complete' ? 'bg-teal text-white' :
                  step.status === 'current' ? 'bg-electric text-white ring-4 ring-mint' :
                  'bg-coolgray/40 text-navy/50'
                }`}
              >
                {step.status === 'complete' ? <Check size={18} strokeWidth={3} /> : <span className="font-bold text-sm">{step.id}</span>}
              </div>
              <span className={`mt-3 text-sm font-semibold ${
                step.status === 'current' ? 'text-electric' : 
                step.status === 'complete' ? 'text-navy' : 'text-coolgray'
              }`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusTracker;