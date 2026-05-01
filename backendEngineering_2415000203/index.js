const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userRoutes  = require("./routes/user");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "key",
    resave: false,
    saveUninitialized: true
}))
app.use("/", userRoutes);

app.listen(8080);