console.log("apiRoutes.js");

module.exports = function(app) {
  var db = require("../models");
  const { checkDuplicate, checkRoles } = require("./verifySignUp");
  const { verifyToken, LoggOff, isLogin } = require("./verifyJwtToken");
  // const authJwt = require("./verifyJwtToken");
  // const controller = require("../controller/controller");
  const { signup, signin, userContent } = require("../controller/controller");

  // When we first enter the home page...
  // GET ROUTE: all smois (NAME, RATING, IMAGE) from all categories in the SMOIS table
  app.get("/home", function(req, res) {
    db.smoi.findAll({}).then(function(results) {
      console.log(`Here are the results from the GET request: ${results}`);
      res.json(results);
    });
  });

  // When we click to create a smoi...
  // POST ROUTE: add a new smoi (NAME, CATEGORY, IMAGE) to the SMOIS table
  app.post("/api/create", function(req, res) {
    db.smoi.create(req.body).then(function(results) {
      console.log(`POST request made: NEW SMOI CREATED`);
      res.json(results);
    });
  });

  // If we want to delete a smoi...
  // DELETE ROUTE: delete a smoi from the SMOIS table by it's (:smoi).
  app.delete("/api/products/:smoi", function(req, res) {
    db.smoi
      .destroy({ where: { smoi: req.params.smoi_name } })
      .then(function(results) {
        res.json(results);
      });
  });

  // When we click on a category...
  // GET ROUTE: all smois (NAME, RATING, IMAGE) from the specified category (:category) in the SMOIS table
  app.get("/api/:category", function(req, res) {
    db.smoi
      .findAll({
        where: { smoi_category: req.params.category }
      })
      .then(function(results) {
        console.log(`Here are the results from the GET request: ${results}`);
        res.json(results);
      });
  });

  // When we signup...
  // POST ROUTE: add a new user (USERNAME, PASSWORD) to the USERS table
  app.post("/signup", function(req, res) {
    db.user.create(req.body).then(function(results) {
      console.log(`POST request made: NEW USER CREATED`);
      res.json(results);
    });
  });

  // When we click on a smoi...
  // GET ROUTE: specific smoi (:id) in the SMOIS table, and all it's information (NAME, RATING, IMAGE) as well as (COMMENTS) associated with it (hasMany) and the user who posted it (belongsTo)
  app.get("/product/:product", function(req, res) {
    db.smoi
      .findAll({
        where: { smoi_name: req.params.product },
        include: { model: db.comment, as: "comments" }
        /*       include: {model: db.comment} */
      })
      .then(function(results) {
        console.log(`Here are the results from the GET request: ${results}`);
        res.json(results);
      });
  });

  // When we click to make a comment...
  // POST ROUTE: add a new comment (TEXT, RATING) to the COMMENTS table, which is bound to (belongsTo) the user who made it but associated to the smoi (hasMany)
  app.post("/api/comment", function(req, res) {
    db.comment.create(req.body).then(function(results) {
      console.log(`POST request made: NEW COMMENT CREATED`);
      res.json(results);
    });
  });
};

/* 
When we click on login...
POST ROUTE: add a new user (USERNAME, PASSWORD) to the USERS table

When we first enter the home page...
GET ROUTE: all smois (NAME, RATING, IMAGE) from all categories in the SMOIS table

When we click on a category...
GET ROUTE: all smois (NAME, RATING, IMAGE) from the specified category (:id) in the SMOIS table

When we click on a smoi...
GET ROUTE: specific smoi (:id) in the SMOIS table, and all it's information (NAME, RATING, IMAGE) as well as (COMMENTS) associated with it (hasMany) and the user who posted it (belongsTo)

When we click to make a comment...
POST ROUTE: add a new comment (TEXT, RATING) to the COMMENTS table, which is bound to (belongsTo) the user who made it but associated to the smoi (hasMany)

When we click to create a smoi...
POST ROUTE: add a new smoi (NAME, CATEGORY, IMAGE) to the SMOIS table
*/
