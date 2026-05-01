const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if(!req.session.user && req.cookies.user) {
    res.send("welcome back, last time you logged in as " + req.cookies.user);
  }else {
    res.send("welcome");
  }
});
router.post("/login", (req, res) => {
  let username = req.body.username;
  let role = req.body.role;
  req.session.user = { username, role };
  res.cookie("user", username);
  res.send("logged in");
});
router.get("/courses", (req, res) => {
  if(!req.session.user) {
    res.send("login First");
  }else {
    res.send("you can view courses");
  }
});
router.get("/create-course", (req, res) => {
  if (!req.session.user) {
    res.send("login first");
  }else if (req.session.user.role !== "instructor") {
    res.send("access denied");
  }else {
    res.send("course created");
  }
});
router.get("/profile", (req, res) => {
  if(!req.session.user) {
    res.send("login first");
  }else {
    res.send("username: " + req.session.user.username + ",role: " + req.session.user.role  );
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.send("logged out");
  });
});

module.exports = router;