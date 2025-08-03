const nodemailer = require("nodemailer");

exports.sendDigest = async (req, res) => {
  const { to, summary } = req.body;

  if (!to || !summary) {
    return res.status(400).json({ error: "Missing email or summary" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `MyDailyPanel <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Daily Digest from MyDailyPanel",
    text: summary
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to send email" });
  }
};

