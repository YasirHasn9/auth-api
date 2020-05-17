const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// we are gonna use session for authentications where we can save cookies in it
// so we are gonna use a library that would do this for us
const session = require("express-session");

const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/authRouter");

const server = express();
const sessionConfig = {
  /* 
  name and secret is for the developer work 
  */
  name: "monkey", //  we need to named something that would helps to make the attackers
  // confused to guess because the name be default is sid: By exposed this to them
  // it would be easy to guess the library that we use and easily get access to
  // our database
  secret: "keep it save , keep it secret!", // this what we are gonna use in order to encrypt and decrypt the
  // cookies by the server by the server , so on every request the server will
  // look up for the secret to check if is it valid or not

  /*
  this is for the cookies itself
  */
  cookies: {
    maxAge: 1000 * 30, //  this is how long we want the cookies would be
    //  stored in the db
    secure: false, // this is a boolean value , which asking , is it ok that we send
    // cookie over an encrypted connection ? over https
    // during development ,it is ok to set to false  because we are not setting up
    // https but through production we can set it to true using var in the env
    // what is an encrypted connection ? its encrypted exchange between the website
    // we are visiting and the internet
    httpOnly: true // means that this cookie can not be accessed by js
  },
  resave: false, // do we want recreate a session even it has not changed
  saveUninitialized: false // this is asking the client if it is okey
  //  to save the cookies on their website locally because there is laws against saving
  // the cookies
};
server.use(helmet());
server.use(express.json());
server.use(cors());
// so the session will be global which means would be used on every request ?
server.use(session(sessionConfig));

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
})

module.exports = server;
