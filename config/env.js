const env = {
    database: 'practrun',
    username: 'root',
    password: 'APscience@1969',
    dialect: 'mysql',
    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;