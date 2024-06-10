require("dotenv").config();
const { verify } = require("jsonwebtoken");
const sessionModel = require("./models/sessionModel");

module.exports = {
  middleware: async (req, res, next) => {
    try {
      let { token, userId } = req.cookies.auth;
      console.log(userId);

      if (token === "undefined") {
        return res.send({
          response: "unauthorized user",
        });
      }

      const isSession = await sessionModel.getSession(userId, token);

      if (isSession.error || !isSession.response) {
        return res.send({
          response: "unauthorized user",
        });
      }

      token = isSession.response.dataValues.token;

      verify(token, process.env.SECRET, (error, data) => {
        if (error) {
          return res.send({
            response: "forbidden access",
          });
        }
        req.userData = data;
        next();
      });
    } catch (error) {
      return res.send({
        message: error,
      });
    }
  },
  admin: async (req, res, next) => {
    try {
      let { token, userId } = req.cookies.auth;
      console.log(userId);

      if (token === "undefined") {
        return res.send({
          response: "unauthorized user",
        });
      }

      const isSession = await sessionModel.getSession(userId, token);

      if (isSession.error || !isSession.response) {
        return res.send({
          response: "unauthorized user",
        });
      }

      verify(token, process.env.SECRET, (error, data) => {
        if (error) {
          return res.send({
            response: "forbidden access",
          });
        }
        if (data.role != "admin") {
          return res.send({
            response: "forbidden access",
          });
        }
        req.userData = data;
        next();
      });
    } catch (error) {
      return res.send({
        message: error,
      });
    }
  },
};
