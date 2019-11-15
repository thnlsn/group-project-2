console.log("smoi.js");
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define("users", {
    id: DataTypes.INTEGER,
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    comment_rating: DataTypes.STRING,
    comment_text: DataTypes.STRING,
  });
  return Comment;
};