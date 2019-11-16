<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 9256c7f439d4d1b51a22247d2e68ed5fbb871186
console.log("index.js");
"use strict";

// random includes
=======
"use strict";

>>>>>>> 75103b7c01413296496432350145041a580ff022
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 9256c7f439d4d1b51a22247d2e68ed5fbb871186
var env = process.env.NODE_ENV || "development" ||require('./env');


// config file include
<<<<<<< HEAD
var config = require(__dirname + "/../config/config.json")[env];

// db object 
var db = {};

// if some flag, do something 
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  // else, config with the config object
=======
var env = process.env.NODE_ENV || "development";
=======
>>>>>>> 9256c7f439d4d1b51a22247d2e68ed5fbb871186
var config = require(__dirname + "/../config/config.json")[env];

// db object 
var db = {};

// if some flag, do something 
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
<<<<<<< HEAD
>>>>>>> 75103b7c01413296496432350145041a580ff022
=======
  // else, config with the config object

>>>>>>> 9256c7f439d4d1b51a22247d2e68ed5fbb871186
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

<<<<<<< HEAD
<<<<<<< HEAD
// read the contents of the current working directory (i.e. $ ls)
fs.readdirSync(__dirname)
  .filter(function(file) {
    // only return javascript files 
=======
fs.readdirSync(__dirname)
  .filter(function(file) {
>>>>>>> 75103b7c01413296496432350145041a580ff022
=======

// read the contents of the current working directory (i.e. $ ls)
fs.readdirSync(__dirname)
  .filter(function(file) {
    // only return javascript files 

>>>>>>> 9256c7f439d4d1b51a22247d2e68ed5fbb871186
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
<<<<<<< HEAD
<<<<<<< HEAD
    // iterate each js file
    // build model object
=======
>>>>>>> 75103b7c01413296496432350145041a580ff022
=======

>>>>>>> 9256c7f439d4d1b51a22247d2e68ed5fbb871186
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

<<<<<<< HEAD
<<<<<<< HEAD
  // for each model, if there is an associate function, call that function and 
  // pass all the other models as arguments to that function 
=======
>>>>>>> 75103b7c01413296496432350145041a580ff022
=======

  // for each model, if there is an associate function, call that function and 
  // pass all the other models as arguments to that function 

>>>>>>> 9256c7f439d4d1b51a22247d2e68ed5fbb871186
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

<<<<<<< HEAD
<<<<<<< HEAD
// export sequelize as BOTH capital S and normal s
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// export the db object that were building since line 14
=======
=======
// export the db object that were building since line 14

>>>>>>> 9256c7f439d4d1b51a22247d2e68ed5fbb871186
db.sequelize = sequelize;
db.Sequelize = Sequelize;

>>>>>>> 75103b7c01413296496432350145041a580ff022
module.exports = db;
