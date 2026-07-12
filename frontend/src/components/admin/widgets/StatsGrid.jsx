import StatsCard from './StatsCard';

export default function StatsGrid({ stats, loading }) {
  const items = loading ? Array.from({ length: 5 }) : stats;
  return (
    <div className="row g-3 mb-3">
      {items.map((stat, i) => (
        <div key={stat?.key || i} className="col-6 col-md-4 col-xl">
          <StatsCard {...stat} loading={loading} />
        </div>
      ))}
    </div>
  );
}
