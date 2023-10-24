const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const User = require("../models/User.model")

const Income = require("../models/Income.model");

router.get("/", isAuthenticated, (req, res, next) => {
  res.json("All of the incomes");
});

/* router.get('/:id', (req, res, next) => {
  res.json('All good in here')
}) */

router.post("/", isAuthenticated, async (req, res) => {
  try {
    const userId = req.body.user;
    const incomeData = { ...req.body, user: userId };
    console.log("UserID:", userId);
    console.log("Income Data:", incomeData);

    const newIncome = await Income.create(incomeData);
    console.log("New Income:", newIncome);

    await User.findByIdAndUpdate(userId, { $push: { income: newIncome._id } });

    const updatedUser = await User.findById(userId);
    console.log("Updated User:", updatedUser);

    res.status(201).json({ income: newIncome });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.put("/:id", isAuthenticated, (req, res, next) => {
  res.json("All good in here");
});

router.delete("/:id", isAuthenticated, (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
