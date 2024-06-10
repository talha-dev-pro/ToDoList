require("dotenv").config();
const { compare } = require("bcryptjs");
const userModel = require("../models/userModel");
const { sign } = require("jsonwebtoken");
const sessionModel = require("../models/sessionModel");

module.exports = {
  login: async (body) => {
    try {
      const user = await userModel.getUser(false, body.userName);
      if (user.error || !user.response) {
        return {
          error: {
            message: "user not found",
            error: user?.error || user.response,
            session: "undefined",
          },
        };
      }
      const isValid = await compare(
        body.password,
        user.response.dataValues.password
      );
      if (!isValid) {
        return {
          response: {
            message: "invalid credentials",
            response: isValid,
            session: "undefined",
          },
        };
      }
      const userId = user.response.dataValues.userId;
      delete user.response.dataValues.password;
      const token = sign(user.response.dataValues, process.env.SECRET);

      const isSession = await sessionModel.getSession(userId, false);
      if (isSession.error || isSession.response) {
        if (isSession.error) {
          return {
            response: {
              message: "invalid credentials",
              response: isValid,
              session: "undefined",
            },
          };
        }

        const deleteSession = await sessionModel.deleteSession(userId);
        if (deleteSession.error || !deleteSession.response) {
          return {
            response: {
              message: "invalid credentials",
              response: isValid,
              session: "undefined",
            },
          };
        }
      }
      const session = await sessionModel.createSession({ userId, token });
      if (session.error) {
        return {
          response: {
            message: "invalid credentials",
            response: isValid,
            session: "undefined",
          },
        };
      }

      return {
        response: {
          message: "Logged in successfuly",
          response: isValid,
          session: session.response,
        },
      };
    } catch (error) {
      return { message: error.message };
    }
  },
};
