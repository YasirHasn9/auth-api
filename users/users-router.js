const router = require("express").Router();
const Users = require("./users-model.js");
const { restrict } = require("../middleware/restrict");

router.get("/", restrict(), async (req, res, next) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    console.log("this is users", err);
    next(err);
  }
});

module.exports = router;
