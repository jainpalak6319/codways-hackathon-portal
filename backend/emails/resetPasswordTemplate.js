const resetPasswordTemplate = (name, resetLink) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
      <h2>Hello ${name},</h2>

      <p>
        We received a request to reset your password.
      </p>

      <p>
        Click the button below to reset it.
      </p>

      <a
        href="${resetLink}"
        style="
          display:inline-block;
          padding:12px 22px;
          background:#0F766E;
          color:white;
          text-decoration:none;
          border-radius:6px;
        "
      >
        Reset Password
      </a>

      <p style="margin-top:25px;">
        This link expires in <strong>15 minutes</strong>.
      </p>

      <p>
        If you didn't request this password reset,
        you can safely ignore this email.
      </p>

      <hr>

      <small>
        Hackathon Management Portal
      </small>
    </div>
  `;
};

export default resetPasswordTemplate;