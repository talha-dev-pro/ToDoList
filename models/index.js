const sequelize = require("../bin/dbConnection");
const {
  users,
  tasks,
  userHasTasks,
  tasksHasUsers,
} = require("./definitions/users");

const models = { users, tasks, userHasTasks, tasksHasUsers };

const db = {};
db.sequelize = sequelize; //created new key in db object
sequelize.models = models; //gave value to the sequelize models

console.log(db.sequelize.models);

module.exports = { db, models };
