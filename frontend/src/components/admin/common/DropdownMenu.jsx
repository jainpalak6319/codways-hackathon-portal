import { useRef, useState } from 'react';
import useOutsideClick from "../../../hooks/admin/useOutsideClick";

// Generic trigger + floating panel dropdown used by NotificationMenu, UserDropdown, row action menus
export default function DropdownMenu({ trigger, children, align = 'right', panelStyle = {} }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpen(false));

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div onClick={() => setOpen((o) => !o)}>{trigger(open)}</div>
      {open && (
        <div
          className="card-surface"
          style={{
            position: 'absolute', top: 'calc(100% + 8px)',
            [align]: 0, minWidth: 220, zIndex: 60, boxShadow: 'var(--shadow-pop)',
            ...panelStyle,
          }}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}
