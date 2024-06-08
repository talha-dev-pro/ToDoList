const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");
const { hash } = require("bcryptjs");
const { v4: uuid } = require("uuid");

class users extends Model {}

users.init(
  {
    userId: {
      primaryKey: true,
      type: DataTypes.STRING(255),
    },
    userName: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(34),
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(1000),
    },
    role: {
      allowNull: false,
      defaultValue: "user",
      type: DataTypes.ENUM,
      values: ["user", "admin"],
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "users",
    sequelize,
  }
);

users.beforeCreate(async (user) => {
  user.userId = uuid();
  user.password = await hash(user.password, 10);
});

users.afterCreate((user) => {
  delete user.dataValues.password;
});

module.exports = users;
