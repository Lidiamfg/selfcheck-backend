const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in the Eye of Sauron");
});

router.post("/signup", async (req, res) => {
  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);
  console.log(passwordHash)
  try {
    const newUser = await User.create({ ...req.body, passwordHash });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const potentialUser = await User.findOne({ username });
  if (potentialUser) {
    if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
      const authToken = jwt.sign(
        { userId: potentialUser._id },
        process.env.TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "3h",
        }
      );

      res.status(200).json({ token: authToken });
    } else {
      res.status(400).json({ message: "Password is not precious" });
    }
  } else {
    res.status(400).json({ message: "User is not in Middle Earth" });
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  res.json(req.payload);
});

module.exports = router;
