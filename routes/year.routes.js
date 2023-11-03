const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const Year = require("../models/Year.model");
const User = require("../models/User.model");

/* router.get('/:id', (req, res, next) => {
  res.json('All good in here')
}) */

router.post("/", isAuthenticated, async (req, res) => {
  try {
    const userId = req.body.user;
    const year = { ...req.body, user: userId };
    const newYear = await Year.create(year);
    await User.findByIdAndUpdate(userId, {
      $push: { year: newYear._id },
    });
    res.status(201).json({ year: newYear });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.put("/:yearId", isAuthenticated, async (req, res) => {
  const { yearId } = req.params;
  try {
    const updatedYear = await Year.findByIdAndUpdate(yearId, req.body, {
      new: true,
    });
    res.status(200).json({ year: updatedYear });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.delete("/:yearId", isAuthenticated, async (req, res) => {
  const { yearId } = req.params;
  try {
    const currentYear = await Year.findById(yearId);
    await Year.findByIdAndDelete(yearId);
    await User.findByIdAndUpdate(currentYear.user, {
      $pull: { year: yearId },
    });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get("/:userId", isAuthenticated, async (req, res) => {
  const { userId } = req.params;
  try {
    const userYears = await Year.find({ user: userId });
    res.json(userYears);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
