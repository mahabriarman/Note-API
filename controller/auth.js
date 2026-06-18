const User = require("../models/auth");
const bcrypt = require("bcrypt");
const Note = require("../models/user");

// SIGNUP PAGE
async function handleSignupPage(req, res) {

    const error = req.session.error;

    delete req.session.error;

    return res.render("signup", {
        error
    });

}

// LOGIN PAGE
async function handleLoginPage(req, res) {

    const error = req.session.error;
    const success = req.session.success;

    delete req.session.error;
    delete req.session.success;

    return res.render("login", {
        error,
        success
    });

}

// SIGNUP LOGIC
async function handleSignup(req, res) {

    try {

        const { name, email, password } = req.body;

        if (!name.trim()) {

            req.session.error =
                "Name is required";

            return res.redirect("/signup");

        }

        if (!email.includes("@")) {

            req.session.error =
                "Invalid Email";

            return res.redirect("/signup");

        }

        if (password.length < 6) {

            req.session.error =
                "Password must be at least 6 characters";

            return res.redirect("/signup");

        }

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            req.session.error =
                "User Already Exists";

            return res.redirect("/signup");

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword
        });

        req.session.success =
            "Account Created Successfully";

        return res.redirect("/login");

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }

}

// LOGIN LOGIC
async function handleLogin(req, res) {

    try {

        const { email, password } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {

            req.session.error =
                "User Not Found";

            return res.redirect("/login");

        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            req.session.error =
                "Invalid Password";

            return res.redirect("/login");

        }

        res.cookie(
            "uid",
            user._id.toString(),
            {
                httpOnly: true
            }
        );

        return res.redirect("/user/home");

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }

}

// LOGOUT
async function handleLogout(req, res) {

    res.clearCookie("uid");

    return res.redirect("/login");

}

// PROFILE PAGE
async function handleProfilePage(req, res) {

    try {

        const totalNote =
            await Note.countDocuments({
                createdBy: req.user._id
            });

        return res.render(
            "profile",
            {
                user: req.user,
                totalNote
            }
        );

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }

}

// CHANGE PASSWORD PAGE
async function handleChangePasswordPage(req, res) {

    const error =
        req.session.error;

    delete req.session.error;

    return res.render(
        "changePassword",
        {
            error
        }
    );

}

// CHANGE PASSWORD LOGIC
async function handlechangePassword(req, res) {

    try {

        const {
            currentPassword,
            newPassword
        } = req.body;

        const user = req.user;

        if (newPassword.length < 6) {

            req.session.error =
                "New Password must be at least 6 characters";

            return res.redirect(
                "/profile/change-password"
            );

        }

        const isMatch =
            await bcrypt.compare(
                currentPassword,
                user.password
            );

        if (!isMatch) {

            req.session.error =
                "Current Password is Incorrect";

            return res.redirect(
                "/profile/change-password"
            );

        }

        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );

        user.password =
            hashedPassword;

        await user.save();

        req.session.success =
            "Password Changed Successfully";

        return res.redirect(
            "/user/home"
        );

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }

}

module.exports = {
    handleSignupPage,
    handleLoginPage,
    handleSignup,
    handleLogin,
    handleLogout,
    handleProfilePage,
    handleChangePasswordPage,
    handlechangePassword
};