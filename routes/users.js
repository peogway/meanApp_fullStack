const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const config = require("../utils/config");

// Register
router.post("/register", async (req, res, next) => {
  try {
    const body = req.body;
    let newUser = new User({
      name: body.name,
      email: body.email,
      username: body.username,
      password: body.password,
    });
    const foundUser = await User.getUserByUsername(body.username);
    if (foundUser) {
      return res.json({ success: false, msg: "Username already exists" });
    }
    await User.addUser(newUser);
    res.json({ success: true, msg: "User registered" });
  } catch (err) {
    res.json({ success: false, msg: "Failed to register user" });
  }
});

// Authenticate
router.post("/authenticate", async (req, res, next) => {
  const body = req.body;

  const username = body.username;
  const password = body.password;

  try {
    const foundUser = await User.getUserByUsername(username);
    if (!foundUser) {
      return res.json({ sucess: false, msg: "User not found" });
    }

    const isMatch = await User.comparePassword(password, foundUser.password);
    if (isMatch) {
      const token = jwt.sign({ data: foundUser }, config.secret, {
        expiresIn: 604800, // 1 week
      });

      res.json({
        success: true,
        token: "jwt " + token,
        user: {
          id: foundUser.id,
          name: foundUser.name,
          username: foundUser.username,
          email: foundUser.email,
        },
      });
    } else {
      return res.json({ success: false, msg: "Wrong password" });
    }
  } catch (err) {
    throw err;
  }
});

// Profile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send({ user: req.user, success: true });
  },
);

module.exports = router;
