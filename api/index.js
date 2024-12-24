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
const userComments = require("./routes/userComments");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
const PORT = 3002;

app.get("/search", authenticateToken, async (req, res) => {
  try {
    const [users] = await db.execute(
      "SELECT id, username, profile_image FROM users WHERE id != ?",
      [req.user.id]
    );

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.use("/api/users", authRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/users", usersPostsRouter);
app.use("/api/users", usersLikeRouter);
app.use("/api/users", usersMessage);
app.use("/api/users", usersFollows);
app.use("/api/users", userComments);

app.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
});
