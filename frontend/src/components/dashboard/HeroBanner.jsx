import "./HeroBanner.css";

function HeroBanner() {
  return (
    <section className="hero-banner">

      <div className="hero-content">

        <span className="hero-badge">
          CODWAYS ADMIN PORTAL
        </span>

        <h1>
          Welcome Back 👋
        </h1>

        <p>
          Manage hackathons, participants,
          judges and submissions from one
          centralized workspace.
        </p>

        <div className="hero-actions">

          <button className="primary-btn">
            Create Hackathon
          </button>

          <button className="secondary-btn">
            View Analytics
          </button>

        </div>

      </div>

      <div className="hero-mascot">
        🤖
      </div>

    </section>
  );
}

export default HeroBanner;