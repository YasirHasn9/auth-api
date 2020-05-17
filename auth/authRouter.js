const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  const user = req.body;
  // user has username and password
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash; // we hashed before we send to the db
  Users.add(user)
    .then(savedUser => res.json(savedUser))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
