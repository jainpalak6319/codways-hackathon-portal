import { MdSearch } from 'react-icons/md';

export default function SearchBar({ value, onChange, placeholder = 'Search anything...', className = '', ...rest }) {
  return (
    <div className={`devdash-searchbar ${className}`} style={{ position: 'relative' }}>
      <MdSearch
        style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-soft)', fontSize: 18 }}
      />
      <input
        type="text"
        className="input-soft"
        style={{ paddingLeft: 40 }}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        {...rest}
      />
    </div>
  );
}
