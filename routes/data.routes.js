const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const Month = require("../models/Month.model");

const Data = require("../models/Data.model");

router.get('/:monthId', isAuthenticated, async (req, res) => {
  const { monthId } = req.params
  try {
    const userData = await Data.find({ month: monthId })
    res.json(userData)
  }
  catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
})

router.post(
  "/",
  isAuthenticated, async (req, res) => {
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
  "/:dataId",
  isAuthenticated, async (req, res) => {
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
  }
);

router.delete(
  "/:dataId",
  isAuthenticated, async (req, res) => {
    const { dataId } = req.params;
    try {
      await Data.findByIdAndDelete(dataId);
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
);

module.exports = router;
