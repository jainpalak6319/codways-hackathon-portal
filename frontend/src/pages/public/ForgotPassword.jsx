import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearError } from "../../features/auth/authSlice";
import "./ForgotPassword.css";

/* ── Icons (kept consistent with Login.jsx) ── */
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="fp-input-icon">
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

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="fp-badge-icon">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="fp-arrow-icon">
      <path d="M5 12h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function BackArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="fp-back-icon">
      <path d="M19 12H6m5-5-5 5 5 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

/* ── Main Forgot Password Component ── */
function ForgotPassword() {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  // Avoid showing a stale message/error left over from a previous
  // auth action (e.g. login or reset-password) when this page mounts.
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const emailError = useMemo(() => {
    if (!touched || email.length === 0) return "";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Enter a valid email address.";
  }, [email, touched]);

  const isValid = email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    dispatch(clearError());

    if (!isValid) {
      return;
    }

    try {
      await dispatch(forgotPassword(email.trim())).unwrap();
    } catch {
      // Error is already captured in Redux state via the rejected case.
    }
  };

  return (
    <main className="fp-page">
      <section className="fp-auth-panel">
        <div className="fp-auth-card">
          <div className="fp-auth-badge">
            <ShieldIcon />
            Forgot Password
          </div>

          <div className="fp-auth-heading">
            <h2>Forgot your password?</h2>
            <p>No worries. Enter your email and we&apos;ll send you a password reset link.</p>
          </div>

          {message && (
            <div className="alert alert-success fp-alert" role="alert">
              <strong>Email sent successfully!</strong>
              <br />
              {message}
              <hr />
              Please check your inbox (and Spam folder if necessary) and click the password reset link.
            </div>
          )}

          {error && (
            <div className="alert alert-danger fp-alert" role="alert">
              {error}
            </div>
          )}

          <form className="fp-email-form" onSubmit={handleSubmit} noValidate>
            <div className="fp-field-group">
              <label htmlFor="fp-email">Email address</label>
              <div className={`fp-input-shell${emailError ? " input-error" : ""}`}>
                <MailIcon />
                <input
                  id="fp-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@college.edu"
                  value={email}
                  onBlur={() => setTouched(true)}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby={emailError ? "fp-email-error" : undefined}
                  aria-invalid={Boolean(emailError)}
                  disabled={loading || !!message}
                />
              </div>
              {emailError && (
                <p className="fp-field-error" id="fp-email-error">
                  {emailError}
                </p>
              )}
            </div>

            <button
              className="fp-submit-button"
              type="submit"
              disabled={loading || !!message}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <ArrowIcon />
                </>
              )}
            </button>
          </form>

          <Link to="/login" className="fp-back-link">
            <BackArrowIcon />
            <span>Back to Login</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ForgotPassword;