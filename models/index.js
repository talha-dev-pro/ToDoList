const sequelize = require("../bin/dbConnection");
const users = require("./definitions/users");

const models = { users };

const db = {};
db.sequelize = sequelize; //created new key in db object
sequelize.models = models; //gave value to the sequelize models

module.exports = { db, models };
