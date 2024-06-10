const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");
const users = require("./users");
const { v4: uuid } = require("uuid");

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

sessions.beforeCreate(async (session) => {
  session.sessionId = uuid();
});

module.exports = sessions;
