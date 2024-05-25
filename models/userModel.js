const { where } = require("sequelize");
const { models } = require("./index");

module.exports = {
  createUser: async (body) => {
    try {
      const user = await models.users.create({ ...body });
      return {
        response: user,
      };
    } catch (error) {
      return error;
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
          exclude: ["password"],
        },
        // attributes: ["userId", "userName"],
      });
      return { response: user };
    } catch (error) {
      return { message: error.message };
    }
  },
  deleteUser: async (userId) => {
    try {
      const deleteUser = await models.users.destroy({
        where: { userId: userId },
      });
      return { message: "user Deleted", response: deleteUser };
    } catch (error) {
      return { message: error.message };
    }
  },
  updateUser: async ({ userId, ...body }) => {
    try {
      const updateUser = await models.users.update(
        { ...body },
        {
          where: { userId: userId },
        }
      );
      console.log(updateUser);
      return { message: "user Updated", response: updateUser };
    } catch (error) {
      return { message: error.message };
    }
  },
};
