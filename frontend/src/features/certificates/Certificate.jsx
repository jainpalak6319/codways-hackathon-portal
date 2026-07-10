import { useState, useRef } from 'react';
import { Download, Award } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Certificate = ({ 
  participantName = "Alex Johnson", 
  hackathonName = "Code the Future 2026",
  date = "July 3, 2026",
  location = "Uchana, Haryana, India"
}) => {
  const certificateRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const element = certificateRef.current;
    if (!element) return;

    setIsDownloading(true);

    try {
      // 1. Take a high-res screenshot of the component
      const canvas = await html2canvas(element, {
        scale: 2, // 2x scale for crisp text resolution
        useCORS: true, // Allows loading external images if you add any later
        backgroundColor: '#ffffff'
      });

      // 2. Convert canvas to an image string
      const imgData = canvas.toDataURL('image/png');

      // 3. Initialize jsPDF in Landscape ('l'), millimeters ('mm'), A4 size ('a4')
      const pdf = new jsPDF('l', 'mm', 'a4');

      // 4. Calculate dimensions (A4 is 297mm x 210mm)
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // 5. Add image and trigger download
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${participantName.replace(/\s+/g, '_')}_Certificate.pdf`);
      
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      
      {/* Download Action Bar */}
      <div className="w-full max-w-[900px] flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Your Certificate</h2>
          <p className="text-slate-500">Congratulations on completing the hackathon!</p>
        </div>
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
        >
          {isDownloading ? <span className="animate-pulse">Generating PDF...</span> : 'Download PDF'} 
          <Download size={18} />
        </button>
      </div>

      {/* ================= CERTIFICATE CANVAS ================= */}
      {/* A standard A4 landscape aspect ratio container */}
      <div 
        ref={certificateRef}
        id="certificate-node"
        className="relative w-full max-w-[900px] aspect-[1.414/1] bg-[#f8fafc] border-[12px] border-white shadow-2xl overflow-hidden flex"
        style={{
          // Subtle background pattern to match the premium reference image
          backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      >
        
        {/* RIGHT SIDE GEOMETRIC SHAPES */}
        <div className="absolute top-0 -right-16 w-[300px] h-[120%] bg-blue-700 -skew-x-12 z-0 shadow-2xl"></div>
        <div className="absolute top-0 -right-24 w-[150px] h-[120%] bg-teal-500 -skew-x-12 z-0 shadow-xl"></div>

        {/* GOLD MEDAL BADGE */}
        <div className="absolute bottom-24 right-20 z-20 flex flex-col items-center">
          {/* Medal Circle */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-700 border-4 border-yellow-100 shadow-xl flex items-center justify-center relative z-10">
            <div className="w-24 h-24 rounded-full border border-yellow-300/50 bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-200 flex items-center justify-center">
              <Award size={40} className="text-yellow-100 opacity-80" />
            </div>
          </div>
          {/* Red Ribbons */}
          <div className="flex gap-2 -mt-4 relative z-0">
            <div className="w-6 h-16 bg-red-600 rounded-b-sm shadow-md" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}></div>
            <div className="w-6 h-16 bg-red-700 rounded-b-sm shadow-md" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}></div>
          </div>
        </div>

        {/* MAIN CONTENT CONTAINER */}
        <div className="relative z-10 w-full h-full p-12 flex flex-col pr-[250px]">
          
          {/* Header row: Bars + Brand */}
          <div className="flex items-start justify-between w-full mb-12">
            {/* Top Left Bars */}
            <div className="flex flex-col gap-1.5 mt-2">
              <div className="w-24 h-2 bg-blue-700"></div>
              <div className="w-20 h-2 bg-teal-500"></div>
              <div className="w-16 h-2 bg-blue-300"></div>
            </div>
            
            {/* Codways Brand */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5 text-blue-900 font-black text-2xl tracking-tighter">
                COD<span className="text-teal-600">WAYS</span>
              </div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500">TECHNOLOGIES</span>
            </div>
          </div>

          {/* Certificate Title */}
          <div className="mb-8">
            <h1 className="text-5xl font-serif font-bold text-[#cfb038] tracking-widest mb-2">CERTIFICATE</h1>
            <h2 className="text-xl font-serif font-bold text-[#cfb038] tracking-[0.2em]">OF RECOGNITION</h2>
          </div>

          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">
            This certificate is proudly presented to
          </p>

          {/* Participant Name */}
          <h1 
            className="text-6xl text-[#cfb038] mb-8 font-medium"
            style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}
          >
            {participantName}
          </h1>

          {/* Description */}
          <p className="text-sm text-slate-700 font-medium leading-relaxed max-w-[500px] mb-auto">
            FOR OUTSTANDING PARTICIPATION AND INNOVATION IN <br/> 
            <span className="font-bold text-slate-900">{hackathonName.toUpperCase()}</span> <br/>
            HELD ON {date.toUpperCase()} — {location.toUpperCase()}.
          </p>

          {/* Footer Signatures */}
          <div className="flex items-center gap-16 mt-12">
            <div className="flex flex-col items-center">
              <div className="w-32 border-b-2 border-slate-400 mb-2 h-8 flex items-end justify-center">
                <span className="font-['Brush_Script_MT'] text-2xl text-slate-800 opacity-80">Admin</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Hackathon Director</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-32 border-b-2 border-slate-400 mb-2 h-8 flex items-end justify-center">
                <span className="font-['Brush_Script_MT'] text-2xl text-slate-800 opacity-80">Codways</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Platform Sponsor</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Certificate;