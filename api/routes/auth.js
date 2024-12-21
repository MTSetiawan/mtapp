const express = require("express");
const { register, login, search } = require("../controller/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/search", search);

module.exports = router;
