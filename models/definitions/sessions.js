const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");
const users = require("./users");

class sessions extends Model {}

sessions.init(
  {
    sessionId: {
      primaryKey: true,
      type: DataTypes.STRING(255),
    },
    token: {
      //   allowNull: false,
      unique: true,
      type: DataTypes.STRING(1000),
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      references: {
        model: users,
        key: "userId",
      },
    },
  },
  {
    timestamps: true,
    tableName: "sessions",
    sequelize,
  }
);

module.exports = sessions;
