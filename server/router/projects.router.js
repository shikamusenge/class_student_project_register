const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../utilities/database");

const router = express.Router();
router.get("/all/:status", async (req, res) => {
  const { status } = req.params;

  try {
    const query = `SELECT * FROM student_project LEFT JOIN student_table ON sa_id = st_id WHERE sp_status = ?`;

    const [result] = await db.query(query, [status]);
    return res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/:action/:action/:pid", async (req, res) => {
  const { action, pid } = req.params;
  let status = action == "approve" ? "approved" : "rejected";
  try {
    const query = `UPDATE student_project SET sp_status=? WHERE sp_id = ?`;
    const [result] = await db.query(query, [status, pid]);
    return res.json({ succes: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
