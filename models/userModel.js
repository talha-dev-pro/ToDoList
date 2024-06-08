const { where, Op } = require("sequelize");
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
        attributes: {
          exclude: ["deletedAt", "createdAt", "updatedAt"],
        },
      });
      return {
        response: user,
      };
    } catch (error) {
      return { message: error.message };
    }
  },
  getAllUsers: async (query, userId, role) => {
    try {
      const user = await models.users.findAll({
        where: {
          ...(role == "admin" ? true : { userId: userId }),
          ...(query.userName
            ? { userName: { [Op.iLike]: `%${query.userName}%` } }
            : true),
          ...(query.createdAt ? query.createdAt : true),
        },
        attributes: {
          exclude: ["password"],
        },
        include: {
          model: models.tasks,
          exclude: ["userId"],
        },
        offset: query.offset,
        limit: query.limit,
        order: [
          [
            query?.sortBy || "createdAt",
            query?.orderBy || "ASC",
            // query.sortBy ? query.sortBy : "createdAt",
            // query.orderBy ? query.orderBy : "ASC",
            // ...(query.sortBy ? query.sortBy : "createdAt"),
            // ...(query.orderBy ? query.orderBy : "ASC"),
          ],
        ],
      });
      return { response: user };
    } catch (error) {
      console.log(error);
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
