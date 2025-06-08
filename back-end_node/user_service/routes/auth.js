const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const fs = require("fs")

const htmlContent = fs.readFileSync("./htmls/emailContent.html", 'utf-8')

// Register
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) return res.status(400).json({ message: "Username or email already used" });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash });
    await user.save();

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { "userid": user._id, "username": user.username, "email": user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/request_reset", async (req, res) => {
    const { email } = req.body

    if (email == undefined || email == "" || typeof email != "string") {
        return res.status(400).end("Invalid request body")
    }

    try {
        // Create a transporter (example: using Gmail SMTP)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'debooker.emailservice@gmail.com',
                pass: process.env.EMAIL_APP_PASSWORD // Use App Passwords, not your Gmail password
            }
        });

        // Define the email options
        const mailOptions = {
            from: '"Fervice Sinder" <debooker.emailservice@gmail.com>',
            to: email,
            subject: 'Reset Password Request',
            html: htmlContent
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return res.json({
            "message": "Email has been sent"
        }).status(200)
    } catch (err) {
        return res.status(500).end("Internal server error")
    }

})

router.put("/reset_password", async (req, res) => {
  const { email, password, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    const hashedNew = await bcrypt.hash(newPassword, 10);
    user.password = hashedNew;
    await user.save();

    res.json({ message: "Password has been reset" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete_account", async (req, res) => {
  try {
    const user = await User.findById(req.jwtPayload["userid"])
    if(user == null) {
        res.send({
            "message": "User not found"
        })
        return res.status(404).end()
    }
    await User.findByIdAndDelete(req.jwtPayload["userid"]);
    res.json({ message: "Account has been deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
