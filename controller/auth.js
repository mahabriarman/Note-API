const User = require("../models/auth");
const bcrypt = require("bcrypt");
const Note = require("../models/user");
// Signup Page
async function handleSignupPage(req,res){
return res.render("signup");
}

// Login Page
async function handleLoginPage(req,res){
return res.render("login");
}

// Signup Logic
async function handleSignup(req,res){
try {


    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
        email
    });

    if(existingUser){
        req.session.error= "User Already Exists"
        return res.redirect("/signup")
    }
    
    const hashedPassword =
        await bcrypt.hash(password,10);

    await User.create({
        name,
        email,
        password: hashedPassword
    });

    return res.redirect("/login");

} catch(error){

    return res.status(500).json({
        error: error.message
    });

}

}

// Login Logic
async function handleLogin(req,res){


try {

    const { email, password } = req.body;

    const user = await User.findOne({
        email
    });

    if(!user){
        return res.send(
            "User Not Found"
        );
    }

    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if(!isMatch){
        return res.send(
            "Invalid Password"
        );
    }

    res.cookie(
        "uid",
        user._id.toString(),
        {
            httpOnly: true
        }
    );

    return res.redirect(
        "/user/home"
    );

} catch(error){

    return res.status(500).json({
        error: error.message
    });

}


}

// Logout Logic
async function handleLogout(req,res){


res.clearCookie("uid");

return res.redirect(
    "/login"
);

}


async function handleProfilePage(req,res){
    try {
        const totalNote = await Note.countDocuments({
            createdBy: req.user._id
        })
        return res.render(
            "profile",{
                user: req.user,totalNote
            }
        )
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
handleProfilePage
};
