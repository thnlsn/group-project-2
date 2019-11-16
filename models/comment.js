console.log("comments.js");

module.exports = function(sequelize, DataTypes) {
  
  var Comment = sequelize.define("comment", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    comment_rating: DataTypes.INTEGER,
    comment_text: DataTypes.TEXT,
  });
  
  Comment.associate = function(db){
    console.log('we are here!')
    console.log(db)

    Comment.belongsTo(db.user, {
      foreignKey : 'user_name'
    })
    Comment.belongsTo(db.smoi, {
      foreignKey : 'smoi_id'
    })
  }

  return Comment;
};