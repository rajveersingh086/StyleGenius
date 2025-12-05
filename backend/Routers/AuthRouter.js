const router = require("express").Router();
const { signupValidation, loginValidation } = require("../Middlerswares/AuthValidation");
const { signup, login } = require("../Controllers/AuthController");

// Signup Route
router.post("/signup", signupValidation, signup);

// Login Route
router.post("/login", loginValidation, login);

module.exports = router;
