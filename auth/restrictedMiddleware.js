// const bcrypt = require("bcryptjs");
// const Users = require("../users/users-model");

module.exports = (req, res, next) => {
  // this is will send on the http through the headers
  //   const { username, password } = req.headers;

  //   if ((username, password)) {
  //     // if we get them right then we have a user
  //     // find the user using the username in the db
  //     Users.findBy({ username })
  //       .first() // return on object contained the user form the db
  //       .then(user => {
  //         //   when we use the compareSync,
  //         //  it means we hashed the password already in the db
  //         if (user && bcrypt.compareSync(password, user.password)) {
  //           next(); // allows for the user to play with the db
  //         } else {
  //           res.status(401).json({
  //             message: "Invalid credentials"
  //           });
  //         }
  //       })
  //       .catch(err => {
  //         res.status(500).json({ message: "Ran into an expected error" });
  //       });
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "shall not pass" });
  }
};
