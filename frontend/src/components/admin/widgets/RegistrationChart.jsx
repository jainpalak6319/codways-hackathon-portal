import { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { MdKeyboardArrowDown } from 'react-icons/md';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--sidebar-bg)', color: '#fff', padding: '8px 12px', borderRadius: 8, fontSize: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 2 }}>{label} 2025</div>
      <div>{payload[0].value.toLocaleString()} Participants</div>
    </div>
  );
}

export default function RegistrationChart({ data = [] }) {
  const [range, setRange] = useState('This Year');

  return (
    <div className="section-card h-100">
      <div className="section-card-header">
        <span className="section-card-title">Registrations Overview</span>
        <button className="btn-outline-soft" style={{ padding: '6px 10px', fontSize: 12 }}>
          {range} <MdKeyboardArrowDown />
        </button>
      </div>
      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-soft)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-soft)' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="participants"
              stroke="var(--sidebar-active)"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#fff', stroke: 'var(--sidebar-active)', strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
