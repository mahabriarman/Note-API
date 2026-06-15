const express = require("express");
const { Mongoconnection } = require("./connection");

const NoteRouter = require("./route/user");
const AuthRouter = require("./route/auth");

const cookieParser = require("cookie-parser");
const session = require("express-session")

const app = express();
const Port = 8001;

Mongoconnection(
    "mongodb://127.0.0.1:27017/Notes-API"
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret : "notes-app-secret",
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