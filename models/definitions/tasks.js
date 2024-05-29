const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");
const users = require("./users");

class tasks extends Model {}

tasks.init(
  {
    taskId: {
      primaryKey: true,
      type: DataTypes.STRING(255),
    },
    taskName: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    taskInfo: {
      type: DataTypes.STRING(1000),
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: users,
        key: "userId",
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "tasks",
    sequelize,
  }
);

module.exports = tasks;
