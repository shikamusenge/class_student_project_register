const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../utilities/database");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, password, type } = req.body;

    // Validate input data
    if (!username || !password || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // username exist
    const [existingUser] = await db.query(
      `SELECT * FROM accounts WHERE username = ?`,
      [username]
    );
    console.log(existingUser);
    if (existingUser.length) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into database
    const query =
      "INSERT INTO accounts (username, password, role) VALUES (?, ?, ?)";
    const values = [username, hashedPassword, type];
    const result = await db.query(query, values);

    if (result.affectedRows === 1) {
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(500).json({ message: "username is taken" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input data
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const query = "SELECT * FROM accounts WHERE username = ?";
    const [user] = await db.query(query, [username]);

    if (!user.length) {
      return res.status(404).json({ error: "User not found" });
    }
    const hashedPassword = user[0].password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    if (isValidPassword) {
      const token = jwt.sign(
        { userId: user[0].id, role: user[0].role },
        process.env.BCRY_SECRET
      );
      return res.status(200).json({
        success: true,
        message: "Login successful",
        token: token,
        role: user[0].role,
      });
    } else {
      return res
        .status(401)
        .json({ success: false, error: "Invalid password provided" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
