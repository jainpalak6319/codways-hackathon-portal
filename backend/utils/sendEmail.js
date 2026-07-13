import transporter from "../config/mail.js";
import env from "../config/env.js";

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Hackathon Management Portal" <${env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;