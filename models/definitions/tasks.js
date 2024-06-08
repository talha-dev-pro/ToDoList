const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");
const users = require("./users");
const { v4: uuid } = require("uuid");

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

tasks.beforeCreate(async (task) => {
  task.taskId = uuid();
});

module.exports = tasks;
