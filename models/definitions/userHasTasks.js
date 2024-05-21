const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class userHasTasks extends Model {}

userHasTasks.init(
  {
    userHasTasksId: {
      primaryKey: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "userHasTasks",
    sequelize,
  }
);

module.exports = userHasTasks;
