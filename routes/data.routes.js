const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const User = require("../models/User.model");

const Data = require("../models/Data.model");

router.get("/", isAuthenticated, (req, res, next) => {
  res.json("All of the incomes");
});

/* router.get('/:id', (req, res, next) => {
  res.json('All good in here')
}) */

router.post(
  "/",
  isAuthenticated, async (req, res) => {
    try {
      const userId = req.body.user;
      const incomeData = { ...req.body, user: userId };
      const newIncome = await Income.create(incomeData);
      await User.findByIdAndUpdate(userId, {
        $push: { data: newIncome._id },
      });
      res.status(201).json({ income: newIncome });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
);

router.put(
  "/:incomeId",
  isAuthenticated, async (req, res) => {
    const { incomeId } = req.params;
    try {
      const updatedIncome = await Income.findByIdAndUpdate(incomeId, req.body, {
        new: true,
      });
      res.status(200).json({ income: updatedIncome });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
);

router.delete(
  "/:incomeId",
  isAuthenticated, async (req, res) => {
    const { incomeId } = req.params;
    try {
      await Income.findByIdAndDelete(incomeId);
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
);

module.exports = router;
