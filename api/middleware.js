const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const validatePostId = (req, res, next) => {
  const { post_id, postId } = req.body || req.params;
  if (!post_id && !postId) {
    return res.status(400).json({ error: "Post ID is required." });
  }
  next();
};

module.exports = validatePostId;

module.exports = authenticateUser;
