const express = require("express");
const cors = require("cors");
const path = require("path");

const authenticateToken = require("./middleware");
const db = require("./model/database");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profileRouter");
const usersPostsRouter = require("./routes/userPosts");
const usersLikeRouter = require("./routes/userLikes");
const usersMessage = require("./routes/usersMessage");
const usersFollows = require("./routes/usersFollows");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
const PORT = 3002;

app.get("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const connection = await db.getConnection();

    try {
      const [results] = await connection.execute(
        `SELECT * FROM users WHERE id = ?`,
        [userId]
      );

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(results[0]);
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/api/users", authRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/users", usersPostsRouter);
app.use("/api/users", usersLikeRouter);
app.use("/api/users", usersMessage);
app.use("/api/users", usersFollows);

app.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
});
