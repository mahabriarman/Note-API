const express = require("express");

const router = express.Router();

const {
    handleSignupPage,
    handleLoginPage,
    handleSignup,
    handleLogin,
    handleLogout,
    handleProfilePage
} = require("../controller/auth");

const {checkAuth}= require("../middleware/auth")

// Signup
router.get("/signup", handleSignupPage);
router.post("/signup", handleSignup);

// Login
router.get("/login", handleLoginPage);
router.post("/login", handleLogin);

// Debug Route
router.get("/me", (req,res)=>{
    return res.json(req.cookies);
});

router.get("/profile",checkAuth,handleProfilePage);

// Logout
router.get("/logout", handleLogout);

module.exports = router;