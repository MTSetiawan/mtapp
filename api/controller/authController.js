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

    console.log("Preparing query...");
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
        console.log("Query executed successfully:", result);
        res.status(201).json({ message: "Register Successful" });
      }
    );

    console.log("Endpoint /register called");
    res.status(201).json({ message: "Register Successful" });
    console.log("Response sent");
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

exports.search = async (req, res) => {
  const searchQuery = req.query.q;

  if (!searchQuery) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        "SELECT id, username FROM users WHERE username LIKE ? LIMIT 10",
        [`%${searchQuery}%`],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
    res.status(200).json({ data: results });
  } catch (error) {
    res.status(500).json({ message: "Error searching users", error });
  }
};
