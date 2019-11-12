console.log("apiRoutes.js");

var db = require("../models");

module.exports = function(app) {
  // Get all examples
  // THIS IS FOR THE HOME PAGE, ALL DATA FOR ALL SMOIS
  app.get("/home", function(req, res) {
    db.smoi.findAll({}).then(function(results) {
      console.log(`Here are the results from the GET request: ${results}`);
      res.json(results);
    });
  });

  // Create a new example
  // THIS IS FOR WHEN CREATING A NEW SMOI, POSTING THE INPUTTED DATA TO THE DB
  app.post("/api/create", function(req, res) {
    db.smoi.create(req.body).then(function(results) {
      res.json(results);
    });
  });

  // Delete an example by id
  app.delete("/api/smois/:id", function(req, res) {
    db.smoi.destroy({ where: { id: req.params.id } }).then(function(results) {
      res.json(results);
    });
  });

  // THIS IS FOR EACH CATEGORY, GETS ALL SMOIS FOR THE CLICKED CATEGORY
  app.get("/api/:id", function(req, res) {
    db.smoi.findAll({
      where: {smoi_category: req.params.id}
    }).then(function(results) {
      console.log(`Here are the results from the GET request: ${results}`);
      res.json(results);
    });
  });
};

