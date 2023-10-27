const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const Month = require("../models/Month.model");
const Year = require("../models/Year.model");

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
            const yearId = req.body.year;
            const month = { ...req.body, year: yearId };
            const newMonth = await Month.create(month);
            await Year.findByIdAndUpdate(yearId, {
                $push: { month: newMonth._id },
            });
            res.status(201).json({ month: newMonth });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
);
router.get('/:yearId', isAuthenticated, async (req, res) => {
    const { yearId } = req.params
    try {
        const userMonths = await Month.find({ year: yearId })
        res.json(userMonths)
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
})

module.exports = router;