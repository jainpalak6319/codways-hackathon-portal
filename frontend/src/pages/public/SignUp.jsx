import { useMemo, useState } from "react";
import "./SignUp.css";

const ROLES = [
  { id: "participant", label: "Participant", emoji: "🙋" },
  { id: "judge",       label: "Judge",       emoji: "⚖️"  },
  { id: "admin",       label: "Admin",       emoji: "🛡️"  },
];

/* ─────────────── Icons ─────────────── */
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="su-input-icon">
      <path
        d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="su-input-icon">
      <path
        d="M4.75 6.75h14.5v10.5H4.75V6.75Zm.5.4L12 12.6l6.75-5.45M5.42 17l4.85-4.1m3.46 0L18.58 17"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="su-input-icon">
      <path
        d="M7.75 10.75V8a4.25 4.25 0 0 1 8.5 0v2.75m-9.5 0h10.5a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1H6.75a1 1 0 0 1-1-1v-6.5a1 1 0 0 1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function EyeIcon({ off }) {
  return off ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="su-eye-icon">
      <path
        d="M3 3l18 18M10.5 10.677A3 3 0 0 0 14.83 15M6.351 6.347C4.933 7.4 3.79 8.84 3 10.5 4.773 14.27 8.1 17 12 17c1.353 0 2.644-.37 3.776-1.023M9 5.291A9.33 9.33 0 0 1 12 5c3.9 0 7.227 2.73 9 6.5-.735 1.566-1.775 2.94-3.032 4.03"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="su-eye-icon">
      <path
        d="M3 10.5C4.773 6.73 8.1 4 12 4s7.227 2.73 9 6.5C19.227 14.27 15.9 17 12 17S4.773 14.27 3 10.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="10.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="su-arrow-icon">
      <path
        d="M5 12h13m-5-5 5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="su-badge-icon">
      <path
        d="M12 3.5 4.75 6.75v5c0 4 3.25 7.5 7.25 8.75 4-1.25 7.25-4.75 7.25-8.75v-5L12 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path
        d="m9 12 2 2 4-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

/* ─────────────── Mascot ─────────────── */
function Mascot() {
  return (
    <div className="su-mascot-wrap" aria-label="Animated hackathon builder mascot">
      <svg className="su-mascot" viewBox="0 0 360 320" role="img">
        <title>Animated hackathon builder mascot</title>
        <defs>
          <linearGradient id="suBotBody" x1="92" y1="72" x2="268" y2="250">
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#d8fff3" />
          </linearGradient>
          <linearGradient id="suBotScreen" x1="105" y1="90" x2="255" y2="205">
            <stop stopColor="#3159f5" />
            <stop offset="1" stopColor="#0fa898" />
          </linearGradient>
          <linearGradient id="suBadgeGlow" x1="115" y1="216" x2="245" y2="294">
            <stop stopColor="#ffd166" />
            <stop offset="1" stopColor="#ff7a7a" />
          </linearGradient>
          <filter id="suBotShadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="22" stdDeviation="18" floodColor="#21314f" floodOpacity="0.16" />
          </filter>
        </defs>
        <g className="su-mascot-orbit">
          <path d="M70 172c46-72 177-86 226-10" fill="none" stroke="#9be7dc" strokeWidth="8" strokeLinecap="round" />
          <path d="M266 70l10 19 21 3-15 15 4 21-20-10-19 10 4-21-16-15 22-3 9-19Z" fill="#ffd166" />
          <circle cx="74" cy="174" r="9" fill="#ff7a7a" />
        </g>
        <g className="su-mascot-body" filter="url(#suBotShadow)">
          <path d="M120 112c0-39 27-67 60-67s60 28 60 67v14H120v-14Z" fill="#ffffff" />
          <rect x="92" y="96" width="176" height="142" rx="42" fill="url(#suBotBody)" stroke="#182542" strokeWidth="7" />
          <rect x="119" y="123" width="122" height="66" rx="24" fill="url(#suBotScreen)" />
          <path d="M145 156h.1M215 156h.1" stroke="#ffffff" strokeWidth="13" strokeLinecap="round" />
          <path d="M164 174c11 9 24 9 35 0" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <path d="M180 45V22" stroke="#182542" strokeWidth="7" strokeLinecap="round" />
          <circle cx="180" cy="18" r="10" fill="#ff7a7a" stroke="#182542" strokeWidth="5" />
          <path d="M96 158c-29 3-48 21-48 47 0 24 17 40 42 45" fill="none" stroke="#182542" strokeWidth="11" strokeLinecap="round" />
          <path d="M264 158c29 3 48 21 48 47 0 24-17 40-42 45" fill="none" stroke="#182542" strokeWidth="11" strokeLinecap="round" />
          <rect x="120" y="224" width="120" height="58" rx="22" fill="url(#suBadgeGlow)" stroke="#182542" strokeWidth="7" />
          <path d="M151 253h58M151 269h34" stroke="#182542" strokeWidth="6" strokeLinecap="round" />
          <path d="M226 244l8 9 14-19" fill="none" stroke="#182542" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g className="su-spark">
          <path d="M67 79v22M56 90h22" stroke="#3159f5" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g className="su-spark su-spark-two">
          <path d="M300 211v22M289 222h22" stroke="#ff7a7a" strokeWidth="6" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

/* ─────────────── Reusable field wrapper ─────────────── */
function Field({ label, badge, error, hint, children }) {
  return (
    <div className={`su-field${error ? " su-field--error" : ""}`}>
      <div className="su-field-label-row">
        <label>{label}</label>
        {badge && <span className="su-field-badge">{badge}</span>}
      </div>
      {children}
      {error
        ? <p className="su-field-error">{error}</p>
        : hint && <p className="su-field-hint">{hint}</p>
      }
    </div>
  );
}

/* ─────────────── Password input with show/hide ─────────────── */
function PasswordInput({ id, value, onChange, onBlur, placeholder, error, autoComplete }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={`su-input-shell${error ? " su-input-error" : ""}`}>
      <LockIcon />
      <input
        id={id}
        name={id}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
      />
      <button
        type="button"
        className="su-eye-btn"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        tabIndex={0}
      >
        <EyeIcon off={visible} />
      </button>
    </div>
  );
}

/* ─────────────── Main SignUp Component ─────────────── */
function SignUp() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const touch = (field) => () =>
    setTouched((t) => ({ ...t, [field]: true }));

  const errors = useMemo(() => {
    const e = {};
    if ((touched.fullName || submitted) && !form.fullName.trim())
      e.fullName = "Full name is required.";
    if ((touched.email || submitted) && !form.email)
      e.email = "Email address is required.";
    else if ((touched.email || submitted) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if ((touched.password || submitted) && !form.password)
      e.password = "Password is required.";
    else if ((touched.password || submitted) && form.password.length < 8)
      e.password = "Password must be at least 8 characters.";
    if ((touched.confirmPassword || submitted) && !form.confirmPassword)
      e.confirmPassword = "Please confirm your password.";
    else if ((touched.confirmPassword || submitted) && form.confirmPassword !== form.password)
      e.confirmPassword = "Passwords do not match.";
    if ((touched.role || submitted) && !form.role)
      e.role = "Please select a role.";
    return e;
  }, [form, touched, submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setApiError(null);
    setTouched({ fullName: true, email: true, password: true, confirmPassword: true, role: true });
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);
    try {
      // ── Backend integration point ──
      // Replace with your actual API endpoint:
      // const response = await fetch("/api/auth/signup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     fullName: form.fullName.trim(),
      //     email: form.email.trim().toLowerCase(),
      //     password: form.password,
      //     role: form.role,
      //   }),
      // });
      // if (!response.ok) {
      //   const data = await response.json();
      //   throw new Error(data.message || "Sign-up failed. Please try again.");
      // }
      // const data = await response.json();
      // setSuccess(true);
      // Redirect or store token: localStorage.setItem("token", data.token);

      console.info("SignUp payload →", {
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      });
      setSuccess(true);
    } catch (err) {
      setApiError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = useMemo(() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8)  s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  }, [form.password]);

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthClass = ["", "su-str-weak", "su-str-fair", "su-str-good", "su-str-strong"][passwordStrength];

  if (success) {
    return (
      <main className="su-page">
        <section className="su-brand-panel" aria-labelledby="su-brand-title">
          <nav className="su-topbar" aria-label="Sign up page navigation">
            <a href="/" className="su-brand-mark" aria-label="Hackathon Portal home">
              <span className="su-brand-icon">H</span>
              <span>HackPortal</span>
            </a>
          </nav>
          <div className="su-hero-copy">
            <p className="su-eyebrow">Join the community</p>
            <h1 id="su-brand-title" className="su-h1">Your next hack starts here.</h1>
            <p className="su-supporting-copy">
              Create your account, pick your role, and step into a world of hackathons, teams, and ideas waiting to be built.
            </p>
          </div>
          <div className="su-showcase" aria-hidden="true">
            <Mascot />
            <div className="su-floating-card su-members-card">
              <span className="su-status-dot" />
              <div>
                <strong>4,200+ members</strong>
                <span>building right now</span>
              </div>
            </div>
            <div className="su-floating-card su-events-card">
              <strong>32</strong>
              <span>open events</span>
            </div>
          </div>
        </section>
        <section className="su-auth-panel" aria-label="Success">
          <div className="su-auth-card su-success-card">
            <div className="su-success-icon">🎉</div>
            <h2 className="su-success-title">You're in!</h2>
            <p className="su-success-msg">
              Welcome to HackPortal, <strong>{form.fullName.trim()}</strong>. Check your inbox for a verification link.
            </p>
            <a href="/login" className="su-submit-btn su-success-btn">
              <span>Go to Sign In</span>
              <ArrowIcon />
            </a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="su-page">
      {/* ── Brand Panel (left) ── */}
      <section className="su-brand-panel" aria-labelledby="su-brand-title">
        <nav className="su-topbar" aria-label="Sign up page navigation">
          <a href="/" className="su-brand-mark" aria-label="Hackathon Portal home">
            <span className="su-brand-icon">H</span>
            <span>HackPortal</span>
          </a>
        </nav>

        <div className="su-hero-copy">
          <p className="su-eyebrow">Join the community</p>
          {/* ── FW-700, black heading ── */}
          <h1 id="su-brand-title" className="su-h1">
            Your next hack starts here.
          </h1>
          <p className="su-supporting-copy">
            Create your account, pick your role, and step into a world of hackathons, teams, and ideas waiting to be built.
          </p>
        </div>

        <div className="su-showcase" aria-hidden="true">
          <Mascot />
          {/* Floating cards — always visible */}
          <div className="su-floating-card su-members-card">
            <span className="su-status-dot" />
            <div>
              <strong>4,200+ members</strong>
              <span>building right now</span>
            </div>
          </div>
          <div className="su-floating-card su-events-card">
            <strong>32</strong>
            <span>open events</span>
          </div>
        </div>
      </section>

      {/* ── Auth Panel (right) ── */}
      <section className="su-auth-panel" aria-labelledby="su-form-title">
        <div className="su-auth-card">

          {/* Badge */}
          <div className="su-auth-badge">
            <ShieldCheckIcon />
            <span>Create account</span>
          </div>

          {/* Heading */}
          <div className="su-auth-heading">
            <h2 id="su-form-title">Join HackPortal</h2>
            <p>Fill in your details to get started in seconds.</p>
          </div>

          {/* API-level error banner */}
          {apiError && (
            <div className="su-api-error" role="alert">
              <span>⚠️</span> {apiError}
            </div>
          )}

          <form className="su-form" onSubmit={handleSubmit} noValidate>

            {/* Full Name */}
            <Field
              label="Full name"
              error={errors.fullName}
              hint="Your display name shown to teammates."
            >
              <div className={`su-input-shell${errors.fullName ? " su-input-error" : ""}`}>
                <UserIcon />
                <input
                  id="su-fullname"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={form.fullName}
                  onChange={set("fullName")}
                  onBlur={touch("fullName")}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "su-fullname-err" : undefined}
                  disabled={isLoading}
                />
              </div>
            </Field>

            {/* Email */}
            <Field
              label="Email address"
              error={errors.email}
              hint="We'll send a verification link here."
            >
              <div className={`su-input-shell${errors.email ? " su-input-error" : ""}`}>
                <MailIcon />
                <input
                  id="su-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@college.edu"
                  value={form.email}
                  onChange={set("email")}
                  onBlur={touch("email")}
                  aria-invalid={Boolean(errors.email)}
                  disabled={isLoading}
                />
              </div>
            </Field>

            {/* Two-column row: Password + Confirm */}
            <div className="su-pw-row">
              {/* Password */}
              <Field
                label="Password"
                badge="Min 8 chars"
                error={errors.password}
              >
                <PasswordInput
                  id="su-password"
                  value={form.password}
                  onChange={set("password")}
                  onBlur={touch("password")}
                  placeholder="Create a strong password"
                  error={errors.password}
                  autoComplete="new-password"
                  disabled={isLoading}
                />
                {form.password && (
                  <div className="su-strength-wrap" aria-label={`Password strength: ${strengthLabel}`}>
                    <div className="su-strength-bar">
                      {[1, 2, 3, 4].map((n) => (
                        <span
                          key={n}
                          className={`su-strength-seg${passwordStrength >= n ? ` ${strengthClass}` : ""}`}
                        />
                      ))}
                    </div>
                    {strengthLabel && (
                      <span className={`su-strength-label ${strengthClass}`}>{strengthLabel}</span>
                    )}
                  </div>
                )}
              </Field>

              {/* Confirm Password */}
              <Field
                label="Confirm password"
                error={errors.confirmPassword}
              >
                <PasswordInput
                  id="su-confirm-password"
                  value={form.confirmPassword}
                  onChange={set("confirmPassword")}
                  onBlur={touch("confirmPassword")}
                  placeholder="Re-enter your password"
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                  disabled={isLoading}
                />
              </Field>
            </div>

            {/* Role */}
            <Field
              label="Your role"
              error={errors.role}
              hint="You can change this later from your profile."
            >
              <div className="su-role-grid">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className={`su-role-btn${form.role === r.id ? " su-role-btn--active" : ""}`}
                    onClick={() => {
                      setForm((f) => ({ ...f, role: r.id }));
                      touch("role")();
                    }}
                    aria-pressed={form.role === r.id}
                    disabled={isLoading}
                  >
                    <span className="su-role-emoji">{r.emoji}</span>
                    <span className="su-role-label">{r.label}</span>
                    {form.role === r.id && <span className="su-role-dot" />}
                  </button>
                ))}
              </div>
            </Field>

            {/* Submit */}
            <button
              className="su-submit-btn"
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <span className="su-spinner" aria-label="Creating account…" />
              ) : (
                <>
                  <span>Create my account</span>
                  <ArrowIcon />
                </>
              )}
            </button>
          </form>

          <p className="su-footer-copy">
            Already have an account?{" "}
            <a href="/login" className="su-footer-link">Sign in</a>
          </p>

          <p className="su-terms-copy">
            By signing up you agree to our{" "}
            <a href="/terms" className="su-terms-link">terms of service</a> and{" "}
            <a href="/privacy" className="su-terms-link">privacy policy</a>.
          </p>
        </div>
      </section>
    </main>
  );
}

export default SignUp;
