const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const Month = require("../models/Month.model");
const Year = require("../models/Year.model");

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const allMonths = await Month.find();
    res.status(200).json(allMonths);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.post("/", isAuthenticated, async (req, res) => {
  try {
    const yearId = req.body.year;
    const month = { ...req.body, year: yearId };
    const newMonth = await Month.create(month);
    await Year.findByIdAndUpdate(yearId, {
      $push: { month: newMonth._id },
    });
    let month2 = await Month.find({ year: yearId });
    console.log(month2);
    let incomeTotal = month2.reduce((a, b) => a + b.incomeSum, 0);
    console.log("OLA", incomeTotal);
    let expenseTotal = month2.reduce((a, b) => a + b.expenseSum, 0);
    await Year.findByIdAndUpdate(
      yearId,
      {
        monthIncomeSum: incomeTotal,
        monthExpenseSum: expenseTotal,
      },
      { new: true }
    );
    res.status(201).json({ month: newMonth });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.put("/:monthId", isAuthenticated, async (req, res) => {
  const { monthId } = req.params;
  try {
    const updatedMonth = await Month.findByIdAndUpdate(monthId, req.body, {
      new: true,
    });
    res.status(200).json({ month: updatedMonth });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.delete("/:monthId", isAuthenticated, async (req, res) => {
  const { monthId } = req.params;
  try {
    const currentMonth = await Month.findById(monthId);
    await Month.findByIdAndDelete(monthId);
    await Year.findByIdAndUpdate(currentMonth.year, {
      $pull: { month: monthId },
    });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get("/:yearId", isAuthenticated, async (req, res) => {
  const { yearId } = req.params;
  try {
    const userMonths = await Month.find({ year: yearId });
    res.json(userMonths);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
