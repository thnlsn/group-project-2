console.log("smoi.js");

module.exports = (sequelize, DataTypes) => {

  var Smoi = sequelize.define("smoi", {
    smoi_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    smoi_name: DataTypes.STRING,
    smoi_category: DataTypes.STRING,
    smoi_image: DataTypes.TEXT
  });

  Smoi.associate = function(db){
    console.log(db)

    Smoi.belongsTo(db.user, {foreignKey: 'user_name'})
    Smoi.hasMany(db.comment, {as: 'comments', foreignKey: 'id'})

  }

  return Smoi;
};
