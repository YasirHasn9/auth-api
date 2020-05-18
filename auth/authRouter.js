const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");
const restrict = require("../middleware/restrict");

router.post("/register", async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await Users.findBy({ username }).first();
    if (user) {
      res.status(409).json({ message: "Username been taken already" });
    }
    res.status(201).json(await Users.add(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
