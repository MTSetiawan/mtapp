const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./model/database");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profileRouter");
const authenticateToken = require("./middleware");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
const PORT = 3002;

app.get("/", authenticateToken, (req, res) => {
  const userId = req.user.id;

  const sql = `SELECT * FROM users WHERE id = ?`;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(results[0]);
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", profileRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
});
