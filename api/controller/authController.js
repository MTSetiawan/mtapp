const db = require("../model/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const defaultProfileImage = `${process.env.BASE_URL}/images/default-profile.jpg`;

    const sql =
      "INSERT INTO users (username, password,profile_image) VALUES (?, ?,?)";

    const result = await new Promise((resolve, reject) => {
      db.query(
        sql,
        [username, hashPassword, defaultProfileImage],
        (err, result) => {
          if (err) {
            console.error("Database query error: ", err);
            return reject(err);
          }
          resolve(result);
        }
      );
    });

    console.log("User registered successfully:", result);
    return res.status(201).json({ message: "Register Successful", result });
  } catch (err) {
    console.error("Error during registration: ", err);
    return res.status(400).json({ message: "Register Failed" });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM users WHERE username = ?`;

  db.query(sql, [username], async (err, result) => {
    const user = result[0];

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(400).json({ message: "Login Failed", token });
    }
  });
};
