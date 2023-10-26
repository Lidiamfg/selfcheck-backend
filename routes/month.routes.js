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

router.get("/:monthId", isAuthenticated, async (req, res) => {
    const { monthId } = req.params;

    try {
        const oneMonth = await Month.findById(monthId)
            .populate("data")
        const monthCopy = oneMonth._doc;
        delete monthCopy.passwordHash;
        res.status(200).json({ month: monthCopy });
        console.log(monthCopy)
    } catch (error) {
        res.status(500).json({ error });
    }
});
module.exports = router;