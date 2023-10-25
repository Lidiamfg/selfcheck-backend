const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const userRoutes = require("./user.routes");
router.use("/user", userRoutes)

const expRoutes = require("./expense.routes")
router.use("/expense", expRoutes)

const incRoutes = require("./income.routes")
router.use("/income", incRoutes)

module.exports = router;
