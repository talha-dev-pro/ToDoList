const { where } = require("sequelize");
const { models } = require("./index");

module.exports = {
  createSession: async (body) => {
    try {
      const createSession = await models.sessions.create({ ...body });
      return {
        response: createSession,
      };
    } catch (error) {
      return { error: error.message };
    }
  },
  deleteSession: async (sessionId) => {
    try {
      const deleteSession = await models.sessions.destroy({
        where: { sessionId: sessionId },
      });
      return {
        response: deleteSession,
      };
    } catch (error) {
      return { error: error.message };
    }
  },
  getSession: async (token, userId) => {
    try {
      const getSession = await models.sessions.findOne({
        where: { userId: userId },
      });
      return { response: getSession };
    } catch (error) {
      return { error: error.message };
    }
  },
};
