import { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { MdOutlineFileDownload, MdOutlinePictureAsPdf } from 'react-icons/md';
import Loader from '../../components/admin/common/Loader';
import { getReportsOverview } from '../../services/reportAPI';

export default function Reports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getReportsOverview().then((res) => { setData(res); setLoading(false); }); }, []);

  if (loading) return <Loader fullHeight label="Crunching the numbers..." />;

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle mb-0">Platform-wide performance across every hackathon.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn-outline-soft"><MdOutlineFileDownload /> Export CSV</button>
          <button className="btn-primary-soft"><MdOutlinePictureAsPdf /> Export PDF</button>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-6">
          <div className="section-card h-100">
            <div className="section-card-header"><span className="section-card-title">Registrations Trend</span></div>
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.registrationTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ddArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00B8C8" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#00B8C8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-soft)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-soft)' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="participants" stroke="#00B8C8" strokeWidth={2.5} fill="url(#ddArea)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-6">
          <div className="section-card h-100">
            <div className="section-card-header"><span className="section-card-title">Submissions by Hackathon</span></div>
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.submissionsByHackathon} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-soft)' }} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-soft)' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="submissions" fill="#2563EB" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-card-header"><span className="section-card-title">Hackathon Performance Summary</span></div>
        <div className="scroll-x">
          <table className="dd-table">
            <thead><tr><th>Hackathon</th><th>Participants</th><th>Submissions</th><th>Conversion Rate</th></tr></thead>
            <tbody>
              {data.submissionsByHackathon.map((h) => (
                <tr key={h.name}>
                  <td style={{ fontWeight: 600 }}>{h.name}</td>
                  <td>{h.participants}</td>
                  <td>{h.submissions}</td>
                  <td>{h.participants ? `${Math.round((h.submissions / h.participants) * 100)}%` : '--'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
