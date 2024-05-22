const sequelize = require("../../bin/dbConnection");
const { Model, DataTypes } = require("sequelize");

class tasksHasUsers extends Model {}

tasksHasUsers.init(
  {
    tasksHasUsers: {
      primaryKey: true,
      type: DataTypes.STRING(255),
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "tasksHasUsers",
    sequelize,
  }
);

module.exports = tasksHasUsers;
