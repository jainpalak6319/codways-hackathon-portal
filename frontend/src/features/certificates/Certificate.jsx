import React, { useRef, useState, useMemo } from 'react';
import { Download, Award, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * ---------------------------------------------------------------------------
 * DATA SHAPE
 * ---------------------------------------------------------------------------
 * Swap `defaultHackathons` for real data from your backend/API. A hackathon
 * only needs `status: "completed"` for a certificate to be auto-generated
 * for it — nothing else to trigger manually.
 *
 * {
 *   id: string,
 *   name: string,
 *   date: string,          // display string, e.g. "July 3, 2026"
 *   location: string,
 *   status: "completed" | "in-progress" | "upcoming"
 * }
 * ---------------------------------------------------------------------------
 */
const defaultHackathons = [
  {
    id: 'hk-2026-01',
    name: 'Code the Future 2026',
    date: 'July 3, 2026',
    location: 'Uchana, Haryana, India',
    status: 'completed',
  },
  {
    id: 'hk-2026-02',
    name: 'AI for Good Sprint',
    date: 'May 18, 2026',
    location: 'Remote',
    status: 'completed',
  },
  {
    id: 'hk-2026-03',
    name: 'Open Source Odyssey',
    date: 'March 2, 2026',
    location: 'Gurugram, Haryana, India',
    status: 'completed',
  },
  {
    id: 'hk-2026-04',
    name: 'Winter Build Jam',
    date: 'August 20, 2026',
    location: 'Remote',
    status: 'upcoming', // no certificate — not completed yet
  },
];

/** Single certificate layout. Forwarded a ref so it can be captured to PDF. */
const CertificateCard = React.forwardRef(function CertificateCard(
  { participantName, hackathonName, date, location },
  ref
) {
  return (
    <div
      ref={ref}
      className="position-relative w-100 bg-white border border-white shadow-lg overflow-hidden d-flex"
      style={{
        maxWidth: '900px',
        aspectRatio: '1.414/1',
        borderWidth: '12px',
        backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* RIGHT SIDE GEOMETRIC SHAPES */}
      <div
        className="position-absolute top-0 end-0 bg-primary"
        style={{ width: '300px', height: '120%', transform: 'skewX(-12deg)', marginRight: '-64px', zIndex: 0 }}
      ></div>
      <div
        className="position-absolute top-0 end-0 bg-info"
        style={{ width: '150px', height: '120%', transform: 'skewX(-12deg)', marginRight: '-96px', zIndex: 0 }}
      ></div>

      {/* GOLD MEDAL BADGE */}
      <div className="position-absolute bottom-0 end-0 mb-5 me-5 d-flex flex-column align-items-center z-2">
        <div
          className="rounded-circle bg-warning border border-light border-4 shadow d-flex align-items-center justify-content-center"
          style={{ width: '112px', height: '112px', background: 'linear-gradient(45deg, #fde047, #ca8a04)' }}
        >
          <div
            className="rounded-circle border border-warning d-flex align-items-center justify-content-center"
            style={{ width: '96px', height: '96px', background: 'linear-gradient(135deg, #a16207, #fef08a)' }}
          >
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
            <div className="fw-black text-primary fs-3 lh-1">
              COD<span className="text-info">WAYS</span>
            </div>
            <small className="fw-bold text-secondary" style={{ fontSize: '10px', letterSpacing: '0.2em' }}>
              TECHNOLOGIES
            </small>
          </div>
        </div>

        <div className="mb-4">
          <h1 className="display-5 fw-bold text-warning mb-0" style={{ letterSpacing: '0.1em' }}>
            CERTIFICATE
          </h1>
          <h2 className="h4 fw-bold text-warning" style={{ letterSpacing: '0.2em' }}>
            OF RECOGNITION
          </h2>
        </div>

        <p className="fw-bold text-secondary text-uppercase mb-4" style={{ fontSize: '14px', letterSpacing: '0.2em' }}>
          This certificate is proudly presented to
        </p>

        <h1 className="display-4 text-warning mb-4" style={{ fontFamily: 'cursive' }}>
          {participantName}
        </h1>

        <p className="text-dark fw-medium lh-lg mb-auto" style={{ fontSize: '14px', maxWidth: '500px' }}>
          FOR OUTSTANDING PARTICIPATION AND INNOVATION IN <br />
          <strong className="text-dark">{hackathonName.toUpperCase()}</strong> <br />
          HELD ON {date.toUpperCase()} — {location.toUpperCase()}.
        </p>

        <div className="d-flex gap-5 mt-5">
          <div>
            <div className="border-bottom border-2 border-secondary mb-1" style={{ width: '128px', height: '32px' }}></div>
            <span className="fw-bold text-secondary text-uppercase" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>
              Hackathon Director
            </span>
          </div>
          <div>
            <div className="border-bottom border-2 border-secondary mb-1" style={{ width: '128px', height: '32px' }}></div>
            <span className="fw-bold text-secondary text-uppercase" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>
              Platform Sponsor
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

/** Turns a DOM node into a downloaded landscape A4 PDF. */
async function downloadNodeAsPdf(node, filename) {
  const canvas = await html2canvas(node, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('l', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
}

const HackathonCertificates = ({ participantName = 'Alex Johnson', hackathons = defaultHackathons }) => {
  // One ref per completed hackathon, keyed by id, so each certificate can be
  // captured and downloaded independently.
  const certRefs = useRef({});
  const [downloadingId, setDownloadingId] = useState(null); // single-download spinner
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [activeId, setActiveId] = useState(null); // which certificate is expanded/previewed

  // Certificates auto-generate for every hackathon marked completed —
  // no manual trigger needed. Anything not completed is listed as pending.
  const completed = useMemo(() => hackathons.filter((h) => h.status === 'completed'), [hackathons]);
  const pending = useMemo(() => hackathons.filter((h) => h.status !== 'completed'), [hackathons]);

  const filenameFor = (hackathon) =>
    `${participantName.replace(/\s+/g, '_')}_${hackathon.name.replace(/\s+/g, '_')}_Certificate.pdf`;

  const handleDownloadOne = async (hackathon) => {
    const node = certRefs.current[hackathon.id];
    if (!node) return;
    setDownloadingId(hackathon.id);
    try {
      await downloadNodeAsPdf(node, filenameFor(hackathon));
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadAll = async () => {
    setDownloadingAll(true);
    try {
      for (const hackathon of completed) {
        const node = certRefs.current[hackathon.id];
        if (!node) continue;
        // eslint-disable-next-line no-await-in-loop
        await downloadNodeAsPdf(node, filenameFor(hackathon));
        // Small gap so the browser doesn't block rapid-fire downloads.
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 400));
      }
    } catch (error) {
      console.error('Error generating PDFs:', error);
    } finally {
      setDownloadingAll(false);
    }
  };

  const activeHackathon = completed.find((h) => h.id === activeId) || completed[0] || null;

  return (
    <div className="container py-5 bg-light min-vh-100">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">My Certificates</h2>
          <p className="text-secondary mb-0">
            {completed.length > 0
              ? `${completed.length} certificate${completed.length > 1 ? 's' : ''} ready for ${participantName}`
              : 'No completed hackathons yet — certificates appear here automatically.'}
          </p>
        </div>
        {completed.length > 0 && (
          <button
            onClick={handleDownloadAll}
            disabled={downloadingAll}
            className="btn btn-primary px-4 py-2 fw-bold d-flex align-items-center gap-2"
          >
            {downloadingAll ? (
              <>
                <Loader2 size={18} className="spin" /> Downloading all...
              </>
            ) : (
              <>
                Download all <Download size={18} />
              </>
            )}
          </button>
        )}
      </div>

      {/* GRID OF EARNED CERTIFICATES */}
      {completed.length > 0 && (
        <div className="row g-4 mb-5">
          {completed.map((hackathon) => (
            <div key={hackathon.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <CheckCircle2 size={18} className="text-success" />
                    <span className="badge text-bg-success-subtle text-success fw-semibold">Completed</span>
                  </div>
                  <h5 className="fw-bold text-dark mb-1">{hackathon.name}</h5>
                  <p className="text-secondary small mb-3">
                    {hackathon.date} · {hackathon.location}
                  </p>
                  <div className="mt-auto d-flex gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm fw-semibold flex-fill"
                      onClick={() => setActiveId(hackathon.id)}
                    >
                      Preview
                    </button>
                    <button
                      className="btn btn-primary btn-sm fw-semibold d-flex align-items-center justify-content-center gap-1 flex-fill"
                      onClick={() => handleDownloadOne(hackathon)}
                      disabled={downloadingId === hackathon.id}
                    >
                      {downloadingId === hackathon.id ? (
                        <Loader2 size={14} className="spin" />
                      ) : (
                        <Download size={14} />
                      )}
                      PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PENDING / UPCOMING HACKATHONS — no certificate yet */}
      {pending.length > 0 && (
        <div className="mb-5">
          <h6 className="fw-bold text-secondary text-uppercase mb-3" style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
            Not yet completed
          </h6>
          <div className="d-flex flex-column gap-2">
            {pending.map((hackathon) => (
              <div
                key={hackathon.id}
                className="d-flex align-items-center gap-2 p-3 bg-white rounded border"
              >
                <Clock size={16} className="text-secondary" />
                <span className="fw-semibold text-dark">{hackathon.name}</span>
                <span className="text-secondary small ms-auto">{hackathon.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LIVE PREVIEW OF SELECTED CERTIFICATE */}
      {activeHackathon && (
        <div className="d-flex flex-column align-items-center">
          <h6 className="fw-bold text-secondary text-uppercase mb-3 align-self-start" style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
            Preview — {activeHackathon.name}
          </h6>
          <CertificateCard
            participantName={participantName}
            hackathonName={activeHackathon.name}
            date={activeHackathon.date}
            location={activeHackathon.location}
            ref={(node) => {
              if (node) certRefs.current[activeHackathon.id] = node;
            }}
          />
        </div>
      )}

      {/*
        Off-screen render of every OTHER completed certificate.
        This keeps a ref + fully rendered DOM node available for each one so
        "Download all" and individual downloads work without the user having
        to click "Preview" on each card first.
      */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }} aria-hidden="true">
        {completed
          .filter((h) => h.id !== activeHackathon?.id)
          .map((hackathon) => (
            <CertificateCard
              key={hackathon.id}
              participantName={participantName}
              hackathonName={hackathon.name}
              date={hackathon.date}
              location={hackathon.location}
              ref={(node) => {
                if (node) certRefs.current[hackathon.id] = node;
              }}
            />
          ))}
      </div>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default HackathonCertificates;