const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

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
    taskInfo: { type: DataTypes.STRING(1000) },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "tasks",
    sequelize,
  }
);

module.exports = tasks;
