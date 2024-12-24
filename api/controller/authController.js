const db = require("../model/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const defaultProfileImage = `${
      process.env.BASE_URL || "http://localhost:3000"
    }/images/default-profile.jpg`;

    const sql =
      "INSERT INTO users (username,email, password,profile_image) VALUES (?, ?,?,?)";
    db.query(
      sql,
      [username, email, hashPassword, defaultProfileImage],
      (err, result) => {
        if (err) {
          console.error("Database query error: ", err);
          return res.status(500).json({ message: "Database error" });
        }
        const userId = result.insertId; // Ambil ID user yang baru terdaftar
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.status(201).json({ message: "Register Successful", token });
      }
    );

    res.status(201).json({ message: "Register Successful" });
  } catch (err) {
    console.error("Error during registration: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Query untuk mengambil data pengguna berdasarkan email
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(201).json({ message: "Login successful", token });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
