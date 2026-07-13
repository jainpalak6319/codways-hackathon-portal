import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  clearError,
} from "../../features/auth/authSlice";
import "./ResetPassword.css";

/* ── Icons (kept consistent with Login.jsx) ── */
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="rp-input-icon">
      <rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="rp-eye-icon">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="rp-eye-icon">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="rp-badge-icon">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="rp-arrow-icon">
      <path d="M5 12h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

/* ── Password strength helper ── */
function getPasswordStrength(password) {
  if (!password) return { score: 0, percent: 0, label: "", className: "" };

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const levels = [
    { percent: 20, label: "Very weak", className: "rp-strength-weak" },
    { percent: 40, label: "Weak", className: "rp-strength-weak" },
    { percent: 60, label: "Fair", className: "rp-strength-fair" },
    { percent: 80, label: "Good", className: "rp-strength-good" },
    { percent: 100, label: "Strong", className: "rp-strength-strong" },
  ];

  const index = Math.max(0, Math.min(score, levels.length) - 1);
  return { score, ...levels[index] };
}

/* ── Main Reset Password Component ── */
function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state) => state.auth
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState(false);

  // Avoid showing a stale message/error left over from a previous
  // auth action when this page mounts.
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const passwordError = useMemo(() => {
    if (!touched || password.length === 0) return "";
    return password.length >= 8 ? "" : "Password must be at least 8 characters.";
  }, [password, touched]);

  const confirmError = useMemo(() => {
    if (!touched || confirmPassword.length === 0) return "";
    return confirmPassword === password ? "" : "Passwords do not match.";
  }, [confirmPassword, password, touched]);

  const isValid =
    password.length >= 8 && confirmPassword.length > 0 && confirmPassword === password;

  const isDisabled = loading || Boolean(message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    dispatch(clearError());

    if (!token) {
      return;
    }

    if (!isValid) {
      return;
    }

    try {
      await dispatch(
        resetPassword({
          token,
          password,
        })
      ).unwrap();

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch {
      // Redux already stores the error
    }
  };

  return (
    <main className="rp-page">
      <section className="rp-auth-panel">
        <div className="rp-auth-card">
          <div className="rp-auth-badge">
            <ShieldIcon />
            Reset Password
          </div>

          <div className="rp-auth-heading">
            <h2>Reset Password</h2>
            <p>Create a new password for your account.</p>
          </div>

          {message && (
            <div className="alert alert-success rp-alert" role="alert">
              <strong>Password Reset Successfully!</strong>
              <br />
              {message}
              <hr />
              Redirecting to Login...
            </div>
          )}

          {error && (
            <div className="alert alert-danger rp-alert" role="alert">
              {error}
            </div>
          )}

          <form className="rp-form" onSubmit={handleSubmit} noValidate>
            {/* New password */}
            <div className="rp-field-group">
              <label htmlFor="rp-password">Password</label>
              <div className={`rp-input-shell${passwordError ? " input-error" : ""}`}>
                <LockIcon />
                <input
                  id="rp-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter your new password"
                  value={password}
                  onBlur={() => setTouched(true)}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isDisabled}
                  aria-describedby={passwordError ? "rp-password-error" : undefined}
                  aria-invalid={Boolean(passwordError)}
                />
                <button
                  type="button"
                  className="rp-eye-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
              {passwordError && (
                <p className="rp-field-error" id="rp-password-error">
                  {passwordError}
                </p>
              )}

              {password.length > 0 && (
                <div className="rp-strength-wrap">
                  <div className="rp-strength-track">
                    <div
                      className={`rp-strength-fill ${strength.className}`}
                      style={{ width: `${strength.percent}%` }}
                    />
                  </div>
                  <span className={`rp-strength-label ${strength.className}`}>
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="rp-field-group">
              <label htmlFor="rp-confirm-password">Confirm Password</label>
              <div className={`rp-input-shell${confirmError ? " input-error" : ""}`}>
                <LockIcon />
                <input
                  id="rp-confirm-password"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  onBlur={() => setTouched(true)}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isDisabled}
                  aria-describedby={confirmError ? "rp-confirm-error" : undefined}
                  aria-invalid={Boolean(confirmError)}
                />
                <button
                  type="button"
                  className="rp-eye-toggle"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
              {confirmError && (
                <p className="rp-field-error" id="rp-confirm-error">
                  {confirmError}
                </p>
              )}
            </div>

            <button className="rp-submit-button" type="submit" disabled={isDisabled}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Resetting...</span>
                </>
              ) : (
                <>
                  <span>Reset Password</span>
                  <ArrowIcon />
                </>
              )}
            </button>
          </form>

          <Link to="/login" className="rp-back-link">
            Back to Login
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ResetPassword;