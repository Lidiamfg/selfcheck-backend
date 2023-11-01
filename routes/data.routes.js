const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const Month = require("../models/Month.model");
const Year = require("../models/Year.model");

const Data = require("../models/Data.model");

router.get("/:monthId", isAuthenticated, async (req, res) => {
  const { monthId } = req.params;
  try {
    const userData = await Data.find({ month: monthId });
    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

router.post("/", isAuthenticated, async (req, res) => {
  try {
    const monthId = req.body.month;
    const data = { ...req.body, month: monthId };
    const newData = await Data.create(data);
    await Month.findByIdAndUpdate(monthId, {
      $push: { data: newData._id },
    });
    let data2 = await Data.find({ month: monthId });
    let income = data2.filter((element) => element.category === "Income");
    let expense = data2.filter((element) => element.category === "Expense");
    let incomeTotal = income.reduce((a, b) => a + b.value, 0);
    let expenseTotal = expense.reduce((a, b) => a + b.value, 0);
    const updatedMonth = await Month.findByIdAndUpdate(
      monthId,
      {
        incomeSum: incomeTotal,
        expenseSum: expenseTotal,
      },
      { new: true }
    );
    console.log("Month", updatedMonth);

    const month = await Month.findById(monthId);
    console.log(month);
    const yearId = month.year;
    let month2 = await Month.find({ year: yearId });
    console.log(month2);
    let incomeAnualTotal = month2.reduce((a, b) => a + b.incomeSum, 0);
    console.log("OLA", incomeTotal);
    let expenseAnualTotal = month2.reduce((a, b) => a + b.expenseSum, 0);
    await Year.findByIdAndUpdate(
      yearId,
      {
        monthIncomeSum: incomeAnualTotal,
        monthExpenseSum: expenseAnualTotal,
      },
      { new: true }
    );
    res.status(201).json({ data: newData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.put("/:dataId", isAuthenticated, async (req, res) => {
  const { dataId } = req.params;
  try {
    const updatedData = await Data.findByIdAndUpdate(dataId, req.body, {
      new: true,
    });
    res.status(200).json({ data: updatedData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.delete("/:dataId", isAuthenticated, async (req, res) => {
  const { dataId } = req.params;
  try {
    const currentData = await Data.findById(dataId);
    await Data.findByIdAndDelete(dataId);
    await Month.findByIdAndUpdate(currentData.month, {
      $pull: { data: dataId },
    });
    let data2 = await Data.find({ month: currentData.month });
    let income = data2.filter((element) => element.category === "Income");
    let expense = data2.filter((element) => element.category === "Expense");
    let incomeTotal = income.reduce((a, b) => a + b.value, 0);
    let expenseTotal = expense.reduce((a, b) => a + b.value, 0);
    const updatedMonth = await Month.findByIdAndUpdate(
      currentData.month,
      {
        incomeSum: incomeTotal,
        expenseSum: expenseTotal,
      },
      { new: true }
    );
    console.log("Month", updatedMonth);
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
