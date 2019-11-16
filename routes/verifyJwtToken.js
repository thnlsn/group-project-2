let jwt = require("jsonwebtoken");
const config = require("../config/config");
const db = require("../config/config");
const User = db.user;

// Verify json web token function

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "NO token provided."
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Fail ro Authentication. Error ->" + err
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isLogin = (req, res, next) => {
  User.findById(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        console.log(roles[i].name);
        if (roles[i].name.toUpperCase() === "Login") {
          next();
          return;
        }
      }

      res.status(403).send("Require Login Role!");
      return;
    });
  });
};

const LoggOff = (req, res, next) => {
  User.findOne(req.userId).then(user => {
    req.params.user
      .remove(req.userId)
      .then(() => {
        res.status(200).send({
          auth: false,
          message: "You have been logged off."
        });
      })
      .catch(err => {
        res.status(400).send(err);
      });
    next();
  });
};

const isLoginOrOff = (req, res, next) => {
  User.findById(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name.toUpperCase() === "login") {
        }
        if (roles[i].name.toUpperCase() === "loggedoff") {
          next();
          return;
        }
      }
      res.status(403).send("Require login or logged off");
    });
  });
};

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isLogin = isLogin;
// authJwt.isLoginOrOff = isLoginOrOff;
authJwt.LoggOff = LoggOff;

module.exports = authJwt;
