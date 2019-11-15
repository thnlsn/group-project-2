CONTROLLERS
const config = require("../config/config");
const db = require("../config/db.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

// This function creates a new user and logins them in
exports.signup = (req, res) => {
  //Save User to Database
  console.log("processing func -> Signup");

  User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        user
          .setRoles(roles)
          .then(() => res.send("User registered successfully!"));
      });
    }) /* this promise pushes the JWT to the x-authheader
        .then((user) =>{
      return user.generateAuthToken().then((token)=> {
        res.header("x-auth", token).send(user);
      })
    })*/
    .catch(err => {
      res.status(500).send("Error ->" + err);
    });
};
// this function validates the user's email and password so they can sign in again
exports.signin = (req, res) => {
  console.log("Sign-In");

  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send("User Not Found.");
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res
          .status(401)
          .send({ auth: false, accessToken: null, reason: "Invalid Password" });
      }
      let token = jwt.sign({ id: user.id }, config.secret, {
        /*When using jsonWebToken you can put an experation date for the token.
        expiresIn: 86400 // expires in 24 hours*/
      });
      res.status(200).send({ auth: true, accessToken: token });
      if(signin === true){ app.replace('/members')};
    }) /* this promise pushes the JWT to the x-authheader
    .then((user) =>{
  return user.generateAuthToken().then((token)=> {
    res.header("x-auth", token).send(user);
  })
})*/
    .catch(err => {
      res.status(500).send("Error ->" + err);
    });
};

// This checks to see if they are a user or not.
// If they are a user they can see the users page which allows them to comment.
//If the are not a user they will not be able to comment but they could browse.
exports.userContent = (req, res) => {
  console.log(req.body);
  User.findOne({
    where: { id: req.params.userId },
    attributes: ["id", "name"],
    include: [
      {
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  })
    .then(user => {
      res.status(200).json({
        
        description: "User Content Page",
        user: user
      });
    })
    .catch(err => {
      res.status(500).json({
        description: "Can not  access User Page",
        error: err
      });
    });
};


