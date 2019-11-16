
console.log("index.js");
"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);

var env = process.env.NODE_ENV || "development" ||require('./env');


// config file include
var config = require(__dirname + "/../config/config.json")[env];

// db object 
var db = {};

// if some flag, do something 
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  // else, config with the config object

  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}


// read the contents of the current working directory (i.e. $ ls)
fs.readdirSync(__dirname)
  .filter(function(file) {
    // only return javascript files 

    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {

    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });


  // for each model, if there is an associate function, call that function and 
  // pass all the other models as arguments to that function 

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// export the db object that were building since line 14

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
