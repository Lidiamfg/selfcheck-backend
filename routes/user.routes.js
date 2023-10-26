const { isAuthenticated } = require("../middlewares/routeGuard.middleware");
const router = require("express").Router();
const User = require("../models/User.model");

router.get("/:userId",  isAuthenticated,  async (req, res) => {
  const { userId } = req.params;

  try {
    const oneUser = await User.findById(userId)
      .populate({
        path: "year",
        model: "Year",
        populate: {
          path: "month",
          model: "Month",
          populate: {
            path: "data",
            model: "Data",
          }
        },

      })
    const userCopy = oneUser._doc;
    delete userCopy.passwordHash;
    res.status(200).json({ user: userCopy });
    console.log(userCopy)
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
