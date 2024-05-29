const sequelize = require("../bin/dbConnection");

const users = require("./definitions/users");
const tasks = require("./definitions/tasks");
const userHasTasks = require("./definitions/userHasTasks");
const tasksHasUsers = require("./definitions/tasksHasUsers");
const sessions = require("./definitions/sessions");

const models = { users, tasks, userHasTasks, tasksHasUsers, sessions };

//relations
users.hasMany(tasks, { foreignKey: "userId" });
tasks.belongsTo(users, { foreignKey: "userId" });

users.hasOne(sessions, { foreignKey: "userId" });
sessions.belongsTo(users, { foreignKey: "userId" });

const db = {};
db.sequelize = sequelize; //created new key in db object
sequelize.models = models; //gave value to the sequelize models (db syncing)

// console.log(db.sequelize.models);

module.exports = { db, models };
