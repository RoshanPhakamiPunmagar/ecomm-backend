import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

export const sendVerificationEmail = async (to, verificationToken) => {
  const verifyUrl = `http://localhost:3000/api/customer/v1/auth/verify/${encodeURIComponent(verificationToken)}`;

  await transporter.sendMail({
    from: config.email.user,
    to,
    subject: "Verify your email",
    html: `
      <h3>Email Verification</h3>
      <p>Click below to verify:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `,
  });
};
