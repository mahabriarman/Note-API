const User = require("../models/auth");

async function checkAuth(req,res,next){

    try {

        const uid = req.cookies.uid;

        if(!uid){
            return res.redirect("/login");
        }

        const user = await User.findById(uid);

        if(!user){
            return res.redirect("/login");
        }

        req.user = user;

        return next();

    } catch(error){

        return res.redirect("/login");

    }
}

module.exports = {
    checkAuth
};