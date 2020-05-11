// since we are trying to make our password hard to guess , we are gonna use a hashed generator library
// called bcryptjs and its gonna be be managed the authentication on http request
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");
// make our router
const router = require("express").Router();

// first make an account for the client through post
router.post("/register", async (req, res, next) => {
  try {
    // this is the info for the client to make his/her account
    let user = req.body;

    // hashed the password and later send back to the database as a hashed password
    let hash = bcrypt.hashSync(user.password, 15); // the hash function is a sync function
    // so the function will stop here till it finishes
    user.password = hash;

    const createdUser = await Users.add(user);
    res.json(createdUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    let { username, password } = req.body;
    const [user] = await Users.findBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      return res.json({ message: `welcome ${user.username}` });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    let { username, password } = req.body;
    const [user] = await Users.findBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      return res.json({ message: `welcome ${user.username}` });
    }
  } catch (err) {
    next(err);
  }
});

// export the router
module.exports = router;
