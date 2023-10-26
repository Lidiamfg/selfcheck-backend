const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const Year = require("../models/Year.model");
const User = require("../models/User.model");

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
            const userId = req.body.user;
            const year = { ...req.body, user: userId };
            const newYear = await Year.create(year)
            await User.findByIdAndUpdate(userId, {
                $push: { year: newYear._id },
            });
            res.status(201).json({ year: newYear });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
);
router.get("/:yearId", /* isAuthenticated, */ async (req, res) => {
    const { yearId } = req.params;

    try {
        const oneYear = await Year.findById(yearId)
            .populate("month")
        const yearCopy = oneYear._doc;
        delete yearCopy.passwordHash;
        res.status(200).json({ year: yearCopy });
        console.log(yearCopy)
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;