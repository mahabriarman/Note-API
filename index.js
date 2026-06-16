const express = require("express");
require("dotenv").config()
const { Mongoconnection } = require("./connection");

const NoteRouter = require("./route/user");
const AuthRouter = require("./route/auth");

const cookieParser = require("cookie-parser");
const session = require("express-session")

const app = express();
const Port = process.env.PORT;

Mongoconnection(
    process.env.MONGO_URL
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized : false
}))

app.set("view engine", "ejs");

app.use("/user", NoteRouter);
app.use("/", AuthRouter);

app.listen(Port, () => {
    console.log(
        `Server Started on ${Port}`
    );
});