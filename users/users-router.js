const router = require("express").Router();
const bcrypt = require("bcryptjs"); // this is gonna generate a hashed password
const Users = require("./users-model.js");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.post("/register", async (req, res, next) => {
  try {
    // firsts we have to hash the password of the user using bcryptjs
    let user = req.body;

    // this is a sync function , which means it will stop here then gonna continue
    // after it hashed the whole password for 15 rounds
    // in this case hackers can not guess our password
    let hash = bcrypt.hashSync(user.password, 15);

    user.password = hash; // we assigned the user.password to the hash that we just
    // generated
    const newUser = await Users.add(user);
    // even if we create a new user with the same password the hash would be 
    // different because bcryptjs using something called salt
    // salt is just a random string that add to the password that we provide and combined
    // them and generate the hashed password
    // which means if 2 users have the same password the salt will make them different
    // and this is so important for security.
    res.status(201).json(newUser);

  } catch (err) {
    next(err);
  }
});
module.exports = router;
