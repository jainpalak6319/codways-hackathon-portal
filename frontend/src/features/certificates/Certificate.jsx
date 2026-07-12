import React, { useRef, useState } from 'react';
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
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${participantName.replace(/\s+/g, '_')}_Certificate.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="container py-5 d-flex flex-column align-items-center bg-light min-vh-100">
      
      {/* Download Action Bar */}
      <div className="w-100 mb-4 d-flex justify-content-between align-items-end" style={{ maxWidth: '900px' }}>
        <div>
          <h2 className="fw-bold text-dark">Your Certificate</h2>
          <p className="text-secondary">Congratulations on completing the hackathon!</p>
        </div>
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="btn btn-primary px-4 py-3 fw-bold d-flex align-items-center gap-2"
        >
          {isDownloading ? 'Generating PDF...' : 'Download PDF'} 
          <Download size={18} />
        </button>
      </div>

      {/* Certificate Canvas */}
      <div 
        ref={certificateRef}
        className="position-relative w-100 bg-white border border-white shadow-lg overflow-hidden d-flex"
        style={{ 
          maxWidth: '900px', 
          aspectRatio: '1.414/1', 
          borderWidth: '12px',
          backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      >
        {/* RIGHT SIDE GEOMETRIC SHAPES */}
        <div className="position-absolute top-0 end-0 bg-primary" style={{ width: '300px', height: '120%', transform: 'skewX(-12deg)', marginRight: '-64px', zIndex: 0 }}></div>
        <div className="position-absolute top-0 end-0 bg-info" style={{ width: '150px', height: '120%', transform: 'skewX(-12deg)', marginRight: '-96px', zIndex: 0 }}></div>

        {/* GOLD MEDAL BADGE */}
        <div className="position-absolute bottom-0 end-0 mb-5 me-5 d-flex flex-column align-items-center z-2">
          <div className="rounded-circle bg-warning border border-light border-4 shadow d-flex align-items-center justify-content-center" style={{ width: '112px', height: '112px', background: 'linear-gradient(45deg, #fde047, #ca8a04)' }}>
            <div className="rounded-circle border border-warning d-flex align-items-center justify-content-center" style={{ width: '96px', height: '96px', background: 'linear-gradient(135deg, #a16207, #fef08a)' }}>
              <Award size={40} className="text-white opacity-75" />
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="position-relative z-3 w-100 h-100 p-5 d-flex flex-column" style={{ paddingRight: '250px' }}>
          
          <div className="d-flex justify-content-between w-100 mb-5">
            <div className="d-flex flex-column gap-1 pt-2">
              <div className="bg-primary" style={{ width: '96px', height: '8px' }}></div>
              <div className="bg-info" style={{ width: '80px', height: '8px' }}></div>
              <div className="bg-primary-subtle" style={{ width: '64px', height: '8px' }}></div>
            </div>
            
            <div className="text-end">
              <div className="fw-black text-primary fs-3 lh-1">COD<span className="text-info">WAYS</span></div>
              <small className="fw-bold text-secondary" style={{ fontSize: '10px', letterSpacing: '0.2em' }}>TECHNOLOGIES</small>
            </div>
          </div>

          <div className="mb-4">
            <h1 className="display-5 fw-bold text-warning mb-0" style={{ letterSpacing: '0.1em' }}>CERTIFICATE</h1>
            <h2 className="h4 fw-bold text-warning" style={{ letterSpacing: '0.2em' }}>OF RECOGNITION</h2>
          </div>

          <p className="fw-bold text-secondary text-uppercase mb-4" style={{ fontSize: '14px', letterSpacing: '0.2em' }}>
            This certificate is proudly presented to
          </p>

          <h1 className="display-4 text-warning mb-4" style={{ fontFamily: 'cursive' }}>{participantName}</h1>

          <p className="text-dark fw-medium lh-lg mb-auto" style={{ fontSize: '14px', maxWidth: '500px' }}>
            FOR OUTSTANDING PARTICIPATION AND INNOVATION IN <br/> 
            <strong className="text-dark">{hackathonName.toUpperCase()}</strong> <br/>
            HELD ON {date.toUpperCase()} — {location.toUpperCase()}.
          </p>

          <div className="d-flex gap-5 mt-5">
            <div>
              <div className="border-bottom border-2 border-secondary mb-1" style={{ width: '128px', height: '32px' }}></div>
              <span className="fw-bold text-secondary text-uppercase" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>Hackathon Director</span>
            </div>
            <div>
              <div className="border-bottom border-2 border-secondary mb-1" style={{ width: '128px', height: '32px' }}></div>
              <span className="fw-bold text-secondary text-uppercase" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>Platform Sponsor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;