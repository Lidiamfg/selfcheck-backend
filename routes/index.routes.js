const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const userRoutes = require("./user.routes");
router.use("/user", userRoutes)

const yearRoutes = require("./year.routes")
router.use("/year", yearRoutes)

const monthRoutes = require("./month.routes")
router.use("/month", monthRoutes)

const dataRoutes = require("./data.routes")
router.use("/data", dataRoutes)

module.exports = router;
