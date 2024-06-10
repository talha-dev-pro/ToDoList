const { where } = require("sequelize");
const { models } = require("./index");

module.exports = {
  createSession: async ({ ...body }) => {
    try {
      const session = await models.sessions.create({ ...body });
      return {
        response: session,
      };
    } catch (error) {
      return { error: error.message };
    }
  },
  deleteSession: async (userId) => {
    try {
      const session = await models.sessions.destroy({
        where: { userId: userId },
      });
      return {
        response: session,
      };
    } catch (error) {
      return { error: error.message };
    }
  },
  getSession: async (userId, token) => {
    try {
      const session = await models.sessions.findOne({
        ...(token
          ? { where: { userId: userId } || { token: token } }
          : { where: { userId: userId } }),
      });
      return { response: session };
    } catch (error) {
      return { error: error.message };
    }
  },
};
