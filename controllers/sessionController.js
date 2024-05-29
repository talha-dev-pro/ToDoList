const { deleteSession } = require("../models/sessionModel");
const sessionService = require("../services/sessionService");
const joi = require("joi");

const createSessionSchema = joi.object().keys({
  userId: joi.string().required(),
  token: joi.string,
});

const deleteSessionSchema = joi.object().keys({
  sessionId: joi.string().required(),
});

const getSessionSchema = joi.object().keys({
  userId: joi.string().required(),
  token: joi.string,
});

module.exports = {
  createSession: async (req, res) => {
    try {
      const validate = await createSessionSchema.validateAsync(req.body);
      const createSession = await sessionService.createSession(validate);
      if (createSession.error) {
        return res.send({
          error: createSession.error,
        });
      }
      return res.send(createSession);
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  deleteSession: async (req, res) => {
    try {
      const validate = await deleteSessionSchema.validateAsync(req.query);
      const deleteSession = await sessionService.deleteSession(validate);
      if (deleteSession.error) {
        return res.send(deleteSession.error);
      }
      return res.send(deleteSession.response);
    } catch (error) {
      return res.send({ error: error.message });
    }
  },
  getSession: async (req, res) => {
    try {
      const validate = await getSessionSchema.validateAsync(req.body);
      const getSession = await sessionService.getSession(validate);
      if (getSession.error) {
        return res.send({ error: getSession.error });
      }
      return res.send({ response: getSession });
    } catch (error) {
      return res.send({ error: error.message });
    }
  },
};
