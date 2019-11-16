console.log("user.js");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    /*id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },*/
    username: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
        unique: true,
        primaryKey: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
        unique: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(db) {
    User.hasMany(db.comment, { as: "comment", foreignKey: "username" });
    User.hasMany(db.smoi, { as: "smoi", foreignKey: "username" });

    /*  
        User.hasMany(comment, {as: 'comments', foreignKey: 'user_name'})
        User.hasMany(smoi, {as: 'smoi', foreignKey: 'user_name'})
        */
  };

  return User;
};
