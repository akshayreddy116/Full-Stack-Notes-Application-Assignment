const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();
const SECRET = "secret123";

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashed],
    function (err) {
      if (err) {
        return res.status(400).json({ message: "User already exists" });
      }

      res.json({ message: "User created successfully" });
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.get(
    "SELECT * FROM users WHERE email=?",
    [email],
    (err, user) => {
      if (!user) {
        return res.status(400).json({ message: "Invalid user" });
      }
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        return res.status(400).json({ message: "Wrong password" });
      }
      const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET,
        { expiresIn: "7d" }
      );
      res.json({ token });
    }
  );
});

module.exports = router;