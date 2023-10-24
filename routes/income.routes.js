const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();

const Income = require("../models/Income.model");

router.get("/", isAuthenticated, (req, res, next) => {
  res.json("All of the incomes");
});

/* router.get('/:id', (req, res, next) => {
  res.json('All good in here')
}) */

router.post("/", /* isAuthenticated, */ async (req, res, next) => {
  try {
    const newIncome = await Income.create(req.body);
    res.status(201).json({ income: newIncome });
  } catch (error) {
    console.log(error);
    res.status(500).json({error})
  }
});

router.put("/:id", isAuthenticated, (req, res, next) => {
  res.json("All good in here");
});

router.delete("/:id", isAuthenticated, (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
