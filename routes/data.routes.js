const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const Month = require("../models/Month.model");

const Data = require("../models/Data.model");

router.get("/", isAuthenticated, (req, res, next) => {
  res.json("All of the incomes");
});

/* router.get('/:id', (req, res, next) => {
  res.json('All good in here')
}) */

router.post(
  "/",
  /* isAuthenticated, */ async (req, res) => {
    try {
      const monthId = req.body.month;
      const data = { ...req.body, month: monthId };
      const newData = await Data.create(data);
      await Month.findByIdAndUpdate(monthId, {
        $push: { data: newData._id },
      });
      res.status(201).json({ data: newData });
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
