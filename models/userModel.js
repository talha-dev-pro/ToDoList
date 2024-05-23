const { where } = require("sequelize");
// const { response } = require("../app");
const { models } = require("./index");
const { response } = require("../app");

module.exports = {
  createUser: async (body) => {
    try {
      const user = await models.users.create({ ...body });
      return {
        response: user,
      };
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  },
  getUser: async (userId, userName) => {
    try {
      const user = await models.users.findOne({
        ...(userId
          ? { where: { userId: userId } }
          : { where: { userName: userName } }),
      });
      return {
        response: user,
      };
    } catch (error) {
      return { message: error.message };
    }
  },
  getAllUsers: async () => {
    try {
      const user = await models.users.findAll({
        attributes: {
          exclude: ["password", "deletedAt"],
        },
        // attributes: ["userID", "userName"],
      });
      return { response: user };
    } catch (error) {
      return { message: error.message };
    }
  },
};
