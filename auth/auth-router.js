// this router is gonna manage all the authentication on http requests
// to make our password  hashed we are gonna use the bcryptjs
const bcrypt = require("bcryptjs");
const router = require("express").Router();

const Users = require("../users/users-model.js");

// since this the interacts of the client with the database
// so we are gonna use the post to get authenticated to be
// authorized

// authentication is who you are
// authorization is what can you do
router.post("/register", async (req, res, next) => {
  try {
    let user = req.body;
    // hash is gonna be synchronous which means this
    // code will stop here until is finished
    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;
    const saved = await Users.add(user); // if we send the user to the database
    // it means we are gonna send the user.password this is why we have to send the hashed
    // password instead of the real user.password user.password = hash
    if (saved) {
      res.json(saved);
    }
  } catch (err) {
    next(err);
  }
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
