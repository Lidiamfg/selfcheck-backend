const { isAuthenticated } = require("../middlewares/routeGuard.middleware");
const router = require("express").Router();
const User = require("../models/User.model");

/* const Income = require("../models/Income.model");
const Expense = require("../models/Expense.model"); */

router.get('/:userId', async (req, res) => {
    const { userId } = req.params
  
    try {
      const oneUser = await User.findById(userId).populate('income').populate('expense')
      res.status(200).json({ user: oneUser })
    } catch (error) {
      res.status(500).json({ error })
    }
  })

  module.exports = router;