
module.exports = (sequelize, Sequelize) => {
    //using sequelize to go through sql and define the roles
    const Role = sequelize.define('role', {
        name: {
            type: Sequelize.STRING,
            allowNull: false   
        }
    });
    return Role;
}