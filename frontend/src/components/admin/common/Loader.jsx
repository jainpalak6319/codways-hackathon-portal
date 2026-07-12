export default function Loader({ size = 'md', fullHeight = false, label = 'Loading...' }) {
  const px = size === 'sm' ? 20 : size === 'lg' ? 48 : 32;
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center gap-2"
      style={{ minHeight: fullHeight ? '60vh' : 'auto', padding: '24px 0' }}
      role="status"
      aria-live="polite"
    >
      <div
        style={{
          width: px, height: px, borderRadius: '50%',
          border: '3px solid var(--border)', borderTopColor: 'var(--sidebar-active)',
          animation: 'devdash-spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes devdash-spin { to { transform: rotate(360deg); } }`}</style>
      {label && <span className="text-muted-soft" style={{ fontSize: 13 }}>{label}</span>}
    </div>
  );
}
