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

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}` });
      } else {
          res.status(401).json({message: "Invalid credentials"})
      }
    }).catch(err =>{
        res.status(500).json(err)
    })
});
module.exports = router;
