import { Users, Code, Zap } from 'lucide-react';

const MatchmakingCard = ({ teamName, lookingFor, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-coolgray/30 hover:border-electric transition-colors hover:shadow-lg group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-navy text-lg">{teamName}</h4>
          <p className="text-sm text-coolgray mt-1 flex items-center gap-1">
            <Users size={14} /> 2/4 Members
          </p>
        </div>
        <span className="bg-mint/50 text-teal text-xs px-3 py-1 rounded-full font-semibold border border-teal/20">
          Actively Recruiting
        </span>
      </div>
      
      <p className="text-navy/80 text-sm mb-5 line-clamp-2">
        {description}
      </p>

      <div className="mb-6">
        <h5 className="text-xs font-bold text-coolgray uppercase tracking-wider mb-2">Looking For:</h5>
        <div className="flex gap-2 flex-wrap">
          {lookingFor.map((skill, idx) => (
            <span key={idx} className="flex items-center gap-1 text-xs font-medium text-electric bg-ice px-2 py-1 rounded">
              <Code size={12} /> {skill}
            </span>
          ))}
        </div>
      </div>

      <button className="w-full bg-offwhite border-2 border-electric text-electric font-bold py-2 rounded-lg group-hover:bg-electric group-hover:text-white transition-all flex justify-center items-center gap-2">
        <Zap size={16} /> Send Join Request
      </button>
    </div>
  );
};

export default MatchmakingCard;