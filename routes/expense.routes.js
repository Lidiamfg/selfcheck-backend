const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const User = require("../models/User.model");

const Expense = require("../models/Expense.model");

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
            const userId = req.body.user;
            const expenseData = { ...req.body, user: userId };
            const newExpense = await Expense.create(expenseData);
            await User.findByIdAndUpdate(userId, {
                $push: { income: newExpense._id },
            });
            res.status(201).json({ income: newExpense });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
);

router.put(
    "/:expenseId",
  /* isAuthenticated, */ async (req, res) => {
        const { expenseId } = req.params;
        try {
            const updatedExpense = await Expense.findByIdAndUpdate(expenseId, req.body, {
                new: true,
            });
            res.status(200).json({ income: updatedExpense });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
);

router.delete(
    "/:expenseId",
  /* isAuthenticated, */ async (req, res) => {
        const { expenseId } = req.params;
        try {
            await Expense.findByIdAndDelete(expenseId);
            res.status(200).send();
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
);

module.exports = router;
