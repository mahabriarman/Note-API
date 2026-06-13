const mongoose = require("mongoose");

async function Mongoconnection(url){

    try {

        await mongoose.connect(url);

        console.log(
            "MongoDB Connected"
        );

    } catch(error){

        console.log(
            "MongoDB Connection Failed"
        );

        console.log(error);
    }
}

module.exports = {
    Mongoconnection
};