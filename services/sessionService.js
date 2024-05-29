const sessionModel = require("../models/sessionModel");
const { v4: uuid } = require("uuid");

module.exports = {
  createSession: async (body) => {
    try {
      body.sessionId = uuid();
      const createSession = await sessionModel.createSession(body);
      if (createSession.error) {
        return {
          error: {
            message: "cannot create session",
            error: createSession.message,
          },
        };
      }
      return { response: createSession.response };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
  deleteSession: async (body) => {
    try {
      const deleteSession = await sessionModel.deleteSession(body.sessionId);
      if (deleteSession.error) {
        return {
          error: {
            message: "cannot delete",
            error: deleteSession.error,
          },
        };
      }
      return {
        response: {
          message: "deleted",
          response: deleteSession.response,
        },
      };
    } catch (error) {
      return { error: error.message };
    }
  },
  getSession: async (body) => {
    try {
      const getSession = await sessionModel.getSession({ ...body });
      if (getSession.error) {
        return {
          error: {
            message: "cannot fetch",
            error: getSession.error,
          },
        };
      }
      return { response: getSession.response };
    } catch (error) {
      return { error: error.message };
    }
  },
};
